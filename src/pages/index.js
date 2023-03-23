import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([])

  async function postTestMessage() {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: 'test', user: 'test' }),
    })
    const data = await response.json()
    fetchMessages()
  }

  async function fetchMessages() {
    const response = await fetch('/api/messages')
    const data = await response.json()
    data.reverse()
    setMessages(data)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages()
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>WadsApp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <button onClick={() => postTestMessage()}>send</button>
        {messages.map((message) => {
          return (
            <p>{message.id} {message.user} {message.text}</p>
          )
        })}
      </div>
    </>
  )
}
