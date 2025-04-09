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

    const [newHEInput, setNewHEInput] = useState("");
    const [newHEFramesOB, setNewHEFramesOB] = useState("");

    const [pressedNewComboButton, setPressedNewComboButton] = useState(false);
    const [pressedNewHEButton, setPressedNewHEButton] = useState(false);
    const [pressedDeleteComboButton, setPressedDeleteComboButton] = useState(false);
    const [pressedDeleteHEButton, setPressedDeleteHEButton] = useState(false);

    useEffect(() => {
        const fetchChar = async () => {
            try{
                const response = await axios.get(`${currentURL}/Char/char/${name}`);
                setCharInfo(response.data);
            } catch (err){
                console.error("Error fetching character:", err);
            }
        };
        fetchChar();
    }, [currentURL, name]);

    const postNewCombo = async (event) => 
    {
        event.preventDefault();

        try 
        {
            const response = await axios.post(`${currentURL}/Combo/${name}`, 
                {
                    textNotation: newComboText,
                    visualNotationURL: newComboURL,
                    damage: newComboDamage
                });

            setCharInfo((prevCharInfo) => ({
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

    const postNewHE = async (event) => 
        {
            event.preventDefault();
    
            try 
            {
                const response = await axios.post(`${currentURL}/HeatEngager/${name}`, 
                    {
                        input: newHEInput,
                        framesOB: newHEFramesOB
                    });
    
                setCharInfo((prevCharInfo) => ({
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
                    {Array.isArray(charInfo.combos) && charInfo.combos.map((combo, index) => (
                        <tr key={index} className="list-table-row">
                            <td>{combo.textNotation}</td>
                            <td>{combo.visualNotationURL}</td>
                            <td>{combo.damage}</td>
                            <td>
                                <button onClick={() => handleDeleteButtonClick(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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

                <button onClick={() => {setPressedDeleteComboButton(true)}}>Delete Combo</button>
            </div>

            {/* Heat Engagers Table */}
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Heat Engager Input</th>
                        <th>Frames On Block</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(charInfo.heatEngagers) && charInfo.heatEngagers.map((he, index) => (
                        <tr key={index} className="list-table-row">
                            <td>{he.input}</td>
                            <td>{he.framesOB}</td>
                            <td>
                                <button onClick={() => handleDeleteButtonClick(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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

                <button onClick={() => {setPressedDeleteHEButton(true)}}>Delete Heat Engager</button>
            </div>

            {/* Launchers Table */}
            {/* Stances Table */}
            {/* Punishers Table */}
        </div>  
    )
}