import { useHookstate } from '@hookstate/core'
import React from 'react'
import { projectState } from '../../Helper/globeState'

function Dashboard() {

  //the project global state to get current project details
  const ProjectDetail = useHookstate(projectState)

  React.useEffect(()=>{
    console.log(ProjectDetail.get())
  },[])

  return (
    <>
      <div class="container" style={{ backgroundColor: "pink" }}>
        <div class="row" style={{ backgroundColor: "darkgrey" }}>

          <div class="col-sm p-1 m-1" style={{ backgroundColor: "red" }}>
            One of three columns
          </div>

          <div class="col-sm p-1 m-1" style={{ backgroundColor: "red" }}>
            One of three columns
          </div>

          <div class="col-sm p-1 m-1" style={{ backgroundColor: "red" }}>
            One of three columns
          </div>

        </div>
      </div>
    </>

  )
}

export default Dashboard