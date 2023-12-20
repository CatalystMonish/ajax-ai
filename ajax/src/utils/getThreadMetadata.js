const getThreadMetadata = async (threadId) => {
    const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
    try {
      const url = `https://api.openai.com/v1/threads/${threadId}/messages`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v1'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch thread metadata. Status: ${response.status}`);
      }
  
      const data = await response.json();

      // Form a dictionary to store messages and responses in reverse order
      const messageDictionary = {};
  
      data.data.reverse().forEach((message) => {
        const contentText = message.content[0]?.text?.value || '';
  
        // Determine the role
        const role = message.role === 'assistant' ? 'response' : 'message';
  
        if (!messageDictionary[threadId]) {
          messageDictionary[threadId] = [];
        }
  
        messageDictionary[threadId].push({ [role]: contentText });
      });
  
      console.log('Message Dictionary:', messageDictionary);
  
      // Return the metadata from the OpenAI API response along with the formed dictionary
      return { messageDictionary };
    } catch (error) {
      console.error('Error fetching thread metadata from OpenAI:', error);
      throw error; // You might want to handle the error in a meaningful way in your application
    }
  };
  
  export { getThreadMetadata };
  