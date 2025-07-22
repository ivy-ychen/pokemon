const validateDuplicatePokemon = (team: string[]) => {
  const pokemonSet = new Set(team);
  if (pokemonSet.size !== team.length) {
    throw new Error("Invalid: Duplicate Pokémon found in the team");
  }
};

export const validateBattleTeams = (team1: string[], team2: string[]) => {
  if (team1.length === 0 || team2.length === 0) {
    throw new Error("Invalid: Teams cannot be empty");
  }
  if (team1.length !== team2.length) {
    throw new Error("Invalid: Teams must have the same number of Pokemons");
  }
  if (team1.length !== 3 || team2.length !== 3) {
    throw new Error("Invalid: Each team must have exactly 3 Pokemons");
  }

  validateDuplicatePokemon(team1);
  validateDuplicatePokemon(team2);

  const duplicates = team1.filter((pokemon) => team2.includes(pokemon));
  if (duplicates.length > 0) {
    throw new Error(
      `Invalid: Duplicate Pokémon found between teams: ${duplicates.join(", ")}`
    );
  }
};
