import React from 'react'
import { useHookstate } from '@hookstate/core';
import { usernameState } from '../Helper/globeState';
import { Avatar, Tooltip } from 'antd';
function ProfilePic() {
  const userImg = useHookstate(usernameState)
  var [url, setURL] = React.useState("")
  console.log(userImg.get())
  React.useEffect(() => setURL(userImg.get().profilepic), [url])
  
  return (
    <Avatar src={url} />
  )
}

export default ProfilePic