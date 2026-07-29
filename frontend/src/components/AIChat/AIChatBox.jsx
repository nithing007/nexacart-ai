import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestedPrompts from './SuggestedPrompts';
import { processUserMessage } from '../../ai/conversationEngine';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import { Sparkles, Trash2, Mic } from 'lucide-react';
import toast from 'react-hot-toast';

const AIChatBox = ({ onClose, containerHeight = "h-[500px]" }) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const orders = useSelector((state) => state.orders);

  const user = auth?.user;
  const firstName = user?.name ? user.name.trim().split(' ')[0] : (user?.firstName || null);

  // Custom Web Speech API Voice Assistant Hook
  const {
    isSupported,
    isListening,
    isSpeaking,
    isMuted,
    voiceStatus,
    setVoiceStatus,
    transcript,
    error: voiceError,
    startListening,
    stopListening,
    cancelListening,
    resetVoiceState,
    speak,
    pauseSpeaking,
    resumeSpeaking,
    replaySpeaking,
    stopSpeaking,
    toggleMute,
    setTranscript
  } = useVoiceAssistant();

  // Welcome message generator
  const buildWelcomeMessage = (name) => {
    if (name) {
      return {
        id: 'welcome',
        sender: 'assistant',
        text: `Hello ${name} 👋\n\nWelcome back to NexaCart AI.\nHow can I help you shop today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        followUps: ["Mobile phones under ₹20,000", "Compare gaming laptops", "Plan monthly budget", "Open Cart"]
      };
    }
    return {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello 👋\n\nI'm NexaCart AI, your personal AI shopping copilot.\nHow can I help you shop today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      followUps: ["Shopping advice", "Recommend smartphones", "Price comparisons", "Open Cart"]
    };
  };

  const [messages, setMessages] = useState([buildWelcomeMessage(firstName)]);
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('');

  // Multi-turn context memory across turns
  const [contextMemory, setContextMemory] = useState({
    subject: '',
    budget: null,
    category: '',
    brand: '',
    usage: '',
    ram: '',
    storage: '',
    processor: '',
    purpose: '',
    lastQuery: '',
    history: [],
    lastProducts: []
  });

  const chatContainerRef = useRef(null);

  // Synchronize welcome message name
  const displayMessages = messages.map(msg => {
    if (msg.id === 'welcome') {
      return buildWelcomeMessage(firstName);
    }
    return msg;
  });

  // REQUIREMENT 6: Auto-scroll ONLY inner chat container without scrolling parent webpage
  const scrollToBottomInternal = useCallback(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottomInternal();
  }, [messages, isLoading, thinkingStep, scrollToBottomInternal]);

  // Main Handler for sending user messages & progressive response streaming
  const handleSendMessage = useCallback(async (text) => {
    if (!text || !text.trim() || isLoading) return;

    // Interrupt TTS if user sends new message
    stopSpeaking();

    const userMsgId = Date.now().toString();
    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMessage = {
      id: userMsgId,
      sender: 'user',
      text: text.trim(),
      timestamp: userTimestamp
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    // REQUIREMENT 5: Voice / Text Loading States Progressive Pipeline
    // 🧠 Understanding your request... -> 🔍 Searching products... -> 🤖 Generating recommendations... -> ✅ Finished
    setThinkingStep('🧠 Understanding your request...');
    setVoiceStatus('processing');
    const stepTimer1 = setTimeout(() => {
      setThinkingStep('🔍 Searching products...');
      setVoiceStatus('searching');
    }, 350);
    const stepTimer2 = setTimeout(() => {
      setThinkingStep('🤖 Generating recommendations...');
      setVoiceStatus('generating');
    }, 700);

    try {
      // Handle Smart Fallback Action Button Clicks
      let actualQueryToProcess = text;
      if (text === 'Show Alternatives' && contextMemory.lastQuery) {
        actualQueryToProcess = `Show alternative ${contextMemory.category || 'products'} for ${contextMemory.lastQuery}`;
      } else if (text === 'Change Budget') {
        actualQueryToProcess = `What budget range would you recommend?`;
      } else if (text === 'Modify Specs') {
        actualQueryToProcess = `Which specifications should I adjust?`;
      }

      // Process User Message through Intent Classifier & Conversation Engine
      const response = await processUserMessage(
        actualQueryToProcess,
        contextMemory,
        { user, cart, wishlist, orders }
      );

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setThinkingStep('✅ Finished');
      setVoiceStatus('finished');

      // Reset thinking step to empty after brief display
      setTimeout(() => setThinkingStep(''), 500);

      // Voice / Text Navigation Dispatch
      if (response.action === 'NAVIGATE' && response.targetPath) {
        toast.success(`Navigating to ${response.targetPath}...`, { icon: '🚀' });
        navigate(response.targetPath);
      }

      // Update multi-turn cumulative context memory
      if (response.memory) {
        setContextMemory(response.memory);
      }

      // Streamed / Progressive Character Response Rendering
      const assistantMsgId = (Date.now() + 1).toString();
      const fullText = response.text || '';
      
      const assistantPlaceholder = {
        id: assistantMsgId,
        sender: 'assistant',
        text: '',
        reasoning: response.reasoning,
        recommendations: response.recommendations,
        isSmartFallback: response.isSmartFallback,
        products: response.isSmartFallback ? (response.fallbackOptions || []) : (response.products || []),
        followUps: response.followUps || [],
        intent: response.intent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantPlaceholder]);
      setIsLoading(false);

      // Progressive character streaming loop
      let charIdx = 0;
      const chunkSize = Math.max(2, Math.floor(fullText.length / 25));
      
      const streamInterval = setInterval(() => {
        charIdx += chunkSize;
        const currentChunk = fullText.slice(0, charIdx);

        setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, text: currentChunk } : m));

        if (charIdx >= fullText.length) {
          clearInterval(streamInterval);
          setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, text: fullText } : m));
          setVoiceStatus('idle');
          
          // Read Response Aloud via Speech Synthesis if unmuted
          if (!isMuted) {
            speak(fullText);
          }
        }
      }, 20);

    } catch (err) {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setThinkingStep('');
      setVoiceStatus('idle');
      console.error('Unhandled AI chat error:', err);
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: "Sorry, I couldn't understand that. Please try again.",
        products: [],
        followUps: ["Try again", "Browse shop"],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }
  }, [isLoading, stopSpeaking, setVoiceStatus, contextMemory, user, cart, wishlist, orders, navigate, isMuted, speak]);

  // Handle Voice Input Transcript Submission automatically when voice recognition stops
  useEffect(() => {
    if (!isListening && transcript && transcript.trim().length > 1 && !isLoading) {
      const voiceText = transcript.trim();
      setTranscript('');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleSendMessage(voiceText);
    }
  }, [isListening, transcript, isLoading, setTranscript, handleSendMessage]);

  const clearChat = () => {
    stopSpeaking();
    resetVoiceState();
    setMessages([buildWelcomeMessage(firstName)]);
    setContextMemory({
      subject: '',
      budget: null,
      category: '',
      brand: '',
      usage: '',
      ram: '',
      storage: '',
      processor: '',
      purpose: '',
      lastQuery: '',
      history: [],
      lastProducts: []
    });
    toast.success('Conversation history cleared!');
  };

  return (
    <div className={`flex flex-col bg-neutral-950/95 backdrop-blur-2xl border border-emerald-900/40 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(16,185,129,0.12)] w-full ${containerHeight} overflow-hidden transition-all duration-500 relative`}>
      {/* Chat Header */}
      <ChatHeader
        onClose={onClose}
        onClearChat={clearChat}
        hasMessages={messages.length > 1}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        isSpeaking={isSpeaking}
        isListening={isListening}
        thinkingStep={thinkingStep}
        voiceStatus={voiceStatus}
      />

      {/* Internal Scrollable Message Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 bg-gradient-to-b from-gray-900/40 to-black/60 scrollbar-thin scrollbar-thumb-emerald-900/50 scrollbar-track-transparent"
      >
        {displayMessages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onFollowUpClick={handleSendMessage}
            onSpeakMessage={speak}
            onPauseSpeak={pauseSpeaking}
            onResumeSpeak={resumeSpeaking}
            onReplaySpeak={replaySpeaking}
          />
        ))}

        {/* Suggested Starter Chips */}
        {messages.length === 1 && (
          <div className="pl-9 pr-2 py-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <SuggestedPrompts onPromptClick={handleSendMessage} />
          </div>
        )}

        {/* Animated AI Thinking State & Steps */}
        {isLoading && (
          <div className="flex gap-2.5 items-start w-full animate-in fade-in duration-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-700 to-green-600 text-white flex items-center justify-center text-xs shrink-0 select-none shadow-md border border-emerald-400/20 mt-0.5">
              🤖
            </div>
            <div className="bg-white/95 border border-emerald-900/10 rounded-2xl rounded-tl-none px-4 py-3 shadow-md text-xs text-gray-700 max-w-[80%] flex items-center gap-2">
              <span className="font-semibold text-emerald-800 text-[11px]">
                {thinkingStep || '🧠 Understanding your request...'}
              </span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}

        {/* Voice Listening Active Indicator */}
        {isListening && (
          <div className="flex justify-center my-2">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-black px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
              <Mic className="w-4 h-4 animate-pulse" />
              <span>🎤 Listening to voice... Speak now!</span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input Footer */}
      <div className="p-3 border-t border-white/10 bg-neutral-950/90 backdrop-blur-md rounded-b-[2rem] space-y-2 shrink-0">
        <div className="flex items-center justify-between text-[9px] text-gray-400 font-extrabold px-2">
          <span className="flex items-center gap-1 text-emerald-400">
            <Sparkles className="w-3 h-3 text-emerald-400" /> Conversational AI Voice Copilot
          </span>
          {messages.length > 1 && (
            <button 
              onClick={clearChat} 
              className="text-gray-400 hover:text-rose-400 flex items-center gap-1 transition-colors font-bold uppercase tracking-wider text-[8px]"
              title="Reset conversation"
            >
              <Trash2 className="w-3 h-3" /> Clear History
            </button>
          )}
        </div>
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          isListening={isListening}
          startListening={startListening}
          stopListening={stopListening}
          cancelListening={cancelListening}
          transcript={transcript}
          voiceError={voiceError}
          isSupported={isSupported}
        />
      </div>
    </div>
  );
};

export default AIChatBox;

