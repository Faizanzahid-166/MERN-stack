import { useEffect, useMemo, useState } from 'react';
import { ConversationProvider, useConversationControls, useConversationStatus } from '@elevenlabs/react';
import { Mic, MicOff, MessageSquareText, Sparkles, Loader2, X } from 'lucide-react';
import { getAgentStatus, createConversationSession } from '@/api/voiceAI-agent-api';

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
      const payload = await createConversationSession({ participantName: 'Website Visitor' });

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

export default function AIVoiceAssistant() {
  const [agentId, setAgentId] = useState(process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || null);

  useEffect(() => {
    let isMounted = true;

    const loadStatus = async () => {
      try {
        const payload = await getAgentStatus();

        if (!isMounted) return;

        if (payload?.agentId) {
          setAgentId(payload.agentId);
        }
      } catch (error) {
        console.warn('AI agent status unavailable:', error);
      }
    };

    loadStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!agentId) {
    return null;
  }

  return (
    <ConversationProvider agentId={agentId}>
      <VoiceAssistantPanel />
    </ConversationProvider>
  );
}
