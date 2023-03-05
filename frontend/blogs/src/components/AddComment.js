import './AddComment.css'
import {useState} from 'react'

function AddComment (){

    const [comment, setComment] = useState('');

    function setCommentHandler (event){
        setComment(event.target.value);
    }

    function submitHandler (){
        const postComment = (async () => {
            console.log(comment)
            try {
              const response = await fetch(`http://localhost:4000/blog/post/${params.blogId}/comment`,
              {
                method: "POST",
                body: {
                    "content": comment.toString()
                }
              });
              
              console.log(response.json())
            } catch (error) {             
            }
          }, [])
    }


    return (
        <div className="main-container">
            <div className="container">
                <h2>Leave Us a Comment</h2>
                <form>
                    <textarea onClick={setCommentHandler} placeholder='Add Your Comment'></textarea>
                    <div className="btn">
                        <button type="submit" onClick={submitHandler} >Submit</button>
                        <button>Cancel</button>
                    </div>
                </form>
            </div>
        </div>    
    )
}

export default AddComment;