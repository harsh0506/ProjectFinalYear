import { useHookstate } from '@hookstate/core'
import axios from 'axios'
import React from 'react'
import { projectState, usernameState } from '../Helper/globeState'
import { Panel, Placeholder, Row, Modal, Col, Cascader, Toggle, DatePicker } from 'rsuite';
import { UserProj, Proj } from '../Helper/globeState/InitialStae';
import { useRouter } from 'next/router';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined, FireTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import { Avatar, Card, Button, Input, Divider, Tooltip } from 'antd';
import Todolist from './Create';
import { TextField } from '@mui/material';

function index({ user }) {
  const UserDetails = useHookstate(usernameState)
  const [stae, setState] = React.useState([UserProj])
  const [err, setError] = React.useState()
  console.log(UserDetails.get()._id)
  const [user_id, setUser_id] = React.useState("")

  React.useEffect(() => {
    setUser_id(UserDetails.get()._id)
    getData(UserDetails.get()._id).then(res => setState(res)).catch(err => setError(err))
  }, [])

  return (
    <>
      <div className="" style={{
        background: "#3b1b27",
        height: "100vh",
        width: "100vw",
        overflowX: "hidden",
        padding: 10
      }}>
        <div className="container" style={{
          textAlign: "left",
          display: "flex"
        }}>
          <h2 style={{
            color: "#fffffe",
            fontWeight: 600,
            fontSize: 45,
            padding: 10,
            marginBottom: 10
          }}>Personal Projects</h2>

        </div>

        <div className="container" style={{
          textAlign: "left",
          display: "flex"
        }}>
          <CreateProj user_Id={user_id} />

        </div>

        <Divider orientation="left" style={{ width: 100, color: "pink", display: "flex", flexDirection: "row" }}>
          <p style={{ marginRight: 5 }}>Personal Project
            <Tooltip title="You can only make 3 Projects">
              <InfoCircleOutlined style={{ marginLeft: 15 }} />
            </Tooltip>
          </p>
        </Divider>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {
            Array.isArray(stae) !== true ? <p>error</p> : stae.map((ele) => {
              return (<Cardcomp ele={ele} />)
            })
          }
        </div>
      </div>

    </>
  )
}

export default index

export async function getData(id) {
  try {
    return (await axios.get(`http://localhost:4000/projects/projectId/${id}`)).data
  } catch (error) {
    console.log(error)
  }
}


export function Cardcomp({ ele }) {
  const router = useRouter()
  const [cardcol, setCardcol] = React.useState("#120609")
  const project = useHookstate(projectState)

  async function handleNavigation(id, ProjId) {
    try {

      project.set(ele[0])

      await router.push({
        pathname: `/Project/${id}`,
        query: {
          id, ProjId
        }
      })

    } catch (error) {
      console.log(error)
    }
  }

  const RD = Math.round((new Date(ele.SubmissionDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) + 1

  return (
    <div className="col" style={{
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
    }}>

      <Card
        onClick={() => handleNavigation(ele._id, ele.projectId)}
        onMouseOver={() => setCardcol("#230a10")}
        onMouseOut={() => setCardcol("#120609")}

        actions={[
          <SettingOutlined key="setting" onMouseOver={() => setCardcol("#230a10")} />,
          <EditOutlined key="edit" />,
          <DeleteOutlined key="ellipsis" onClick={() => {
            delProj(ele._id)
          }} />,
        ]}

        style={{
          width: 300,
          background: cardcol,
          border: "none",
          borderRadius: "20px"
        }}
      >
        <p style={{
          color: "#ffb5d2",
          fontSize: 25,
          fontWeight: 500,
        }}>
          {ele.projectName}
        </p>

        {/*container 1*/}
        <div className="d-flex p-1 m-1 container">

          <div className="row" style={{
            width: 180
          }}>
            <span style={{
              color: "#fffffe",
              fontWeight: 300,
              fontSize: 20
            }}>remaining Days</span>
            <p style={{
              color: RD < 10 ? "red" : "green",
              fontSize: 22,
              fontWeight: 400
            }}>{RD}</p>
          </div>

          {/*Priority*/}
          <div className="row">
            <span style={{
              color: "#fffffe",
              fontWeight: 300,
              fontSize: 20
            }}
            >priority</span>
            <FireTwoTone style={{ width: 23, padding: 3, }} />
          </div>

        </div>

      </Card>
    </div>)
}

function CreateProj(props) {

  const user_Id = props.user_Id

  const Prioity = [{ value: "high", label: "high" },
  { value: "medium", label: "medium" },
  { value: "low", label: "low" },
  ]

  const [state, setState] = React.useState(Proj)
  const project = useHookstate(projectState)

  const router = useRouter()
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
      setState({ ...state, userId: user_Id })

      const res = await (await axios.post("http://localhost:4000/projects", { ...state, userId: user_Id })).data

      project.set(res[0])

      await router.push({
        pathname: `/Project/${res[0]._id}`,
        query: {
          id: res[0]._id, projId: res[0].projectId
        }
      })
      handleOk()
    }
    catch (err) {
      console.log(err)
    }
  }
  return (

    <>
      <Button type="primary" onClick={showModal}>
        Update
      </Button>
      <Modal title="create project" open={isModalOpen} onCancel={handleCancel}>
        <div style={{ flexDirection: "column" }} className="container">
          <br></br>
          <div className="d-flex flex-column container" style={{ gap: "10px" }}>
            <TextField id="outlined-basic" onChange={(e) => setState({ ...state, projectName: e.target.value })} name="projectName" placeholder='project name ' label="project name" variant="outlined" />
            <Cascader
              placeholder="priority"
              data={Prioity}
              onSelect={(e) => setState({ ...state, priority: e.value })}
              style={{ width: 224, color: "black", zIndex: 100000 }} />
            <DatePicker name="submissionDate" onChange={(e) => { setState({ ...state, SubmissionDate: String(e) }) }} format="yyyy-MM-dd HH:mm:ss" placeholder="submission date" />
            <div className="d-flex container py-1" >
              <Toggle size="lg" onChange={(e) => setState({ ...state, personal: e })} checkedChildren="True" unCheckedChildren="False" />
              <p>personal</p>
            </div>

            <div className="container">
              <button onClick={() => {
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


async function delProj(projId) {
  try {

    const res = await axios.delete(`http://localhost:4000/projects/${projId}`)
    alert(projId)
  } catch (error) {
    console.log(error)
  }
}