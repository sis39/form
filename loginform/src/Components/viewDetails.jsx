import React from 'react';
import axios from 'axios';

const ViewDetails = ({ userDetails,setUserDetails }) => {
    const handleDelete = async (userId) => {
        
        
        
        try {
            const response = await axios.delete(`http://localhost:5000/users/${userId}`); // Use userId in the URL
            console.log(response.data);
            const updatedUsers = userDetails.filter(user => user._id !== userId);
            setUserDetails(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    
    return (
        <div>
            <h1>User Details</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {userDetails && userDetails.length > 0 ? (
                        userDetails.map((user, i) => (
                            <tr key={i}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td><button onClick={()=>handleDelete(user._id)}>Delete</button></td>
                                <td>{user._id}</td>
                                
                            </tr>
                            
                            
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No users</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewDetails;
