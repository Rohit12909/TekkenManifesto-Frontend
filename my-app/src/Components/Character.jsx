import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from './UserContext';
import './Character.css';

export default function Character()
{
    const { name } = useParams();
    const { currentURL } = useUserContext();

    const [charInfo, setCharInfo] = useState([]);

    useEffect(() => {
        const fetchChar = async () => {
            try{
                const response = await axios.get(`${currentURL}/api/Char/char/${name}`);
                setCharInfo(response.data);
            } catch (err){
                console.error("Error fetching character:", err);
            }
        }
        fetchChar();
    }, []);


    return (
        <div>
            <header>{ charInfo.name }</header>

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
                    {charInfo.combos.map((combo, index) => (
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
            </table>
        </div>
    )
}