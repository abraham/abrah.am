import { MDCChipSet } from '@material/chips';
import { MDCRipple } from '@material/ripple';
import WebFont from 'webfontloader';

const chipSet = document.querySelector<HTMLElement>('.mdc-evolution-chip-set');
const fab = document.querySelector<HTMLElement>('.mdc-fab');

if (chipSet) {
  new MDCChipSet(chipSet);
}

if (fab) {
  new MDCRipple(fab);
  setTimeout(() => fab.classList.remove('mdc-fab--exited'), 1000);
}

WebFont.load({
  google: {
    families: ['Roboto', 'Material Icons'],
  },
});

function registerSW(): Promise<ServiceWorkerRegistration | void> {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    return navigator.serviceWorker.register('/sw.js');
  }
  return Promise.resolve();
}

function importComponents(): Promise<unknown[]> {
  return Promise.all([import('node-package'), import('github-repository')]);
}

function extendFab(extended: boolean) {
  fab?.classList.toggle('mdc-fab--extended', extended);
}

let lastKnownScrollPosition = 0;
let extended = true;
let ticking = false;
let scrolled = false;
const animationFrame = () => {
  extendFab(extended);
  ticking = false;
};

const onScroll = () => {
  const top = window.scrollY < 50;

  if (!ticking && scrolled && (extended || top)) {
    extended = window.scrollY < lastKnownScrollPosition;
    lastKnownScrollPosition = window.scrollY;
    window.requestAnimationFrame(animationFrame);
    ticking = true;
  }

  scrolled = true;
};

window.addEventListener('scroll', onScroll);

importComponents()
  .then(registerSW)
  .catch((error: Error) => console.log(`Error importing dependencies or registering Service Worker: ${error}`));
