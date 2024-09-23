"'use client'"
    
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import socket from '../services/socket';

const Menu = ({ setRoomData, setPhase }) => {
  const [roomCode, setRoomCode] = useState("")
  const [username, setUsername] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (roomCode && username) {
      socket.connect(); // Manually connect to socket server
      socket.emit('joinRoom', { roomCode, username }, (response) => {
          if (response.success) {
              setRoomData(response.room);
              setPhase('lobby');
          } else {
              alert(response.message);
          }
      });
  }
  }

  return (
    (<div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Enter Room</CardTitle>
          <CardDescription className="text-center">Join a room to start chatting</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="roomCode" className="text-sm font-medium">
                Room Code
              </label>
              <Input
                id="roomCode"
                placeholder="Enter room code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                required />
            </div>
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Join Room
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>)
  );
}
export default Menu;