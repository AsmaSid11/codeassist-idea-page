
import React, { useState } from "react";
import AppNavbar from "./components/Navbar";
import Post from "./components/Post";
import PostForm from "./components/PostForm";
import { Button } from "react-bootstrap";

const currentUserID = 1; //logged-in user ID

function App() {
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const handlePostSubmit = (text, image) => {
    if (text.trim() || image) {
      const newPost = {
        content: text,
        image: image ? URL.createObjectURL(image) : null,
        userId: currentUserID,
        reactions: {},
        comments: [],
      };
      setPosts([...posts, newPost]);
      setShowModal(false);
    }
  };

  //Emoji-Reactions wala feature
  const handleReaction = (index, emoji) => {
    const updatedPosts = [...posts];
    const reactions = updatedPosts[index].reactions;

    if (reactions[emoji]) {
      reactions[emoji]++;
    } else {
      reactions[emoji] = 1;
    }

    updatedPosts[index].reactions = reactions;
    setPosts(updatedPosts);
  };

  const handleComment = (index, comment) => {
    const updatedPosts = [...posts];
    updatedPosts[index].comments.push(comment);
    setPosts(updatedPosts);
  };

  const filteredPosts =
    view === "my"
      ? posts.filter((post) => post.userId === currentUserID)
      : posts;

  return (
    <div>
      <AppNavbar setView={setView} />
      <div className="container mt-4">
        {filteredPosts.map((post, index) => (
          <Post
            key={index}
            post={post}
            index={index}
            handleReaction={handleReaction}
            handleComment={handleComment}
          />
        ))}

        {/* Floating Button-new post */}
        <Button
          className="rounded-circle"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "rgb(0, 255, 166)",
          }}
          onClick={() => setShowModal(true)}
        >
          +
        </Button>

        {/* Modal-new post */}
        <PostForm
          showModal={showModal}
          setShowModal={setShowModal}
          handlePostSubmit={handlePostSubmit}
        />
      </div>
    </div>
  );
}

export default App;
