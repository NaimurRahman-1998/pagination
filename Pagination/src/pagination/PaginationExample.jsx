import { useState, useEffect } from "react";

function PaginationExample() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setItems(data.slice(0,51));
    };

    fetchItems();
  }, []);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const endIndex = currentPage * itemsPerPage
  const startIndex = endIndex - itemsPerPage
  const currentItems = items.slice(startIndex, endIndex);
  return (
    <div>
      <h1>Pagination Example</h1>
      <ul>
        {currentItems.map((item) => (
          <li key={item.id}>{item.id}</li>
        ))}
      </ul>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
      <div>
        <p>Total Items: {totalItems}</p>
      </div>
    </div>
  );
}

export default PaginationExample;
