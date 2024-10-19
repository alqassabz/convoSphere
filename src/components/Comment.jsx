import { useState, useEffect } from 'react'
import axios from 'axios'
import { HiReply } from 'react-icons/hi' // 

const Comment = ({getIssues,
  issues,
  setIssues}) =>{
  const [replies, setReplies] = useState({}); // Track replies per issue
  const [showReplyInput, setShowReplyInput] = useState({}); // Track which reply input is shown

  const initialState = { comment: '' }; // Define initial state
  const [formState, setFormState] = useState(initialState);

  const submitReply = async (issueId) => {
    if (!replies[issueId]?.trim()) return;
    
    console.log(`Submitting reply for issue ID: ${issueId}`); // Add this line for debugging
  
    try {
      const res = await axios.post(
        `http://localhost:3001/issues/${issueId}/reply`,
        { comment: replies[issueId] }
      );
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === issueId
            ? { ...issue, replies: res.data.replies }
            : issue
        )
      );
      setReplies((prevReplies) => ({ ...prevReplies, [issueId]: '' }));
      setShowReplyInput((prev) => ({ ...prev, [issueId]: false }));
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await axios.post('http://localhost:3001/issues', formState);
    setIssues([...issues, response.data]);
    setFormState(initialState);
  };

  
  
  return (
    <>
    <h2>Issues</h2>
      <div className="issues-container">
        {issues.map((issue) => (
          <div key={issue._id} className="card issue-card mb-3">
            <div className="card-body">
              <p className="card-text">Comment: {issue.comment}</p>
              <p className="card-footer text-muted">
                <small>{new Date(issue.createdAt).toDateString()}</small>
              </p>

              {/* Reply icon */}
              <div
                className="reply-icon"
                onClick={() =>
                  setShowReplyInput((prev) => ({
                    ...prev,
                    [issue._id]: !prev[issue._id]
                  }))
                }
              >
                <HiReply />
              </div>
            </div>

            {/* Render replies below the card body */}
            <div className="replies-container">
              {issue.replies && issue.replies.length > 0 ? (
                <h5>Replies:</h5>
              ) : (
                <p>No replies yet.</p>
              )}
              {issue.replies &&
                issue.replies.map((reply, index) => (
                  <div key={index} className="reply">
                    <p>
                      {reply.comment} -{' '}
                      <small>{new Date(reply.createdAt).toDateString()}</small>
                    </p>
                  </div>
                ))}
            </div>

            {/* Reply form below the replies */}
            {showReplyInput[issue._id] && (
              <div className="reply-form">
                <input
                  type="text"
                  value={replies[issue._id] || ''}
                  onChange={(e) =>
                    setReplies({ ...replies, [issue._id]: e.target.value })
                  }
                  placeholder="Write a reply..."
                  style={{ width: '80%', marginTop: '5px' }} // Adjust the width as needed
                />
                <button onClick={() => submitReply(issue._id)}>Submit</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="comment">Message</label>
          <textarea
            id="comment"
            cols="50"
            rows="2"
            onChange={handleChange}
            value={formState.comment}
            className='textarea'
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  )
}

export default Comment