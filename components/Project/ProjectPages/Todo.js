import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Task from '../../Task/Task'

const Todo = ({projDetail}) => {
  console.log(projDetail)
  return (
    <View>
      <Text style={{color:"black"}}>
<Task projDetail={projDetail}/>

      </Text>
    </View>
  )
}

export default Todo

const styles = StyleSheet.create({})