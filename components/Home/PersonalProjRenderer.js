import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { height, width } from '../Dimentions/Dimensions'
import { useState } from '@hookstate/core'
import { projectState } from '../GlobalState/Globalstate'

const PersonalProjRenderer = ({ data, nav }) => {
    console.log(data)

    const ProjectState = useState(projectState)
    if (data.length === 0) {
        return (
            <View>
                <Text>no projedcts added</Text>
            </View>
        )
    }

    return (
        <View style={styles.Main}>
            <Text>PersonalProjRenderer</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.projectId}
                renderItem={({ item, index }) => (
                    <ListRenderer
                        onPress={() => {
                            nav.navigate("Project", item)
                            ProjectState.set(item)
                        }}
                        res={item.projectName} />
                )}
            />
        </View>
    )
}

export default PersonalProjRenderer

const styles = StyleSheet.create({
    Main: {
        alignItems: "center", justifyContent: "center",
    }
})

export const ListRenderer = ({ res, onPress }) => {
    console.log(res)
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Text>{res}</Text>
            </TouchableOpacity>
        </View>
    )
}