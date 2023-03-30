import { useHookstate } from '@hookstate/core'
import { TextField } from '@mui/material'
import { Button } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { Cascader, DatePicker, Toggle, Modal } from 'rsuite'
import { projectState, usernameState } from '../../Helper/globeState'
import { Proj } from '../../Helper/globeState/InitialStae'


const Prioity = [{ value: "high", label: "high" },
{ value: "medium", label: "medium" },
{ value: "low", label: "low" },
]

function CreateProj() {

  const router = useRouter()
  const { id, team_id, TeamD } = router.query
  const user = useHookstate(usernameState)
  const project = useHookstate(projectState)

  const [state, setState] = React.useState(Proj)

  React.useEffect(() => {
    setState({
      ...state,
      teamId: team_id,
      teamAdminId: user.get()._id,
      personal: false
    })
  }, [])


  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {

      console.log(state)

      const res = await (await axios.post("http://localhost:4000/projects", state)).data

      project.set(res[0])
      console.log(res)
      /*
            await router.push({
              pathname: `/Project/${res[0]._id}`,
              query: {
                id: res[0]._id, projId: res[0].projectId
              }
            })*/
      handleOk()
    }
    catch (err) {
      console.log(err)
    }
  }
  return (

    <>
      <Button type="primary" onClick={showModal}>
        Create a Team Project
      </Button>
      <Modal open={isModalOpen} onCancel={handleCancel}>
        <div className="container" style={{
          textAlign: "left",
          display: "flex"
        }}>
          <h2 style={{
            color: "#120609",
            fontWeight: 600,
            fontSize: 25,
            padding: 10,
            marginBottom: 10
          }}>Personal Projects</h2>

        </div>
        <div style={{ flexDirection: "column" }} className="container">

          <div className="d-flex flex-column container" style={{ gap: "10px" }}>
            <TextField id="outlined-basic" onChange={(e) => setState({ ...state, projectName: e.target.value })} name="projectName" placeholder='project name ' label="project name" variant="outlined" />
            <Cascader
              placeholder="priority"
              data={Prioity}
              onSelect={(e) => setState({ ...state, priority: e.value })}
              style={{ width: 224, color: "black", zIndex: 100000 }} />
            <DatePicker name="submissionDate" onChange={(e) => { setState({ ...state, SubmissionDate: String(e) }) }} format="yyyy-MM-dd HH:mm:ss" placeholder="submission date" />

            <div className="container" style={{
              display: "flex", alignItems: "center", justifyContent: "space-evenly"
            }}>
              <Button onClick={handleSubmit}>Create</Button>
              <Button onClick={handleCancel}>Close</Button>
            </div>

          </div>

        </div>

      </Modal>
    </>

  );
}
export default CreateProj

