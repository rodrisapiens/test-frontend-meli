import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("http://localhost:8080/?q=perros")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setData(res.items[0].title);
        console.log(res);
      });
  }, []);
  return (
    <div className="App">
      <h1>{data && data}</h1>
    </div>
  );
}

export default App;
