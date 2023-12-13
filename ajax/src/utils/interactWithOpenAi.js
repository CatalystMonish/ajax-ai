import interactWithElevenLabs from "./interactWithElevenLabs.js";
import { marked } from "marked";

let globalThreadId = null;
async function interactWithOpenAI(
  message,
  isAloud,
  selectedOption,
  assistantId = "asst_Po9xlahc0bNt7EojFwqSPCSo",
) {
  const OPENAI_API_KEY = ""; // Replace with your actual API key
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    "OpenAI-Beta": "assistants=v1",
  };

  // Create a new thread only if globalThreadId is not set
  if (!globalThreadId) {
    const threadResponse = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers: headers,
    });
    const threadData = await threadResponse.json();
    globalThreadId = threadData.id;
  }

  // Create a message in the existing or new thread
  await fetch(`https://api.openai.com/v1/threads/${globalThreadId}/messages`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ role: "user", content: message }),
  });

  // Create a run
  const runResponse = await fetch(
    `https://api.openai.com/v1/threads/${globalThreadId}/runs`,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ assistant_id: assistantId }), // Use the passed assistantId or the default
    },
  );
  const runData = await runResponse.json();
  const runId = runData.id;

  // Wait for the run to complete
  let runStatus;
  do {
    const statusResponse = await fetch(
      `https://api.openai.com/v1/threads/${globalThreadId}/runs/${runId}`,
      {
        headers: headers,
      },
    );
    runStatus = await statusResponse.json();
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
  } while (!runStatus.completed_at);

  // Retrieve all messages in the thread
  const messagesResponse = await fetch(
    `https://api.openai.com/v1/threads/${globalThreadId}/messages`,
    {
      headers: headers,
    },
  );
  const messagesData = await messagesResponse.json();

  if (messagesData.data.length === 0) {
    throw new Error("No messages returned from the thread.");
  }

  // Access the first message in the array, as the messages appear to be in reverse chronological order
  const lastMessage = messagesData.data[0];

  // Check if the content array exists and has at least one item
  if (!lastMessage.content || lastMessage.content.length === 0) {
    throw new Error("Last message has no content.");
  }

  // Extracting the text value from the first item of the content array
  const latestMessageText = lastMessage.content[0].text.value;

  const cleanText = (text) => {
    // Make sure your regex is correct to remove the desired patterns
    return text.replace(
      /&#8203;``&#8203;``【oaicite:0】``&#8203;``&#8203;]*】/g,
      "",
    );
  };

  const stripHtml = (html) => {
    // Regular expression to remove HTML tags
    return html.replace(/<[^>]*>/g, "");
  };

  const createPlainTextFromMarkdown = () => {
    const cleanedMessage = cleanText(latestMessageText);
    const html = marked(cleanedMessage);
    return stripHtml(html); // Convert HTML to plain text
  };

  if (isAloud) {
    const plainText = createPlainTextFromMarkdown();
    const voiceId =
      selectedOption === 2 ? "LrYtPz3RwneBN65UhzNl" : "2zRM7PkgwBPiau2jvVXc"; // Default voice ID
    await interactWithElevenLabs(plainText, voiceId);
  }
  return latestMessageText;
}

export default interactWithOpenAI;
