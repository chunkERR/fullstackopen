import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.buttonFunction}>{props.text}</button>
 )

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
const [selected, setSelected] = useState(0)
const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))


const copy = [...votes]

  const getRandomElement = () => {
    const selected = (Math.floor(Math.random() * anecdotes.length))
    setSelected(selected)
  }

const getVote = () => {
copy[selected] += 1
setVotes(copy)
}

const topVote = Math.max(...copy)
const winnerAnecdote = anecdotes[copy.indexOf(topVote)]


console.log(copy)
console.log(selected)

return (
    <div>
      <h1>Anecdote of the day</h1>
      <Button buttonFunction= {getRandomElement} text="next anecdote" />
      <Button buttonFunction={getVote} text="vote" />
      <p>{anecdotes[selected]}</p>
      <p>has {copy[selected]} votes</p>
      <h1>Anecdote with most votes</h1>
      <p>{winnerAnecdote}</p>
      <p>has {topVote} votes</p>


    </div>
  )
}

export default App