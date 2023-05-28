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

// const Instructions = (props) => {
//   if (props.good.length === 0)

// }

const Stats = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>total {props.total}</p>
      <p>average {props.average}</p>
      <p>total {props.positive}</p>
    </div>
  );
};

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

  return (
    <div>
      <Header />
      <Button handleClick={() => addGoodReview()} text="good" />
      <Button handleClick={() => addNeutral()} text="neutral" />
      <Button handleClick={() => addBadReview()} text="bad" />
      <Stats
        good={good}
        neutral={neutral}
        bad={bad}
        total={good + bad + neutral}
      />
    </div>
  );
};

export default App;
