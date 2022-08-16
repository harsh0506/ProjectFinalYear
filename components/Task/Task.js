import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TaskList from './TaskList'
import AddTask from './AddTask'
import { useState } from '@hookstate/core'
import { projectState } from '../GlobalState/Globalstate'

const Task = ({projDetail}) => {
  const proj = useState(projectState)
  console.log(proj.get())
  return (
    <View>
      <TaskList/>
      <AddTask />
    </View>
  )
}

export default Task

const styles = StyleSheet.create({})