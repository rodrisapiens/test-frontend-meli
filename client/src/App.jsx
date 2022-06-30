import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState(0);
  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setData(res.message);
      });
  }, []);
  return (
    <div className="App">
      <h1>{data}</h1>
    </div>
  );
}

export default App;
