import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import styles from './home.module.css';

let Home = () => {
    let [contacts, setContacts] = useState([]);
    let [originalContacts, setOriginalContacts] = useState([]); // Store insertion order
    let [refresh, setRefresh] = useState(false);
    let [sortOrder, setSortOrder] = useState('default'); // 'asc', 'desc', 'default'

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/contacts');
                setContacts(response.data);
                setOriginalContacts(response.data); // Store original order
            } catch (error) {
                toast.error('Failed to fetch contacts!');
            }
        };
        fetchContacts();
    }, [refresh]);

    function deleteContact(id) {
        try {
            axios.delete(`http://localhost:5000/contacts/${id}`);
            toast.success("Contact Deleted");
            setRefresh(prev => !prev);
        } catch (e) {
            toast.error("Error Deleting the Contact");
        }
    }

    function sortContacts() {
        if (sortOrder === 'default') {
            // Sort in ascending order
            let sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
            setContacts(sortedContacts);
            setSortOrder('asc');
        } else if (sortOrder === 'asc') {
            // Sort in descending order
            let sortedContacts = [...contacts].sort((a, b) => b.name.localeCompare(a.name));
            setContacts(sortedContacts);
            setSortOrder('desc');
        } else {
            // Restore the original insertion order
            setContacts(originalContacts);
            setSortOrder('default');
        }
    }

    return (
        <div>

            <div className={styles.homeHeader}>
                <h1>List of Contacts</h1>
                <button onClick={sortContacts} className={styles.sortButton}>
                    {sortOrder === 'default' ? 'Sort A → Z' : sortOrder === 'asc' ? 'Sort Z → A' : 'Reset Order'}
                </button>
            </div>

            {contacts.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact Number</th>
                            <th>Email</th>
                            <th>Relation</th>
                            <th>Company</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.id}>
                                <td>{contact.name}</td>
                                <td>{contact.contactNumber}</td>
                                <td>{contact.email}</td>
                                <td>{contact.relation}</td>
                                <td>{contact.company}</td>
                                <td>
                                    <Link to={`/edit/${contact.id}`} className={styles.editButton}>
                                        Edit
                                    </Link>
                                </td>
                                <td>
                                    <span onClick={() => { deleteContact(contact.id) }} className={styles.editButton}>
                                        Delete
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No contacts available</p>
            )}
        </div>
    );
};

export default Home;
