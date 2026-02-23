import test from 'node:test';
import assert from 'node:assert';
import Auth from './auth.js';

test('Auth class tests', async (t) => {
  await t.test('it should be instantiatable', () => {
    const instance = new Auth();
    assert.ok(instance instanceof Auth);
  });

  await t.test('it should have an authenticate method (unimplemented)', () => {
    const instance = new Auth();
    assert.strictEqual(typeof instance.authenticate, 'function', 'Method authenticate should exist');
  });
});
