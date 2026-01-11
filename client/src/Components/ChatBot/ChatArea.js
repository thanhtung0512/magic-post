import React, { useState } from 'react';
import { Box, Button, Input, VStack, Spinner } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown

const ChatArea = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSend = () => {
    if (userInput.trim() !== '') {
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { sender: 'user', message: userInput },
      ]);

      setUserInput('');
      setLoading(true);

      sendUserInput(userInput);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const sendUserInput = (input) => {
    fetch('http://127.0.0.1:5000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: input,
        top_k: 10,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const gptResponse = data.gpt_response;
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { sender: 'bot', message: gptResponse },
        ]);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box width="1000px">
        <VStack spacing={2} align="stretch">
          {chatHistory.map((chat, index) => (
            <Box
              key={index}
              bg={chat.sender === 'user' ? 'teal.200' : 'white'}
              color={chat.sender === 'user' ? 'black' : 'teal.800'}
              p={2}
              borderRadius="md"
              textAlign={chat.sender === 'user' ? 'right' : 'left'}
            >
              <span>{chat.sender === 'user' ? 'User:' : 'Bot:'}</span>{' '}
              <ReactMarkdown>{chat.message}</ReactMarkdown>
            </Box>
          ))}
        </VStack>

        <Box mt={4} display="flex">
          <Input
            flex="1"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            bg="teal.50"
            color="teal.800"
            disabled={loading}
          />

          <Button ml={2} onClick={handleSend} bg="teal.300" color="white" disabled={loading}>
            {loading ? <Spinner size="sm" color="white" /> : 'Send'}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default ChatArea;
