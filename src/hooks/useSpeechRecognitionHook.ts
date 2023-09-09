import { useMemo, useState } from "react";

let recognition: SpeechRecognition | null = null;
if('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'pt-br';
}

const useSpeechRecognition = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const onResult = (event: SpeechRecognitionEvent) => {
    setText(event.results[event.resultIndex][0].transcript);
    
    if(event.resultIndex === 50) {
      recognition?.stop();
      setTimeout(() => recognition?.start(), 1000);
    }
  }
  
  useMemo(() => {
    if(!recognition) return;
    recognition.onresult = onResult;
  }, []);

  const startListening = () => {
    setText('');
    setIsListening(true);
    recognition?.start();
  }
  
  const stopListening = () => {
    setIsListening(false);
    recognition?.stop();
  }

  return { 
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition
  }
  
};

export default useSpeechRecognition;