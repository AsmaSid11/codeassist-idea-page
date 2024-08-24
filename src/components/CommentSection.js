import React, { useState } from 'react';
import { Form, InputGroup, Button, Card } from 'react-bootstrap';

function CommentSection({ postIndex, comments, onComment }) {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      onComment(postIndex, newComment);
      setNewComment("");
    }
  };

  return (
    <div>
      {comments.map((comment, idx) => (
        <Card.Text key={idx} className="mt-2">
          {comment}
        </Card.Text>
      ))}
      <Form onSubmit={handleCommentSubmit} className="mt-2">
        <InputGroup>
          <Form.Control
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button style={{backgroundColor:'green'}} type="submit">Comment</Button>
        </InputGroup>
      </Form>
      
    </div>
  );
}

export default CommentSection;

