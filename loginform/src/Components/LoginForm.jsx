import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ setUserDetails }) => {
    const navigate = useNavigate();

    const initialData = {
        name: '',
        email: '',
    };

    const [formData, setFormData] = useState(initialData);

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(formData);
        try {
            const response = await axios.post('http://localhost:5000/api/users', formData);
            console.log(response.data);
            setFormData(initialData);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    async function handleViewDetails() {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUserDetails(response.data);
            navigate('/view'); 
        } catch (error) {
            console.log('Error fetching details:', error);
        }
    }

    return (
        <div>
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type='email'
                    name='email'
                    value={formData.email}
                    placeholder='Enter the email'
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                /> <br />
                <label>Name:</label>
                <input
                    type='text'
                    name='name'
                    value={formData.name}
                    placeholder='Enter the name'
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />  <br />
                <button type='submit'>Submit</button>
            </form>
            <button onClick={handleViewDetails}>View Details</button>
        </div>
    );
};

export default LoginForm;
