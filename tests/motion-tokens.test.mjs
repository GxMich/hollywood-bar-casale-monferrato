import test from 'node:test';
import assert from 'node:assert/strict';
import { cssTimeToMilliseconds } from '../src/motion-tokens.js';

test('conserva i millisecondi dopo la minificazione CSS dei token in secondi', () => {
  assert.equal(cssTimeToMilliseconds('160ms'),160);
  assert.equal(cssTimeToMilliseconds('.16s'),160);
  assert.equal(cssTimeToMilliseconds(' 0.24s '),240);
  assert.equal(cssTimeToMilliseconds('650ms'),650);
  assert.equal(cssTimeToMilliseconds('0s'),0);
});

test('usa un valore di riserva per token assenti o non validi', () => {
  assert.equal(cssTimeToMilliseconds(''),240);
  assert.equal(cssTimeToMilliseconds('bad',140),140);
  assert.equal(cssTimeToMilliseconds('-1s'),240);
});
