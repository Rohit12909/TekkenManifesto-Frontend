import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../UserContext';

export default function PunisherTable(props)
{
    const {currentURL} = useUserContext();

    const [newPunisherInput, setNewPunisherInput] = useState("");
    const [newPunisherEnemyIs, setNewPunisherEnemyIs] = useState("");

    const [pressedNewPunisherButton, setPressedNewPunisherButton] = useState(false);

    const postNewPunisher = async (event) => 
    {
        event.preventDefault();

        try 
        {
            const response = await axios.post(`${currentURL}/Punisher/${props.name}`, 
                {
                    input: newPunisherInput,
                    enemyIs: newPunisherEnemyIs,
                });

            props.setCharInfo((prevCharInfo) => ({
                ...prevCharInfo,
                punishers: [...prevCharInfo.punishers, response.data],
            }));

            if (response.status === 200)
            {
                setNewPunisherInput("");
                setNewPunisherEnemyIs("");
            }
        } catch (err) 
        {
            console.error("Error creating punisher:", err);
        }

    }

    const DeletePunisher = async (event, punishId) =>
    {
        event.preventDefault();

        try
        {
            const response = await axios.delete(`${currentURL}/Punisher/deletePunisher/${punishId}`);

            props.setCharInfo((prevCharInfo) => ({
                ...prevCharInfo,
                punishers: prevCharInfo.punishers.filter((punish) => punish.id !== punishId),
            }));
        } catch (err)
        {
            console.error("Error deleting punisher:", err);
        }
    }
    
    return (
        <div>
            {/* Punishers Table */}
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Punisher Input</th>
                        <th>Use When Enemy Is (Frames)</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(props.charInfo.punishers) && props.charInfo.punishers.map((punish, index) => (
                        <tr key={index} className="list-table-row">
                            <td>{punish.input}</td>
                            <td>{punish.enemyIs}</td>
                            <td>
                                <button onClick={() => DeletePunisher(event, punish.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br />

            <div className="table-buttons">
                <button onClick={() => {setPressedNewPunisherButton(true)}}>Add Punisher</button>
                {pressedNewPunisherButton && (
                    <div>
                        <form onSubmit={(event) => postNewPunisher(event)}>
                            <div>
                                <input type="text"
                                    value={newPunisherInput}
                                    onChange={(e) => setNewPunisherInput(e.target.value)}
                                    placeholder={"Punisher Input"} />
                            </div>
                            <div>
                                <input type="text"
                                    value={newPunisherEnemyIs}
                                    onChange={(e) => setNewPunisherEnemyIs(e.target.value)}
                                    placeholder={"Use when enemy is (frames)"} />
                            </div>
                            <button type="submit">Submit</button>
                            <button onClick={() => setPressedNewPunisherButton(false)}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}