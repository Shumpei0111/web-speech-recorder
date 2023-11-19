import { useState, useEffect } from "react";

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  useEffect(() => {
    // マイクへのアクセスを取得する
    if (isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        const audioChunks: BlobPart[] = [];
        recorder.ondataavailable = (event: BlobEvent) => {
          audioChunks.push(event.data);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl);
        };

        recorder.start();
      });
    }

    // 録音を停止する
    return () => {
      mediaRecorder?.stop();
    };
  }, [isRecording]);

  // 録音の開始
  const startRecording = () => {
    setIsRecording(true);
  };

  // 録音の停止
  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorder?.stop();
  };

  return { audioURL, isRecording, startRecording, stopRecording };
};

export default useRecorder;
