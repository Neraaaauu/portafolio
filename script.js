/**
 * CV COMPACTO - GERARDO ADRIÁN RODRÍGUEZ DOMÍNGUEZ
 * Funcionalidad ligera para tema y copiado
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCopy();
});

function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const savedTheme = localStorage.getItem('cv-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', initialTheme);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cv-theme', next);
  });
}

function initCopy() {
  const btn = document.getElementById('btn-copy-email');
  const label = document.getElementById('copy-label');
  if (!btn || !label) return;

  btn.addEventListener('click', () => {
    const email = btn.getAttribute('data-email') || 'gerardo.rodriguez36@uabc.edu.mx';
    const originalText = label.textContent;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(() => {
        showSuccess(label, originalText);
      }).catch(() => {
        fallbackCopy(email, () => showSuccess(label, originalText));
      });
    } else {
      fallbackCopy(email, () => showSuccess(label, originalText));
    }
  });
}

function showSuccess(label, original) {
  label.textContent = '¡Copiado!';
  setTimeout(() => {
    label.textContent = original;
  }, 2000);
}

function fallbackCopy(text, onSuccess) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    if (onSuccess) onSuccess();
  } catch (err) {
    console.error(err);
  }
  document.body.removeChild(textArea);
}
