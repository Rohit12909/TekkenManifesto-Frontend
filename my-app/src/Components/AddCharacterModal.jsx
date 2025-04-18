import React, { useState } from 'react';
import axios from 'axios';
import './AddCharacterModal.css';

function AddCharacterModal({ onClose, onCharacterAdded, currentURL })
{
    const [form, setForm] = useState({
        name: '',
        imageURL: '',
        origin: '',
        fightingStyle: '',
        history: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${currentURL}/Char`, form);
            onCharacterAdded(response.data);
            onClose();
        }
        catch (err)
        {
            console.error("Error adding character:", err);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add New Character</h2>
                <form onSubmit={handleSubmit}>
                    <input name="name" placeholder='Name' onChange={handleChange} required />
                    <input name="imageURL" placeholder='Image URL' onChange={handleChange} />
                    <input name='origin' placeholder='Origin' onChange={handleChange} />
                    <input name='fightingStyle' placeholder='Fighting Style' onChange={handleChange} />
                    <textarea name="history" placeholder='History' onChange={handleChange} />
                    <div className="modal-buttons">
                        <button type="submit">Add</button>
                        <button type="button" onClick={onClose} className='cancel'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCharacterModal;