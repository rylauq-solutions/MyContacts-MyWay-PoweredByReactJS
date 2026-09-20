import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import styles from './addContacts.module.css';
import { useNavigate } from 'react-router-dom';

let AddContact = () => {
    let [contactInfo, setContactInfo] = useState({
        name: '',
        contactNumber: '',
        email: '',
        relation: '',
        company: ''
    });

    let navigate = useNavigate()

    let handleChange = (e) => {
        let { name, value } = e.target;
        setContactInfo({ ...contactInfo, [name]: value });
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/contacts', contactInfo);
            toast.success('Contact added successfully!');
            navigate("/")
        } catch (error) {
            toast.error('Failed to add contact!');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Add New Contact</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={contactInfo.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="contactNumber"
                    min="1000000000"
                    max="9999999999"
                    placeholder="Contact Number"
                    value={contactInfo.contactNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={contactInfo.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="relation"
                    placeholder="Relation"
                    value={contactInfo.relation}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={contactInfo.company}
                    onChange={handleChange}
                />
                <button type="submit" className={styles.submitButton}>Add Contact</button>
            </form>
        </div>
    );
};

export default AddContact;
