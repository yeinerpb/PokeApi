import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PokedexCard = ({ pokedexUrl }) => {

    const [pokedex, setPokedex] = useState({});

    useEffect(() => {
        axios.get(pokedexUrl).then((res) => setPokedex(res.data))
    }, [pokedexUrl])

    console.log(pokedex);

    const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png";
    return (
        <div className={'col button-' + pokedex.types?.[0]?.type.name}>
            <Link to={`/pokedex/${pokedex.id}`} className='pokedex-card' >
                <h3>#{pokedex.id}</h3>
                <img src={pokedex.sprites?.other.dream_world.front_default || defaultImage} alt="" />
                <h3> {pokedex.name}</h3>
                <div className='type-container'>
                    <h4><b></b>{pokedex.types?.[0]?.type.name} </h4>
                    <h4><b></b>{pokedex.types?.[1]?.type.name} </h4>
                </div>
            </Link>
        </div>
    );
};

export default PokedexCard;