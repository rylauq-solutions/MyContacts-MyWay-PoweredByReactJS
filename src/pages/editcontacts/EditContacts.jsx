import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './editContacts.module.css';
import { toast } from 'react-hot-toast';

let EditContact = () => {
    let navigate = useNavigate();
    let { id } = useParams();

    let [editInfo, setEditInfo] = useState({
        name: '',
        contactNumber: '',
        email: '',
        relation: '',
        company: ''
    });

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/contacts/${id}`);
                setEditInfo(response.data);
            } catch (error) {
                toast.error('Failed to fetch contact data!');
            }
        };
        fetchContact();
    }, [id]);

    let handleChange = (e) => {
        let { name, value } = e.target;
        setEditInfo({ ...editInfo, [name]: value });
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/contacts/${id}`, editInfo);
            toast.success('Contact updated successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Error updating contact!');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Edit Contact</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={editInfo.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="contactNumber"
                    min="1000000000"
                    max="9999999999"
                    placeholder="Contact Number"
                    value={editInfo.contactNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={editInfo.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="relation"
                    placeholder="Relation"
                    value={editInfo.relation}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={editInfo.company}
                    onChange={handleChange}
                />
                <button type="submit" className={styles.submitButton}>Update Contact</button>
            </form>
        </div>
    );
};

export default EditContact;
