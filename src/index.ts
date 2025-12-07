/* global process */

import { MDCChipSet } from '@material/chips';
import { MDCRipple } from '@material/ripple';
import * as WebFont from 'webfontloader';
import './index.scss';

new MDCChipSet(document.querySelector('.mdc-evolution-chip-set'));
new MDCRipple(document.querySelector('.mdc-fab'));

setTimeout(() => {
  document.querySelector('.mdc-fab').classList.remove('mdc-fab--exited');
}, 1000);

WebFont.load({
  google: {
    families: ['Roboto', 'Material Icons'],
  },
});

function registerSW(): Promise<ServiceWorkerRegistration | void> {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    return navigator.serviceWorker.register('/sw.js');
  }
  return Promise.resolve();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function importComponents(): Promise<any[]> {
  return Promise.all([
    import(/* webpackChunkName: 'components' */ 'node-package'),
    import(/* webpackChunkName: 'components' */ 'github-repository'),
    import(/* webpackChunkName: 'components' */ 'twitter-status'),
  ]);
}

function extendFab(extended: boolean) {
  if (extended) {
    document.querySelector('.mdc-fab').classList.add('mdc-fab--extended');
  } else {
    document.querySelector('.mdc-fab').classList.remove('mdc-fab--extended');
  }
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
