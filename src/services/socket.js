import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_APP_SOCKET_IP);

export default socket;
