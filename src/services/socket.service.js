import { io } from 'socket.io-client'

const isProd = process.env.NODE_ENV === 'production'
const BACKEND_URL = isProd
  ? process.env.VUE_APP_API_URL.replace('/api', '')
  : 'http://localhost:3030'

export const socketService = createSocketService()
window.socketService = socketService

socketService.setup()

function createSocketService() {
  let socket = null

  return {
    setup() {
      socket = io(BACKEND_URL, { transports: ['websocket'] })
      window.socket = socket
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    terminate() {
      socket.disconnect()
      socket = null
    }
  }
}