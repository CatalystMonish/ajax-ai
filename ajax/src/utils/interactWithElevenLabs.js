const ELEVENLABS_API_KEY = "f1910d6a647c9c622cf903290dc185b8"; // Your ElevenLabs API key

async function interactWithElevenLabs(text) {
  const elevenLabsHeaders = {
    "Content-Type": "application/json",
    "xi-api-key": ELEVENLABS_API_KEY,
  };

  const elevenLabsData = {
    model_id: "eleven_monolingual_v1", // Replace with your actual model_id
    text: text,
    voice_settings: {
      similarity_boost: 0.5,
      stability: 0.71,
      style: 0.0,
      use_speaker_boost: true,
    },
  };

  const voiceId = "2zRM7PkgwBPiau2jvVXc"; // Replace with your actual voice ID
  try {
    const elevenLabsResponse = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: elevenLabsHeaders,
        body: JSON.stringify(elevenLabsData),
      },
    );

    if (!elevenLabsResponse.ok) {
      const errorResponse = await elevenLabsResponse.text(); // or .json() if the API returns JSON
      console.error("Error response from ElevenLabs:", errorResponse);
      return;
    }

    const audioResponse = await elevenLabsResponse.blob();
    const audioUrl = URL.createObjectURL(audioResponse);

    const audio = new Audio(audioUrl);
    audio.play().catch((e) => console.error("Error playing audio:", e));
  } catch (error) {
    console.error("Error with ElevenLabs API:", error);
  }
}

export default interactWithElevenLabs;
