import { useState } from 'react'

const Total = (props) => {
  return (
  <p> total {props.sum}</p>
  )
  }

const Average = (props) => {
    let average = props.averageClicks
    return <p> average {average / props.sum}</p>
      }

const Positive = (props) => {
        let positives = props.good / props.sum * 100
        return <p> positive {positives} %</p>
      }

const StatisticLine = (props) => {
  return (
    <div>
{props.text} {props.value} 
    </div>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
    return (
      <div>
        No Feedback given
      </div>
    )}
  return (
    <div>
    <h1>statistics</h1>
    <StatisticLine text="good" value={props.good} />
    <StatisticLine text="neutral" value={props.neutral} />
    <StatisticLine text="bad" value={props.bad} />
    <Total sum={props.sum}/>
    <Average averageClicks={props.averageClicks} sum={props.sum}/>
    <Positive good={props.good} sum={props.sum}/>
    </div>  
  )

}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
 )
 

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [averageClicks, setAverage] = useState(0)
  let sum = good + neutral + bad



  const clickGood = () => {
    setAverage(averageClicks + 1)
    setGood(good + 1)
  }

  const clickNeutral = () => setNeutral(neutral + 1)

  const clickBad = () => {
    setBad(bad + 1)
    setAverage(averageClicks - 1)
  }

return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={clickGood} text="good" />      
      <Button handleClick={clickNeutral} text="neutral" />      
      <Button handleClick={clickBad} text="bad" />      
      <Statistics good={good} neutral={neutral} bad={bad} averageClicks={averageClicks} sum={sum}/>
    </div>

  )
}

export default App
