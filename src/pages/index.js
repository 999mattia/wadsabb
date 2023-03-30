import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState('')
  const chatContainerRef = useRef(null);
  const [test, setTest] = useState(false)

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
    //data.reverse()
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


  useEffect(() => {
    if (chatContainerRef.current) {
      // Scroll to the bottom of the chat container
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }

  }, messages);




  return (
    user != '' ?
      <>
        <Head>
          <title>WadsApp</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.container}>
          <div className={styles.allMessageContainer} ref={chatContainerRef}>
            {messages.map((message) => {
              return (
                <div className={styles.singleMessage}>
                  <p className={styles.username}>{message.user}</p>
                  {message.user == user ? <div className={styles.loggedIn}><p>{message.text}</p></div> : <div className={styles.loggedOut}><p>{message.text}</p></div>}
                  
                </div>
              )
            })}
          </div>
          <form className={styles.messageForm} onSubmit={(e) => { e.preventDefault(); sendMessage() }}>
            <input className={styles.messageInput} type="text" value={message} placeholder="Type in your message..." onChange={handleMessageInputChange}></input>
            <div className={styles.sendButtonContainer}>
              <button className={styles.sendButton} type="submit">
                <img className={styles.sendButtonIcon} src="/send.png" alt='asdf'></img>
              </button>
            </div>
          </form>

        </div>
      </> : <form onSubmit={() => setUser(userInput)} >
        <div className={styles.usernameForm}>
          <div className={styles.usernameFormHeader}>Join WadsAbb</div>
          <div className={styles.usernameFormMiddle}>        
            <p>Username: </p>
            <input className={styles.inputField} type="text" value={userInput} onChange={handleUserInputChange}></input>
            <p className={styles.smallText}>We promise this is the best Chat!!</p>
          </div>
          <div className={styles.usernameFormBottom}>
            <button className={styles.usernameFormButton} type="submit">Submit</button>

            
          </div>
        </div>
      </form>
  )
}
