import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as DocumentPicker from "expo-document-picker";

import { uploadBytes, ref, listAll, getDownloadURL, getStorage } from 'firebase/storage';
import { app, storage } from '../../firebase/FirebaseConfig';
import { ListItems, UploadDocs } from '../../Helper';

const UploadImg = () => {
    let projId = "eufeufheiuh7236"
    const [fileInfo, setFileInfo] = React.useState({
        fileType: "",
        fileName: "",
        fileUri: "",
    })
    const [downloadData, setDownloadData] = React.useState([])
    React.useEffect(async () => {
        const m = ListItems(projId)
        console.log(m)
    }, [])

    

    const downloadurl = () => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
            const blob = xhr.response;
        };
        xhr.open('GET', downloadData[1].url_of_file);
        xhr.send();
    }

    return (
        <View>
            <TouchableOpacity onPress={()=>{UploadDocs(projId)}}
                style={{ backgroundColor: "blue" }}
            >
                <Text>index</Text>

            </TouchableOpacity>
            
        </View>
    )
}

export default UploadImg

const styles = StyleSheet.create({})

const ListOfDocs = ()=>{
    return(
        <View>
            <FlatList/>
        </View>
    )
}