import React from 'react'
import { Modal, Cascader, ButtonToolbar, Button, Loader, Placeholder, DatePicker } from 'rsuite';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ModalTodo from './Modal'
import axios from 'axios';
import { UserTeams } from '../../Helper/globeState/InitialStae';


const data = [{ value: "harsh", label: "harsh" },
{ value: "raju", label: "raju" },
{ value: "pax", label: "pax" },
]
const Prioity = [{ value: "high", label: "high" },
{ value: "medium", label: "medium" },
{ value: "low", label: "low" },
]

function Todolist({Teamid , personal}) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [teamid , setTeam] = React.useState("")
  React.useEffect(()=>{
    setTeam(Teamid)
  },[])
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (

    <>
    <div className="container" >
    <Button onClick={showModal}>Create Project</Button>
      <ModalTodo
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        data={data}
        Prioity={Prioity}
        teamid={teamid}
        personal={personal}
      />
    </div>
        
    </>

  );
}

export default Todolist

export async function getUser  (info){
try {
  //const d = await (await axios.get("http://localhost:3000/user/users",info)).data
  console.log(info)
} catch (error) {
  
}
}