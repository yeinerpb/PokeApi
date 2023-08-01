import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokedexCard from "./PokedexCard";
import "../style/Pokedex.css";
import Pagination from "./Pagination";

const Pokedex = () => {
    const userName = useSelector((state) => state.userName);
    const navigate = useNavigate();

    const [pokedex, setPokedex] = useState([]);
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonType, setPokemonType] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage] = useState(12);
    const [pageCount, setPageCount] = useState(0);
    const [currentType, setCurrentType] = useState("all"); 

    useEffect(() => {
        if (currentType === "all") {
            fetchPokedexData((page - 1) * perPage, perPage);
        } else {
            fetchPokemonsByType(currentType, page);
        }

        axios
            .get("https://pokeapi.co/api/v2/type/")
            .then((res) => setPokemonType(res.data.results))
            .catch((error) => console.log(error));
    }, [page, perPage, currentType]);

    const fetchPokedexData = (offset, limit) => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            .then((res) => {
                setPokedex(res.data.results);
                setPageCount(Math.ceil(res.data.count / limit));
            })
            .catch((error) => console.log(error));
    };

    const fetchPokemonsByType = (typeUrl, page) => {
        axios.get(typeUrl).then((res) => {
            const pokemons = res.data.pokemon.map((pokemon) => ({
                name: pokemon.pokemon.name,
                url: pokemon.pokemon.url,
            }));
            setPokedex(pokemons.slice((page - 1) * perPage, page * perPage)); 
            setPageCount(Math.ceil(pokemons.length / perPage));
        });
    };

    const handleChange = (selected) => {
        setPage(selected.selected + 1);
    };

    const submit = (e) => {
        e.preventDefault();
        let pokemonName = e.target.elements[0].value;
        pokemonName = pokemonName.toLowerCase();
        navigate(`/pokedex/${pokemonName}`);
    };

    const typePokemon = (e) => {
        const typeUrl = e.target.value;
        setCurrentType(typeUrl);
        fetchPokemonsByType(typeUrl, 1);
        setPage(1);
    };

    return (
        <div className="beginning">
            <h2 className="welcome">
                <b>
                    ¡Hola <strong>{userName}!</strong>
                </b>
            </h2>
            <div className="select">
                <div className="type-pokemon" onClick={typePokemon}>
                    <button value="all" className="button-all">
                        Todos
                    </button>
                    {pokemonType.map((pokemonType) => (
                        <button
                            key={pokemonType.url}
                            value={pokemonType.url}
                            className={`button-${pokemonType.name}`}
                        >
                            {pokemonType.name}
                        </button>
                    ))}
                </div>
            </div>
            <form className="info-container" onSubmit={submit}>
                <label htmlFor=""> </label>
                <input
                    type="text"
                    id="pokedex.name"
                    value={pokemonName}
                    onChange={(e) => setPokemonName(e.target.value)}
                    placeholder="Buscar por nombre"
                />
                <button>Buscar</button>
            </form>

            <ul className="pokedex-list">
                {pokedex.map((pokemon) => (
                    <PokedexCard
                        pokedexUrl={pokemon.url ? pokemon.url : pokemon.pokemon?.url}
                        key={pokemon.name}
                    />
                ))}
            </ul>

            <div style={{ display: "block", padding: 30 }}>
                <Pagination
                    pageCount={pageCount}
                    page={page}
                    onPageChange={handleChange}
                    previousLabel={"Anterior"}
                    nextLabel={"Siguiente"}
                    color={"primary"}
                    shape={"rounded"}
                    variant={"outlined"}
                />
            </div>
        </div>
    );
};

export default Pokedex;
