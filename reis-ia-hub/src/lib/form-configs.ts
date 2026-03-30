export interface Field {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'checkbox' | 'radio';
  options?: string[];
  required?: boolean;
}

export interface Section {
  title: string;
  fields: Field[];
}

export interface FormConfig {
  title: string;
  sections: Section[];
}

export const FORM_CONFIGS: Record<string, FormConfig> = {
  'personal-branding': {
    title: 'Personal Branding',
    sections: [
      {
        title: 'Identificacao',
        fields: [
          { id: 'full_name', label: 'Nome completo', type: 'text', required: true },
          { id: 'professional_title', label: 'Titulo profissional (ex: CEO, Fundador, Consultor)', type: 'text', required: true },
          { id: 'city_country', label: 'Cidade e pais', type: 'text' },
          { id: 'main_sector', label: 'Setor principal de atuacao', type: 'text', required: true },
          { id: 'years_experience', label: 'Anos de experiencia na area', type: 'text' },
          { id: 'current_projects', label: 'Projetos ou empresas atuais', type: 'textarea' },
        ],
      },
      {
        title: 'Historia e Origem',
        fields: [
          { id: 'origin_story', label: 'Como voce chegou onde esta? Qual foi o ponto de virada na sua carreira?', type: 'textarea', required: true },
          { id: 'biggest_challenge', label: 'Qual foi o maior desafio que voce ja superou profissionalmente?', type: 'textarea' },
          { id: 'proud_moment', label: 'Descreva um momento ou resultado do qual voce mais se orgulha', type: 'textarea' },
          { id: 'formative_influences', label: 'Quem ou o que mais influenciou sua visao de mundo e forma de trabalhar?', type: 'textarea' },
        ],
      },
      {
        title: 'Personalidade e Arquetipos',
        fields: [
          { id: 'three_adjectives', label: 'Tres adjetivos que descrevem sua personalidade profissional', type: 'text' },
          { id: 'archetype', label: 'Com qual arquetipo voce mais se identifica?', type: 'radio', options: ['O Mentor', 'O Estrategista', 'O Criador', 'O Lider', 'O Especialista', 'O Visionario', 'O Construtor'] },
          { id: 'tone', label: 'Qual tom representa melhor sua comunicacao?', type: 'radio', options: ['Direto e objetivo', 'Inspirador e motivacional', 'Analitico e tecnico', 'Narrativo e storytelling', 'Provocador e desafiador'] },
          { id: 'anti_archetype', label: 'O que voce definitivamente NAO e (o que vai contra sua identidade)?', type: 'textarea' },
        ],
      },
      {
        title: 'Posicionamento e Audiencia',
        fields: [
          { id: 'unique_positioning', label: 'Em uma frase: o que te torna unico no seu mercado?', type: 'textarea', required: true },
          { id: 'who_you_help', label: 'Quem voce ajuda? Descreva seu cliente/seguidor ideal.', type: 'textarea', required: true },
          { id: 'what_you_solve', label: 'Qual problema especifico voce resolve para essas pessoas?', type: 'textarea', required: true },
          { id: 'transformation', label: 'Qual e a transformacao que voce proporciona (antes vs. depois)?', type: 'textarea' },
          { id: 'competitors', label: 'Quem sao seus principais concorrentes ou referencias no mercado?', type: 'textarea' },
        ],
      },
      {
        title: 'Conteudo e Presenca',
        fields: [
          { id: 'main_platforms', label: 'Em quais plataformas voce ja atua ou pretende atuar?', type: 'checkbox', options: ['LinkedIn', 'Instagram', 'YouTube', 'TikTok', 'Twitter/X', 'Podcast', 'Newsletter', 'Blog'] },
          { id: 'content_pillars', label: 'Quais sao os 3-5 temas centrais do seu conteudo?', type: 'textarea', required: true },
          { id: 'content_frequency', label: 'Com que frequencia voce produz ou pretende produzir conteudo?', type: 'radio', options: ['Diariamente', '3-5x por semana', '1-2x por semana', 'Quinzenalmente', 'Ainda nao produzo'] },
          { id: 'content_formats', label: 'Quais formatos funcionam melhor para voce?', type: 'checkbox', options: ['Texto longo', 'Posts curtos', 'Videos', 'Carrossel', 'Stories', 'Lives', 'Artigos', 'Podcasts'] },
        ],
      },
      {
        title: 'Visual e Estilo',
        fields: [
          { id: 'color_palette', label: 'Cores que voce usa ou quer usar na sua identidade visual', type: 'text' },
          { id: 'visual_references', label: 'Citar 2-3 pessoas ou marcas cujo visual te inspira', type: 'textarea' },
          { id: 'visual_style', label: 'Qual estilo visual representa voce?', type: 'radio', options: ['Minimalista e clean', 'Bold e impactante', 'Quente e humano', 'Tecnico e preciso', 'Criativo e experimental'] },
          { id: 'photo_style', label: 'Como sao (ou como voce quer que sejam) suas fotos profissionais?', type: 'textarea' },
        ],
      },
      {
        title: 'Objetivo e Visao',
        fields: [
          { id: 'goal_12_months', label: 'Qual e o principal objetivo do seu personal brand nos proximos 12 meses?', type: 'textarea', required: true },
          { id: 'success_metrics', label: 'Como voce vai medir o sucesso da sua marca pessoal?', type: 'checkbox', options: ['Seguidores/audiencia', 'Leads gerados', 'Propostas de parceria', 'Convites para palestras', 'Vendas diretas', 'Reconhecimento no setor', 'Oportunidades de midia'] },
          { id: 'legacy', label: 'Qual legado voce quer deixar com sua marca pessoal?', type: 'textarea' },
        ],
      },
    ],
  },

  'company-branding': {
    title: 'Branding Empresarial',
    sections: [
      {
        title: 'A Empresa',
        fields: [
          { id: 'company_name', label: 'Nome da empresa', type: 'text', required: true },
          { id: 'founding_year', label: 'Ano de fundacao', type: 'text' },
          { id: 'sector', label: 'Setor e nicho de atuacao', type: 'text', required: true },
          { id: 'team_size', label: 'Tamanho atual da equipe', type: 'radio', options: ['1-5', '6-20', '21-50', '51-200', '200+'] },
          { id: 'what_you_do', label: 'Em uma frase: o que a empresa faz e para quem?', type: 'textarea', required: true },
          { id: 'origin_story', label: 'Qual e a historia de origem da empresa?', type: 'textarea' },
        ],
      },
      {
        title: 'Missao e Valores',
        fields: [
          { id: 'mission', label: 'Missao (por que a empresa existe — alem do lucro)', type: 'textarea', required: true },
          { id: 'vision', label: 'Visao (onde a empresa quer chegar em 5-10 anos)', type: 'textarea', required: true },
          { id: 'values', label: 'Valores fundamentais (3-5, cada um com uma frase de explicacao)', type: 'textarea', required: true },
          { id: 'brand_personality', label: 'Se a empresa fosse uma pessoa, como ela seria?', type: 'textarea' },
          { id: 'tone_of_voice', label: 'Como a empresa se comunica com clientes?', type: 'radio', options: ['Formal e institucional', 'Consultivo e estrategico', 'Direto e objetivo', 'Inspirador e humano', 'Tecnico e especialista'] },
        ],
      },
      {
        title: 'Mercado e Posicionamento',
        fields: [
          { id: 'target_client', label: 'Descreva o cliente ideal (perfil, porte, setor, cargo do decisor)', type: 'textarea', required: true },
          { id: 'main_problem', label: 'Qual e o principal problema que a empresa resolve?', type: 'textarea', required: true },
          { id: 'usp', label: 'Por que um cliente escolheria voces em vez de um concorrente?', type: 'textarea', required: true },
          { id: 'competitors', label: 'Liste os 3-5 principais concorrentes', type: 'textarea' },
          { id: 'market_positioning', label: 'Onde a empresa se posiciona no mercado?', type: 'radio', options: ['Premium / high-end', 'Melhor custo-beneficio', 'Especialista em nicho', 'Inovador / disruptivo', 'Lider de mercado'] },
        ],
      },
      {
        title: 'Visual e Comunicacao',
        fields: [
          { id: 'current_logo', label: 'Possui logo atual? Descreva ou anexe referencia', type: 'textarea' },
          { id: 'color_palette', label: 'Cores atuais ou desejadas para a marca', type: 'text' },
          { id: 'visual_references', label: '3 empresas/marcas cuja identidade visual voce admira', type: 'textarea' },
          { id: 'visual_style', label: 'Estilo visual da marca', type: 'radio', options: ['Minimalista e clean', 'Bold e forte', 'Corporativo e tradicional', 'Moderno e tecnologico', 'Humano e acessivel'] },
          { id: 'communication_channels', label: 'Principais canais de comunicacao e marketing', type: 'checkbox', options: ['Site/Blog', 'LinkedIn', 'Instagram', 'Email Marketing', 'WhatsApp', 'Eventos', 'Outbound', 'SEO/Conteudo'] },
        ],
      },
      {
        title: 'Objetivos',
        fields: [
          { id: 'main_goal', label: 'Principal objetivo de branding para os proximos 12 meses', type: 'textarea', required: true },
          { id: 'brand_challenges', label: 'Quais sao os maiores desafios de marca que a empresa enfrenta hoje?', type: 'textarea' },
          { id: 'success_metrics', label: 'Como vai medir o sucesso do trabalho de branding?', type: 'checkbox', options: ['Reconhecimento de marca', 'Geracao de leads qualificados', 'Reducao do ciclo de vendas', 'Atracao de talentos', 'Autoridade no setor', 'NPS/satisfacao de clientes'] },
        ],
      },
    ],
  },

  'product-branding': {
    title: 'Product Branding',
    sections: [
      {
        title: 'O Produto/Servico',
        fields: [
          { id: 'product_name', label: 'Nome do produto ou servico', type: 'text', required: true },
          { id: 'product_type', label: 'Tipo', type: 'radio', options: ['Software/SaaS', 'Servico de consultoria', 'Curso/Treinamento', 'Produto fisico', 'Marketplace', 'Servico recorrente', 'Outro'] },
          { id: 'what_it_does', label: 'O que o produto faz? Explique como se fosse para alguem que nunca ouviu falar.', type: 'textarea', required: true },
          { id: 'target_user', label: 'Quem e o usuario/cliente final? (perfil detalhado)', type: 'textarea', required: true },
          { id: 'price_range', label: 'Faixa de preco', type: 'text' },
          { id: 'stage', label: 'Estagio atual', type: 'radio', options: ['Ideia / conceito', 'MVP / beta', 'Lancado com primeiros clientes', 'Em crescimento', 'Maduro / consolidado'] },
        ],
      },
      {
        title: 'Proposta de Valor',
        fields: [
          { id: 'main_problem', label: 'Qual e o problema central que o produto resolve?', type: 'textarea', required: true },
          { id: 'transformation', label: 'Qual e a transformacao que o cliente experimenta (antes vs. depois)?', type: 'textarea', required: true },
          { id: 'differentiators', label: 'O que torna este produto diferente das alternativas existentes?', type: 'textarea', required: true },
          { id: 'key_features', label: 'Tres funcionalidades ou caracteristicas que o cliente mais valoriza', type: 'textarea' },
          { id: 'competitors', label: 'Principais alternativas ou concorrentes diretos', type: 'textarea' },
        ],
      },
      {
        title: 'Naming e Identidade',
        fields: [
          { id: 'name_origin', label: 'Como surgiu o nome do produto? Qual e o significado?', type: 'textarea' },
          { id: 'name_options', label: 'Se ainda nao ha nome definido, liste opcoes ou referencias', type: 'textarea' },
          { id: 'brand_personality', label: 'Qual seria a personalidade da marca do produto?', type: 'radio', options: ['Tecnico e preciso', 'Simples e acessivel', 'Premium e exclusivo', 'Humano e empatetico', 'Inovador e ousado'] },
          { id: 'visual_references', label: 'Cite 3 produtos/apps/servicos cuja identidade visual voce admira', type: 'textarea' },
          { id: 'color_direction', label: 'Direcao de cores e estilo visual', type: 'text' },
        ],
      },
      {
        title: 'Objetivos',
        fields: [
          { id: 'launch_goal', label: 'Objetivo principal com o branding do produto', type: 'textarea', required: true },
          { id: 'timeline', label: 'Prazo desejado para ter a identidade definida', type: 'text' },
          { id: 'usage_contexts', label: 'Onde a marca do produto vai aparecer?', type: 'checkbox', options: ['Site/Landing page', 'App mobile', 'Material de vendas', 'Apresentacoes', 'Anuncios', 'Onboarding', 'Packaging'] },
          { id: 'success_metrics', label: 'Como vai medir o sucesso do branding do produto?', type: 'textarea' },
        ],
      },
    ],
  },

  'movement-branding': {
    title: 'Movimento & Comunidade',
    sections: [
      {
        title: 'O Movimento',
        fields: [
          { id: 'movement_name', label: 'Nome do movimento ou comunidade', type: 'text', required: true },
          { id: 'core_idea', label: 'Qual e a ideia central que o movimento defende?', type: 'textarea', required: true },
          { id: 'why_now', label: 'Por que esse movimento e necessario agora?', type: 'textarea', required: true },
          { id: 'manifesto', label: 'Escreva um rascunho do manifesto do movimento (pode ser bruto, sera refinado)', type: 'textarea' },
          { id: 'battle_cry', label: 'Qual seria o "grito de guerra" ou frase central do movimento?', type: 'text' },
        ],
      },
      {
        title: 'Inimigo e Alternativas',
        fields: [
          { id: 'common_enemy', label: 'Qual e o inimigo comum que une o movimento? (pode ser uma crenca, pratica ou status quo)', type: 'textarea', required: true },
          { id: 'what_you_fight_against', label: 'O que o movimento recusa ou rejeita ativamente?', type: 'textarea' },
          { id: 'alternatives', label: 'Quais alternativas ou outros movimentos existem? Como voces se diferenciam?', type: 'textarea' },
        ],
      },
      {
        title: 'A Tribo',
        fields: [
          { id: 'who_belongs', label: 'Quem faz parte da tribo? Descreva o membro ideal.', type: 'textarea', required: true },
          { id: 'who_does_not_belong', label: 'Quem NAO e bem-vindo ou NAO se encaixa no movimento?', type: 'textarea' },
          { id: 'transformation', label: 'Qual transformacao os membros experimentam ao fazer parte do movimento?', type: 'textarea', required: true },
          { id: 'community_size', label: 'Tamanho atual ou desejado da comunidade', type: 'radio', options: ['Nao existe ainda', 'Menos de 100', '100-500', '500-2000', '2000-10000', '10000+'] },
          { id: 'community_platforms', label: 'Onde a comunidade existe ou vai existir?', type: 'checkbox', options: ['Discord', 'WhatsApp', 'Telegram', 'Circle', 'Slack', 'Eventos presenciais', 'Online apenas', 'Outro'] },
          { id: 'rituals', label: 'Quais sao os rituais, simbolos ou praticas que unem a tribo?', type: 'textarea' },
        ],
      },
      {
        title: 'Objetivos',
        fields: [
          { id: 'main_goal', label: 'Qual e o objetivo principal do movimento nos proximos 12 meses?', type: 'textarea', required: true },
          { id: 'success_metrics', label: 'Como vai medir o sucesso do movimento?', type: 'checkbox', options: ['Numero de membros', 'Engajamento da comunidade', 'Conteudo gerado por membros', 'Eventos realizados', 'Impacto mensuravel na vida dos membros', 'Reconhecimento da midia'] },
          { id: 'monetization', label: 'Como o movimento se sustenta financeiramente?', type: 'radio', options: ['Nao ha monetizacao prevista', 'Membros pagantes', 'Patrocinadores', 'Produtos derivados', 'Eventos pagos', 'Fundo de investimento'] },
        ],
      },
    ],
  },
};
