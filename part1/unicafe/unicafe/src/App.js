import { useState } from 'react'

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

  const Total = (props) => {
// let sum = good + neutral + bad
return (
<p> Total {sum}</p>
)
}

const Average = (props) => {
let average = averageClicks
return <p> average {average / sum}</p>
  }

const Positive = (props) => {
  let positives = good / sum * 100
  return <p> positive {positives} %</p>
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
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <Total />
      <Average />
      <Positive />
    </div>

  )
}

export default App