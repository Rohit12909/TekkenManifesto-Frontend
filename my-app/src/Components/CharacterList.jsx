import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUserContext  } from './UserContext';
import './CharacterList.css';

function CharacterList()
{
    const { currentURL } = useUserContext();
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get(`${currentURL}/api/Char`);
                setCharacters(response.data);
            } catch (error) {
                console.error("Error fetching characters:", error);
            }
        };
        fetchCharacters();
    }, []);

    return(
        <div className="character-page">
            <header>
                <h1>Character List</h1>
            </header>

            {/* All Characters table */}
            <table className="char-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Origin</th>
                        <th>Fighting Style</th>
                        <th>Highest Rank Achieved</th>
                        <th>Played</th>

                    </tr>
                </thead>
                <tbody>
                    {characters.map((character, index) => (
                        <tr key={index} className="char-row">
                            <td>
                                <Link to={`/character/${character?.name}`}>
                                    {character.name}
                                </Link>
                            </td>
                            <td>
                                {character.origin}
                            </td>
                            <td>
                                {character.fightingStyle}
                            </td>
                            <td>
                                {character.highestRank}
                            </td>
                            <td>
                                {character.played}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CharacterList;