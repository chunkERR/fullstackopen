import React from 'react';


const App = () => {
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
      },
    ]
  }


  const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    );
  };

  const Content = (props) => {
    return (
<Part />
    );
  };

  const Part = (props) => {
    return (
      course.parts.map(part => (
        <p key={part.id}>{part.name} {part.exercises}</p>))
    );
  };

  const Total = (props) => {
    const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
      <div>
        <p><strong>total of {totalExercises} exercises</strong></p>
      </div>
    );
  };

console.log(course.parts)

const result = course.parts.map(part => (
  <p key={part.id}>{part.name} {part.exercises}</p>))
  console.log(result)

const Course = (props) => {
  return (
    <div>
    <Header course={course.name} />
    <Content />     
    <Total parts={course.parts} />
    </div>
  )


}
  return (
    <div>
      <Course result={result}/>
    </div> 
  );
};

export default App;