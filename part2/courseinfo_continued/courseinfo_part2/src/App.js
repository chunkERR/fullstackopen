import React from 'react';
import Course from "./components/Course"

const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  

// const Content = (props) => {
//     return (
// <Part />
//     );
//   };

//   const Header = ({courses}) => {
//     courses.map((course => {
//       return <h2>{course.name}</h2>
//     }))
//       // return (
//       // <h2>{props.name}</h2>
//       // )
//     }


//   const Part = ({courses}) => {
//     return (
//       <>
//         {courses.map((course) =>
//           course.parts.map((part) => (
//             <p key={part.id}>{part.name} {part.exercises}</p>
//           ))
//         )}
//       </>
//     );
//   };

//   const Total = ({courses}) => {

//     const totalExercises = courses.reduce((sum, course) =>
//       sum + course.parts.reduce((total, part) => total + part.exercises, 0), 0);

//       return (
//         <div>
//           <p><strong>total of {totalExercises} exercises</strong></p>
//         </div>
//       );
//     };


  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course courses={courses}/>
    </div> 
  );
  }

export default App;