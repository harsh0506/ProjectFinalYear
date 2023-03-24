/*
Calendar is a component that shows you all the events of the specific project,let you add event ,change etc

1) display All events
2) create the events
3) update the events
4) Delete events

import { projectState } from '../../Helper/globeState'
import { useHookstate } from '@hookstate/core'

const Proj = useHookstate(projectState)
const [ProjectId , setProjectId] = React.useState("")
setProjectId(Proj.get()[0]._id)


the display must have weekly, daily and monthly views of the system
the task creation must be with  the model


*/
import { projectState } from '../../Helper/globeState'
import { useHookstate } from '@hookstate/core'
import React from 'react'
import { TextField } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import axios from "axios";
import { EditOutlined, EllipsisOutlined, DeleteOutlined, FireTwoTone } from '@ant-design/icons';
import { Card, Button, Modal } from 'antd';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";

const { Meta } = Card;

const schema = {
  event_id: "",
  title: "",
  description: "",
  color: "blue",
  start: "",
  end: "",
  date: ""
}

const localizer = momentLocalizer(moment)

function DummyCal2() {

  const Proj = useHookstate(projectState)

  const [ProjectId, setProjectId] = React.useState({
    _id: "",
    projectId: ""
  })

  const [value, setValue] = React.useState(new Date());

  //for single event manipulation , handling creation ,updation of event 
  const [state, setState] = React.useState(schema);

  //today's events state, array showing today's event
  const [todayEvent, setTodayEvent] = React.useState([schema])

  //previous events state
  const [prevEvents, setPrevEvents] = React.useState([schema])

  //future events state
  const [futureEvents, setFutureEvents] = React.useState([schema])

  //has all user events
  const [userEvents, setUserEvents] = React.useState([schema])

  //this state handles error
  const [error, setError] = React.useState(null);

  const [events, setEvents] = React.useState([schema])

  let m = [], n = [], o = [], p = [];

  React.useEffect(() => {
    setProjectId({ _id: Proj.get()[0]._id, projectId: Proj.get()[0].projectId })
    GetCalendarEvents(Proj.get()[0]._id).then(res => {
      m = res
      console.log(m)
      m.forEach(element => {
        element.start = new Date(
          new Date(element.start).getFullYear(),
          new Date(element.start).getMonth() + 1,
          new Date(element.start).getDate(),
          new Date(element.start).getHours(),
          new Date(element.start).getMinutes(),
          new Date(element.start).getSeconds())
        element.end = new Date(
          new Date(element.end).getFullYear(),
          new Date(element.end).getMonth() + 1,
          new Date(element.end).getDate(),
          new Date(element.end).getHours(),
          new Date(element.end).getMinutes(),
          new Date(element.end).getSeconds()
        )
        if (element.end >= new Date() && element.start <= new Date()) { n.push(element) }
        if (element.end >= new Date() && element.start > new Date()) { o.push(element) }
        if (element.end <= new Date() && element.start <= new Date()) { p.push(element) }
        if (
          element.end.getDate() === new Date().getDate() && element.end.getMonth() + 1 === new Date().getMonth() + 1 &&
          element.end.getFullYear() === new Date().getFullYear()
        ) {
          setTodayEvent([element]);
        }

      });
      setEvents(m)
      setUserEvents(n);
      setFutureEvents(o);
      setPrevEvents(p);
    }
    ).catch(err => console.log(err))


  }, [userEvents])

  const handleChange = (value, name) => {
    setState((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  //handle submission of data
  function handleSubmit() {
    sendData(ProjectId.projectId, { "calendar": state }).then(res => {
      for (const key in state) {
        state[key] = "";
      }
      setState(state)
    }).catch(err => console.log(err))

  }


  return (
    <>
      <div className='' style={{
        padding: "50",
        height: "100vh",
        background: "#3b1b27",
        width: "100vw"
      }}>

        <div className="container" style={{
          textAlign: "left"
        }}>
          <h3 style={{
            color: "#ffff",
          }}>Calendar</h3>
        </div>


        <div className="container">

          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" style={{
            display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"
          }}>
            <div className="row">
              <p>calendar</p>
              <StaticDatePickerLandscape value={value} setValue={setValue} events={events} />
            </div>
            <div className='container' style={{
              background: "pink",
              height: 300,
              display: "flex",
              flexDirection: "column",
              gap: 30,
              fontSize: 30,
              alignItems: "center"
            }}>
              <p>Creating Event</p>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TextField
                  label="Title"
                  value={state.title}
                  onChange={(e) => handleChange(e.target.value, "title")}
                  error={!!error}
                  helperText={!!error && error["title"]}
                  fullWidth
                />
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" style={{
                  display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"
                }}>

                  <DateTimePicker
                    label="Starting Date"
                    value={state.start}
                    onChange={(e) => handleChange(e._d, "start")}
                    renderInput={(params) => <TextField {...params} />}
                  />

                  <DateTimePicker
                    label="Ending Date"
                    value={state.end}
                    onChange={(e) => handleChange(e._d, "end")}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <Button onClick={handleSubmit} style={{
                  background: "#3b1b27",
                  color: "white"
                }}>Confirm</Button>
              </LocalizationProvider>
            </div>
            <div style={{ maxWidth: "50%", maxHeight: 300, overflowY: "scroll" }} className="row">
              <p style={{
                color: "#ffb5d2",
                fontSize: 25,
                fontWeight: 500,
              }}>Today's event</p>
              <TodayEvents userEvents={todayEvent} value={value} />
            </div>
          </div>
        </div>


        <p style={{
          color: "#ffb5d2",
          fontSize: 25,
          fontWeight: 500,
        }}>Event</p>
        <div style={{ display: "flex", gap: 50 }} className="d-flex container">



          <div style={{ maxWidth: "50%", maxHeight: 200, overflowY: "scroll" }} className="row">
            <p style={{
              color: "#ffb5d2",
              fontSize: 25,
              fontWeight: 500,
            }}>ongoing evets</p>
            <OnGoingTAsk ProjectId={ProjectId} userEvents={userEvents} EmptyHeaderText={"No Ongoing events"} />
          </div>

          <div style={{ maxWidth: "50%", maxHeight: 200, overflowY: "scroll" }} className="row">
            <p style={{
              color: "#ffb5d2",
              fontSize: 25,
              fontWeight: 500,
            }}>Upcoming Events</p>
            <OnGoingTAsk ProjectId={ProjectId} userEvents={futureEvents} EmptyHeaderText={"No Upcoming Events"} />
          </div>

          <div style={{ maxWidth: "50%", maxHeight: 200, overflowY: "scroll" }} className="row">
            <p style={{
              color: "#ffb5d2",
              fontSize: 25,
              fontWeight: 500,
            }}>Previous Events</p>
            <OnGoingTAsk ProjectId={ProjectId} userEvents={prevEvents} EmptyHeaderText={"No Previous Events"} />
          </div>
        </div>
      </div>
    </>
  )
}

