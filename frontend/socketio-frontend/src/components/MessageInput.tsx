import React, { FormEvent, useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Socket } from "socket.io-client";
import UserContext from "../context/UserContext";

interface SocketProps {
  socket: Socket;
}

const MessageInput = ({ socket }: SocketProps) => {
  const [message, setMessage] = useState<string>("");
  const {chatuser} = useContext(UserContext)

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();
    // trigger a message event to send our message
    // our backend is listening for a message event in order to emit to all connected
    socket.emit('message', { text: message, user: chatuser.name})
    setMessage("");
  };

  return (
    <Container>
      <Form onSubmit={handleSendMessage}  className="mb-3">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Message: </Form.Label>
          <Form.Control
            type="text"
            autoComplete="off"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default MessageInput;