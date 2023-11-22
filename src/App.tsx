import { useCallback, useEffect, useState } from "react";
import { RecorderService } from "./vendor/recoding-service/recording-service";

type Recording = {
  ts: number;
  blobUrl: string;
  mimeType: string;
  size: number;
};

const BASE_URL = "./vendor/recoding-service/";

function App() {
  const [recorderService, setRecorderService] = useState(
    new RecorderService(BASE_URL)
  );
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [recordingInProgress, setRecordingInProgress] = useState<boolean>();

  const onNewRecording = (evt: any) => {
    console.log("evt: ", evt);
    setRecordings([...recordings, evt.detail.recording]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRecording = (evt: any) => onNewRecording(evt);

  const startRecording = async () => {
    if (!recorderService) {
      console.error("Recorder service is not initialized");
      return;
    }

    recorderService.config.stopTracksAndCloseCtxWhenFinished = true;
    recorderService.config.createDynamicsCompressorNode = false;
    recorderService.config.enableEchoCancellation = true;

    try {
      await recorderService.startRecording(0);
      setRecordingInProgress(true);
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = () => {
    recorderService?.stopRecording();
    setRecordingInProgress(false);
  };

  const handleClickRecording = () => {
    if (recordingInProgress) {
      stopRecording();
      recorderService?.em.removeEventListener("recording", handleRecording);
    } else {
      recorderService?.em.addEventListener("recording", handleRecording);
      startRecording();
    }
  };

  const handleKeyPress = () => {
    window.removeEventListener("keypress", handleKeyPress);
    handleClickRecording();
  };

  useEffect(() => {
    if (recorderService) {
      window.addEventListener("keypress", handleKeyPress);
      return () => {
        window.removeEventListener("keypress", handleKeyPress);
      };
    }
    setRecorderService(new RecorderService(BASE_URL));
  }, [recorderService, handleKeyPress]);

  useEffect(() => {
    if (recordingInProgress) {
      window.addEventListener("keypress", handleKeyPress);
    }
  }, [recordingInProgress, handleKeyPress]);

  useEffect(() => {
    if (!recordings.length) {
      return;
    }
    window.addEventListener("keypress", handleKeyPress);
  }, [recordings, handleKeyPress]);

  return (
    <main>
      {recordingInProgress && <p>recordingInProgress</p>}
      {recordings.length === 0 && <p>no recordings</p>}
      {recordings.length > 0 && <p>{recordings.length} recordings</p>}
      <ol>
        {recordings.map((recording) => (
          <li key={recording.ts}>
            <audio controls src={recording.blobUrl} />
          </li>
        ))}
      </ol>
      <button onClick={handleClickRecording}>録音する</button>
    </main>
  );
}

export default App;
