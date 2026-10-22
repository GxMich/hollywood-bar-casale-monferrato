import test from 'node:test';
import assert from 'node:assert/strict';
import { assetUrl } from '../src/assets.js';

test('public assets work at the site root and GitHub Pages project path', () => {
  for (const base of ['/', '/hollywood-bar-casale-monferrato/']) {
    assert.equal(assetUrl('/images/scena/room.webp', base), `${base}images/scena/room.webp`);
    assert.equal(assetUrl('images/scena/room.webp', base), `${base}images/scena/room.webp`);
  }
  assert.equal(assetUrl('/favicon.png', '/project'), '/project/favicon.png');
});
