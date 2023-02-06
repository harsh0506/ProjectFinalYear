import { useHookstate } from '@hookstate/core'
import { Button, Card , Modal } from 'antd'
import React from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined, FireTwoTone } from '@ant-design/icons';
import { projectState } from '../../Helper/globeState'
import { UserProj } from '../../Helper/globeState/InitialStae'
import axios from 'axios';
import { useRouter } from 'next/router';
const { Meta } = Card;


export async function getData (id){
  try {
    console.log( await (await axios.get(`http://localhost:4000/projects/SingleProject/${String(id)}`)).data)
    return await (await axios.get(`http://localhost:4000/projects/SingleProject/${String(id)}`)).data[0]
  } catch (error) {
    
  }
}

//function display dashboard of the project
function Dashboard() {

  const router = useRouter()

  //the project global state to get current project details
  const ProjectDetail = useHookstate(projectState)

  //usestate to save the data
  const [state, setState] = React.useState(UserProj)
  const [PIconColor, setPIconColor] = React.useState("Red")

  React.useEffect(() => {
    console.log(router.query)
    console.log(ProjectDetail.get())
    //setState(ProjectDetail.get()[0])
    getData(router.query.id).then(res => setState(res)) 
    let p = "ProjectDetail.get().priority"
    if (p.toLowerCase() === "high") {
      setPIconColor("Red")
    }
    else if (p.toLowerCase() === "medium") {
      setPIconColor("yellow")
    }
    else if (p.toLowerCase() === "low") {
      setPIconColor("green")
    }
    else {
      setPIconColor("Grey")
    }

  }, [])

  return (
    <>
      <div class="container" >
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

          <div class="col" style={{ backgroundColor: "red" }}>
            <FirstCol
              id = {state._id}
              PName={String(state.projectName)}
              SDate={`${new Date(state.SubmissionDate).getDate()}/${new Date(state.SubmissionDate).getMonth() + 1}/${new Date(state.SubmissionDate).getFullYear()}`}
              RDays={Math.round((new Date(state.SubmissionDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) + 1}
              IColor = {PIconColor}
            />

          </div>

          <div class="col" style={{ backgroundColor: "red" }}>
            One of three columns
          </div>

          <div class="col" style={{ backgroundColor: "red" }}>
            One of three columns
          </div>

        </div>
      </div>

    </>

  )
}

export default Dashboard



export function ModalView({isModalOpen , setIsModalOpen}){

  const handleOk = () => {
    setIsModalOpen(false);
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return(
    <Modal title="Update Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
         {djjdjd}
        </Modal>
  )
}

export function FirstCol({ id , PName, SDate , RDays , IColor }) {

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  async function updateData( key , value){
    try {
      console.log(axios.put(`http://localhost:4000/projects/${id}` , {key : value}))
    } catch (error) {
      
    }
  }

  return (
    <>

   
    {/* card to show project name */}
      <Card
        style={{
          width: 300,
          backgroundColor: "Pink",
          margin:5
        }}

        actions={[
          <EditOutlined key="edit" onClick={()=>""} />
        ]}

      >
        <span>name of project</span>
        <p style={{ fontSize: 40, fontWeight: 100 }}>{PName}</p>
      </Card>

 {/* card to show Submission date */}
      <Card
        style={{
          width: 300,
          backgroundColor: "Pink",
          maxHeight: 120,
          minHeight: 100,
          margin:5
        }}
      >
        <span>Date of Submission</span>
        <p style={{ fontSize: 25, fontWeight: 100, height: 200 }}>{SDate}</p>
      </Card>
{/* card to show something */}
      <Card
        style={{
          width: 300,
          backgroundColor: "Pink",
          maxHeight: 120,
          minHeight: 100,
          margin:5
        }}
      >
        <span>Date of Submission</span>
        <p style={{ fontSize: 25, fontWeight: 100, height: 200 }}>{SDate}</p>
      </Card>

{/* cards to show Priority and remaining days */}
      <div className='d-flex container' style={{ margin:5 , gap:15}}>
        <Card
          style={{
            width: 130,
            backgroundColor: "Pink",
            maxHeight: 120,
            minHeight: 100,
            flexDirection:"column"
          }}
        >
          <span>Priority</span>
          <FireTwoTone style={{ width: 5 }} twoToneColor={IColor} />
        </Card>
        <Card
          style={{
            width: 130,
            backgroundColor: "Pink",
            maxHeight: 120,
            minHeight: 100
          }}
        >
          <span>Remaining Days</span>
          <p style={{ fontSize: 25, fontWeight: 100, height: 200 }}>{RDays}</p>
        </Card>
      </div>
    </>
  )
}