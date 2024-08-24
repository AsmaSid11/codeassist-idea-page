import React, { useState, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function PostForm({ showModal, setShowModal, handlePostSubmit }) {
  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [cameraMode, setCameraMode] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    handlePostSubmit(newPostText, newPostImage);
    setNewPostText("");
    setNewPostImage(null);
    setCameraMode(false);
  };

  // camera feature
  const handleImageCapture = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasRef.current.toBlob((blob) => {
      const file = new File([blob], "captured-image.png", { type: "image/png" });
      setNewPostImage(file);
      setCameraMode(false);
    });
  };

  const startCamera = () => {
    setCameraMode(true);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(err => {
        console.error("Error accessing camera: ", err);
      });
  };

  const stopCamera = () => {
    setCameraMode(false);
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => {
      track.stop();
    });

    videoRef.current.srcObject = null;
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Pitch Your Idea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="What's your idea?"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
          </Form.Group>

          {!cameraMode && (
            <>
              <Form.Group className="mt-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewPostImage(e.target.files[0])}
                />
              </Form.Group>

              <Button
                variant="outline-success"
                className="mt-2"
                onClick={startCamera}
              >
                Open Camera
              </Button>
            </>
          )}

          {cameraMode && (
            <>
              <div className="mt-3">
                <video ref={videoRef} style={{ width: "100%" }}></video>
                <canvas ref={canvasRef} style={{ display: "none" }} width="640" height="480"></canvas>
              </div>
              <Button
                variant="success"
                className="mt-2"
                onClick={handleImageCapture}
              >
                Capture Image
              </Button>
              <Button
                variant="outline-success"
                className="mt-2"
                onClick={stopCamera}
              >
                Cancel
              </Button>
            </>
          )}

          {newPostImage && (
            <div className="mt-3">
              <strong>Preview:</strong>
              <img
                src={URL.createObjectURL(newPostImage)}
                alt="Preview"
                style={{ width: "100%", marginTop: "10px" }}
              />
            </div>
          )}

          <Button type="submit" className="mt-3 btn-success">
            Post
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PostForm;



