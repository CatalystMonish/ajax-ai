import { marked } from "marked";
import { UserAuth } from "../context/AuthContext"
import { doc, collection, serverTimestamp, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase.js";
import promtLayer from "./promptLayer.js";
// let threadId = null;
async function interactWithOpenAI(
  message,
  selectedOption,
  userId,
  threadId,
  setThreadId,
  assistantId = "asst_Po9xlahc0bNt7EojFwqSPCSo",
) {
  let currentThreadId = threadId;
  // console.log(threadId);

  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // Replace with your actual API key
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    "OpenAI-Beta": "assistants=v1",
  };

  // Create a new thread only if threadId is not set
  if (!currentThreadId) {
    console.log("Creating new thread: https://api.openai.com/v1/threads");
    const threadResponse = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers: headers,
    });
    const threadData = await threadResponse.json();
    setThreadId(threadData.id);
    currentThreadId = threadData.id;
  }
  // console.log(currentThreadId);
  // Create a message in the existing or new thread
  // const optimizedPrompt = await promtLayer(message);
  console.log("after optimization");
  const combinedMessage = message;

  const messageUrl = `https://api.openai.com/v1/threads/${currentThreadId}/messages`;
  console.log("Creating message:", messageUrl);
  await fetch(messageUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ role: "user", content: combinedMessage }),
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

  // Function to save thread and messages to Firestore with user ID, thread ID, and messages
  const saveThreads = async (userId, threadId) => {
    try {
      const userThreadsCollection = collection(db, 'userThreads');
      const userDocRef = doc(userThreadsCollection, userId);

      // Check if the user document exists
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        // If user document doesn't exist, create a new one with the new threadId
        await setDoc(userDocRef, {
          [threadId]: {
            timestamp: serverTimestamp(),
          },
        });

        console.log('Thread saved to Firestore.');
      } else {
        // Update the existing user document with the new threadId
        const userData = userDocSnapshot.data();

        if (!userData || !userData[threadId]) {
          // If threadId doesn't exist, add it to the existing document
          await updateDoc(userDocRef, {
            [threadId]: {
              timestamp: serverTimestamp(),
            },
          });

          console.log('Thread saved to Firestore.');
        } else {
          console.log('Thread already exists in Firestore.');
        }
      }
    } catch (error) {
      console.error('Error saving thread to Firestore:', error);
    }
  };



  // Retrieve all messages in the thread
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
  saveThreads(userId, currentThreadId);

  return plainText; // Return plain text instead of HTML or Markdown
}

export default interactWithOpenAI;
