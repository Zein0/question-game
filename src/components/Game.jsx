import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, Send, Loader2 } from "lucide-react"
import socket from '@/services/socket'

const Game = ({roomData, question}) => {
  const [selectedPlayer, setSelectedPlayer] = useState("")
  const [votesSubmitted, setVotesSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    let event = "submitQuestionVote" 
    if (selectedPlayer) {
        socket.emit(event, {
            roomCode: roomData.roomCode,
            vote:selectedPlayer,
        });
        setVotesSubmitted(true);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-blue-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <HelpCircle className="text-primary" />
            The Question is:
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-lg font-medium p-4 bg-secondary rounded-lg">
            {question}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Who do you think this question best describes?
          </p>
          {!votesSubmitted ? (
            <form onSubmit={handleSubmit}>
              <Select onValueChange={setSelectedPlayer} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Player" />
                </SelectTrigger>
                <SelectContent>
                  {roomData.players.map((player) => (
                    <SelectItem key={player.socketId} value={player.username}>
                      {player.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <CardFooter className="px-0 pt-6">
                <Button type="submit" className="w-full" disabled={!selectedPlayer}>
                  <Send className="mr-2 h-4 w-4" /> Submit Vote
                </Button>
              </CardFooter>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-lg font-medium">Waiting for other players...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
export default Game;