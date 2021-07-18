import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import { Container,Col,Row } from "react-bootstrap";

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
       
        setImages([{...data,title:word},...images])
      })
      .catch((err) => {
        console.log(err);
      })
     setWord('');
  };
  console.log(UNSPLASH);
  
   const handleDeleteImage = (id) =>{
       setImages(images.filter((image)=> image.id !==id))
   }

  return (
    <div className="App">
      <Header title="Image Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container className="mt-4">
            <Row xs={1} md={2} lg={3}>
            {images.map((image,i)=> (
                  
                   <Col key={i} className="pb-3">
                     <ImageCard  image={image}  deleteImage={handleDeleteImage } />
                   </Col>
                  ))}
            </Row>
      </Container>
        
    </div>
  );
}

export default App;
