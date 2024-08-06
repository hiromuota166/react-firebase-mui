import axios from 'axios';
import React, { useEffect, useState } from "react";
import { GptText } from '../types/type'
import Title from './Title';

const GPTPage = () => {
  const [getText, setGetText] = useState<GptText>('');
  const [userText, setUserText] = useState<string>('');
  const apiKey = process.env.REACT_APP_OPEN_AI_API_KEY;
  const url = 'https://api.openai.com/v1/chat/completions';
  const getData = async () => {
    const config = {
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      data: {
        model: 'gpt-3.5-turbo-1106',
        messages: [{ role: 'user', content: userText }],
        temperature: 0.7
      },
    }
    try {
      const response = await axios(config);
      setGetText(response.data.choices[0].message.content);
      console.log('成功？');
    } catch(error) {
      console.error('Error getData :', error);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getData();
  }

  return (
    <div className='flex'>
      <Title>GPTPage</Title>
      <div>{getText}</div>
      <form action="a" onSubmit={handleSubmit}>
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