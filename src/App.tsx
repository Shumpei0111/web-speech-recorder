import useRecorder from "./hooks/useRecorder";

function App() {
  const { audioURL, startRecording, stopRecording, isRecording, errorText } =
    useRecorder();

  return (
    <main>
      1
      <div>
        <button onClick={startRecording} disabled={isRecording}>
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop Recording
        </button>
        {audioURL && <audio src={audioURL} controls />}
        {errorText && <p>{errorText}</p>}
      </div>
    </main>
  );
}

export default App;
