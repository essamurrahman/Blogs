import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './UserComments.css'

function UserComment (props){

    function commentDeleteHandler() {
        const deleteComment = (async () => {
            try {
              fetch(`http://localhost:4000/blog/posts/${params.blogId}/comments/${props.key}`,
              {
                method: "DELETE"
              })
              .then(response=>{
                console.log(response.json())
              });
            } catch (error) {             
            }
          }, [])

    }

    return (
    <div className="main-container">
        <div className="container">
            <div className="comments">
                <p>{props.content}</p>
            </div>
            <div className="btn">
                <button onClick={commentDeleteHandler} className="btnDelete">Delete</button>
                <button className="btnDelete">Cancel</button>
            </div>
        </div>
    </div>
    )
}

export default UserComment;

