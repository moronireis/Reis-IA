/**
 * Reis Marketing IA — Form Submission
 * 1. Sends data to /api/submit (email via Resend)
 * 2. Saves to localStorage (backup + admin panel)
 */

const STORAGE_KEY = 'reis_marketing_submissions';

function getSubmissions() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveSubmission(entry) {
  const submissions = getSubmissions();
  submissions.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

async function submitToSupabase(formType, formElement) {
  const submitBtn = formElement.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
  submitBtn.style.opacity = '0.7';

  // Collect form data
  const formData = new FormData(formElement);
  const data = {};
  formData.forEach((value, key) => {
    if (data[key]) { data[key] = [].concat(data[key], value); }
    else { data[key] = value; }
  });

  const name = data.nome || data.nome_empresa || data.nome_movimento || data.nome_produto || '';

  // Save to localStorage
  const entry = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2),
    form_type: formType,
    name: name,
    data: data,
    created_at: new Date().toISOString()
  };
  saveSubmission(entry);

  // Send to API (email)
  try {
    await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ form_type: formType, name: name, data: data })
    });
  } catch (err) {
    console.warn('Email API error (data saved locally):', err);
  }

  // Success UI
  submitBtn.textContent = 'Enviado com sucesso!';
  submitBtn.style.background = '#22C55E';
  submitBtn.style.opacity = '1';

  const successMsg = document.createElement('div');
  successMsg.innerHTML = `
    <div style="text-align: center; padding: 40px 20px;">
      <div style="font-size: 48px; margin-bottom: 16px; color: #22C55E;">&#10003;</div>
      <h3 style="margin-bottom: 8px; color: var(--text-primary);">Formulário enviado com sucesso!</h3>
      <p style="color: var(--text-secondary); max-width: 400px; margin: 0 auto;">
        Recebemos suas informações. Entraremos em contato em breve para dar início ao processo.
      </p>
    </div>
  `;

  formElement.style.opacity = '0';
  formElement.style.transform = 'translateY(20px)';
  formElement.style.transition = 'opacity 0.4s, transform 0.4s';

  setTimeout(() => {
    formElement.parentNode.replaceChild(successMsg, formElement);
    successMsg.style.opacity = '0';
    successMsg.style.transform = 'translateY(20px)';
    successMsg.style.transition = 'opacity 0.5s, transform 0.5s';
    requestAnimationFrame(() => {
      successMsg.style.opacity = '1';
      successMsg.style.transform = 'translateY(0)';
    });
  }, 400);
}
