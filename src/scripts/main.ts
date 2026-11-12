if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .catch((error) => console.error('Service worker registration failed', error));
  });
}

const COPIED_MS = 2000;

if (navigator.clipboard) {
  for (const button of document.querySelectorAll<HTMLButtonElement>('button[data-copy]')) {
    button.hidden = false;
    let timer: number | undefined;

    button.addEventListener('click', async () => {
      const status = button.parentElement?.querySelector('[data-copy-status]');
      try {
        await navigator.clipboard.writeText(button.dataset.copy ?? '');
        button.dataset.copied = '';
        if (status) status.textContent = 'Copied';
        clearTimeout(timer);
        timer = window.setTimeout(() => {
          delete button.dataset.copied;
          if (status) status.textContent = '';
        }, COPIED_MS);
      } catch (error) {
        console.error('Copy failed', error);
      }
    });
  }
}
