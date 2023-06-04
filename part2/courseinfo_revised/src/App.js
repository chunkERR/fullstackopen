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

  const Header = ({ name }) => <h2>{name}</h2>;

  const Content = ({ parts }) => (
    <>
      <Part parts={parts} />
    </>
  );

  const Part = ({ parts }) => {
    return parts.map((part) => (
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
    ));
  };

  const Total = ({ parts }) => {
    const totalExercises = parts.map((part) => part.exercises);
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

  const Course = ({ courses }) => {
    return courses.map((course) => {
      return (
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      );
    });
  };

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course courses={courses} key={courses.id} />
    </div>
  );
};

export default App;
