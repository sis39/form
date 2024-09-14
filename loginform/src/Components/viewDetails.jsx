import React, { useState } from 'react';
import axios from 'axios';

const ViewDetails = ({ userDetails, setUserDetails }) => {
    // State for editing the user
    const [editingUser, setEditingUser] = useState(null);

    // State for edited values
    const [editedValues, setEditedValues] = useState({ name: '', email: '' });

    // Handle delete user
    const handleDelete = async (userId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/users/${userId}`); // Corrected the URL
            console.log(response.data);
            const updatedUsers = userDetails.filter(user => user._id !== userId);
            setUserDetails(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Function for setting user ID and edited values
    const handleEdit = (user) => {
        setEditingUser(user._id);
        setEditedValues({ name: user.name, email: user.email });
    };

    // Handling change in the values
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedValues(prevValues => ({ ...prevValues, [name]: value }));
    };

    // Handling edit submit
    const handleEditSubmit = async (userId) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/users/${userId}`, editedValues);
            console.log('User updated:', response.data);

            const updatedUsers = userDetails.map(user => 
                user._id === userId ? { ...user, ...editedValues } : user
            );
            setUserDetails(updatedUsers);
            setEditingUser(null);
        } catch (error) {
            console.error('Error editing user:', error);
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userDetails && userDetails.length > 0 ? (
                        userDetails.map((user) => (
                            <tr key={user._id}>
                                {editingUser === user._id ? (
                                    <>
                                        <td>
                                            <input 
                                                type="text"
                                                name="name"
                                                value={editedValues.name}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                type="email"
                                                name="email"
                                                value={editedValues.email}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <button onClick={() => handleEditSubmit(user._id)}>Save</button>
                                        </td>
                                        <td>
                                            <button onClick={() => setEditingUser(null)}>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button onClick={() => handleDelete(user._id)}>Delete</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleEdit(user)}>Edit</button> 
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No users</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewDetails;
