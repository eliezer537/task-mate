import { useEffect, useMemo } from 'react';
import useSpeechRecognitionHook from '../../hooks/useSpeechRecognitionHook'
// const { ipcRenderer } = window.require('electron')

const Listener = () => {
  const { text, startListening, stopListening, isListening, hasRecognitionSupport } = useSpeechRecognitionHook()

  useEffect(() => {
    // Solicite permissão para acessar o microfone diretamente na página HTML
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (stream) {
        console.log(stream);
        
        // O usuário concedeu permissão para acessar o microfone
        // Agora você pode iniciar o reconhecimento de fala ou fazer qualquer outra coisa com o áudio.
      })
      .catch(function (error) {
        // O usuário negou a permissão ou ocorreu um erro
        console.error('Erro ao acessar o microfone:', error);
      });
  }, [])

  useMemo(() => {
    if (text.length === 0) return
    if (text.includes('copiloto')) console.log('copiloto em ação!')
  }, [text])

  if (!hasRecognitionSupport) return <p>Seu navegador não tem suporte à reconhecimento de fala</p>

  return (
    <div>
      <button onClick={startListening}>Iniciar</button>
      <button onClick={stopListening}>Parar</button>
      {
        isListening ? <p>Ouvindo...</p> : null
      }
      <p>{text}</p>
    </div>
  );
};

export default Listener;