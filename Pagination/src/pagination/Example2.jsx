/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function Example2() {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.slice(0, 51)));
  }, []);

  const postsPerPage = 10;
  const pagesVisited = pageNumber * postsPerPage;
  const displayPosts = posts.slice(pagesVisited, pagesVisited + postsPerPage);
  const pageCount = Math.ceil(posts.length / postsPerPage)
  const pageChange = ({selected}) =>{
    setPageNumber(selected)
  }

  let content = displayPosts.map((post) => (
    <div key={post.id}>
      <p>ID : {post.id}</p>
      <h3>title : {post.title}</h3>
    </div>
  ));

  return (
    <>
      <div>Hello</div>
      {content}
      <div>
        <ReactPaginate 
        pageCount={pageCount}
        onPageChange={pageChange}
        />
      </div>
    </>
  );
}

export default Example2;
