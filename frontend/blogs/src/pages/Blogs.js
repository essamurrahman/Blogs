import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import React, { useState, useEffect, useCallback } from 'react';


const PRODUCTS = [
  { id: 'p1', title: 'Product 1', content:"asdkljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjlkwqjelkqwl" },
  { id: 'p2', title: 'Product 2', content:"asdkljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjlkwqjelkqwl" },
  { id: 'p3', title: 'Product 3', content:"asdkljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjlkwqjelkqwl" },
];

function Blogs() {

  const [blogs, setBlogs] = useState([]);

    let blogArray = [];
    let transformedBlogs = [];

  const fetchBlogsHandler = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/blog/fetchAllPosts');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      blogArray = data.blogs;
      
      transformedBlogs = blogArray.map((data) => {
        console.log(data)

        return {
          key: data._id,
          id: data._id,
          title: data.title,
          content: data.content         
        };
      });
      setBlogs(transformedBlogs)    
    } catch (error) {
      
    }
  }, []);

  useEffect(() => {
    fetchBlogsHandler();
  }, []);
   
  return (
    <>
      <button key={1} onClick={fetchBlogsHandler}>Blogs</button>
        {blogs.map((prod) => (
          <section>
            <BlogCard key={prod.key} id={prod.id} title={prod.title} content={prod.content}>
            </BlogCard>
            </section>
        )
        )}
    </>
  ); 

}


export default Blogs;
