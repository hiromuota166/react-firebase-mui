import axios from 'axios';
import React, { useEffect, useState } from "react";
import { GptText, Message } from '../types/type'
import Title from './Title';

const GPTPage = () => {
  const [messages, setMessages] = useState<Message[]> ([]);
  const [userText, setUserText] = useState<string>('');
  const apiKey = process.env.REACT_APP_OPEN_AI_API_KEY;
  const url = 'https://api.openai.com/v1/chat/completions';
  const getData = async (newMessages: Message[]) => {
    const config = {
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      data: {
        model: 'gpt-3.5-turbo-1106',
        messages: newMessages,
        temperature: 0.7
      },
    }
    try {
      const response = await axios(config);
      const gptMessage: Message = {
        role: 'assistant',
        content: response.data.choices[0].message.content
      };
      setMessages([...newMessages, gptMessage]);
    } catch(error) {
      console.error('Error getData :', error);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage: Message = { role: 'user', content: userText };
    const newMessages = [...messages, userMessage];
    setUserText('');
    setMessages(newMessages);
    getData(newMessages);
  };

  return (
    <div className='flex flex-col items-center'>
      <Title>GPTPage</Title>
      <div className="conversation">
        {messages.map((message, index) => (
          <div key={index} className={message.role === 'user' ? 'user-message' : 'gpt-message'}>
            <strong>{message.role}:</strong> {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
        />
        <button type='submit'>
          送信
        </button>
      </form>
    </div>
  )
}

export default GPTPage;