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

export default Course;
