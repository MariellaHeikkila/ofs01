import { useState } from 'react'
import './App.css'

const App = () => {
  
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
      {good || neutral || bad ?
        <Statistics good={good} neutral={neutral} bad={bad} />
        :
        <p>No feedback given</p>
        }
    </div>
  )
}

export default App

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  return (
    <div>      
      <Display text='Good:' value={good} />
      <Display text='Neutral:' value={neutral} />
      <Display text='Bad:' value={bad} />
      <Display text='All:' value={all} />
      <Display text='Average:' value={average || 0} />
      <Display text='Positive%:' value={positive || 0} />
    </div>
  )
}

const Button = ({ text, handleClick }) => {

  return (
    <button className='button'onClick={handleClick}>{text}</button>
  )
}

const Display = ({text, value}) => {

  return (
    <div>
      <table style={{width: '100%'}}>
        <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr> 
        </tbody>       
      </table>
    </div>
  )
}