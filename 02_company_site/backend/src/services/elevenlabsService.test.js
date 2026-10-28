import test from 'node:test';
import assert from 'node:assert/strict';

test('uses configured ELEVENLABS_AGENT_ID without creating a duplicate agent', async () => {
  process.env.ELEVENLABS_API_KEY = 'test-key';
  process.env.ELEVENLABS_AGENT_ID = 'agent_test_123';

  const { getOrCreateAgent } = await import('./elevenlabsService.js');
  const result = await getOrCreateAgent();

  assert.equal(result.agentId, 'agent_test_123');
  assert.equal(result.source, 'configured');
  assert.equal(result.cached, true);
});
