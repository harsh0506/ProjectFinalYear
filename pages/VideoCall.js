
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '../styles/Video.module.css'
import { Card, Button, Modal } from 'antd';
import React from 'react'


export default function Home() {
  const router = useRouter()
  const [room, setRoom] = useState('')

  const create = () => {
    router.push(`/room/${room || Math.random().toString(36).slice(2)}`)
  }

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const showModal = (ele) => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.container}>

      <Button onClick={showModal} style={{
        background: "#3b1b27",
        color: "white"
      }}>Start Video Call</Button>

      <Modal title="Start video call" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <main className={styles.main}>
          <h1>Lets join a room!</h1>
          <input onChange={(e) => setRoom(e.target.value)} value={room} className={styles['room-name']} />
          <button onClick={create} type="button" className={styles['join-room']}>Join Room</button>
        </main>
      </Modal>

    </div>
  )
}
