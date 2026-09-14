import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import About from './About'

function App() {
  const user1 = {
    name: "user1",
    email: "email+user1@gmail.com"
  }

  const user2 = {
    name: "user2",
    email: "email+user2@gmail.com"
  }

  return (
    <>
      <About user={user1} />
      <About user={user2} />
    </> //FER202_FA26_HoangHTB
  )
}

export default App
