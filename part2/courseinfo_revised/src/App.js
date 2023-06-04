const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Mom gay",
        exercises: 15,
        id: 4,
      },
    ],
  };

  const courseName = courses.map((header) => header.name);
  console.log(courseName);

  const Header = ({ course }) => <h1>{course}</h1>;

  const Content = ({ parts }) => (
    <>
      <Part part={course.parts} />
    </>
  );

  const Part = ({ part }) => {
    return course.parts.map((part) => (
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
    ));
  };

  const Total = () => {
    const totalExercises = course.parts.map((part) => part.exercises);
    const sumExercises = totalExercises.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return (
      <p>
        <strong>total of {sumExercises} exercises</strong>
      </p>
    );
  };

  const Course = () => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total />
      </div>
    );
  };

  // const singleCourse = courses.map((course) => (
  //   <Course key={course.id} course={course} />
  // ));
  // console.log(singleCourse);

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <Course key={course.id} />
      ))}
    </div>
  );
};

export default App;
