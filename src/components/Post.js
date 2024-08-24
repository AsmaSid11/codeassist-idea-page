import React, { useState } from 'react';
import { Card, Image } from 'react-bootstrap';
import { FaRegSmile, FaRegCommentDots } from 'react-icons/fa';
import CommentSection from './CommentSection';

function Post({ post, index, handleReaction, handleComment }) {
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [showComments, setShowComments] = useState(false);

  const emojiList = ['👍', '❤️', '😂', '😢', '🙏',];

  const toggleEmojis = () => {
    setShowEmojis(!showEmojis);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const selectEmoji = (emoji) => {
    setSelectedEmoji(emoji); 
    handleReaction(index, emoji); 
    setShowEmojis(false); 
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        {post.image && (
          <Image src={post.image} alt="Post Image" fluid className="mb-3" />
        )}
        <Card.Text>{post.content}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <div className="emoji-section">
            <FaRegSmile
              onClick={toggleEmojis}
              style={{
                fontSize: '24px',
                cursor: 'pointer',
                marginRight: '10px',
                color: 'green',
              }}
            />
            {selectedEmoji && (
              <span
                style={{
                  fontSize: '24px',
                  marginRight: '10px',
                }}
              >
                {selectedEmoji}
              </span>
            )}
            {showEmojis && (
              <div className="emoji-row">
                {emojiList.map((emoji) => (
                  <span
                    key={emoji}
                    style={{
                      fontSize: '24px',
                      cursor: 'pointer',
                      marginRight: '10px',
                      border:
                        selectedEmoji === emoji ? '2px solid black' : 'none',
                      borderRadius: '50%',
                      padding: '5px',
                    }}
                    onClick={() => selectEmoji(emoji)}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Displaying Reactions
          <div>
            {Object.keys(post.reactions).map((emoji) => (
              <span key={emoji} style={{ marginRight: '10px' }}>
                {emoji} {post.reactions[emoji]}
              </span>
            ))}
          </div> */}

          {/* Comment Icon */}
          <FaRegCommentDots
            onClick={toggleComments}
            style={{
              fontSize: '24px',
              cursor: 'pointer',
              marginLeft: '10px',
              color: 'green',
            }}
          />
        </div>

        {/* Comment Section*/}
        {showComments && (
          <div className="comment-section">
            <CommentSection
              postIndex={index}
              comments={post.comments}
              onComment={handleComment}
            />
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default Post;








