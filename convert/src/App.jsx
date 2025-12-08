import { useState } from 'react'
import './App.css'
import Button from './component/Button';
import Download from './component/Download';
function App() {
  return (
    <>
     <Button text="Click me!" func={()=>{console.log("You Clicked me!");}}/>
      <Download/>
    </>
  )
}

export default App
