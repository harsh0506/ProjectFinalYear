import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import { uploadBytes, ref, listAll, getDownloadURL, getStorage } from 'firebase/storage';
import { storage } from "./firebase/FirebaseConfig";

export function EmailValidation(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

}
let data = {
    url: "",
    docName: "",
    adderId: "",
    date: "",
    fullPath: ""
}
export async function UploadDocs(projectId = "zojwqt", adderId = "HB9NyODKMPYImstDR0pcROImoFa2") {
    let res = await DocumentPicker.getDocumentAsync({})
    const res2 = await fetch(res.uri)
    const converted_to_blob = await res2.blob()
    const storageRef = ref(storage, `${projectId}/${res.name}`)
    uploadBytes(storageRef, converted_to_blob).then((snapshot) => {
        console.log(snapshot)
        getDownloadURL(snapshot.ref)
            .then(url => {
                data = {
                    url,
                    docName: String(snapshot.metadata.name),
                    adderId: String(adderId),
                    date: String(snapshot.metadata.timeCreated),
                }
                addDataToProjects(data)

            })
            .catch(err => console.log(err))
    });
}
export const downloadData = (url,name) => {
    axios({
        url: url,
        method: 'GET',
        responseType: 'blob'
    })
        .then((response) => {
            const url = window.URL
                .createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
}
export const downloadurl = (url) => {
    try {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
            const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
    } catch (error) {
        console.log(error)
    }

}

export async function addDataToProjects(data) {
    try {
        const res = await axios.put(`http://localhost:4000/projects/arrAdd/oel7p`, { "Documents": data })
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

export const ListItems = (projectId) => {
    const listRef = ref(storage, `${projectId}`);
    let Filesinfo = []
    listAll(listRef)
        .then((res) => {
            res.items.forEach((itemRef) => {
                console.log(itemRef.name)
            });
        }).catch((error) => {
            console.log(error)
        });
    console.log(Filesinfo)
}

export const returnProjects = async (userId) => {
    try {
        const data = []
        axios.get(`http://localhost:4000/projects/ti/${user.uid}`)

    } catch (error) {

    }
}