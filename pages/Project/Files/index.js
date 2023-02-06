/*
there some features that are must to be implemented
1) display of all files
2) storing files to the system
3) download files 
4) Delete file 
5) open file such as in excel or image for preview(optional)
*/
import { useHookstate } from '@hookstate/core'
import axios from 'axios'
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from 'firebase/storage'
import fileDownload from 'js-file-download'
import { useRouter } from 'next/router'
import React from 'react'
import { storage } from '../../Auth/FirebaseConfig'
import { projectState, usernameState } from '../../Helper/globeState'
import { document, UserProj } from '../../Helper/globeState/InitialStae'
import { ExpandAltOutlined, ArrowDownOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card, Button, Modal, Input } from 'antd';


const { Meta } = Card;

function Files() {
  const [fileTyep, setFileType] = React.useState("")
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const userDetails = useHookstate(usernameState)
  //it is the state to store array of task from projects
  const [state, setState] = React.useState([document])
  //global state instant to get globalstate of current project
  const Proj = useHookstate(projectState)
  //state to store data of the current project , and set function to set the project
  const [Project, setProject] = React.useState(UserProj)

  

  React.useEffect(() => {
    console.log(router.query)
    if (userDetails.get()._id.length === 0) { router.push("/") }
    else {
      setProject(Proj.get()[0])
      setState(Proj.get()[0].Documents)
    }
    //save all document List to state

  }, [])



  /*if there are no files below code will run ,It will check if the length of state 
  named array , if it is more than 0 then it means documents are presernt in project,
  if the length of array is less than 0 then documents are absentis project, there are
  documents message is displayed and button to add new documents
  */
  if (state.length === 0) {
    return (
      <>
        <div className="container">
          <p>No Files</p>
          <UploadFile Id={Project.projectId} />
        </div>
      </>
    )
  }

  /*
  this function below is used to downloadthe files ,url and filenames are passed
  */
  const onButtonClick = (url, filename) => {
    axios.get(url, { responseType: "blob" }).then((res) => fileDownload(res.data, filename))
  }

  /*
    function to preview file
  */

  const handlePreview = async (url, docName) => {
    try {
      setIsModalOpen(true)
      let dataType = docName.split(".")[1]
      if (dataType === "png" || dataType === "jpeg" || dataType === "jpg" || dataType === "gif" || dataType === "tiff" || dataType === "pdf") {
        setFileType(<img src={url} style={{ width: 300 }} />)
       
      }
      if (dataType === "pdf") {
        
      }
    } catch (error) {

    }

  }


  const handleOk = () => {
    setIsModalOpen(false);
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  /*
  Now the here documents are displayed
  */

  return (
    <>
      <div className='container'>

        <UploadFile Id={Project.projectId} />
        <Modal title="Update Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {
            fileTyep
          }
        </Modal>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {
            state.map((ele) => {

              return (<>
                <div className="col">
                  <Card
                    style={{
                      width: 300,
                    }}
                    cover={
                      <img
                        alt="image preview"
                        src={ele.url}
                      />
                    }
                    actions={[
                      //preview button
                      <ExpandAltOutlined key="edit" onClick={() => handlePreview(ele.url, ele.docName)} />,
                      //download button
                      <ArrowDownOutlined onClick={() => onButtonClick(ele.url, ele.docName)} />,
                      //Delete Button (document delete is not included yet)
                      <DeleteOutlined />
                    ]}
                  >
                    <Meta
                      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                      title={ele.docName}
                    />
                  </Card>
                </div>
              </>)
            })
          }
        </div>


      </div>
    </>
  )
}

export default Files

/*
this component DisplayFiles will recieve the array of documents from the Files 
component , it will parse the array and display the list to the user
*/
export function DisplayFile(ele) {
  console.log(ele)
  return (
    <>
      <div className="container">
        <p>{ele.docName}</p>
      </div>
    </>
  )
}

/*
Files Upload Component 
*/

export function UploadFile({ Id }) {
  const [file, setFile] = React.useState(null)

  function handleChange(e) {
    setFile(e.target.files[0]);
    console.log(e.target.files[0])
  }

  async function handleUpload() {
    if (!file) {
      alert("no filesselected")
      return
    }

    const storageRef = ref(storage, `files/${file.name}`)
    //const uploadTask = await uploadBytesResumable(storageRef, file);

    uploadBytes(storageRef, file).then((res) => {
      getDownloadURL(res.ref).then(async (url) => {
        let data = {
          "Documents": {
            url,
            docName: String(res.metadata.name),
            adderId: String("adderId"),
            date: String(res.metadata.timeCreated),
          }
        }

        await putFile(Id, data)

      })
    })

  }

  return (
    <>
      <div className="container">
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload to Firebase</button>
      </div>
    </>
  )

}

export async function putFile(id, data) {
  try {
    console.log(await axios.put(`http://localhost:4000/projects/arrAdd/${id}`, data))
  } catch (error) {

  }
}