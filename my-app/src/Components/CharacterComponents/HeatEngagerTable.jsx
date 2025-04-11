import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../UserContext';

export default function HeatEngagerTable(props)
{
    const {currentURL} = useUserContext();

    const [newHEInput, setNewHEInput] = useState("");
    const [newHEFramesOB, setNewHEFramesOB] = useState("");

    const [pressedNewHEButton, setPressedNewHEButton] = useState(false);


    const postNewHE = async (event) => 
    {
        event.preventDefault();

        try 
        {
            const response = await axios.post(`${currentURL}/HeatEngager/${props.name}`, 
            {
                input: newHEInput,
                framesOB: newHEFramesOB
            });

            props.setCharInfo((prevCharInfo) => ({
                ...prevCharInfo,
                heatEngagers: [...prevCharInfo.heatEngagers, response.data],
            }));

            if (response.status === 200)
            {
                setNewHEInput("");
                setNewHEFramesOB("");
            }
        } catch (err) 
        {
            console.error("Error creating combo:", err);
        }
    
    }

    const DeleteHE = async (event, heId) =>
    {
        event.preventDefault();

        try
        {
            const response = await axios.delete(`${currentURL}/HeatEngager/deleteHE/${heId}`);

            props.setCharInfo((prevCharInfo) => ({
                ...prevCharInfo,
                heatEngagers: prevCharInfo.heatEngagers.filter((he) => he.id !== heId),
            }));
        } catch (err)
        {
            console.error("Error deleting combo:", err);
        }
    }

    return (
        <div>
             <table className="list-table">
                <thead>
                    <tr>
                        <th>Heat Engager Input</th>
                        <th>Frames On Block</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(props.charInfo.heatEngagers) && props.charInfo.heatEngagers.map((he, index) => (
                        <tr key={index} className="list-table-row">
                            <td>{he.input}</td>
                            <td>{he.framesOB}</td>
                            <td>
                                <button onClick={() => DeleteHE(event, he.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br />

            <div className="table-buttons">
                <button onClick={() => {setPressedNewHEButton(true)}}>Add Heat Engager</button>
                {pressedNewHEButton && (
                    <div>
                        <form onSubmit={(event) => postNewHE(event)}>
                            <div>
                                <input type="text"
                                    value={newHEInput}
                                    onChange={(e) => setNewHEInput(e.target.value)}
                                    placeholder={"Heat Engager Input"} />
                            </div>
                            <div>
                                <input type="text"
                                    value={newHEFramesOB}
                                    onChange={(e) => setNewHEFramesOB(e.target.value)}
                                    placeholder={"Frames On Block"} />
                            </div>
                            <button type="submit">Submit</button>
                            <button onClick={() => setPressedNewHEButton(false)}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )

}