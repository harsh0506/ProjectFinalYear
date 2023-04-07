import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import ProjCreate from "../../Project/Create"
import { CurTeam, projectState, TeamMembers, userProjects } from '../../Helper/globeState'
import { Avatar, Button, Card, Modal, Tooltip } from 'antd';
import { Panel, Placeholder, Row, Col, Divider } from 'rsuite';
import { useHookstate } from '@hookstate/core';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined, FireTwoTone, CheckCircleOutlined } from '@ant-design/icons';
import { UserProj, UserTeams, userDetailsIS } from '../../Helper/globeState/InitialStae'
import { TextField } from '@mui/material'
import VideoCall from "../../VideoCall"
const { Meta } = Card;
import Chat from "./Chat"


function TeamDetail({ }) {
  //routers object
  const router = useRouter()

  //the array of project
  let teamMem = []

  //global state of the team
  const Team = useHookstate(CurTeam)
  //global state of the user
  const Project = useHookstate(projectState)

  const Team_Members = useHookstate(TeamMembers)

  //local state to save the teams data
  const [state, setState] = React.useState(UserTeams)
  const [users, setUsers] = React.useState([userDetailsIS])
  const [projects, setProjects] = React.useState([UserProj])
  const [PriorityIconColor, setPriorityIconColor] = React.useState("red")

  const [cardcol, setCardcol] = React.useState("#120609")

  //use effect to run at start of rendering
  React.useEffect(() => {
    console.log(router.query.id)
    console.log(Team.get())

    //setting set of global state
    setState(Team.get())
    let tm = []
    //get all data aboutthe team
    getUserTeams(router.query.id).then((res) => {
      setUsers(res[0])
      tm = res[0].reduce((acc, { _id, userName }) => {
        acc.push({ value: _id, label: userName });
        return acc;
      }, []);
      setProjects(res[2])
      Team_Members.set(tm)
    })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  //navigate to project page
  async function handleNavigation(id, data) {
    try {
      Project.set(data)
      await router.push({
        pathname: `/Project/${id}`,
        query: { id, ProjId: data.projectId, team_id: state._id, teamId: state.teamid }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=' my-4' style={{
      background: "#3b1b27",
      height: "100vh",
      width: "100vw",
      marginLeft: 50
    }}>
      <h2 style={{
        color: "#fffffe",
        fontWeight: 600,
        fontSize: 45
      }}>
        {state.teamName}</h2>

      <Chat teamId={state._id} />

      <VideoCall/>

      <Divider orientation="left" style={{ width: 100 }}>Team Members</Divider>
      {
        Array.isArray(users) && users.length < 3 ? <AddMemBer teamid={state.teamid} usersLen={users.length} /> : <p>can not add members</p>
      }

      <div style={{
        background: "#3b1b27"
      }} class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {
          Array.isArray(users) === false ? <div className="container" style={{
            textAlign: "left",
            display: "flex"
          }}>
            <h4 style={{
              color: "#fffffe",
              fontWeight: 600,
              fontSize: 45
            }}>No Members</h4>

          </div> : users.map((ele) => (
            <>
              <div className="col" onClick={() => alert(ele._id)}>
                <Card

                  onMouseOver={() => setCardcol("#230a10")}
                  onMouseOut={() => setCardcol("#120609")}

                  style={{
                    width: 300,
                    background: cardcol,
                    border: "none",
                    borderRadius: "20px"
                  }}

                  actions={[
                    <DeleteOutlined key="setting" onClick={() => DelFromArray(state.teamid, { "teamMembers": ele._id })} />,
                  ]}
                >

                  <h3 style={{
                    color: "#fffffe",
                    fontSize: 25,
                    fontWeight: 500,
                  }}>
                    {ele.userName}
                  </h3>

                  <h3 style={{
                    color: "#fffffe",
                    fontSize: 25,
                    fontWeight: 500,
                  }}>
                    {ele.userEmail}
                  </h3>

                </Card>
              </div>
            </>
          ))
        }
      </div>

      <Divider orientation="left" style={{ width: 100 }}>Team Projects</Divider>
      {
        projects.length < 3 ? <button>
          <ProjCreate Teamid={state._id} />
        </button>
          : <p style={{
            color: "#ffb5d2",
            fontSize: 25,
            fontWeight: 500,
          }}>can not add projects</p>
      }

      <div style={{
        background: "#3b1b27"
      }} class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {
          Array.isArray(projects) === false ? <div className="container" style={{
            textAlign: "left",
            display: "flex"
          }}>
            <h4 style={{
              color: "#fffffe",
              fontWeight: 600,
              fontSize: 45
            }}>No Projects</h4>

          </div> : projects.map((item) => {
            let RD = Math.round((new Date(item.SubmissionDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) + 1
            return (
              <>
                <div className="col" onClick={() => alert(item._id)}>
                  <Card
                    style={{
                      width: 300,
                    }}
                    actions={[
                      <EditOutlined key="edit" onClick={() => handleNavigation(item._id, item)} />,
                      <DeleteOutlined key="setting" onClick={() => delProj(item._id)} />,
                      <CheckCircleOutlined onClick={() => updateProj(item._id)} />
                    ]}
                  >
                    <Meta
                      title={item.projectName}
                    />
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
                        }}>
                          {RD}
                        </p>
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

                    {/* conatiner 3 */}
                    <div className="d-flex p-1 m-1 container">
                      <div className="row">
                        <span>status</span>
                        <p>{item.status}</p>
                      </div>
                    </div>

                  </Card>
                </div>
              </>)
          })
        }
      </div>

    </div>

  )
}

export default TeamDetail

export async function getUserTeams(id) {
  try {
    const data = await (await axios.get(`http://localhost:4000/teams/${id}`)).data
    console.log(data)
    return [data.teamMember, data.teamdata, data.Projects]
  } catch (error) {
    console.log(error)
  }
}

async function addToArray(teamsId, data) {
  try {
    const res = await axios.put(`http://localhost:4000/teams/arrAdd/${teamsId}`, data)
    alert("team member added")
  } catch (error) {

  }
}

async function DelFromArray(teamsId, data) {
  try {
    const res = await axios.put(`http://localhost:4000/teams/arrDel/${teamsId}`, data)
    alert("team member removed")
  } catch (error) {

  }
}

async function delProj(projId) {
  try {
    const res = await axios.delete(`http://localhost:4000/projects/${projId}`)
    alert("project removed")
  } catch (error) {
    console.log(error)
  }
}

async function updateProj(projId) {
  try {
    const res = await axios.put(`http://localhost:4000/projects/${projId}`, { "status": "completed" })
    alert("project status changed")
  } catch (error) {
    console.log(error)
  }
}

export function AddMemBer({ teamid }) {
  //stores user's _id
  const [state, setState] = React.useState("")
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    const obj = { "teamMembers": state }
    try {
      console.log(await axios.put(`http://localhost:4000/teams/teamMembers/${teamid}`, obj))
    } catch (error) {
      console.log(error)
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add MEmber
      </Button>
      <Modal title="add Member" open={isModalOpen} onCancel={handleCancel}>
        <TextField id="outlined-basic" onChange={(e) => setState(e.target.value)} name="user Id" placeholder='Add user Id ' label="add user Id" variant="outlined" />
        <button onClick={handleOk}>add member</button>
      </Modal>
    </>
  )
}

