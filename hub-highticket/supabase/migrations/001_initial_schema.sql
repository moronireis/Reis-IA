-- HUB HIGH TICKET — Initial Database Schema
-- Run this in Supabase SQL Editor

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE user_role AS ENUM ('expert', 'closer', 'student');
CREATE TYPE call_result AS ENUM ('sold', 'lost', 'no_show');
CREATE TYPE action_status AS ENUM ('todo', 'in_progress', 'done');
CREATE TYPE sale_status AS ENUM ('confirmed', 'pending', 'refunded');
CREATE TYPE journey_type AS ENUM ('expert', 'student');

-- ============================================
-- TABLES
-- ============================================

-- 1. Users (extends Supabase Auth)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role user_role NOT NULL DEFAULT 'student',
  avatar TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Students
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  level INTEGER NOT NULL DEFAULT 1,
  points INTEGER NOT NULL DEFAULT 0,
  revenue NUMERIC(12,2) NOT NULL DEFAULT 0,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Closers
CREATE TABLE closers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Sales
CREATE TABLE sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  closer_id UUID NOT NULL REFERENCES closers(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL,
  status sale_status NOT NULL DEFAULT 'pending',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Calls
CREATE TABLE calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  closer_id UUID NOT NULL REFERENCES closers(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  result call_result NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Closer Reviews
CREATE TABLE closer_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  closer_id UUID NOT NULL REFERENCES closers(id) ON DELETE CASCADE,
  hits TEXT NOT NULL DEFAULT '',
  misses TEXT NOT NULL DEFAULT '',
  blind_spots TEXT NOT NULL DEFAULT '',
  improvements TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Journey Steps
CREATE TABLE journey_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  step_order INTEGER NOT NULL,
  type journey_type NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Journey Progress
CREATE TABLE journey_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  step_id UUID NOT NULL REFERENCES journey_steps(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, step_id)
);

-- 9. Checklist Items
CREATE TABLE checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  category TEXT NOT NULL DEFAULT 'geral',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. Actions
CREATE TABLE actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  how TEXT NOT NULL DEFAULT '',
  due_date DATE,
  status action_status NOT NULL DEFAULT 'todo',
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 11. Metrics Cache
CREATE TABLE metrics_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  period TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_closers_user_id ON closers(user_id);
CREATE INDEX idx_sales_closer_id ON sales(closer_id);
CREATE INDEX idx_sales_student_id ON sales(student_id);
CREATE INDEX idx_sales_date ON sales(date);
CREATE INDEX idx_calls_closer_id ON calls(closer_id);
CREATE INDEX idx_calls_date ON calls(date);
CREATE INDEX idx_journey_steps_type ON journey_steps(type);
CREATE INDEX idx_journey_steps_order ON journey_steps(step_order);
CREATE INDEX idx_journey_progress_user ON journey_progress(user_id);
CREATE INDEX idx_checklist_student ON checklist_items(student_id);
CREATE INDEX idx_actions_status ON actions(status);
CREATE INDEX idx_actions_assigned ON actions(assigned_to);
CREATE INDEX idx_metrics_cache_type ON metrics_cache(type, period);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE closers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE closer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics_cache ENABLE ROW LEVEL SECURITY;

-- Helper: check if user is expert
CREATE OR REPLACE FUNCTION is_expert()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'expert'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Expert can see everything
CREATE POLICY "Expert full access on users" ON users
  FOR ALL USING (is_expert() OR id = auth.uid());

CREATE POLICY "Expert full access on students" ON students
  FOR ALL USING (is_expert() OR user_id = auth.uid());

CREATE POLICY "Expert full access on closers" ON closers
  FOR ALL USING (is_expert() OR user_id = auth.uid());

CREATE POLICY "Expert full access on sales" ON sales
  FOR ALL USING (is_expert());

CREATE POLICY "Expert full access on calls" ON calls
  FOR ALL USING (is_expert() OR closer_id IN (SELECT id FROM closers WHERE user_id = auth.uid()));

CREATE POLICY "Expert full access on closer_reviews" ON closer_reviews
  FOR ALL USING (is_expert() OR closer_id IN (SELECT id FROM closers WHERE user_id = auth.uid()));

CREATE POLICY "Everyone reads journey steps" ON journey_steps
  FOR SELECT USING (true);

CREATE POLICY "Expert manages journey steps" ON journey_steps
  FOR ALL USING (is_expert());

CREATE POLICY "Users manage own journey progress" ON journey_progress
  FOR ALL USING (user_id = auth.uid() OR is_expert());

CREATE POLICY "Students manage own checklist" ON checklist_items
  FOR ALL USING (
    is_expert() OR
    student_id IN (SELECT id FROM students WHERE user_id = auth.uid())
  );

CREATE POLICY "Expert manages actions" ON actions
  FOR ALL USING (is_expert() OR assigned_to = auth.uid());

CREATE POLICY "Expert manages metrics" ON metrics_cache
  FOR ALL USING (is_expert());

-- ============================================
-- SEED: Default Journey Steps
-- ============================================

INSERT INTO journey_steps (title, description, step_order, type) VALUES
  -- Expert journey
  ('Definir estrutura', 'Organizar oferta, ticket e modelo de negócio', 1, 'expert'),
  ('Montar time comercial', 'Recrutar e treinar closers', 2, 'expert'),
  ('Otimizar funil', 'Páginas, criativos, automações', 3, 'expert'),
  ('Escalar operação', 'Automação, processos e multiplicação', 4, 'expert'),
  -- Student journey
  ('Onboarding', 'Questionário e chamada de boas-vindas', 1, 'student'),
  ('Fundação do Negócio', 'ICP, oferta, posicionamento', 2, 'student'),
  ('Funil de Vendas', 'Páginas, emails, automação', 3, 'student'),
  ('Tráfego Pago', 'Meta Ads + Google Ads', 4, 'student'),
  ('Otimização', 'Métricas, testes, ajustes', 5, 'student'),
  ('Escala', 'Time, processos, multiplicação', 6, 'student');
