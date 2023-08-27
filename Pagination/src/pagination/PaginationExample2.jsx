/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import UsersTable from "../components/UsersTable";

const PaginationExample2 = () => {
  const [users, setUsers] = useState([]);
  const [selectedApi , setSelectedApi] = useState('api1')
  const apiOptions = ['api1','api2']

  const getApiEndpoints = () =>{
    if(selectedApi === 'api1'){
        return 'https://jsonplaceholder.typicode.com/posts'
    }
    if(selectedApi === 'api2'){
        return 'https://jsonplaceholder.typicode.com/users'
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const Users = await axios.get(
        getApiEndpoints()
      );
      setUsers(Users.data.slice(0, 51));
    };
    fetchUsers();
  }, [getApiEndpoints]);

  const [currentPage, setCurrentPage] = useState(1);
  const [UsersPerPage, SetUsersPerPage] = useState(10);
  const endIndex = currentPage * UsersPerPage;
  const startIndex = endIndex - UsersPerPage;
  const currentUsers = users.slice(startIndex, endIndex);
  const totalPages = Math.ceil(users.length / UsersPerPage);

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    SetUsersPerPage(newItemsPerPage);
    setCurrentPage(1); 
  };

  const handleChangePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  const handleApiChange = (event) => {
    
    setSelectedApi(event.target.value);
    setCurrentPage(1);
    console.log(selectedApi)
    console.log(users)
  };

  return (
    <div>
      <label>Items per Page:</label>
      <select defaultValue={"Please choose items per page"} onChange={handleItemsPerPageChange}>
        <option disabled>Please choose items per page</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>

      <label>Select Api</label>
        <select value={selectedApi} onChange={handleApiChange}>
        {apiOptions.map(apiOption => (
          <option key={apiOption} value={apiOption}>
            {apiOption}
          </option>
        ))}
      </select>
      

      <UsersTable currentUsers={currentUsers}></UsersTable>
      <div>
        <button onClick={() => handleChangePage(currentPage - 1)}>prev</button>
        Page {currentPage} of {totalPages}
        <button onClick={() => handleChangePage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default PaginationExample2;
