import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [data, setData] = useState({ 
    messages: [], 
    companies: [], 
    guests: [],
    message: '',
    company: '',
    guest: ''
  });

  console.log('data', data);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/get/messages');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      console.log('body', body);
      // return body;
      
      setData({messages: body.messages, companies: body.companies, guests: body.guests});
    }
    fetchData();
  }, []);

  async function generateMessage() {
    const payload = {
      message: data.message,
      company: data.company,
      guest: data.guest
    }

    console.log('payload', payload);
    const response = await fetch('/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const body = await response.text();
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <select onChange={e => setData({...data, message: e.target.value})}>
          <option>Select a message</option>
          {data.messages.map(item => (
            <option value={item.id}>{item.description}</option>
          ))}
        </select>
        <select onChange={e => setData({...data, company: e.target.value})}>
          <option>Select a company</option>
          {data.companies.map(item => (
            <option value={item.id}>{item.company}</option>
          ))}
        </select>
        <select onChange={e => setData({...data, guest: e.target.value})}>
          <option>Select a guest</option>
          {data.guests.map(item => (
            <option value={item.id}>{item.firstName} {item.lastName}</option>
          ))}
        </select>
        <button onClick={generateMessage}>
          Generate Message
        </button>
      </div>
    </div>
  );
}

export default App;
