import { useState } from "react";

const Header = () => {
  return (
    <div>
      <h1>give feedback</h1>
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);


const Stats = (props) => {
  if (props.allReviews.length === 0) {
    return (
      <div>
        <p>no feedback provided</p>
      </div>
    )
  }
  return (
    <div>
      <table>
      <tbody>
      <StatisticLine name="good" value={props.good}/>
      <StatisticLine name="neutral" value={props.neutral}/>
      <StatisticLine name="bad" value={props.bad}/>
      <StatisticLine name="total" value={props.total}/>
      <StatisticLine name="average" value={props.calculateAverage}/>
      <StatisticLine name="positive" value={props.calculatePositive}/>
    </tbody>
      </table>
    </div>


  );
};


const StatisticLine = (props) => {
  return (
<tr>
<td>{props.name} </td>
<td>{props.value} </td>
</tr>  
   
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allReviews, setAll] = useState([]);

  const addGoodReview = () => {
    setAll(allReviews.concat(1));
    console.log(allReviews);
    setGood(good + 1);
  };
  const addBadReview = () => {
    setAll(allReviews.concat(-1));
    console.log(allReviews);
    setBad(bad + 1);
  };

  const addNeutral = () => {
    setAll(allReviews.concat(0));
    console.log(allReviews);
    setNeutral(neutral + 1);
  };


const total = good + bad + neutral

const calculateAverage = () => {
  const addedValues = allReviews.reduce(
    (accumulator, currentValue) => accumulator + currentValue, 0
)
console.log(calculateAverage)
return addedValues / total
}


const calculatePositive = () => {
  const percentPositive = (good / total) * 100
  return percentPositive
}


  return (
    <div>
      <Header />
      <Button handleClick={() => addGoodReview()} text="good" />
      <Button handleClick={() => addNeutral()} text="neutral" />
      <Button handleClick={() => addBadReview()} text="bad" />
        <h1>statistics</h1>
      <Stats good={good} neutral={neutral} bad={bad} total={total} calculateAverage={calculateAverage()} calculatePositive={calculatePositive()} allReviews={allReviews}/>
    </div>
  );
};

export default App;
