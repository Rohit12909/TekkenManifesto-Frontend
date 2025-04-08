import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from './UserContext';
import './Character.css';

export default function Character()
{
    const { name } = useParams();
    const {currentURL} = useUserContext();

    const [charInfo, setCharInfo] = useState({});

    const [newComboText, setNewComboText] = useState("");
    const [newComboURL, setNewComboURL] = useState("");
    const [newComboDamage, setNewComboDamage] = useState(0);

    useEffect(() => {
        const fetchChar = async () => {
            try{
                const response = await axios.get(`${currentURL}/api/Char/char/${name}`);
                setCharInfo(response.data);
            } catch (err){
                console.error("Error fetching character:", err);
            }
        };
        fetchChar();
    }, [currentURL, name]);

    const postNewCombo = async () => {
        const newCombo = {
            /* Create form to add new combo */
            textNotation: newComboText,
            visualNotationURL: newComboURL,
            damage: newComboDamage
        }
        try {
            const response = await axios.post(`${currentURL}/api/Combo/${name}`, newCombo);

            if (response.status === 200)
            {
                setNewComboText("");
                setNewComboURL("");
                setNewComboDamage(0);
            }
        } catch (err) {
            console.error("Error creating combo:", err);
        }

    }


    return (
        <div>
            <header>
                <h1>{ charInfo?.name }</h1>
            </header>

            {/* Combos Table */}
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Combo</th>
                        <th>Visuals</th>
                        <th>Damage</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(charInfo.combos) && charInfo?.combos.map((combo, index) => (
                        <tr key={index} className="list-table-row">
                            <td>
                                {combo.textNotation}
                            </td>
                            <td>
                                {combo.visualNotationURL}
                            </td>
                            <td>
                                {combo.damage}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <button type="button" className="add-button" onClick={postNewCombo}>Add Combo</button>
            </table>
        </div>
    )
}