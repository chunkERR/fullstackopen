const course = {
  id: 1,
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10,
      id: 1
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
      id: 2
    },
    {
      name: 'State of a component',
      exercises: 14,
      id: 3
    },
    {
      name: 'Redux',
      exercises: 11,
      id: 4
    }
  ]
}

const Header = () => {
  return (
    <h1>{course.name}</h1>
  )
}

const Part = ({part, exercises}) =>
  <p>
    {part} {exercises}
  </p>



const Content = ({parts}) =>
  <div>
    {course.parts.map((part, i) =>
      <Part key={i} part={part.name} exercises={part.exercises} />
    )}
  </div>


const Total = () => {
  let sum = course.parts.reduce((s,p) => s + p.exercises, 0)
  return (
<p>total of {sum} exercises</p>
  )
}




const Course = ({courses}) =>
  <div>
        <Header />
        <Content parts={course.parts}/>
        <Total />
  </div>


const App = () => {

return (
  <div>
<Course course={course}/>
</div>

)


}

export default App