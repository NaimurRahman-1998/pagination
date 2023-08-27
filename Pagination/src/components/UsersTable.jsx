/* eslint-disable react/prop-types */

const UsersTable = ({currentUsers}) => {
    return (
        <div>
            <table>
                <thead>
                    <th>Id</th>
                    <th>Name</th>
                    <th>desc</th>
                </thead>
                <tbody>
                    {currentUsers.map((user)=>(
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.title}</td>
                            <td>{user.body}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;