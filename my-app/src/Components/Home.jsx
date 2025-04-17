import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUserContext  } from './UserContext';
import './Home.css';

function Home()
{
    const { currentURL } = useUserContext();
    const [characters, setCharacters] = useState([]);
    const [imageSizes, setImageSizes] = useState({});
    const imageRefs = useRef({});

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

    const handleImageLoad = (id) => {
        const card = imageRefs.current[id];
        if (card) {
            const { offsetHeight, offsetWidth } = card;
            setImageSizes((prev) => ({
                ...prev,
                [id]: {
                    height: offsetHeight,
                    width: offsetWidth,
                }
            }));
        }
    }

    {/* DISPLAY CURRENT LIST OF CHARACTERS AS CARDS,
        INCLUDE ONE CHARACTER CARD SLOT FOR ADD CHARACTER*/}
    return(
        <div>
            <div className="card-grid-container">
                {characters.map((character, index) => (
                <Link to={`/character/${character?.name}`}>
                    <div className="card" key={index}
                         ref={(el) => (imageRefs.current[character.id] = el)}>
                        <div class="content">
                            <div class="front">
                                <div className="image-wrapper">
                                    <img 
                                        src={character.imageURL} 
                                        alt={`${character.name}'s image`}
                                        className='char-card-image'
                                        onLoad={() => handleImageLoad(character.id)} />
                                </div>
                                <div className="char-name">{character.name}</div>
                            </div>
                            <div className="back">
                                <div style={{ overflowY: 'auto', maxHeight: '100%', width: '100%'}}>
                                    Origin: {character.origin} <br/> <br/>
                                    Fighting Style: {character.fightingStyle} <br/> <br/>
                                    History: {character.history} <br/> <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                ))}

                <Link to="" className="card add-card">
                    <div className="content">
                        <div className="front add-front">
                            <div className="plus-icon">+</div>
                            <div className="char-name">Add Character</div>
                        </div>
                        <div className="back"></div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Home;