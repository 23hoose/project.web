// ============================================================
// Практика №5: JavaScript DOM, события и состояние
// Два сценария:
//   1. Тёмная тема (переключатель)
//   2. Счётчик животных (кнопка «Помочь» на карточках)
// ============================================================

// ---------- Сценарий 1: Тёмная тема ----------

const themeToggle = document.querySelector('#theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    themeToggle.setAttribute('aria-pressed', String(newTheme === 'dark'));
    const textNode = themeToggle.querySelector('.theme-toggle__text');
    if (textNode) {
      textNode.textContent = newTheme === 'dark' ? 'Светлая' : 'Тёмная';
    }
  });
}

// ---------- Сценарий 2: Счётчик животных ----------

const helpButtons = document.querySelectorAll('[data-help-button]');

helpButtons.forEach((button) => {
  const countNode = button.querySelector('[data-help-count]');

  if (!countNode) {
    return;
  }

  let count = Number(countNode.textContent) || 0;
  let hasHelped = false;

  button.addEventListener('click', () => {
    if (hasHelped) {
      return;
    }

    count += 1;
    countNode.textContent = String(count);
    hasHelped = true;
    button.textContent = 'Спасибо за помощь';
    button.disabled = true;
    button.setAttribute('aria-pressed', 'true');
  });
});