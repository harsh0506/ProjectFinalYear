/*
import { TeamMembers, UserTask } from '../../Helper/globeState'
const [Team_Members, setTeam_Members] = React.useState([{
    label: "", value: ""
  }])
   
TaskList
*/


import axios from 'axios'
import React from 'react'
import { TeamMembers, UserTask, projectState } from '../../Helper/globeState'
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined, CloseCircleTwoTone, CheckCircleOutlined, FireTwoTone } from '@ant-design/icons';
import { Avatar, Card, Tooltip, Divider } from 'antd';
import { TextField } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Modal, Toggle, Cascader, ButtonToolbar, Button, Loader, Placeholder, DatePicker } from 'rsuite';
import { useHookstate } from '@hookstate/core';

const { Meta } = Card;

const Prioity = [{ value: "high", label: "high" },
{ value: "medium", label: "medium" },
{ value: "low", label: "low" },
]

const schema = {
  color: "",
  dateOfActualSubmission: "",
  taskName: "",
  priority: "",
  userId: "",
  userName: "",
  SubmissionDate: "",
  progress: "0",
  dateOfCreation: "",
  taskId: ""
}

function DummyTask1() {

  const Proj = useHookstate(projectState)

  const TeamMemberS = useHookstate(TeamMembers)

  const [ProjectId, setProjectId] = React.useState({
    _id: "",
    projectId: ""
  })

  const [assigedTask, setAssignedTask] = React.useState([{ _id: "", ...schema }])

  const [completedTask, setCompletedTask] = React.useState([{ _id: "", ...schema }])

  const [state, setState] = React.useState(schema)

  const [error, setError] = React.useState()

  const [personal, setPersonal] = React.useState(true)

  const [teamAdminId, setTeamAdminId] = React.useState("")

  const [Btnstate, setBtnstate] = React.useState("create")

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [Team_members, setTeam_members] = React.useState([{
    value: Proj.get().teamAdminId, label: "self"
  }])

  /*const [Team_Members, setTeam_Members] = React.useState([{
    label: "", value: ""
  }])*/

  React.useEffect(() => {
    setProjectId({ _id: Proj.get()[0]._id, projectId: Proj.get()[0].projectId })
    //setTeam_Members(TeamMemberS.get())
    GetCalendarEvents(Proj.get()[0]._id).then((res) => {
      setAssignedTask(res[0])
      setCompletedTask(res[1])
      setTeamAdminId(res[2])
      setPersonal(res[3])
      setTeam_members(res[4])
    }).catch(err => setError(err.message))
  }, [])

  const showModal = (ele) => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      if (Btnstate === "create") {
        setState(prev => {
          return {
            ...prev,
            userId: (state.userId === '') ? teamAdminId : state.userId
          }
        })
        console.log(state)
        const res = await SendData(ProjectId.projectId, { "TaskList": state })
      }
      if (Btnstate === "update") {
        const info = {
          Tid: state._id,
          data: {
            "TaskList.$.taskName": state.taskName,
            "TaskList.$.priority": state.priority,
            "TaskList.$.SubmissionDate": state.SubmissionDate,
            "TaskList.$.dateOfCreation": state.dateOfCreation,
          }
        }
        const mj = await UpdateTask(ProjectId._id, info)
      }

      for (const key in state) {
        state[key] = "";
      }
      setState(state)
      setBtnstate("create")
    } catch (error) {
      console.log(error)
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setBtnstate("create")
    for (const key in state) {
      state[key] = "";
    }
    setState(state)
  }

  async function HandleUpdateData(ele) {
    try {
      console.log(ele)
      setState(ele)
      setBtnstate("update")
      setIsModalOpen(true);
    } catch (error) {
      console.log(error)
    }
  }

  if (error) { return (<p>{error}</p>) }

  return (
    <div className='' style={{
      background: "#3b1b27"
    }}>

      <div className="container ">

        <div className="container" style={{
          textAlign: "left"
        }}>
          <h3 style={{
            color: "#dabbc4"
          }}>TaskList</h3>
        </div>

        <div className="container" style={{
          textAlign: "left"
        }}>
          <Button onClick={showModal}>Create Task</Button>
        </div>

        <Modal title="Create Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <div className="container" style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}>
              {
                Btnstate === "create" ? <h2>Create Task</h2> : <h2>Update Task</h2>
              }

              <TextField
                label="TaskNAme"
                value={state.taskName}
                onChange={(e) => setState(prev => { return { ...prev, taskName: e.target.value } })}
              />
              {/* to set creation date */}
              <DateTimePicker
                label="Start Date"
                value={state.dateOfCreation}
                onChange={(e) => setState(prev => { return { ...prev, dateOfCreation: e._d } })}
                renderInput={(params) => <TextField {...params} />}
              />

              {/* to set submisson date */}
              <DateTimePicker
                label="Submission Date"
                value={state.SubmissionDate}
                onChange={(e) => setState(prev => { return { ...prev, SubmissionDate: e._d } })}
                renderInput={(params) => <TextField {...params} />}
              />

              {/* add priotiry drop down */}
              <Cascader
                placeholder="priority"
                data={Prioity}
                onSelect={(e) => setState({ ...state, priority: e.value })}
                style={{ width: 224, color: "black", zIndex: 1000 }} />

              {/* assign teamMember drop down */}

              {Team_members.length === 0 ? <p>self Task</p> :
                <Cascader
                  placeholder="TM"
                  data={Team_members}
                  onSelect={(e) => setState({ ...state, userName: e.label, userId: e.value })}
                  style={{ width: 224, color: "black" }} />

              }
              <div className="d-flex container" style={{
                gap: 20,
                alignItems: "center",
                justifyContent: "center",
                display: "flex"
              }}>
                <Button type="primary" onClick={handleCancel}>
                  close <CloseCircleTwoTone />
                </Button>
                {
                  Btnstate === "create" ?
                    <Button type="primary" onClick={handleOk}>
                      Create
                    </Button> :
                    <Button type="primary" onClick={handleOk}>
                      Update
                    </Button>
                }

              </div>
            </div>
          </LocalizationProvider>
        </Modal>
      </div>


      <div className="container" style={{
        width: "200vw",
      }}>
        <Divider orientation="left" style={{ width: 100, color: "pink", display: "flex", flexDirection: "row" }}>
          <p style={{ marginRight: 5 }}>Personal Project
            <Tooltip title="You can only make 3 Projects">
              <InfoCircleOutlined style={{ marginLeft: 15 }} />
            </Tooltip>
          </p>
        </Divider>
        <DisplayTask Tasks={assigedTask} HandleUpdateData={HandleUpdateData} msg={"assigned"} />

      </div>

      <br />
      <div className="container" style={{
        width: "200vw",
      }}>
        <Divider orientation="left" style={{ width: 100, color: "pink", display: "flex", flexDirection: "row" }}>
          <p style={{ marginRight: 5 }}>Personal Project
            <Tooltip title="You can only make 3 Projects">
              <InfoCircleOutlined style={{ marginLeft: 15 }} />
            </Tooltip>
          </p>
        </Divider>
        <DisplayTask Tasks={completedTask} HandleUpdateData={HandleUpdateData} msg={"completed"} />
      </div>


    </div >
  )
}

