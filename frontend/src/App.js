import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";

const UNSPLASH = process.env.REACT_APP_UNSPLASH_KEY;

function App() {
  const [word, setWord] = useState("");
  const [images,setImages] = useState([]);
  
  console.log(images); 

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    fetch(
      `https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH}`
    )
      .then((res) => res.json())
      .then((data) => {
       
        setImages([data,...images])
      })
      .catch((err) => {
        console.log(err);
      })
     setWord('');
  };
  console.log(UNSPLASH);
  return (
    <div className="App">
      <Header title="Image Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
    </div>
  );
}

export default App;
