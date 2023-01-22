import React from 'react'
import { Modal, Toggle, Cascader, ButtonToolbar, Button, Loader, Placeholder, DatePicker } from 'rsuite';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { projectState, usernameState, CurTeam } from '../../Helper/globeState';
import { UserProj , Proj } from '../../Helper/globeState/InitialStae';
import axios from 'axios';
import { useHookstate } from '@hookstate/core';
import { useRouter } from 'next/router';

/*
one state that keep track of the user field data while creating the project
one global state to set the project in 
*/
function ModalTodo({ open, onClose, onEntered, data, Prioity }) {

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
        teamId: (UserTeam.get()._id.length === 0) ? "" : UserTeam.get()._id,
        projectId: (Math.random() + 1).toString(36).substring(7),
        personal: (UserTeam.get()._id.length === 0) ? true : false,
      })

     const res =  await postData(state)
     console.log(res)
     projectState.set(res)
     await onClose()
     await router.push({
      pathname: `/Project/${res._id}`,
      query: {
        id: res._id
      }
    })

    }
    catch (err) {
      console.log(err)
    }
  }
  return (

    <>
      <Modal
        open={open}
        onClose={onClose}
        onEntered={onEntered}
        style={{zIndex:10000}}
      >
        <Modal.Header>
          <Modal.Title>
            Create Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ flexDirection: "column" }} className="container">
          <br></br>
          <div className="d-flex flex-column container" style={{ gap: "10px" }}>
            <TextField id="outlined-basic" onChange={(e) => setState({ ...state, projectName: e.target.value })} name="projectName" placeholder='project name ' label="project name" variant="outlined" />
            <Cascader
              placeholder="priority"
              data={Prioity}
              onSelect={(e) => setState({ ...state, priority: e.value })}
              style={{ width: 224, color: "black" }} />
            <DatePicker name="submissionDate" onChange={(e) => { setState({ ...state, submissionDate: String(e) }) }} format="yyyy-MM-dd HH:mm:ss" placeholder="submission date" />
            <div className="d-flex container py-1" >
              <Toggle size="lg" onChange={(e) => setState({ ...state, personal: e })} checkedChildren="True" unCheckedChildren="False" />
              <p>personal</p>
            </div>

          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} appearance="primary">
            Ok
          </Button>
          <Button onClick={onClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>

      </Modal>
    </>

  );
}

export default ModalTodo

export async function postData(data) {
  try {
    return await (await axios.post("http://localhost:4000/projects", data)).data
    
  } catch (error) {
    console.log(error)
  }

}