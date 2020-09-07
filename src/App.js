import React from "react";
import "./App.css";
import socket from "./socketIO";
import { Button, ProgressBar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [yesCount, setYesCount] = React.useState(0);
  const [sosoCount, setSosoCount] = React.useState(0);
  const [noCount, setNoCount] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  const sendVote = (option) => {
    socket.emit("vote", option);
  };

  React.useEffect(() => {
    socket.on("connection");

    return () => {
      socket.disconnect();
    };
  }, []);

  

  React.useEffect(() => {
    socket.on("receiveVote", (option) => {
      setTotal(total + 1);
      if (option === "yes") {
        setYesCount(yesCount + 1);
      }
      if (option === "soso") {
        setSosoCount(sosoCount + 1);
      }
      if (option === "no") {
        setNoCount(noCount + 1);
      }
    });
  }, [total, noCount, yesCount, sosoCount]);

  return (
    <div className="App">
      <Container>
        <h1>Do you understand today's lecture ?</h1>
        <Button variant="success" onClick={(e) => sendVote("yes")}>
          Yes
        </Button>
        <Button variant="warning" onClick={(e) => sendVote("soso")}>
          So So
        </Button>
        <Button variant="danger" onClick={(e) => sendVote("no")}>
          Not at all
        </Button>

        <ProgressBar>
          <ProgressBar
            striped
            variant="success"
            now={(yesCount * 100) / total}
            key={1}
          />
          <ProgressBar
            striped
            variant="warning"
            now={(sosoCount * 100) / total}
            key={2}
          />
          <ProgressBar
            striped
            variant="danger"
            now={(noCount * 100) / total}
            key={3}
          />
        </ProgressBar>
      </Container>
    </div>
  );
}

export default App;
