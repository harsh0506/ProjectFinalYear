import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FlatListComp from './FlatListComp'

const ListRendere = ({ TaskList, ProjectList }) => {
    if (TaskList === null && ProjectList === null) {
        console.log(1)
        return (
            <View>
                <Text>no task and no ProjectList</Text>
            </View>
        )
    }
    if (TaskList !== null && ProjectList === null) {
        console.log(2)

        return (
            <View>
                <FlatListComp TaskList={TaskList} />
            </View>
        )
    }
    if (TaskList === null && ProjectList !== null) {
        console.log(3)

        return (
            <View>
                <FlatListComp ProjectList={ProjectList}/>
            </View>
        )
    }
    console.log(4)

    return(
        <View>
            <FlatListComp TaskList={TaskList} ProjectList={ProjectList} />
        </View>
    )

}

export default ListRendere

const styles = StyleSheet.create({})