-- ============================================
-- FUNNIL HACKER — Database Schema
-- ============================================

-- Projects
CREATE TABLE IF NOT EXISTS fh_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  target_url TEXT,
  mode TEXT NOT NULL DEFAULT 'map_funnel',
  niche TEXT,
  keywords TEXT[],
  status TEXT DEFAULT 'pending',
  competitor_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Competitors discovered
CREATE TABLE IF NOT EXISTS fh_competitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES fh_projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT,
  niche TEXT,
  scale_score INT,
  active_ads_count INT,
  status TEXT DEFAULT 'discovered',
  overview JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Company intelligence
CREATE TABLE IF NOT EXISTS fh_company_intel (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES fh_projects(id) ON DELETE CASCADE,
  domain TEXT,
  whois_data JSONB,
  company_name TEXT,
  cnpj TEXT,
  social_profiles JSONB DEFAULT '{}',
  hosting_provider TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Pages discovered
CREATE TABLE IF NOT EXISTS fh_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES fh_projects(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  final_url TEXT,
  title TEXT,
  page_type TEXT,
  funnel_stage TEXT,
  screenshot_desktop TEXT,
  screenshot_mobile TEXT,
  html_snapshot TEXT,
  text_content TEXT,
  copy_analysis JSONB,
  tech_detected JSONB,
  status_code INT,
  redirect_chain JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Ads captured
CREATE TABLE IF NOT EXISTS fh_ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES fh_projects(id) ON DELETE CASCADE,
  platform TEXT,
  ad_id TEXT,
  creative_url TEXT,
  video_url TEXT,
  copy_text TEXT,
  hook_type TEXT,
  started_at TIMESTAMPTZ,
  status TEXT DEFAULT 'active',
  ai_analysis JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Funnel nodes
CREATE TABLE IF NOT EXISTS fh_funnel_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES fh_projects(id) ON DELETE CASCADE,
  page_id UUID REFERENCES fh_pages(id) ON DELETE SET NULL,
  label TEXT NOT NULL,
  node_type TEXT NOT NULL,
  position_x FLOAT DEFAULT 0,
  position_y FLOAT DEFAULT 0,
  metadata JSONB DEFAULT '{}'
);

-- Funnel edges
CREATE TABLE IF NOT EXISTS fh_funnel_edges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES fh_projects(id) ON DELETE CASCADE,
  from_node UUID REFERENCES fh_funnel_nodes(id) ON DELETE CASCADE,
  to_node UUID REFERENCES fh_funnel_nodes(id) ON DELETE CASCADE,
  label TEXT,
  edge_type TEXT DEFAULT 'click'
);

-- Insights
CREATE TABLE IF NOT EXISTS fh_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES fh_projects(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT DEFAULT 'ai',
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tech stack
CREATE TABLE IF NOT EXISTS fh_techstack (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES fh_projects(id) ON DELETE CASCADE,
  tech_name TEXT NOT NULL,
  tech_type TEXT NOT NULL,
  identifier TEXT,
  detected_on JSONB DEFAULT '[]'
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_fh_competitors_project ON fh_competitors(project_id);
CREATE INDEX IF NOT EXISTS idx_fh_pages_project ON fh_pages(project_id);
CREATE INDEX IF NOT EXISTS idx_fh_ads_project ON fh_ads(project_id);
CREATE INDEX IF NOT EXISTS idx_fh_insights_project ON fh_insights(project_id);
CREATE INDEX IF NOT EXISTS idx_fh_techstack_project ON fh_techstack(project_id);
CREATE INDEX IF NOT EXISTS idx_fh_funnel_nodes_project ON fh_funnel_nodes(project_id);
CREATE INDEX IF NOT EXISTS idx_fh_funnel_edges_project ON fh_funnel_edges(project_id);
