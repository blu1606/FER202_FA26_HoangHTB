import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import About from './About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <About name="Hoang" username="blu" />
    </> //FER202_FA26_HoangHTB
  )
}

export default App