export default DummyTask1

export function DisplayTask({ Tasks, HandleUpdateData, msg, ProjectId }) {
  const [cardcol, setCardcol] = React.useState("#120609")

  console.log(msg)
  return (
    <>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 p-2 my-2">
        {
          Tasks.map((ele) => {
            return (
              <div className="col ">
                <Card
                  style={{
                    width: 300,
                    background: cardcol
                  }}

                  actions={[
                    <DeleteOutlined key="DeleteOutlined" onClick={() => DeleteItem(ProjectId, { "Parentkey": ele._id })} />,
                    <EditOutlined key="edit" onClick={() => HandleUpdateData(ele)} />,
                    <CheckCircleOutlined key="CheckCircleOutlined" onClick={() => {
                      UpdateTask(ProjectId, {
                        Tid: ele._id,
                        data: {
                          "TaskList.$.Status": "completed",
                          "TaskList.$.dateOfActualSubmission": new Date()
                        }
                      }).then(res => console.log(res)).catch(err => console.log(err))
                    }} />,
                  ]}
                >
                  <p style={{
                    color: "#ffb5d2",
                    fontSize: 25,
                    fontWeight: 500,
                  }}>
                    {ele.taskName}
                  </p>

                  <div className="d-flex p-1 m-1 container">
                    <div className="row">
                      <span style={{
                        color: "#fffffe",
                        fontWeight: 300,
                        fontSize: 20
                      }}
                      >priority</span>
                      <FireTwoTone twoToneColor={ele.color} style={{ width: 23, padding: 3, }} />
                    </div>

                    <div className="d-flex p-1 m-1 container">

                      <DisplayDays
                        SubmissionDate={ele.SubmissionDate}
                        dateOfActualSubmission={ele.dateOfActualSubmission}
                        Status={ele.Status}
                      />
                    </div>
                  </div>
                </Card>

              </div>)
          })

        }
      </div>
    </>
  )
}

export function DisplayDays({ SubmissionDate, dateOfActualSubmission, Status }) {
  const RD = Math.round((new Date(SubmissionDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) + 1
  return (
    <div className="row">
      {

        (Status === "assigned") ? (
          <>
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
          </>
        )
          : (
            <>
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
                }}>{
                  new Date(dateOfActualSubmission).getDate()}/{new Date(dateOfActualSubmission).getMonth() + 1}/{new Date(dateOfActualSubmission).getFullYear()
                }</p>
              </div>
            </>

          )}
    </div>
  )


}

//api  call to get all the data of project  mainly tasklist
export async function GetCalendarEvents(id) {
  try {
    const Tasks = await (await axios.get(`http://localhost:4000/projects/Tasks/${id}`)).data
    console.log(Tasks)
    let assigedTask = [], completedTask = [];
    Tasks.TaskList.map(a => {
      a.Status === "assigned" ? assigedTask.push(a) : completedTask.push(a)
    });
    return [assigedTask, completedTask, Tasks.teamAdminId, Tasks.personal, Tasks.tm]
  } catch (error) {
    console.log(error)
  }

}

export async function SendData(Pid, d) {
  try {
    const res = await axios.put(`http://localhost:4000/projects/arrAdd/${Pid}`, d)
    return res
  } catch (error) {
    return error
  }
}
/* 
The person who has been assigned the task can delete the that task, 
for achieving that the code must check if the user id of the current task is equal to the user id of the assigned user
if same they can delete the task else error will be thrown.
*/


export async function DeleteItem(id, d) {
  try {
    const data = await axios.put(`http://localhost:4000/projects/projDelete/${id}`, d)
    alert("Deleted Successfully")
    return data
  } catch (error) {
    return error
  }
}

export async function UpdateTask(Pid, d) {
  try {
    const m = await (await axios.put(`http://localhost:4000/projects/arrayUpdateAll/${Pid}`, d)).data

    return m

  } catch (error) {
    return error
  }

}

