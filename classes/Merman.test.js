import test from 'node:test';
import assert from 'node:assert';
import Merman from './Merman.js';

test('Merman class tests', async (t) => {
  await t.test('it should be instantiatable', () => {
    const instance = new Merman();
    assert.ok(instance instanceof Merman);
  });

  await t.test('it should have a sync method (unimplemented)', () => {
    const instance = new Merman();
    assert.strictEqual(typeof instance.sync, 'function', 'Method sync should exist');
  });
});
