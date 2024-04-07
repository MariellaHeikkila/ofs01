import { useState } from 'react'
import './App.css'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div className='container'>
      <h1>Give feedback</h1>
      <div>
        <Button text='good' handleClick={() => setGood(good + 1)} />
        <Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
        <Button text='bad' handleClick={() => setBad(bad + 1)} />
      </div>
      <h2>Statistics</h2>
      <div>
       <Display text='Good' value={good} />
        <Display text='Neutral' value={neutral} />
        <Display text='Bad' value={bad} />
      </div>
    </div>
  )
}

export default App

const Button = ({ text, handleClick }) => {
  return (
    <button className='button'onClick={handleClick}>{text}</button>
  )
}

const Display = ({text, value}) => {
  return (
    <div>
      <p>{text} {value}</p>
    </div>
  )
}