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


const Course = ({courses}) =>
  <div>
        <Header />
        <Content parts={course.parts}/>
  </div>


const App = () => {

return (
  <div>
<Course course={course}/>
</div>

)


}

export default App