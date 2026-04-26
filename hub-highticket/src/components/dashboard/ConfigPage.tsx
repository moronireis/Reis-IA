import { useState } from 'react';
import { Card, Badge } from '../ui';
import Avatar from '../ui/Avatar';
import GlowLine from '../vfx/GlowLine';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold text-text-primary mb-4">{children}</h2>
  );
}

function FormField({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-border last:border-0 gap-6">
      <div className="min-w-0">
        <p className="text-sm text-text-primary font-medium">{label}</p>
        {description && <p className="text-xs text-text-muted mt-0.5">{description}</p>}
      </div>
      <div className="flex-shrink-0 w-64">{children}</div>
    </div>
  );
}

function TextInput({ defaultValue, placeholder }: { defaultValue?: string; placeholder?: string }) {
  return (
    <input
      type="text"
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
    />
  );
}

function SelectInput({ options, defaultValue }: { options: string[]; defaultValue?: string }) {
  return (
    <select
      defaultValue={defaultValue}
      className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent/50 transition-colors appearance-none cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function Toggle({ defaultChecked = false, label }: { defaultChecked?: boolean; label: string }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-text-secondary">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked(!checked)}
        className={`
          relative inline-flex shrink-0 w-11 h-6 rounded-full
          transition-colors duration-200 cursor-pointer
          ${checked ? 'bg-accent' : 'bg-surface-3'}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block w-5 h-5 rounded-full bg-white
            shadow-sm transition-transform duration-200 ease-in-out
            translate-y-0.5
            ${checked ? 'translate-x-[22px]' : 'translate-x-0.5'}
          `}
        />
      </button>
    </div>
  );
}

function SaveButton() {
  const [saved, setSaved] = useState(false);
  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }
  return (
    <button
      onClick={handleSave}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
        saved
          ? 'bg-accent/20 text-accent border border-accent/30'
          : 'bg-accent text-surface-0 hover:bg-accent/90'
      }`}
    >
      {saved ? 'Salvo!' : 'Salvar Alterações'}
    </button>
  );
}

export default function ConfigPage() {
  return (
    <div>
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold text-text-primary">Configurações</h1>
        <p className="text-sm text-text-secondary mt-1">Personalize sua plataforma e integrações</p>
      </div>

      <GlowLine className="my-6" />

      <div className="space-y-6 max-w-3xl">

        {/* Profile Section */}
        <Card padding="lg" className="animate-fade-up">
          <SectionTitle>Perfil do Expert</SectionTitle>

          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <Avatar name="Moroni Reis" size="lg" />
            <div>
              <p className="text-sm font-medium text-text-primary">Moroni Reis</p>
              <p className="text-xs text-text-muted mt-0.5">moroni@reisia.com.br</p>
              <button className="text-xs text-accent hover:text-accent/80 transition-colors mt-1.5 cursor-pointer">
                Alterar foto
              </button>
            </div>
          </div>

          <FormField label="Nome completo" description="Seu nome exibido para os alunos">
            <TextInput defaultValue="Moroni Reis" />
          </FormField>

          <FormField label="E-mail" description="E-mail de login da plataforma">
            <TextInput defaultValue="moroni@reisia.com.br" />
          </FormField>

          <FormField label="Bio curta" description="Exibida na página de perfil público">
            <TextInput defaultValue="Especialista em crescimento de negócios de alto ticket" />
          </FormField>

          <FormField label="Fuso horário" description="Usado para agendar sessões">
            <SelectInput
              options={[
                'América/São_Paulo (GMT-3)',
                'América/Manaus (GMT-4)',
                'América/Belém (GMT-3)',
              ]}
              defaultValue="América/São_Paulo (GMT-3)"
            />
          </FormField>

          <div className="flex justify-end mt-4">
            <SaveButton />
          </div>
        </Card>

        {/* Platform Links */}
        <Card padding="lg" className="animate-fade-up">
          <SectionTitle>Links da Plataforma</SectionTitle>
          <p className="text-xs text-text-muted mb-4">Configure as integrações externas usadas na plataforma</p>

          <FormField label="Link Hotmart" description="URL do produto no Hotmart para checkout">
            <TextInput placeholder="https://go.hotmart.com/..." />
          </FormField>

          <FormField label="Cal.com — Sessão Individual" description="Link de agendamento de sessões individuais">
            <TextInput placeholder="https://cal.com/moroni/sessao" />
          </FormField>

          <FormField label="Cal.com — Reunião de Grupo" description="Link de agendamento das chamadas em grupo">
            <TextInput placeholder="https://cal.com/moroni/grupo" />
          </FormField>

          <FormField label="Comunidade (WhatsApp ou Discord)" description="Link de acesso à comunidade dos alunos">
            <TextInput placeholder="https://chat.whatsapp.com/..." />
          </FormField>

          <FormField label="Área de membros alternativa" description="URL externa (ex: Hotmart Club, Kajabi)">
            <TextInput placeholder="https://..." />
          </FormField>

          <div className="flex justify-end mt-4">
            <SaveButton />
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card padding="lg" className="animate-fade-up">
          <SectionTitle>Preferências de Notificação</SectionTitle>
          <p className="text-xs text-text-muted mb-5">Escolha quais eventos geram notificações para você</p>

          <div className="space-y-4">
            <Toggle defaultChecked label="Nova venda confirmada" />
            <Toggle defaultChecked label="Novo aluno cadastrado" />
            <Toggle defaultChecked label="Sessão individual agendada" />
            <Toggle label="Sessão individual cancelada" />
            <Toggle defaultChecked label="Aluno com status Em Risco" />
            <Toggle label="Comentário em aula" />
            <Toggle defaultChecked label="Inadimplência identificada" />
            <Toggle label="Relatório semanal por e-mail" />
          </div>

          <div className="flex justify-end mt-6">
            <SaveButton />
          </div>
        </Card>

        {/* Danger Zone */}
        <Card padding="lg" className="animate-fade-up border border-danger/20">
          <div className="flex items-center gap-2 mb-4">
            <SectionTitle>Zona de Perigo</SectionTitle>
            <Badge variant="danger">Irreversível</Badge>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-text-primary">Resetar dados de demonstração</p>
              <p className="text-xs text-text-muted mt-0.5">Remove todos os dados mock e reinicia a plataforma</p>
            </div>
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-danger border border-danger/30 hover:bg-danger/10 transition-colors cursor-pointer">
              Resetar
            </button>
          </div>
        </Card>

      </div>
    </div>
  );
}
