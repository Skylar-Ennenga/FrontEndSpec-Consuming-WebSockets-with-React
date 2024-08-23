import { useContext, useState, FormEvent, SetStateAction } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { io } from "socket.io-client";
import MessageInput from "./components/MessageInput";
import ChatBody from "./components/ChatBody";
import UserContext, { ChatUser, initialUserState } from "./context/UserContext";

const socket = io("http://127.0.0.1:5000", {
  autoConnect: false,
});

function App() {
  const [chatuser, setChatUser] = useState<ChatUser>(initialUserState)
  const [isConnected, setIsConnected] = useState(socket.connected);

  const handleConnect = () => {
    if(chatuser.name){
    socket.connect();
    setIsConnected(true);
  } else {
    alert("Please enter a username before connecting.");
  }
  };

  const handleDisconnect = () => {
    socket.disconnect();
    setIsConnected(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleConnect()
  };

  return (
    <UserContext.Provider value={{ chatuser, setChatUser}}>
    <Container>
      <p>
        Connection Status: {isConnected ? "Connected!" : "Not Connected :/"}
      </p>

      {isConnected ? (
        <>
          <ChatBody socket={socket} />
          <MessageInput socket={socket} />
          <Button onClick={handleDisconnect} variant="danger">
            Disconnect
          </Button>
        </>
      ) : (
        <>
      <Form onSubmit={handleSubmit}  className="mb-3">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Please enter your name: </Form.Label>
          <Form.Control
            type="text"
            autoComplete="off"
            value={chatuser.name}
            onChange={(event) =>
              setChatUser({ ...chatuser, name: event.target.value })
            }
          />
        </Form.Group>
          <Button  variant="success" type="submit">
            Connect
          </Button>
          </Form>
        </>
      )}
    </Container>
    </UserContext.Provider>
  );
}

export default App;

