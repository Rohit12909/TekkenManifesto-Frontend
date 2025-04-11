import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../UserContext';

export default function StanceTable(props)
{
    const {currentURL} = useUserContext();

    const [newStanceName, setNewStanceName] = useState("");
    const [newStanceInput, setNewStanceInput] = useState("");
    
    const [pressedNewStanceButton, setPressedNewStanceButton] = useState(false);

    const postNewStance = async (event) => 
    {
        event.preventDefault();

        try 
        {
            const response = await axios.post(`${currentURL}/Stance/${props.name}`, 
                {
                    name: newStanceName,
                    input: newStanceInput,
                });

            props.setCharInfo((prevCharInfo) => ({
                ...prevCharInfo,
                stances: [...prevCharInfo.stances, response.data],
            }));

            if (response.status === 200)
            {
                setNewStanceName("");
                setNewStanceInput("");
            }
        } catch (err) 
        {
            console.error("Error creating stance:", err);
        }

    }


    const DeleteStance = async (event, stanceId) =>
    {
        event.preventDefault();

        try
        {
            const response = await axios.delete(`${currentURL}/Stance/deleteStance/${stanceId}`);

            props.setCharInfo((prevCharInfo) => ({
                ...prevCharInfo,
                stances: prevCharInfo.stances.filter((stance) => stance.id !== stanceId),
            }));
        } catch (err)
        {
            console.error("Error deleting stance:", err);
        }
    }
    
    return (
        <div>
            {/* Combos Table */}
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Stance Name</th>
                        <th>Input</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(props.charInfo.stances) && props.charInfo.stances.map((stance, index) => (
                        <tr key={index} className="list-table-row">
                            <td>{stance.name}</td>
                            <td>{stance.input}</td>
                            <td>
                                <button onClick={() => DeleteStance(event, stance.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br />

            <div className="table-buttons">
                <button onClick={() => {setPressedNewStanceButton(true)}}>Add Stance</button>
                {pressedNewStanceButton && (
                    <div>
                        <form onSubmit={(event) => postNewStance(event)}>
                            <div>
                                <input type="text"
                                    value={newStanceName}
                                    onChange={(e) => setNewStanceName(e.target.value)}
                                    placeholder={"Stance Name"} />
                            </div>
                            <div>
                                <input type="text"
                                    value={newStanceInput}
                                    onChange={(e) => setNewStanceInput(e.target.value)}
                                    placeholder={"Stance Input"} />
                            </div>
                            <button type="submit">Submit</button>
                            <button onClick={() => setPressedNewStanceButton(false)}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )

}