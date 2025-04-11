import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../UserContext';

export default function LauncherTable(props)
{
    const {currentURL} = useUserContext();

    const [newLauncherInput, setNewLauncherInput] = useState("");
    const [newLauncherFramesOB, setNewLauncherFramesOB] = useState("");

    const [pressedNewLauncherButton, setPressedNewLauncherButton] = useState(false);

    const postNewLauncher = async (event) => 
    {
        event.preventDefault();

        try 
        {
            const response = await axios.post(`${currentURL}/Launcher/${props.name}`, 
            {
                input: newLauncherInput,
                framesOB: newLauncherFramesOB
            });

            props.setCharInfo((prevCharInfo) => ({
                ...prevCharInfo,
                launchers: [...prevCharInfo.launchers, response.data],
            }));

            if (response.status === 200)
            {
                setNewLauncherInput("");
                setNewLauncherFramesOB("");
            }
        } catch (err) 
        {
            console.error("Error creating launcher:", err);
        }
    
    }

    const DeleteLauncher = async (event, launcherId) =>
    {
        event.preventDefault();

        try
        {
            const response = await axios.delete(`${currentURL}/Launcher/deleteLauncher/${launcherId}`);

            props.setCharInfo((prevCharInfo) => ({
                ...prevCharInfo,
                launchers: prevCharInfo.launchers.filter((launch) => launch.id !== launcherId),
            }));
        } catch (err)
        {
            console.error("Error deleting launcher:", err);
        }
    }

    return (
        <div>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Launcher Input</th>
                        <th>Frames On Block</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(props.charInfo.launchers) && props.charInfo.launchers.map((launch, index) => (
                        <tr key={index} className="list-table-row">
                            <td>{launch.input}</td>
                            <td>{launch.framesOB}</td>
                            <td>
                                <button onClick={() => DeleteLauncher(event, launch.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br />

            <div className="table-buttons">
                <button onClick={() => {setPressedNewLauncherButton(true)}}>Add Launcher</button>
                {pressedNewLauncherButton && (
                    <div>
                        <form onSubmit={(event) => postNewLauncher(event)}>
                            <div>
                                <input type="text"
                                    value={newLauncherInput}
                                    onChange={(e) => setNewLauncherInput(e.target.value)}
                                    placeholder={"Launcher Input"} />
                            </div>
                            <div>
                                <input type="text"
                                    value={newLauncherFramesOB}
                                    onChange={(e) => setNewLauncherFramesOB(e.target.value)}
                                    placeholder={"Frames On Block"} />
                            </div>
                            <button type="submit">Submit</button>
                            <button onClick={() => setPressedNewLauncherButton(false)}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )

}