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
    <p>good {props.good}</p>
    <p>neutral {props.neutral}</p>
    <p>bad {props.bad}</p>
    <Total sum={props.sum}/>
    <Average averageClicks={props.averageClicks} sum={props.sum}/>
    <Positive good={props.good} sum={props.sum}/>
    </div>  
  )

}

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
      <button onClick={(clickGood)}>
      Good
      </button>
      <button onClick={(clickNeutral)}>
        neutral
      </button>
      <button onClick={(clickBad)}>
        bad
      </button>
      {/* <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <Total sum={sum}/>
      <Average averageClicks={averageClicks} sum={sum}/>
      <Positive good={good} sum={sum}/> */}
      <Statistics good={good} neutral={neutral} bad={bad} averageClicks={averageClicks} sum={sum}/>
    </div>

  )
}

export default App