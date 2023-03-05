import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate('/blogs');
  }

  return (
    <>
      <h1>Blogs</h1>
    </>
  );
}

export default HomePage;
