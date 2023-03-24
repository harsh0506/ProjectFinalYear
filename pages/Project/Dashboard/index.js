
{ /*
    const [state, setState] = React.useState(Schema)
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const router = useRouter()
  const proj = useHookstate(projectState)

  const [p, setP] = React.useState(UserProj)

  const [ProjectId, setProjectId] = React.useState({
    _id: "",
    projectId: ""
  })

  React.useEffect(() => {
    setP(proj.get())
    setProjectId({
      _id: router.query.id,
      projectId: router.query.ProjId
    })
    getData(router.query.id).then(res => setState(res)).catch(err => console.log(err))
  }, [])
  */}


import React from 'react'

import { useHookstate } from '@hookstate/core';
import { TeamMembers, UserTask, projectState } from '../../Helper/globeState'
import { EditOutlined, EllipsisOutlined, SettingOutlined, FireTwoTone } from '@ant-design/icons';
import { Button, Card, Avatar } from 'antd';
import { Modal, Toggle, Cascader, ButtonToolbar, Loader, Placeholder, DatePicker } from 'rsuite';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryScatter, VictoryLabel, VictoryPie } from 'victory';
import axios from 'axios';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { TextField } from "@mui/material";
import { useRouter } from 'next/router';
import { UserProj } from '../../Helper/globeState/InitialStae';

const localizer = momentLocalizer(moment)

const Prioity = [{ value: "high", label: "high" },
{ value: "medium", label: "medium" },
{ value: "low", label: "low" },
]

const a = [2, 3, 4]

const { Meta } = Card;

const Event = {
  event_id: "",
  title: "",
  description: "",
  color: "blue",
  start: "",
  end: "",
  date: ""
}

const Task = {
  dateOfActualSubmission: "",
  taskName: "",
  priority: "",
  userId: "",
  userName: "",
  SubmissionDate: "",
  progress: "0",
  dateOfCreation: "",
  taskId: "",
  Status: "",
}

const data_1_2 = { x: "", y: "" }

const Schema = {
  remainingDays: "",
  color: "",
  No_of_Completed_events: "", calendar: [Event], OnGoingEvents: [Event], PieChartData: { "completed": "", "assigned": "" },
  data1: [data_1_2], data2: [data_1_2],
  HighPrioityTask: [Task], TaskCloseToSubmission: [Task], priority: "", projectName: "", projectId: "", _id: "",
  PredictionData: "", SubmissionDate: ""
}


