import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../style/PokedexInfo.css";

const PokedexInfo = () => {
    const { id } = useParams();

    const [pokedex, setPokedex] = useState([]);

    useEffect(() => {
        axios
            .get(` https://pokeapi.co/api/v2/pokemon/${id}/ `)
            .then((res) => setPokedex(res.data));
    }, [id]);

    const getTypeClass = (type) => {
        switch (type) {
            case 'normal':
                return 'normal';
            case 'fire':
                return 'fire';
            case 'water':
                return 'water';
            case 'grass':
                return 'grass';
            case 'electric':
                return 'electric';
            case 'ice':
                return 'ice';
            case 'fighting':
                return 'button-fighting';
            case 'poison':
                return 'poison';
            case 'ground':
                return 'ground';
            case 'flying':
                return 'flying';
            case 'psychic':
                return 'psychic';
            case 'bug':
                return 'bug';
            case 'rock':
                return 'rock';
            case 'ghost':
                return 'ghost';
            case 'dragon':
                return 'dragon';
            case 'dark':
                return 'dark';
            case 'steel':
                return 'steel';
            case 'fairy':
                return 'fairy';
            case 'unknown':
                return 'unknown';
            case 'shadow':
                return 'shadow';
            default:
                return '';
        }
    };

    return (
        <div className={`info ${getTypeClass(pokedex.types?.[0]?.type.name)}`}>
            <figure>
                <div className="id">
                    <h3># {pokedex.id}</h3>
                </div>
                <h2>{pokedex.name}</h2>
                <div className="info-pokemon">
                    <div className="img-pokemon">
                        <img src={pokedex.sprites?.other.dream_world.front_default} alt={pokedex.name} />
                    </div>
                    <div className="detail-pokemon">
                        <ul>
                            <li><b>Height:</b> {pokedex.height}</li>
                            <li><b>Weight:</b> {pokedex.weight}</li>
                            <li><b>Exp:</b> {pokedex.base_experience}</li>
                            <li><b>Type:</b> {pokedex.types?.[0]?.type.name} / {pokedex.types?.[1]?.type.name}</li>
                        </ul>
                    </div>
                </div>
            </figure>
        </div>

    );
};

export default PokedexInfo;