export function OnGoingTAsk({ userEvents, EmptyHeaderText, ProjectId }) {
  const [state, setState] = React.useState({
    end: "",
    title: "",
    _id: "",
    start: ""
  })
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const showModal = (ele) => {
    setState(ele)
    setIsModalOpen(true);
  };
  const handleOk = () => {
    console.log(state)

    const d = {
      Cid: state._id,
      data: {
        "calendar.$.start": state.start,
        "calendar.$.end": state.end,
        "calendar.$.title": state.title,
      }
    }

    updateData("63ac28cbf8f9aa38a853831b", d).then(res => console.log(res)).catch(err => console.log(err))
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <DateTimePicker
            label="start date"
            value={state.start}
            onChange={(e) => setState(prev => { return { ...prev, start: e._d } })}
            renderInput={(params) => <TextField {...params} />}
          />

          <DateTimePicker
            label="end date"
            value={state.end}
            onChange={(e) => setState(prev => { return { ...prev, end: e._d } })}
            renderInput={(params) => <TextField {...params} />}
          />

          <TextField
            label="Title"
            value={state.title}
            onChange={(e) => setState(prev => { return { ...prev, title: e.target.value } })}
            fullWidth
          />

        </Modal>
        <div style={{ maxWidth: "50%" }} class="">
          {
            userEvents.length === 0 ? <p style={{
              color: "#ffb5d2",
              fontSize: 15,
              fontWeight: 500,
            }}>{EmptyHeaderText}</p> : userEvents.map((ele) => {

              return (
                <div className="col" style={{ maxWidth: "50%", minWidth: "40%" }} onClick={() => null}>
                  <Card
                    style={{
                      width: 300,
                      backgroundColor: "Pink"
                    }}

                    actions={[
                      <EditOutlined key="edit" onClick={() => showModal(ele)} />,
                      <DeleteOutlined key={"delete"} onClick={() => deleteObject(ProjectId._id, ele._id)} />,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}
                  >

                    <Meta
                      title={ele.title}
                    />
                    <br />
                    <FireTwoTone twoToneColor="#eb2f96" />
                  </Card>
                </div>
              )
            })
          }
        </div>
      </LocalizationProvider>
    </>
  )
}

export function TodayEvents({ userEvents }) {
  const [am, setAm] = React.useState([{
    event_id: "",
    title: "",
    description: "",
    color: "blue",
    start: "",
    end: "",
    date: ""
  }])
  React.useEffect(() => setAm(userEvents), [])

  return (
    <>
      <div className="container">
        <h3 style={{
          color: "#ffb5d2",
          fontSize: 25,
          fontWeight: 500,
        }}>{new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()}</h3>
        <div className="row">
          {
            am[0].end === "" && am[0].start === "" ? <h5 style={{
              color: 'white'
            }}>No Events for Today</h5> : am.map(ele => (<p>{ele.title}</p>))
          }
        </div>
      </div>
    </>
  )
}

export default DummyCal2

export async function sendData(id, data) {
  try {
    console.log(await (await axios.put(`http://localhost:4000/projects/arrAdd/${id}`, data)).data[0].calendar)
  } catch (error) {
    console.log(error)
  }
}

export async function GetCalendarEvents(id) {
  console.log(id)
  const info = await (await axios.get(`http://localhost:4000/projects/SingleProject/${id}`)).data[0]
  console.log(info)
  return info.calendar
}

export async function updateData(Pid, data) {
  try {
    return await axios.put(`http://localhost:4000/projects/arrayUpdateAllCalendar/${Pid}`, data)
  } catch (error) {
    console.log(error)
  }
}

export async function deleteObject(Pid, Cid) {
  try {
    await axios.put(`http://localhost:4000/projects/proj_delte_Cal/${Pid}`, { "Parentkey": Cid })
    alert("deleted")
  } catch (error) {

  }
}


export function StaticDatePickerLandscape({ value, setValue, events }) {
  return (
    <>
      <div className="container" >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 400 , color: 'white' }} />
      </div>

    </>
  );
}


