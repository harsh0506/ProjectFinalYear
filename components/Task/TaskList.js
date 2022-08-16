import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createState, useState } from '@hookstate/core';
import { projectState, taskListState } from '../GlobalState/Globalstate';
import { height, width } from '../Dimentions/Dimensions';
import { deleteDocs } from '../firebase/Crud';
const TaskList = () => {
    const state = useState(projectState)
    const [data, setData] = React.useState([])
    let res  = state.get() 
    console.log(state.get().projectId)
    
    return (
        <View style={styles.Main}>
            <Text>jnjdnenke</Text>
            <FlatList
                contentContainerStyle={{ width: width, height: height/2 }}
                keyExtractor={(index, item) => item.id}
                renderItem={({ item }) => (
                    <Task
                        task={item.task}
                        del = {()=>deleteDocs(item.id ,"Task")}
                    />
                )}
                data={res}
            />
        </View>
    )
}

export default TaskList

const Task = ({ task , del }) => {
    console.log(task)
    return (
        <View>
            <View style={{}}>
                <Text>{task}</Text>
                <Text>2:hours {"/n"}</Text>
            </View>
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity><Text>U</Text></TouchableOpacity>
                <TouchableOpacity onPress={del}><Text>D</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Main: {
      alignItems:"center",justifyContent:"center",
    }
})

