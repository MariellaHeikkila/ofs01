
export const Course = ({ courses }) => {
    return (
      <div>      
        {courses.map(course =>
        <div key={course.id}> 
        <Header courses={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </div>
        )}
      </div>
    )
  }
  
  const Header = ({courses}) => {
    return (
      <h2>{courses}</h2>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
      </div>
    )
  } 
  
  const Part = ({part, exercises}) => {
    return (
      <p>{part} {exercises}</p>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return  <p><strong>total of {total} exercises</strong></p>  
  }