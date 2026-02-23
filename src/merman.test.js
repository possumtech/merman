import test from 'node:test';
import assert from 'node:assert';
import MermanUI from './merman.js';

test('MermanUI class tests', async (t) => {
  await t.test('it should be instantiatable', () => {
    const instance = new MermanUI();
    assert.ok(instance instanceof MermanUI);
  });

  await t.test('it should have a render method (unimplemented)', () => {
    const instance = new MermanUI();
    assert.strictEqual(typeof instance.render, 'function', 'Method render should exist');
  });
});
