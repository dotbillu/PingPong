'use client'

import { useState } from 'react'
import { useAtomValue,useSetAtom } from 'jotai'
import { wsAtom,currentRoomAtom } from '../../store' // fix path

const rooms = ['General', 'Dev', 'Gaming', 'Memes']

export default function RoomDropdown() {
  const ws = useAtomValue(wsAtom)
  const setRoom = useSetAtom(currentRoomAtom)
  const [open, setOpen] = useState(false)

  const join = (room: string) => {
    ws?.send(JSON.stringify({ type: 'join', name: 'abhay', room }))
      setRoom(room)

    setOpen(false)
  }

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)}>Rooms ▾</button>
      {open && (
        <div style={{ position: 'absolute', top: '100%', right: 0, background: 'white' }}>
          {rooms.map((room) => (
            <div key={room} onClick={() => join(room)}>
              {room}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
