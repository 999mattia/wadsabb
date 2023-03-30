import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState('')
  const chatContainerRef = useRef(null)
  const [test, setTest] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [secretMessage, setSecretMessage] = useState('')

  async function sendMessage() {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    let newMessage;
    if (secretMessage != "") {
      newMessage = secretMessage
    } else {
      newMessage = message
    }
    const response = await fetch('https://wadsabb.glitch.me/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newMessage, user: user }),
    })
    const data = await response.json()
    setMessage('')
    fetchMessages()
  }

  async function fetchMessages() {
    if (localStorage.getItem("SecretMessage") != null){
      setSecretMessage(localStorage.getItem("SecretMessage"))
    }
    if (localStorage.getItem("UserName") != null){
      setUser(localStorage.getItem("UserName"))
    }
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

  function handleUserSubmit() {
    if (userInput.length < 3){
      alert("Username Too short")
    } else {
      localStorage.setItem("UserName", userInput)
      setUser(userInput)
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages()
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (chatContainerRef.current && !scrolled) {
      // Scroll to the bottom of the chat container
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight -10000;
      setScrolled(true)
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
        <div className={styles.headerContainer}>
                <div className={styles.headerFiller}></div>
                <div className={styles.headerFiller}><img className={styles.logo} src="/Logo.png" ></img></div>
                <div className={styles.headerFiller}><div onClick={() => {localStorage.removeItem("UserName"); setUser('')}}><img className={styles.accountIcon} src="/account.png"></img></div></div>
        </div>
        <div className={styles.container}>
          <div className={styles.allMessageContainer} ref={chatContainerRef}>
            {messages.map((message) => {
              return (
                <div className={`${message.user == user ? styles.self : styles.other}`}>
                  <div className={styles.singleMessage}>
                    <p className={styles.username}>{message.user}</p>
                    {message.user == user ? <div><p>{message.text}</p></div> : <div className={styles.loggedOut}><p>{message.text}</p></div>}
                  </div>
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
      </> : <form className={styles.bodyContainer} onSubmit={() => handleUserSubmit()} >
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
