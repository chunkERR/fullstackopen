const App = () => {
  const Header = (props) => {
return (
  <h1>  
    {props.course}
  </h1>
)
  }

const Part = (props) => {
return (
<p>
{props.part} {props.exercise}
</p>
)
}

const Content = (part, exercises) => {
    return (
      <div>
        <Part part={part1} exercise={exercises1} />
        <Part part={part2} exercise={exercises2} />
        <Part part={part3} exercise={exercises3} />
      </div>
    )
  }  

// const Content = (props) => {
//     return (
//       <p>
//       {props.part} {props.exercises}
//       </p>
//     )
//   }

const Total = (a,b,c) => {
    let total = exercises1 + exercises2 + exercises3;
    return (
      <p>Total Number of exercises {total}</p>
    )
  }

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
<Header course={course}/>
<Content />
<Total a={exercises1} b={exercises2} c={exercises3}/>
</div>
  )
}
export default App