"'use client'"
import React, { useEffect, useState } from 'react';
import socket from '../services/socket';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, PlayCircle } from "lucide-react"

const Lobby = ({ roomData, players }) => {
    const [buttonDisable, setButtonDisable] = useState(false)

    const startGame = () => {
        setButtonDisable(true)
        socket.emit('startGame', { roomCode: roomData.roomCode }, (response) => {
            if (!response.success) {
                alert(response.message);
                setButtonDisable(false)
            }
        });
    };
    return (
        (<div
          className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle
                className="text-2xl font-bold text-center flex items-center justify-center">
                <Users className="mr-2" /> Room: {roomData.roomCode}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Players:</h3>
              <div className="flex flex-wrap gap-2">
                {players.map((player, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 rounded-full px-3 py-1 dark:bg-gray-800">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback>{player.username[0]}</AvatarFallback>
                    </Avatar>
                    <span>{player.username}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-6">
              <Button className="w-full" size="lg" onClick={startGame} disabled={buttonDisable}>
                <PlayCircle className="mr-2" /> Start Game
              </Button>
            </CardFooter>
          </Card>
        </div>)
      );
};

export default Lobby;
