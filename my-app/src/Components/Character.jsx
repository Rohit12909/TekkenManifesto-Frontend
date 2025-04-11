import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from './UserContext';

import './Character.css';

{/* Child Components */}
import ComboTable from './CharacterComponents/ComboTable.jsx';
import HeatEngagerTable from './CharacterComponents/HeatEngagerTable.jsx';
import LauncherTable from './CharacterComponents/LauncherTable.jsx';
import PunisherTable from './CharacterComponents/PunisherTable.jsx';
import StanceTable from './CharacterComponents/StanceTable.jsx';

export default function Character()
{
    const { name } = useParams();
    const {currentURL} = useUserContext();

    const [charInfo, setCharInfo] = useState({});

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

    return (
        <div>
            <header>
                <h1>{ charInfo?.name }</h1>
            </header>

            {/* Combos Table */}
            <ComboTable name={name} charInfo={charInfo} setCharInfo={setCharInfo} />

            <br />

            {/* Heat Engagers Table */}
            <HeatEngagerTable name={name} charInfo={charInfo} setCharInfo={setCharInfo} />

            <br />

            {/* Launchers Table */}
            <LauncherTable name={name} charInfo={charInfo} setCharInfo={setCharInfo} />

            <br />

            {/* Punishers Table */}
            <PunisherTable name={name} charInfo={charInfo} setCharInfo={setCharInfo} />

            <br />

            {/* Stances Table */}
            <StanceTable name={name} charInfo={charInfo} setCharInfo={setCharInfo} />

            <br />
        </div>  
    )
}