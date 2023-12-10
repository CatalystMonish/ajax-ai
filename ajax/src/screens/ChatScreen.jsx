import React, { useState } from "react";
import ChatCard from "../components/ChatCard.jsx";
import axios from 'axios';
import axiosRetry from 'axios-retry';
import sendbutton from '../images/send.png';
import {
  Bubbles,
  prepHTML
} from "../components/Bubbles.jsx";
prepHTML({ relative_path: "node_modules/chat-bubble/" });


const chatWindow = new Bubbles(
  document.getElementById("chat"), // ...passing HTML container element...
  "chatWindow" // ...and name of the function as a parameter
);

function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  
  const API_KEY = "*";

  axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  // chatWindow.talk({ role: "system", content: "You: " + query });

  const waitForCompletion = async (threadId, runId) => {
    while (true) {
      try {
        const response = await axios.get(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "OpenAI-Beta": "assistants=v1",
          },
        });

        const run = response.data;
        if (run.completed_at) {
          console.log("Run completed");
          break;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Error checking run status:", error);
        break;
      }
    }
  };

  const handleQuerySubmit = async (event) => {
    event.preventDefault();
    const newMessage = { role: "user", content: query };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setQuery("");
    const API_Body = {
      "assistant_id": "asst_Po9xlahc0bNt7EojFwqSPCSo",
      "thread": {
        "messages": [
          { "role": "user", "content": query }
        ]
      }
    };

    try {
      const response = await axios.post("https://api.openai.com/v1/threads/runs", API_Body, {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v1",
        },
      });

      const data = response.data;
      await waitForCompletion(data.thread_id, data.id);

      const messagesResponse = await axios.get(`https://api.openai.com/v1/threads/${data.thread_id}/messages`, {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "OpenAI-Beta": "assistants=v1",
        },
      });

      const messagesData = messagesResponse.data.data || [];
      const assistantResponse = messagesData.map(message => message.content[0].text.value).join(' ');

      setResponse(assistantResponse);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="bg-background">
      <div className="flex flex-row">
        <div className=" bg-[#3E3E72] flex-shrink-0 w-[26.125rem] h-screen pt-[5rem]">
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
        </div>
        
        <div className="flex flex-col">
        
<div className="chat chat-end absolute top-20 right-10 flex flex-col">
{messages.map((message, index) => (
              <div key={index} className={`chat chat-${message.role}`}>
                <div className="chat-bubble bg-white text-black">{message.content}</div>
              </div>
            ))}
</div>
{/* <div className="chat chat-start">
  <div className="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
</div> */}
          {/* Input Area */}
          <div className=" items-center p-4 bg-[#2C2C54] w-full " id="chat">
           <div className="absolute bottom-5"> 
           <div className="relative">
      <div className="flex items-center space-x-2 p-4">
        <input
        
          type="text"
          value={query} 
          onChange={handleQueryChange}
          className="flex-grow p-2 mr-2 border border-[#6948C9] ml-2 border-solid rounded-lg border-2 bg-[#3E3E72] text-white focus:outline-none w-[75rem]"
        />
       <img
       onClick={handleQuerySubmit}
       src={sendbutton}/>
      </div>
    </div>
            
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
