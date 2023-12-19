const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY; // Your ElevenLabs API key

async function interactWithElevenLabs(
  text,
  voiceID = "YtvAvGwjGulirnsSTIgn",
  onStart,
  onEnd,
  selectedOptionLang = 1,
) {
  const elevenLabsHeaders = {
    "Content-Type": "application/json",
    "xi-api-key": ELEVENLABS_API_KEY,
  };

  const modelId =
    selectedOptionLang === 1 ? "eleven_turbo_v2" : "eleven_multilingual_v2";
  console.log("Using model:", modelId); // Log the model used
  console.log("Text to be converted:", text); // Log the text

  const elevenLabsData = {
    model_id: modelId,
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
