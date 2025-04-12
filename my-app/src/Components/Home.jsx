import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUserContext  } from './UserContext';
import './Home.css';

function Home()
{
    const { currentURL } = useUserContext();
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get(`${currentURL}/Char`);
                setCharacters(response.data);
            } catch (error) {
                console.error("Error fetching characters:", error);
            }
        };
        fetchCharacters();
    }, []);

    {/* DISPLAY CURRENT LIST OF CHARACTERS AS CARDS,
        INCLUDE ONE CHARACTER CARD SLOT FOR ADD CHARACTER*/}
    return(
        <div>
            <div className="card-grid-container">
                {characters.map((character, index) => (
                    <div className="card" key={index}>
                        <div class="content">
                            <div class="front">
                                <img 
                                    src={character.imageURL} 
                                    alt={`${character.name}'s image`}
                                    className='char-card-image' />
                                <div className="char-name">{character.name}</div>
                            </div>
                            <div class="back">Back</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;