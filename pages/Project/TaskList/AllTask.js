import { useHookstate } from '@hookstate/core'
import React from 'react'
import { UserTask, projectState } from '../../Helper/globeState'
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card, Button, Modal, Input } from 'antd';
import { Task } from '../../Helper/globeState/InitialStae';
import axios from 'axios';

const { Meta } = Card;

/*
this functional component deal with display of taskk , updation and deletion of it
*/
function AllTask() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  //global state instant to get globalstate of current project
  const Proj = useHookstate(projectState)
  //it is the state to store array of task from projects
  const [state, setState] = React.useState([Task])
  //it is single task of the project which is been clicked
  const [task, setTask] = React.useState(Task)

  React.useEffect(() => {
    setState(Proj.get()[0].TaskList)
    console.log(state)
  }, [])

  const HandleUpdate = async (item) => {
    setTask(item)
    setIsModalOpen(true)
    console.log(item)
  }

  const HandleDelete = async (item) => {
    try {
      /*
      call the DelData method and pass the project _id and task _id
      */
    } catch (error) {
      
    }
    console.log(item)
  }

  return (
    <>
      <div class="album py-5 bg-light">
        <div class="container">

          <Edit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} task={task} setTask={setTask} />

          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {
              state.map((ele) => {
                return (
                  <div className="col">
                    <Card
                      style={{
                        width: 300,
                      }}
                      cover={
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                      actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" onClick={() => HandleUpdate(ele)} />,
                        <DeleteOutlined key={"delete"} onClick={() => HandleDelete(ele)} />,
                        <EllipsisOutlined key="ellipsis" />,
                      ]}
                    >
                      <Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={ele.taskName}
                        description="This is the description"
                      />
                    </Card>
                  </div>
                )
              })
            }


          </div>
        </div>
      </div>
    </>
  )
}

export default AllTask

/*
this below is modal which will be displayed if you click on edit button of task
the modal will have details to clicked event.
the person can only edit the taskName , priority , submissionDate and progress fields 
either they can change all the fields or fields they want to.
but as of now just chnage taskName

after changing the state , and if the person is happy they can make an api call to backend to update
the database, the http request used will be put request.
after the request is made the global state of task must be updated using hookstate's set() method.
The variable Proj which is declared at top can be used,its the instance of globalstate of project.

after updating state of task, then making api call and updating globalstae of project using api, the
acknowledgment must be given to the user in some form such as alertbox.
Then modal is closed and updated task will be shown
*/
export const Edit = ({ isModalOpen, setIsModalOpen, task, setTask }) => {

const taskId = task._id
  const handleOk = () => {
    /*

    call the updateData function send the id of the task and data,data must contain Parentkey(TaskList) ,
    key_to_change(the thing you want to change such as taskName , submissionDate or priority), value(the actual va
    lue you want to change). in object
    example
      {
        Parentkey:"TaskList",
        key_to_change:"taskName",
        value:"task 123"
      }

      set the global state of project

      steps-
    1)create the object of the data you want to change.
    2)get the task id from the task object stored in taskId
    3)call the updateData function and pass task id as first parameter and the object as second 

      these steps are remained to be implemented
     */
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log(task.taskName)

  return (
    <>
      <Modal title="Update Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input defaultValue={task.taskName} onChange={(e) => {

          setTask({ ...task, taskName: e })

        }} />

      </Modal>
    </>
  );
};

/*
given below is api call function 
*/

async function updateData(id, data) {
  try {
    return await axios.put(
      `http://localhost:4000/projects/arrayUpdate/${id}`,
      data
    )
  } catch (error) {

  }
}

/*
given below is api call to delete the task
*/

async function DelData(id , data ){
  try {
    return await axios.put(
      `http://localhost:4000/projects/projDelete/${id}`,
      data
    )
  } catch (error) {
    return error
  }
}