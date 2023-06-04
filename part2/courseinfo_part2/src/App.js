import Course from "./components/Course";

const App = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course courses={courses} key={courses.id} />
    </div>
  );
};

export default App;
