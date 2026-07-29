import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom Hook for Web Speech API Voice Assistant
 * Manages Speech-to-Text (STT) recording, live status phases, and Text-to-Speech (TTS) response synthesis.
 */
export const useVoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('idle'); // 'idle' | 'listening' | 'processing' | 'searching' | 'generating' | 'finished'
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  
  // Initialize isSupported lazily without triggering effect state updates
  const [isSupported] = useState(() => {
    return typeof window !== 'undefined' && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  });

  const recognitionRef = useRef(null);
  const lastSpokenTextRef = useRef('');

  // Initialize Speech Recognition on mount if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceStatus('listening');
        setError(null);
        // FEATURE 12: VOICE INTERRUPT - Stop any ongoing speech synthesis when user starts talking
        if (window.speechSynthesis && window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
          setIsPaused(false);
        }
      };

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        setVoiceStatus('idle');
        setTranscript('');
        if (event.error === 'not-allowed') {
          setError('Microphone permission denied. Please allow microphone access.');
        } else {
          setError("Sorry, I couldn't understand that.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('Failed to initialize Speech Recognition:', err);
    }
  }, []);

  /**
   * Complete reset of all voice input states
   */
  const resetVoiceState = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {
        console.warn('Recognition abort error:', e);
      }
    }
    setIsListening(false);
    setVoiceStatus('idle');
    setTranscript('');
    setError(null);
  }, []);

  /**
   * Cancel / Stop recording immediately without sending any query
   */
  const cancelListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {
        console.warn('Recognition cancel error:', e);
      }
    }
    setIsListening(false);
    setVoiceStatus('idle');
    setTranscript('');
    setError(null);
  }, []);

  /**
   * Start listening to voice input
   */
  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      setError('Voice recognition is not supported in this browser.');
      return;
    }

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }

    setTranscript('');
    setError(null);
    setVoiceStatus('listening');

    try {
      recognitionRef.current.start();
    } catch {
      try {
        recognitionRef.current.stop();
        setTimeout(() => recognitionRef.current?.start(), 150);
      } catch (e) {
        console.warn('Recognition start retry error:', e);
      }
    }
  }, []);

  /**
   * Stop listening to voice input
   */
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn('Recognition stop error:', e);
      }
    }
    setIsListening(false);
    setVoiceStatus('processing');
  }, []);

  /**
   * Speak response text using Web Speech Synthesis
   */
  const speak = useCallback((text, onEnd) => {
    if (isMuted || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    setIsPaused(false);
    lastSpokenTextRef.current = text;

    const cleanText = text
      .replace(/[*_#`~]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/•/g, '')
      .replace(/✓/g, '')
      .replace(/\n+/g, '. ')
      .trim();

    if (!cleanText) return;

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Zira')) && v.lang.startsWith('en'));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setVoiceStatus('finished');
        if (onEnd) onEnd();
      };
      utterance.onerror = (err) => {
        console.warn('Speech synthesis error:', err);
        setIsSpeaking(false);
        setIsPaused(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis failed:', e);
      setIsSpeaking(false);
    }
  }, [isMuted]);

  /**
   * Pause speech synthesis
   */
  const pauseSpeaking = useCallback(() => {
    if (window.speechSynthesis && isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSpeaking, isPaused]);

  /**
   * Resume speech synthesis
   */
  const resumeSpeaking = useCallback(() => {
    if (window.speechSynthesis && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  /**
   * Replay last spoken text
   */
  const replaySpeaking = useCallback(() => {
    if (lastSpokenTextRef.current) {
      speak(lastSpokenTextRef.current);
    }
  }, [speak]);

  /**
   * Stop speech synthesis immediately
   */
  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  /**
   * Toggle Mute state
   */
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (next && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
      }
      return next;
    });
  }, []);

  return {
    isSupported,
    isListening,
    isSpeaking,
    isPaused,
    isMuted,
    voiceStatus,
    setVoiceStatus,
    transcript,
    error,
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
  };
};


