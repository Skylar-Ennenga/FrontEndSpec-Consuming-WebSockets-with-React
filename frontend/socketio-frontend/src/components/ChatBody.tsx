import React, { useContext, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Socket } from "socket.io-client";
import UserContext from "../context/UserContext";

interface SocketProps {
  socket: Socket;
}

interface Message {
    text: string
    user: string;
}


const ChatBody = ({ socket }: SocketProps) => {
  const { chatuser } = useContext(UserContext);
  const [messages, setMessages] = 
  useState<Message[]>([]);



  useEffect(() => {
    // checks for when a message event occurs, then executes the function
    socket.on('message', (message) => {
        setMessages([...messages, message])
    })
  }, [messages, socket])

  return <Container>
    {
        messages.map((message, index) => (
            <Card className="my-3" key={index}>
                <Card.Body><strong>{message.user}</strong>: {message.text}</Card.Body>
            </Card>
        ))
    }


  </Container>;
};

export default ChatBody;
