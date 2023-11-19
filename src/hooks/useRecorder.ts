import { useState, useEffect } from "react";
import { getUserAgent } from "../helper/getUa";

const useRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const userAgent = getUserAgent();
  const supportedMimeType =
    userAgent === "safari" ? "audio/mp4" : "audio/webm;codecs=opus";

  useEffect(() => {
    async function initMediaRecorder() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        });

        if (!MediaRecorder.isTypeSupported(supportedMimeType)) {
          console.log("not supported");
        }

        const recorder = new MediaRecorder(stream, {
          mimeType: supportedMimeType,
        });
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
