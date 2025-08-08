'use client'

import { useState } from 'react'
import { useAtomValue,useSetAtom } from 'jotai'
import { wsAtom,currentRoomAtom } from '../../store' // fix path

const rooms = ['room 1', 'room 2', 'room 3','room 4']

export default function RoomDropdown() {
  const ws = useAtomValue(wsAtom)
  const setRoom = useSetAtom(currentRoomAtom)
  const [open, setOpen] = useState(false)
  const [showNamePopup, setShowNamePopup] = useState(false)
  const [pendingRoom, setPendingRoom] = useState<string | null>(null)
  const [name, setName] = useState('')

  const handleRoomClick = (room: string) => {
    setPendingRoom(room)
    setShowNamePopup(true)
  }

  const handleNameConfirm = () => {
    if (pendingRoom && name.trim()) {
      ws?.send(JSON.stringify({ type: 'join', name: name.trim(), room: pendingRoom }))
      setRoom(pendingRoom)
      setOpen(false)
      setShowNamePopup(false)
      setPendingRoom(null)
    }
  }

  const handleNameCancel = () => {
    setShowNamePopup(false)
    setPendingRoom(null)
  }

  return (
    <div className="relative inline-block text-left w-full max-w-xs">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-t-md focus:outline-none hover:bg-blue-700 transition"
      >
        Rooms ▾
      </button>
      {open && (
        <div className="absolute right-0 w-full bg-white border border-gray-200 rounded-b-md shadow-lg z-20">
          {rooms.map((room) => (
            <div
              key={room}
              onClick={() => handleRoomClick(room)}
              className="block px-4 py-2 cursor-pointer hover:bg-blue-100 transition text-gray-800 border-b last:border-b-0 border-gray-100"
            >
              {room}
            </div>
          ))}
        </div>
      )}
      {showNamePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl min-w-[300px] w-full max-w-sm">
            <div className="mb-4 text-gray-700">
              Enter your name to join <b>{pendingRoom}</b>:
            </div>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && name.trim()) {
                  handleNameConfirm();
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleNameCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleNameConfirm}
                disabled={!name.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
