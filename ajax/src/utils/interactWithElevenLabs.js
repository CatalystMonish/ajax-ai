const ELEVENLABS_API_KEY = ""; // Your ElevenLabs API key

async function interactWithElevenLabs(
  text,
  voiceID = "2zRM7PkgwBPiau2jvVXc",
  onStart,
  onEnd,
) {
  const elevenLabsHeaders = {
    "Content-Type": "application/json",
    "xi-api-key": ELEVENLABS_API_KEY,
  };

  const elevenLabsData = {
    model_id: "eleven_turbo_v2",
    text: text,
    voice_settings: {
      similarity_boost: 0.5,
      stability: 0.71,
      style: 0.0,
      use_speaker_boost: true,
    },
  };

  try {
    const elevenLabsResponse = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}`,
      {
        method: "POST",
        headers: elevenLabsHeaders,
        body: JSON.stringify(elevenLabsData),
      },
    );

    if (!elevenLabsResponse.ok) {
      const errorResponse = await elevenLabsResponse.text();
      console.error("Error response from ElevenLabs:", errorResponse);
      return;
    }

    const audioResponse = await elevenLabsResponse.blob();
    const audioUrl = URL.createObjectURL(audioResponse);

    const audio = new Audio(audioUrl);
    audio.onplay = () => {
      if (onStart) onStart();
    };
    audio.onended = () => {
      if (onEnd) onEnd();
    };
    audio.play().catch((e) => console.error("Error playing audio:", e));

    return audio; // Return the audio object
  } catch (error) {
    console.error("Error with ElevenLabs API:", error);
  }
}

export default interactWithElevenLabs;
