import { useEffect, useMemo, useState } from 'react';
import { ConversationProvider, useConversationControls, useConversationStatus } from '@elevenlabs/react';
import { Mic, MicOff, MessageSquareText, Sparkles, Loader2, X } from 'lucide-react';
import { getAgentStatus, createOrGetAgent, createConversationSession } from '@/api/voiceAI-agent-api';

function VoiceAssistantPanel() {
  const { startSession, endSession } = useConversationControls();
  const { status } = useConversationStatus();
  const [isOpen, setIsOpen] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState('');

  const statusCopy = useMemo(() => {
    switch (status) {
      case 'connecting':
        return 'Connecting…';
      case 'connected':
        return 'Live now';
      case 'disconnecting':
        return 'Ending…';
      case 'error':
        return 'Connection error';
      default:
        return 'Ready';
    }
  }, [status]);

  const handleStart = async () => {
    setError('');
    setIsStarting(true);

    try {
      const agentSetup = await createOrGetAgent();
      const agentIdToUse = agentSetup?.agentId;

      if (!agentIdToUse) {
        throw new Error(agentSetup?.error || 'The voice agent is not ready yet.');
      }

      const payload = await createConversationSession({
        participantName: 'Website Visitor',
        agentId: agentIdToUse,
      });

      if (!payload?.success || !payload?.token) {
        throw new Error(payload?.error || 'The backend did not return a valid conversation token.');
      }

      startSession({
        token: payload.token,
        onConnect: () => {
          setIsOpen(true);
        },
        onError: (message) => {
          setError(typeof message === 'string' ? message : 'The voice agent could not connect.');
        },
      });
    } catch (err) {
      setError(err.message || 'Unable to open the voice assistant.');
    } finally {
      setIsStarting(false);
    }
  };

  const handleStop = () => {
    setError('');
    endSession();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="flex flex-col items-end gap-3">
        {isOpen && (
          <div className="w-[min(92vw,360px)] glass-card neon-border overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1E1E3A] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Blitz AI</p>
                  <p className="text-[11px] text-gray-400">{statusCopy}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                aria-label="Close voice assistant"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4 p-4">
              <div className="rounded-2xl border border-[#1E1E3A] bg-[#0F1020] p-3 text-sm text-gray-300">
                Ask about pricing, project scope, timelines, or the best digital solution for your business.
              </div>

              {error ? (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleStart}
                  disabled={isStarting || status === 'connecting' || status === 'connected'}
                  className="btn-primary flex-1 justify-center disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isStarting ? <Loader2 size={16} className="animate-spin" /> : <Mic size={16} />}
                  {isStarting ? 'Connecting…' : status === 'connected' ? 'Live' : 'Start Call'}
                </button>

                <button
                  type="button"
                  onClick={handleStop}
                  disabled={status !== 'connected' && status !== 'connecting'}
                  className="btn-outline justify-center disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <MicOff size={16} />
                  End
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-[0_0_35px_rgba(108,99,255,0.8)] transition hover:scale-105"
          aria-label="Toggle AI assistant"
        >
          <MessageSquareText size={28} />
        </button>
      </div>
    </div>
  );
}

const normalizeClientAgentId = (value) => {
  const trimmed = typeof value === 'string' ? value.trim() : '';
  return /^agent_[A-Za-z0-9]+$/.test(trimmed) ? trimmed : null;
};

export default function AIVoiceAssistant() {
  const configuredAgentId = normalizeClientAgentId(process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID);
  const [agentId, setAgentId] = useState(configuredAgentId);
  const [isPreparing, setIsPreparing] = useState(!configuredAgentId);
  const [prepareProgress, setPrepareProgress] = useState(0);

  useEffect(() => {
    if (configuredAgentId) {
      setAgentId(configuredAgentId);
      setIsPreparing(false);
      setPrepareProgress(100);
      return undefined;
    }

    let isMounted = true;
    const timeoutMs = 15000;
    const startedAt = Date.now();
    let progressTimer = null;

    const updateProgress = () => {
      if (!isMounted) return;
      const elapsed = Date.now() - startedAt;
      setPrepareProgress(Math.min(100, (elapsed / timeoutMs) * 100));
    };

    setIsPreparing(true);
    setPrepareProgress(0);
    progressTimer = setInterval(updateProgress, 120);

    const loadStatus = async () => {
      try {
        const payload = await Promise.race([
          getAgentStatus(),
          new Promise((_, reject) => {
            setTimeout(() => reject(new Error('AI agent status request timed out.')), timeoutMs);
          }),
        ]);

        if (!isMounted) return;

        if (payload?.agentId) {
          setAgentId(payload.agentId);
        }
      } catch (error) {
        console.warn('AI agent status unavailable:', error);
      } finally {
        if (isMounted) {
          setPrepareProgress(100);
          setIsPreparing(false);
        }
      }
    };

    loadStatus();

    return () => {
      isMounted = false;
      if (progressTimer) {
        clearInterval(progressTimer);
      }
    };
  }, [configuredAgentId]);

  if (isPreparing && !agentId) {
    return (
      <div className="fixed bottom-5 right-5 z-50">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#0B1020]/85 px-4 py-3 shadow-[0_0_30px_rgba(108,99,255,0.35)] backdrop-blur-xl">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-accent/30 text-primary">
            <Loader2 size={21} className="animate-spin" />
            <span className="absolute inset-0 rounded-full border border-primary/30" />
          </div>

          <div className="min-w-[170px]">
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary/80">Preparing</div>
            <div className="text-sm font-semibold text-white">Blitz AI</div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary via-purple-400 to-accent transition-all duration-200 ease-out"
                style={{ width: `${prepareProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!agentId) {
    return null;
  }

  return (
    <ConversationProvider agentId={agentId}>
      <VoiceAssistantPanel />
    </ConversationProvider>
  );
}
