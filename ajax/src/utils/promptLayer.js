import { marked } from "marked";
import { UserAuth } from "../context/AuthContext"
import { doc, collection, serverTimestamp, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase.js";

async function promtLayer(message, threadId){

  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // Replace with your actual API key
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    "OpenAI-Beta": "assistants=v1",
  };
  let assistantId = "asst_DLRFgWMrlc2jWzk5Fi1TO8xx";
  let currentThreadId = threadId;
  if (!currentThreadId) {
    console.log("Creating new thread: https://api.openai.com/v1/threads");
    const threadResponse = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers: headers,
    });
    const threadData = await threadResponse.json();
    // setThreadId(threadData.id);
    currentThreadId = threadData.id;
  }
  // console.log(currentThreadId);
  // Create a message in the existing or new thread
  

  const messageUrl = `https://api.openai.com/v1/threads/${currentThreadId}/messages`;
  console.log("PROMPT LAYER");
  console.log("Creating message:", messageUrl);
  await fetch(messageUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ role: "user", content: message }),
  });

  // Create a run
  const runUrl = `https://api.openai.com/v1/threads/${currentThreadId}/runs`;
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
    const statusUrl = `https://api.openai.com/v1/threads/${currentThreadId}/runs/${runId}`;
    console.log("Checking run status:", statusUrl);
    const statusResponse = await fetch(statusUrl, {
      headers: headers,
    });
    runStatus = await statusResponse.json();
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
  } while (!runStatus.completed_at);

  const messagesUrl = `https://api.openai.com/v1/threads/${currentThreadId}/messages`;
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
  console.log("Optimized prompt" + plainText);
  return plainText;
    };
   
    export default promtLayer;
