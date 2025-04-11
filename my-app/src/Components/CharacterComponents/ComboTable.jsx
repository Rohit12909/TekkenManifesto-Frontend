import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../UserContext';

export default function ComboTable(props)
{
    const {currentURL} = useUserContext();

    const [newComboText, setNewComboText] = useState("");
    const [newComboURL, setNewComboURL] = useState("");
    const [newComboDamage, setNewComboDamage] = useState(0);

    const [pressedNewComboButton, setPressedNewComboButton] = useState(false);


    const postNewCombo = async (event) => 
    {
        event.preventDefault();

        try 
        {
            const response = await axios.post(`${currentURL}/Combo/${props.name}`, 
                {
                    textNotation: newComboText,
                    visualNotationURL: newComboURL,
                    damage: newComboDamage
                });

            props.setCharInfo((prevCharInfo) => ({
                ...prevCharInfo,
                combos: [...prevCharInfo.combos, response.data],
            }));

            if (response.status === 200)
            {
                setNewComboText("");
                setNewComboURL("");
                setNewComboDamage(0);
                
            }
        } catch (err) 
        {
            console.error("Error creating combo:", err);
        }

    }


    const DeleteCombo = async (event, comboId) =>
    {
        event.preventDefault();

        try
        {
            const response = await axios.delete(`${currentURL}/Combo/delete/${comboId}`);

            props.setCharInfo((prevCharInfo) => ({
                ...prevCharInfo,
                combos: prevCharInfo.combos.filter((combo) => combo.id !== comboId),
            }));
        } catch (err)
        {
            console.error("Error deleting combo:", err);
        }
    }
    
    return (
        <div>
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
                    {Array.isArray(props.charInfo.combos) && props.charInfo.combos.map((combo, index) => (
                        <tr key={index} className="list-table-row">
                            <td>{combo.textNotation}</td>
                            <td>{combo.visualNotationURL}</td>
                            <td>{combo.damage}</td>
                            <td>
                                <button onClick={() => DeleteCombo(event, combo.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br />

            <div className="table-buttons">
                <button onClick={() => {setPressedNewComboButton(true)}}>Add Combo</button>
                {pressedNewComboButton && (
                    <div>
                        <form onSubmit={(event) => postNewCombo(event)}>
                            <div>
                                <input type="text"
                                    value={newComboText}
                                    onChange={(e) => setNewComboText(e.target.value)}
                                    placeholder={"Combo in Text Notation"} />
                            </div>
                            <div>
                                <input type="text"
                                    value={newComboURL}
                                    onChange={(e) => setNewComboURL(e.target.value)}
                                    placeholder={"Visual Notation URL"} />
                            </div>
                            <div>
                                <input type="number"
                                    value={newComboDamage}
                                    onChange={(e) => setNewComboDamage(Number(e.target.value))}
                                    placeholder={"Combo Damage"} />
                            </div>
                            <button type="submit">Submit</button>
                            <button onClick={() => setPressedNewComboButton(false)}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}