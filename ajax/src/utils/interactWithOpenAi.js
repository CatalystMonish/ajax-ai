import { marked } from "marked";

let globalThreadId = null;
async function interactWithOpenAI(
  message,
  selectedOption,
  assistantId = "asst_Po9xlahc0bNt7EojFwqSPCSo",
) {
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY; // Replace with your actual API key
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    "OpenAI-Beta": "assistants=v1",
  };

  // Create a new thread only if globalThreadId is not set
  if (!globalThreadId) {
    console.log("Creating new thread: https://api.openai.com/v1/threads");
    const threadResponse = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers: headers,
    });
    const threadData = await threadResponse.json();
    globalThreadId = threadData.id;
  }

  // Create a message in the existing or new thread
  const messageUrl = `https://api.openai.com/v1/threads/${globalThreadId}/messages`;
  console.log("Creating message:", messageUrl);
  await fetch(messageUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ role: "user", content: message }),
  });

  // Create a run
  const runUrl = `https://api.openai.com/v1/threads/${globalThreadId}/runs`;
  console.log("Creating run:", runUrl);
  const runResponse = await fetch(runUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ assistant_id: assistantId }), // Use the passed assistantId or the default
  });
  const runData = await runResponse.json();
  const runId = runData.id;

  // Wait for the run to complete
  let runStatus;
  do {
    const statusUrl = `https://api.openai.com/v1/threads/${globalThreadId}/runs/${runId}`;
    console.log("Checking run status:", statusUrl);
    const statusResponse = await fetch(statusUrl, {
      headers: headers,
    });
    runStatus = await statusResponse.json();
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
  } while (!runStatus.completed_at);

  // Retrieve all messages in the thread
  const messagesUrl = `https://api.openai.com/v1/threads/${globalThreadId}/messages`;
  console.log("Retrieving messages:", messagesUrl);
  const messagesResponse = await fetch(messagesUrl, {
    headers: headers,
  });
  const messagesData = await messagesResponse.json();

  if (messagesData.data.length === 0) {
    throw new Error("No messages returned from the thread.");
  }

  // Access the first message in the array, as the messages appear to be in reverse chronological order
  const lastMessage = messagesData.data[0];

  // Extracting the text value from the first item of the content array
  const latestMessageText = lastMessage.content[0].text.value;

  const cleanText = (text) => {
    const regex = /【\d+†source】/g;
    return text.replace(regex, "");
  };

  const stripHtml = (html) => {
    return html.replace(/<[^>]*>/g, "");
  };

  const createPlainTextFromMarkdown = () => {
    const cleanedMessage = cleanText(latestMessageText);
    const html = marked(cleanedMessage);
    return stripHtml(html);
  };

  // Convert Markdown to plain text (if needed)
  const plainText = createPlainTextFromMarkdown();

  return plainText; // Return plain text instead of HTML or Markdown
}

export default interactWithOpenAI;
