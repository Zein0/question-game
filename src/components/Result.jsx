"'use client'"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skull, Users, AlertTriangle, RefreshCw, CheckCircle } from "lucide-react"

const Result = ({roomData, setPhase, resultData}) => {
  if (!resultData.trueImposter) return null;

  const handlePlayAgain = () => {
    setPhase('lobby')
  }

  return (
    (<div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 to-blue-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-100 rounded-lg">
            <div className="flex items-center space-x-2">
              <Skull className="h-6 w-6 text-red-600" />
              <span className="font-semibold">True Imposter:</span>
            </div>
            <span className="text-lg font-bold text-red-600">{resultData.trueImposter}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-100 rounded-lg">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-blue-600" />
              <span className="font-semibold">Majority Vote:</span>
            </div>
            <span className="text-lg font-bold text-blue-600">{resultData.majorityVote}</span>
          </div>
          {resultData.isCorrect ? (
            <div className="flex items-center justify-center p-4 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              <span className="text-lg font-semibold text-green-600">The majority was correct!</span>
            </div>
          ) : (
            <div className="flex items-center justify-center p-4 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-2" />
              <span className="text-lg font-semibold text-yellow-600">The majority was wrong!</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-0">
          <Button onClick={handlePlayAgain} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> Play Again
          </Button>
        </CardFooter>
      </Card>
    </div>)
  );
}
export default Result;