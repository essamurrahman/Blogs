import BlogCard from './BlogCard';
import './BlogCard.css'

function BlogList (props){
    return (
        <>
          {props.Blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              releaseDate={blog.releaseDate}
              openingText={blog.openingText}
            />
          ))}
          </>
      );
}

export default BlogList