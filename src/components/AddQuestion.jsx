"'use client'"

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PlusCircle, CheckCircle } from "lucide-react"

const AddQuestion = () =>{
  const [questionText, setQuestionText] = useState("")
  const [showAlert, setShowAlert] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (questionText.trim()) {
        try {
          const response = await axios.post(import.meta.env.VITE_APP_SOCKET_IP+'/api/questions/add',{
              text: questionText
          });

          if (response.data.success) {
            setShowAlert(true)
            setQuestionText('');
            setTimeout(() => setShowAlert(false), 3000)
          } else {
              alert('Failed to add question');
          }
      } catch (error) {
          console.error('Error adding question:', error);
      }
      
    }
  }

  return (
    (<div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Add New Question</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="question"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Question
              </label>
              <Input
                id="question"
                placeholder="Enter your question here"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                required />
            </div>
            {showAlert && (
              <Alert className="bg-green-100 text-green-800 border-green-300">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>Question has been successfully added!</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Question
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>)
  );
}

export default AddQuestion;