function Dummydashboard() {

  const [state, setState] = React.useState(Schema)
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const router = useRouter()
  const proj = useHookstate(projectState)

  const [p, setP] = React.useState(UserProj)

  const [ProjectId, setProjectId] = React.useState({
    _id: "",
    projectId: ""
  })

  React.useEffect(() => {
    setP(proj.get())
    setProjectId({
      _id: router.query.id,
      projectId: router.query.ProjId
    })
    getData(router.query.id).then(res => setState(res)).catch(err => console.log(err))
  }, [])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    updateData(ProjectId._id, {
      projectName: state.projectName,
      priority: state.priority,
      SubmissionDate: state.SubmissionDate
    }).then(res => null).catch(err => console.log(err))
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let D = ""

  return (
    <>
      <div style={{
        display: "flex",
        background: "#3b1b27"
      }} className="">

        <div className="" style={{ background: "#3b1b27" }}>

          <div className="container">

            <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>

              <LocalizationProvider dateAdapter={AdapterMoment}>

                <TextField
                  label="ProjectNAme"
                  value={state.projectName}
                  onChange={(e) => setState(prev => { return { ...prev, projectName: e.target.value } })}
                />

                {/* to set submisson date */}
                <DateTimePicker
                  label="submission Date"
                  value={state.SubmissionDate}
                  onChange={(e) => setState(prev => { return { ...prev, SubmissionDate: e._d } })}
                  renderInput={(params) => <TextField {...params} />}
                />

                {/* add priotiry drop down */}
                <Cascader
                  placeholder="priority"
                  data={Prioity}
                  onSelect={(e) => setState({ ...state, priority: e.value })}
                  style={{ width: 224, color: "black" }} />

                <Button type="primary" onClick={handleCancel}>
                  x
                </Button>
                <Button type="primary" onClick={handleOk}>
                  Submit
                </Button>


              </LocalizationProvider >
            </Modal >
          </div >


          <div className="conatainer" style={{
            padding: 40
          }}>
            <div className="container" style={{
              textAlign: "left"
            }}>
              <h3 style={{
                color: "#ffff",
              }}>Dashboard</h3>
            </div>

            <div className="container" style={{
              textAlign: "left", display: "flex", gap: 30,
            }}>
              <h2 style={{
                color: "#dabbc4",
                fontSize: 41
              }}>{state.projectName}</h2>
              <Button onClick={showModal}> <EditOutlined /> Update</Button>
            </div>

            <div className="container" style={{
              textAlign: "left", display: "flex", gap: 30,
            }}>
              <h5 style={{
                color: "#dabbc4"
              }}>{`${new Date(state.SubmissionDate).getDate()}/${new Date(state.SubmissionDate).getMonth()}/${new Date(state.SubmissionDate).getFullYear()}`}</h5>
            </div>
            <div className="conatiner" style={{
              display: "flex", alignItems: "center", textAlign: "center", marginLeft: 130
            }}>

              <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" style={{
                display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", width: 1000
              }}>
                {/* Remaining Days */}
                <div className="col" style={{
                  display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"
                }}>
                  <Card style={{ minWidth: 250, height: 200, alignItems: "center", justifyContent: "center", display: "flex", textAlign: "center" }} >
                    <div className="col">
                      <span style={{ fontSize: 20 }}>reamining Days</span>
                      <h3 style={{ fontSize: 100 }}>{
                        state.remainingDays
                      }</h3>
                    </div>
                  </Card>
                </div>

                {/* Priority */}
                <div className="col" style={{
                  display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"
                }} >
                  <Card style={{ maxWidth: 250, gap: 5, height: 200, alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column", textAlign: "center" }} >
                    <div className="col "  >
                      <p style={{ fontSize: 20 }}>Priority</p>
                      <FireTwoTone style={{ width: 305 }} twoToneColor={state.color} />
                    </div>
                  </Card>
                </div>

                {/* Completed Task */}
                <div className="conatiner col" style={{
                  display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"
                }}>
                  <Card style={{ minWidth: 250, gap: 5, height: 200, alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column", textAlign: "center" }} >
                    <div className="col "  >
                      <p style={{ fontSize: 20 }}>Completed Task</p>
                      <h3 style={{ fontSize: 100 }}>{String(state.No_of_Completed_events.completed)}</h3>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

          </div>

          <div className="">
            <div class="" style={{
              gap: 10, display: "flex", marginLeft: "12vw", alignItems: "center", justifyContent: "left", textAlign: "center", maxHeight: 400
            }}>
              <div className="row">
                <p>High priority events</p>
                <div style={{ overflowY: "scroll", maxWidth: 400, maxHeight: 300 }} class="">

                  {
                  Array.isArray(  state.HighPrioityTask[0]) !== false ? state.HighPrioityTask.map((ele) => (<CardComp
                      taskName={ele.taskName}
                      priority={ele.priority}
                      SubmissionDate={ele.SubmissionDate}
                    />))
                      :  Array.isArray( state.TaskCloseToSubmission[0]) !== false ?
                        state.TaskCloseToSubmission.map((ele) => (<CardComp
                          taskName={ele.taskName}
                          priority={ele.priority}
                          SubmissionDate={ele.SubmissionDate}
                        />)) :
                        (<CardComp
                          taskName="No tasks"
                          priority={""}
                          SubmissionDate=""
                        />)
                  }

                </div>
              </div>

              <div className="row" style={{ width: 500, paddingLeft: 56, height: 350, background: "white" }}>
                <TwoLinechartTaskDate state={state} />
              </div>
            </div>

          </div>

          {
            /*
            
           
                        <div className="container">
                            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" style={{
                                display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"
                            }}>
                                
                                <div className="row">
                                    <p>OnGoing event</p>
                                    <div style={{ overflowY: "scroll", maxHeight: 300 }} class="">
                                        {
                                            state.OnGoingEvents[0].title === "" ? <p>No Ongoing events , Go to Calendar tab</p> : state.OnGoingEvents.map((ele) => {
                                                return (<>
                                                    <div className="col" onClick={() => null}>
                                                        <Card
                                                            style={{
                                                                width: 300,
                                                                backgroundColor: "Pink",
                                                                margin: 10
                                                            }}
                                                        >
                                                            <Meta
                                                                title={ele.title}
                                                            />
                                                            <br />
                                                            <FireTwoTone twoToneColor="#eb2f96" />
                                                        </Card>
                                                    </div>
                                                </>)
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
            */
          }



        </div >
        <div className="continer" style={{ maxWidth: 400, marginTop: "10vh", background: "#3b1b27" }}>
          <Calendar
            localizer={localizer}
            events={state.calendar}
            //startAccessor="start"
            //endAccessor="end"
            style={{ height: 400, color: "white" }} />
        </div>
      </div >

    </>
  )
}

export default Dummydashboard

export function CardComp({ taskName, priority, SubmissionDate }) {
  return (
    <div className="col" style={{
      maxWidth: 300,
      backgroundColor: "Pink",
    }} onClick={() => null}>
      <Card
        style={{
          maxWidth: 300,
          backgroundColor: "Pink",
        }}
      >
        <Meta
          title={taskName}
        />
        <p>{Math.round((new Date(SubmissionDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) + 1
        }</p>
        <br />
        <FireTwoTone twoToneColor="#eb2f96" />
      </Card>
    </div>
  )
}

async function getData(id) {
  try {
    return await (await axios.get(`http://localhost:4000/projects/DashBoard/${id}`)).data
  } catch (error) {
    return error
  }
}

export async function updateData(id, data) {
  try {
    return await axios.put(`http://localhost:4000/projects/${id}`, data)
  } catch (error) {
    return error
  }
}

export function TwoLinechartTaskDate({ state }) {
  return (
    <VictoryChart style={{
      color: "white"
    }}>
      <VictoryAxis
        dependentAxis
        style={{
          color: "white"
        }}
        tickFormat={(x) => new Date(x).toDateString().slice(4)}
        label="Submitted Date"
      />
      <VictoryAxis
        style={{ padding: 5, color: "white" }}
        tickFormat={(x) => new Date(x).toDateString().slice(4)}
        label="Actual Submission Date"
      />
      <VictoryLabel
        text="Task Submission Dates"
        x={225}
        style={{
          color: "white"
        }}
        y={30}
        textAnchor="middle"
      />
      <VictoryLine
        data={state.data1}
        style={{ data: { stroke: "red" } }}
        label="Actual Submission Date"
      />
      <VictoryLine
        data={state.data2}
        style={{ data: { stroke: "blue" } }}
        label="Submitted Date"
      />
    </VictoryChart>
  );
}
