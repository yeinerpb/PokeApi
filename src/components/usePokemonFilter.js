import { useEffect, useState } from "react";
import axios from "axios";


function usePokemonFilter(typeOrName) {
    const [filteredPokemon, setFilteredPokemon] = useState([]);

    useEffect(() => {
        if (!typeOrName) {
            axios
                .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126")
                .then((res) => setFilteredPokemon(res.data.results));
        } else {
            if (typeOrName.startsWith("http")) {
                axios
                    .get(typeOrName)
                    .then((res) => setFilteredPokemon(res.data.pokemon));
            } else {
                axios
                    .get(`https://pokeapi.co/api/v2/pokemon/${typeOrName}`)
                    .then((res) => setFilteredPokemon([res.data]));
            }
        }
    }, [typeOrName]); 

    // Retornar los Pokémon filtrados
    return filteredPokemon;
}

export default usePokemonFilter;
