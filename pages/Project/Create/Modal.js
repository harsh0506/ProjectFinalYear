import React from 'react'
import {Modal , Toggle, Cascader, ButtonToolbar, Button, Loader, Placeholder, DatePicker } from 'rsuite';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { projectState, usernameState, CurTeam } from '../../Helper/globeState';
import { UserProj , Proj } from '../../Helper/globeState/InitialStae';
import axios from 'axios';
import { useHookstate } from '@hookstate/core';
import { useRouter } from 'next/router';
import {  } from 'antd';

/*
one state that keep track of the user field data while creating the project
one global state to set the project in 
*/
function ModalTodo({ isModalOpen, teamid , personal
  , setIsModalOpen, handleCancel, data,handleOk, Prioity }) {

  const [state, setState] = React.useState(Proj)
  const project = useHookstate(projectState)
  const UserNameS = useHookstate(usernameState)
  const UserTeam = useHookstate(CurTeam)
  const router = useRouter()

  React.useEffect(() => {
    if (UserNameS.get()._id.length === 0) { router.push("/") }
    console.log(UserNameS.get()._id)
  }, [])

  const handleSubmit = async () => {
    try {
      setState({
        ...state,
        userId: UserNameS.get()._id,
        dateOfCreation: String(new Date()),
        teamAdminId: UserNameS.get()._id,
        teamId: teamid === ""  ? "" : UserTeam.get()._id,
        projectId: String((Math.random() + 1).toString(36).substring(7)),
        personal: personal ===true ? true : false,
      })

     
     const res =  await postData(state)
     console.log(res)
     //projectState.set(res)

    /*await router.push({
      pathname: `/Project/${res._id}`,
      query: {
        id: res._id
      }
    }) */
    handleOk()
    }
    catch (err) {
      console.log(err)
    }
  }
  return (

    <>
      <Modal title="create project" open={isModalOpen} onCancel={handleCancel}>
        <div style={{ flexDirection: "column" }} className="container">
          <br></br>
          <div className="d-flex flex-column container" style={{ gap: "10px" }}>
            <TextField id="outlined-basic" onChange={(e) => setState({ ...state, projectName: e.target.value })} name="projectName" placeholder='project name ' label="project name" variant="outlined" />
            <Cascader
              placeholder="priority"
              data={Prioity}
              onSelect={(e) => setState({ ...state, priority: e.value })}
              style={{ width: 224, color: "black" , zIndex:100000 }} />
            <DatePicker name="submissionDate" onChange={(e) => { setState({ ...state, SubmissionDate: String(e) }) }} format="yyyy-MM-dd HH:mm:ss" placeholder="submission date" />
            <div className="d-flex container py-1" >
              <Toggle size="lg" onChange={(e) => setState({ ...state, personal: e })} checkedChildren="True" unCheckedChildren="False" />
              <p>personal</p>
            </div>

            <div className="container">
              <button onClick={()=>{
                handleSubmit()
              }
              }>
                Create
              </button>
            </div>

          </div>

        </div>

      </Modal>
    </>

  );
}

export default ModalTodo

export async function postData(d) {
  try {
    return await (await axios.post("http://localhost:4000/projects", d)).data
    
  } catch (error) {
    console.log(error)
  }

}