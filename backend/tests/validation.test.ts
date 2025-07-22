import { validateBattleTeams } from "./validation";

describe("validateBattleTeams", () => {
  it("should throw an error if team1 is empty", () => {
    expect(() =>
      validateBattleTeams([], ["Pikachu", "Bulbasaur", "Charmander"])
    ).toThrow("Invalid: Teams cannot be empty");
  });

  it("should throw an error if team2 is empty", () => {
    expect(() =>
      validateBattleTeams(["Pikachu", "Bulbasaur", "Charmander"], [])
    ).toThrow("Invalid: Teams cannot be empty");
  });

  it("should throw an error if teams have different lengths", () => {
    expect(() =>
      validateBattleTeams(["Pikachu", "Bulbasaur"], ["Charmander"])
    ).toThrow("Invalid: Teams must have the same number of Pokemons");
  });

  it("should throw an error if teams do not have exactly 3 Pokemons", () => {
    expect(() =>
      validateBattleTeams(["Pikachu", "Bulbasaur"], ["Charmander", "Squirtle"])
    ).toThrow("Invalid: Each team must have exactly 3 Pokemons");
  });
  it("should throw an error if team1 has duplicate Pokemons", () => {
    expect(() =>
      validateBattleTeams(
        ["Pikachu", "Bulbasaur", "Pikachu"],
        ["Charmander", "Squirtle", "Jigglypuff"]
      )
    ).toThrow("Invalid: Duplicate Pokémon found in the team");
  });
  it("should throw an error if team2 has duplicate Pokemons", () => {
    expect(() =>
      validateBattleTeams(
        ["Pikachu", "Bulbasaur", "Charmander"],
        ["Squirtle", "Jigglypuff", "Squirtle"]
      )
    ).toThrow("Invalid: Duplicate Pokémon found in the team");
  });
  it("should throw an error if there are duplicate Pokemons between teams", () => {
    expect(() =>
      validateBattleTeams(
        ["Pikachu", "Bulbasaur", "Charmander"],
        ["Pikachu", "Squirtle", "Jigglypuff"]
      )
    ).toThrow("Invalid: Duplicate Pokémon found between teams: Pikachu");
  });
  it("should not throw an error for valid teams", () => {
    expect(() =>
      validateBattleTeams(
        ["Pikachu", "Bulbasaur", "Charmander"],
        ["Squirtle", "Jigglypuff", "Meowth"]
      )
    ).not.toThrow();
  });
});
