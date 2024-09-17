import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Image } from 'react-bootstrap';
import axios from 'axios';

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [name, setName] = useState('');
  const [picture, setPicture] = useState(null);

  // Fetch pictures from the backend on load
  useEffect(() => {
    fetchPictures();
  }, []);

  const fetchPictures = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/pictures');
      setPictures(response.data);
    } catch (error) {
      console.error('Error fetching pictures:', error);
    }
  };

  const handlePictureUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('picture', picture);

    try {
      await axios.post('http://localhost:8080/api/pictures/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchPictures();
      setName('');
      setPicture(null);
    } catch (error) {
      console.error('Error uploading picture:', error);
    }
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Upload Picture</h2>
          <Form onSubmit={handlePictureUpload}>
            <Form.Group className="mb-3">
              <Form.Label>Picture Name</Form.Label>
              <Form.Control 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Picture (PNG/JPG)</Form.Label>
              <Form.Control 
                type="file" 
                accept="image/png, image/jpeg" 
                onChange={(e) => setPicture(e.target.files[0])}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">Upload</Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Pictures List</h2>
          <ListGroup>
            {pictures.map((pic) => (
              <ListGroup.Item key={pic.id} className="d-flex align-items-center">
                <Image
                  src={`data:image/jpeg;base64,${pic.graphic}`}
                  rounded
                  style={{ width: '50px', height: '50px', marginRight: '20px' }}
                />
                {pic.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
