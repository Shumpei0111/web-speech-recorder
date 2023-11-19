import { useState, useEffect } from "react";

const useRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  useEffect(() => {
    async function initMediaRecorder() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        if (!MediaRecorder.isTypeSupported("audio/webm")) {
          console.log("not supported");
        }

        const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
        setMediaRecorder(recorder);
      } catch (error) {
        alert(error);
      }
    }

    initMediaRecorder();
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setIsRecording(true);

      mediaRecorder.addEventListener("dataavailable", (event) => {
        setAudioURL(URL.createObjectURL(event.data));
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return {
    audioURL,
    isRecording,
    startRecording,
    stopRecording,
  };
};

export default useRecorder;
