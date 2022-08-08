import { View, Text, FlatList } from 'react-native'
import React from 'react'

const FlatListComp = ({TaskList, ProjectList }) => {
    console.log(ProjectList.id)
  return (
    <View>
        <FlatList 
        data={[TaskList.data,ProjectList.data]}
        keyExtractor={(item)=>{item.id}}
        renderItem={(item)=>(
            <View>
            <Ri1/>
            </View>
        )}
        />
      <Text>FlatListComp</Text>
    </View>
  )
}

export default FlatListComp

const Ri1 = ()=>{
    return(
        <Text></Text>
    )
}
const Ri2 = ()=>{
    return(
        <Text></Text>
    )
}