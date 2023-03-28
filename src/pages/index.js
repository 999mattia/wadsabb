import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState('')

  async function sendMessage() {
    const response = await fetch('https://wadsabb.glitch.me/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: message, user: user }),
    })
    const data = await response.json()
    setMessage('')
    fetchMessages()
  }

  async function fetchMessages() {
    const response = await fetch('https://wadsabb.glitch.me/messages')
    const data = await response.json()
    data.reverse()
    setMessages(data)
  }

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleMessageInputChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages()
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    user != '' ?
      <>
        <Head>
          <title>WadsApp</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.container}>
          <form onSubmit={(e) => { e.preventDefault(); sendMessage() }}>
            <input type="text" value={message} onChange={handleMessageInputChange}></input>
            <button type="submit">Send</button>
          </form>
          {messages.map((message) => {
            return (
              <p>{message.id} {message.user} {message.text}</p>
            )
          })}
        </div>
      </> : <form onSubmit={() => setUser(userInput)} >
        <div className={styles.usernameForm}>
          <div className={styles.usernameFormHeader}>Join WadsAbb</div>
          <div className={styles.usernameFormMiddle}>        
            <p>Username: </p>
            <input type="text" value={userInput} onChange={handleUserInputChange}></input>
            <p>We promise this is the best Chat</p>
          </div>
          <div className={styles.usernameFormBottom}>
            <button className={styles.usernameFormButton} type="submit">Submit</button>

            <div className={styles.button}>Hello</div>
          </div>
        </div>
      </form>
  )
}
