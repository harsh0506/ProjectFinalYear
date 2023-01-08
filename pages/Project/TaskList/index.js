import React from 'react'
import { UserTask } from '../../Helper/globeState'
import AllTask from './AllTask'
import InputFile from './Input'


function TaskList() {
  return (
    <div>
        <InputFile /> 
        <AllTask />
    </div>
  )
}

export default TaskList
