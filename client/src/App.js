import React, { useState, useEffect } from 'react';
import ReactMustache from 'react-mustache';
import './App.css';

function App() {

  const [data, setData] = useState({ 
    messages: [], 
    companies: [], 
    guests: [],
    message: '',
    company: '',
    guest: '',
    showTemplate: false,
    showCustom: false
  });

  const [template, setTemplate] = useState({
    welcome: '', 
    template: "Select message template"
  });
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/get/messages');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      
      setData({...data, messages: body.messages, companies: body.companies, guests: body.guests});
    }

    function createWelcome() {
      var today = new Date()
      var curHr = today.getHours()
  
      if (curHr < 12) {
        setTemplate({...template, welcome: "Good morning"});
      } else if (curHr < 18) {
        setTemplate({...template, welcome: "Good afternoon"});
      } else {
        setTemplate({...template, welcome: "Good evening"});
      }
    }
    fetchData();
    createWelcome();
  }, []);

  function selectOption(id, option) {
    let selected = data[option].find(item => item.id == id);
    setTemplate({...template, ...selected});
  } 
  
  return (
    <div className="App">
      <header className="App-header">
        <h2>Message App</h2>
      </header>
      <div>
        <select onChange={e => selectOption(e.target.value, "messages")}>
          <option>Select a message</option>
          {data.messages.map(item => (
            <option value={item.id}>{item.description}</option>
          ))}
        </select>
        <select onChange={e => selectOption(e.target.value, "companies")}>
          <option>Select a company</option>
          {data.companies.map(item => (
            <option value={item.id}>{item.company}</option>
          ))}
        </select>
        <select onChange={e => selectOption(e.target.value, "guests")}>
          <option>Select a guest</option>
          {data.guests.map(item => (
            <option value={item.id}>{item.firstName} {item.lastName}</option>
          ))}
        </select>
        <button onClick={() => setData({...data, showCustom: true})}>
          Custom
        </button>
        <button onClick={() => setData({...data, showTemplate: true})}>
          Generate Message
        </button>
        {data.showCustom && 
          <div>
            <textarea onChange={e => setTemplate({...template, template: e.target.value})}/>
          </div>
        }
        {data.showTemplate &&
          <div>
            <ReactMustache template={template.template} data={template} />
          </div>
        }
      </div>
    </div>
  );
}

export default App;
