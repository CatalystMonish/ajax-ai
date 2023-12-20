async function interactWithWhisper() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const processor = audioContext.createScriptProcessor(1024, 1, 1);
    const OPENAI_API_KEY =import.meta.env.VITE_OPENAI_API_KEY;

    let audioChunks = [];
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    let silenceStart = performance.now();
    let isRecording = true;

    processor.onaudioprocess = (event) => {
      const input = event.inputBuffer.getChannelData(0);
      let isSilent = true;
      // Check if the input buffer is silent
      for (let i = 0; i < input.length; i++) {
        if (Math.abs(input[i]) > 0.01) {
          isSilent = false;
          break;
        }
      }

      if (isSilent) {
        if (isRecording && performance.now() - silenceStart > 2000) {
          // Stop recording after 2 second of silence
          mediaRecorder.stop();
          audioContext.close(); // Close the audio context
          isRecording = false;
        }
      } else {
        silenceStart = performance.now();
      }
    };

    source.connect(processor);
    processor.connect(audioContext.destination);
    mediaRecorder.start();

    return new Promise((resolve, reject) => {
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("file", audioBlob);
        formData.append("model", "whisper-1");

        try {
          const response = await fetch(
            "https://api.openai.com/v1/audio/transcriptions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`, // Replace with your API key
              },
              body: formData,
            },
          );

          if (!response.ok) {
            throw new Error("Transcription request failed");
          }

          const result = await response.json();
          resolve(result.text);
        } catch (error) {
          reject(error);
        }
      };
    });
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(error);
  }
}

export default interactWithWhisper;
