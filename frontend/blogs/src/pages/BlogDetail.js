import { useParams, Link } from 'react-router-dom';
import UserComments from '../components/Usercomments';
import AddComment from '../components/AddComment';
import BlogCard from '../components/BlogCard';
import {useCallback, useState, useEffect} from 'react'


function BlogDetail(props) {
  const params = useParams();

  const PRODUCTS = [
    { content:"asdkljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjlkwqjelkqwl" },
    { content:"asdkljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjlkwqjelkqwl" },
    { content:"asdkljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjlkwqjelkqwl" },
  ];
  const [comments, setComments] = useState([]);
  const [blogs, setBlogs] = useState([]);

    let blogArray = [];
    let transformedBlogs;

  const fetchBlogsHandler = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/blog/fetchAllPosts');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      blogArray = data.blogs;
      
      transformedBlogs = blogArray.filter(objects =>  objects._id === params.blogId.toString())
      setBlogs(transformedBlogs)    
    } catch (error) {
      
    }
  }, []);

  useEffect(() => {
    fetchBlogsHandler();
    fetchCommentsHandler()
  }, []);

const fetchCommentsHandler = useCallback(async () => {
  let commentArray = []
  try {
    // BearerToken = localStorage.getItem("Token")
    // console.log("HI")
    // console.log(BearerToken)
    // console.log(params.blogId)

    const response = await fetch(`http://localhost:4000/blog/posts/${params.blogId}/comments/`,
    {
      method: 'GET',
      headers: {
        // "Authorization": `Bearer ${BearerToken}`
      }
    });

    const data = await response.json();
    commentArray = data.comments;
    setComments(commentArray)    
  } catch (error) {
    
  }
}, []);

  return (
    <>
      {blogs.map((prod) => (
          <section>
            <BlogCard key={prod.key} id={prod.id} title={prod.title} content={prod.content}>
            </BlogCard>
            </section>))}
      {comments.map((prod) => (
            <UserComments key={prod._id} content={prod.content}>
            </UserComments>
        )
        )}
        <AddComment>
            </AddComment>
    </>
  );
}

export default BlogDetail;
