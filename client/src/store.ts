import { atom } from 'jotai'

export const wsAtom = atom<WebSocket | null>(null)
export const currentRoomAtom = atom<string>('General')
