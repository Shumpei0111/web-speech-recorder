import useRecorder from "./hooks/useRecorder";

function App() {
  const { audioURL, isRecording, startRecording, stopRecording } =
    useRecorder();

  return (
    <main>
      <div>
        <button onClick={startRecording} disabled={isRecording}>
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop Recording
        </button>
        {audioURL && <audio src={audioURL} controls />}
      </div>
    </main>
  );
}

export default App;
