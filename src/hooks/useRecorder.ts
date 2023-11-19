import { useState, useEffect } from "react";

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    // マイクへのアクセスを取得する
    if (isRecording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);

          const audioChunks: BlobPart[] = [];
          recorder.ondataavailable = (event: BlobEvent) => {
            audioChunks.push(event.data);
          };

          recorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioURL(audioUrl);

            stream.getTracks().forEach((track) => track.stop());
          };

          recorder.start();
        })
        .catch((err) => {
          console.log("録音中にエラーが発生しました", err);
          setErrorText(JSON.stringify(err));
        });
    }

    // 録音を停止する
    return () => {
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }
    };
  }, [isRecording, mediaRecorder]);

  // 録音の開始
  const startRecording = () => {
    setIsRecording(true);
  };

  // 録音の停止
  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorder?.stop();
  };

  return { audioURL, isRecording, startRecording, stopRecording, errorText };
};

export default useRecorder;
