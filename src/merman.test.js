import test from 'node:test';
import assert from 'node:assert';
import MermanUI from './merman.js';

test('MermanUI class tests (OTM Instrumented)', async (t) => {
  await t.test('it should be instantiatable as an OTM class', () => {
    // We provide a mock elementId since we're in a Node test environment
    const instance = new MermanUI('mock-element');
    assert.ok(instance instanceof MermanUI);
  });

  await t.test('it should have an OTM render method returning content', () => {
    const instance = new MermanUI('mock-element');
    assert.strictEqual(typeof instance.render, 'function', 'Method render should exist');
    assert.ok(instance.render().includes('Merman'));
  });
});
