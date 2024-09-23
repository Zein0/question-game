"'use client'"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, Send, Loader2, User } from "lucide-react"
import socket from "@/services/socket";

const GuessTheImposter = ({ roomData, question, votes }) => {
  const [selectedPlayer, setSelectedPlayer] = useState("")
  const [votesSubmitted, setVotesSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    let event = "submitImposterVote";
    if (selectedPlayer) {
        socket.emit(event, {
            roomCode: roomData.roomCode,
            vote: selectedPlayer,
        });
        setVotesSubmitted(true);
    }
  }

  return (
    (<div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle
            className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <HelpCircle className="text-gray-900 dark:text-gray-50" />
            The Common Question is:
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className="text-center text-lg font-medium p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
            {question}
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Votes:</h3>
            {votes.map((vote, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" /> {vote.username}
                </span>
                <span>voted for {vote.questionVote}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm font-medium">
            Who do you think is the imposter?
          </p>
          {!votesSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <Button type="submit" className="w-full" disabled={!selectedPlayer}>
                <Send className="mr-2 h-4 w-4" /> Submit Vote
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-900 dark:text-gray-50" />
              <p className="text-lg font-medium">Waiting for other players...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>)
  );
}
export default GuessTheImposter;