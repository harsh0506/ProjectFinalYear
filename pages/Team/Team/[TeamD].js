import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import ProjCreate from "../../Project/Create"
import { CurTeam, projectState, userProjects } from '../../Helper/globeState'
import { Avatar, Card, Modal } from 'antd';
import { Panel, Placeholder, Row, Col, Divider } from 'rsuite';
import { useHookstate } from '@hookstate/core';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined, FireTwoTone, CheckCircleOutlined } from '@ant-design/icons';
import { UserProj, UserTeams, userDetailsIS } from '../../Helper/globeState/InitialStae'
import { TextField } from '@mui/material'
const { Meta } = Card;


function TeamDetail({ }) {
  //routers object
  const router = useRouter()

  //the array of project
  let teamMem = []

  //global state of the team
  const Team = useHookstate(CurTeam)
  //global state of the user
  const Project = useHookstate(projectState)

  //local state to save the teams data
  const [state, setState] = React.useState(UserTeams)
  const [users, setUsers] = React.useState([userDetailsIS])
  const [projects, setProjects] = React.useState([UserProj])
  const [PriorityIconColor, setPriorityIconColor] = React.useState("red")

  //use callback function
  React.useCallback(() => getUserTeams(), [])

  //use effect to run at start of rendering
  React.useEffect(() => {
    console.log(router.query.id)
    console.log(Team.get())

    //setting set of global state
    setState(Team.get())

    //get all data aboutthe team
    getUserTeams(router.query.id).then((res) => {
      setUsers(res[0])
      setProjects(res[2])
    })
      .catch((err) => {
        console.log(err)
      })
  }, [getUserTeams])

  //navigate to project page
  async function handleNavigation(id, data) {
    try {
      Project.set(data)
      await router.push({
        pathname: `/Project/${id}`,
        query: { id }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container my-4'>
      <p style={{ fontSize: 40 }}>{state.teamName}</p>
      <Divider orientation="left" style={{ width: 100 }}>Team Members</Divider>
      {
        users.length < 3 ? <AddMemBer teamid={state.teamid} usersLen={users.length} /> : <p>can not add members</p>
      }

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {
          users[0].userEmail === "" ? <>No users</> : users.map((ele) => (
            <>
              <div className="col" onClick={() => alert(ele._id)}>
                <Card

                  style={{
                    width: 300,
                  }}

                  actions={[
                    <DeleteOutlined key="setting" onClick={() => DelFromArray(state.teamid, { "teamMembers": ele._id })} />,
                  ]}
                >
                  <Meta
                    avatar={<Avatar src={ele.profilepic} />}
                    title={ele.userName}
                    description={ele.userEmail}
                  />
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
          : <p>can not add projects</p>
      }



      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {

          projects[0].projectName === "" ? <>No Projects</> : projects.length === 0 ? <p>no projects</p> : projects.map((item) => {
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
                    {/*container 1*/}
                    <div className="d-flex p-1 m-1 container">
                      {/*SubmissionDate*/}
                      <div className="row">
                        <span>submission Date</span>
                        <p>
                          {
                            `${new Date(item.SubmissionDate).getDate()}/${new Date(item.SubmissionDate).getMonth() + 1}/${new Date(item.SubmissionDate).getFullYear()}`
                          }
                        </p>
                      </div>
                      {/*Priority*/}
                      <div className="row">
                        <span>priority</span>
                        <FireTwoTone style={{ width: 5 }} twoToneColor={PriorityIconColor} />
                      </div>
                    </div>

                    {/*container 2*/}
                    <div className="d-flex p-1 m-1 container">
                      {/*Remaining days
                    the text color must change as per remianing days value i.e if small number then it can be red as date of submission is close and if number is big then it can be green to show we still time
                    it is yet to implemet
                  */}
                      <div className="row">
                        <span>remaining Days</span>
                        <p>{
                          Math.round((new Date(item.SubmissionDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) + 1
                        }</p>
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
      <button onClick={showModal}>add member</button>
      <Modal title="add user" open={isModalOpen} onCancel={handleCancel}>
        <TextField id="outlined-basic" onChange={(e) => setState(e.target.value)} name="user Id" placeholder='Add user Id ' label="add user Id" variant="outlined" />
        <button onClick={handleOk}>add member</button>
      </Modal>
    </>
  )
}