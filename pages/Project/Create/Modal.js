import React from 'react'
import { Modal, Toggle, Cascader, ButtonToolbar, Button, Loader, Placeholder, DatePicker } from 'rsuite';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { projectState, usernameState, CurTeam } from '../../Helper/globeState';
import { UserProj } from '../../Helper/globeState/InitialStae';
import axios from 'axios';
import { useHookstate } from '@hookstate/core';
import { useRouter } from 'next/router';

function ModalTodo({ open, onClose, onEntered, data, Prioity }) {

  const [state, setState] = React.useState(UserProj)
  const UserNameS = useHookstate(usernameState)
  const UserTeam = useHookstate(CurTeam)
  const router = useRouter()

  React.useEffect(() => {
    if (UserNameS.get()._id.length === 0) { router.push("/") }
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
        personal : (UserTeam.get()._id.length === 0) ? true : false,
      })
 
      await postData(state) 

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
      >
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "20vh" }} className="container">
          <br></br>
          <TextField id="outlined-basic" onChange={(e) => setState({ ...state, projectName: e.target.value })} name="projectName" placeholder='project name ' label="project name" variant="outlined" />
          <Cascader data={Prioity}

            onSelect={(e) => setState({ ...state, priority: e.value })}
            style={{ width: 224 }} />
          <DatePicker name="submissionDate" onChange={(e) => { console.log(e); setState({ ...state, submissionDate: String(e) }) }} format="yyyy-MM-dd HH:mm:ss" />

          <Toggle size="lg" onChange={() => console.log("fjjf")} checkedChildren="Open" unCheckedChildren="Close" />

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
    console.log(
      await axios.post("http://localhost:4000/projects", data)
    )
  } catch (error) {
console.log(error)
  }

}