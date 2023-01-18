import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [originalState, setOriginal] = useState()

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    console.log("addNewWorkout:", newWorkout)
    setWorkouts([...workouts, newWorkout])
  }

  const deleteWorkout = (workout) => {
    console.log("deleteWorkout:", workout)
    setWorkouts(workouts.filter((target) => workout !== target))
  }

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout)
    const update = workouts.map((target) => {
      if (target === workout) {return {...target, done: !target.done}}
      return target
    })
    setWorkouts(update)
  }

  const [checkStatus, setCheckStatus] = useState(false)
  const showDoneOnly = () => {
    setOriginal(workouts)
    setCheckStatus(!checkStatus)
    if (!checkStatus) {
      const newList = workouts.filter((target) => {return target.done === true})
      setWorkouts(newList)} 
      else {
      setWorkouts(originalState)}
  } 

  const replaceMe = (target) => {
    setWorkouts(workouts.map((workout) => {if(workout === target) {return generateWorkout()} return workout}))
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <div>
      <label>Show done only:</label>
      <input type="checkbox" onChange={() => showDoneOnly()} />
      </div>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done && 
              <button onClick={e=>completeWorkout(workout)}>✅Done</button>}
            {workout.done && 
             <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>❌Delete</button>
            <button onClick={e=>replaceMe(workout)}>♻️Replace this exercise</button>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default App
