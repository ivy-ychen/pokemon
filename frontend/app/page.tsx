"use client";
import { useEffect, useState } from "react";
import { Container, Grid, Text, Callout } from "@radix-ui/themes";
import PokemonCard from "./components/pokemon-card";
import { Pokemon } from "./type/global-type";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Battle from "./components/battle";
import Teams from "./components/teams";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [team1, setTeam1] = useState<Pokemon[]>([]);
  const [team2, setTeam2] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<
    Record<string, "left" | "right" | null>
  >({});
  const [battleLogs, setBattleLogs] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [calloutMessage, setCalloutMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchPokemons() {
    try {
      const response = await fetch("http://localhost:5001/pokemon");
      const data = await response.json();
      setPokemons(data);
    } catch (error) {
      setCalloutMessage(
        "Failed to fetch Pokemon data. Please try again later."
      );
      console.error(error);
    }
  }
  useEffect(() => {
    fetchPokemons();
  }, []);

  function handleSelect(pokemon: Pokemon, side: "left" | "right" | null) {
    if (selectedPokemon[pokemon.num]) {
      setCalloutMessage("You have already selected this Pokemon for the team.");
      return;
    }
    if (
      (side === "left" && team1.length >= 3) ||
      (side === "right" && team2.length >= 3)
    ) {
      setCalloutMessage("Each team can only have up to 3 Pokemons.");
      return;
    }
    if (side === "left") {
      setTeam1((prev) => [...prev, pokemon]);
      setSelectedPokemon((prev) => ({ ...prev, [pokemon.num]: "left" }));
    } else if (side === "right") {
      setTeam2((prev) => [...prev, pokemon]);
      setSelectedPokemon((prev) => ({ ...prev, [pokemon.num]: "right" }));
    }
  }

  async function handleBattle() {
    if (team1.length !== 3 || team2.length !== 3) {
      setCalloutMessage(
        "Both teams must have exactly 3 Pokemon to start a battle."
      );
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/battle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team1: team1.map((p) => p.name),
          team2: team2.map((p) => p.name),
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch battle logs");
      }
      const data = await res.json();
      setBattleLogs(data.logs);
      setIsOpen(true);
    } catch (error) {
      console.error("Error during battle:", error);
      setCalloutMessage("An error occurred while processing the battle.");
    }
  }

  function removePokemon(pokemon: Pokemon, side: "left" | "right") {
    if (side === "left") {
      setTeam1((prev) => prev.filter((p) => p.num !== pokemon.num));
    } else {
      setTeam2((prev) => prev.filter((p) => p.num !== pokemon.num));
    }
    setSelectedPokemon((prev) => ({
      ...prev,
      [pokemon.num]: null,
    }));
  }

  useEffect(() => {
    if (calloutMessage) {
      const timer = setTimeout(() => setCalloutMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [calloutMessage]);

  return (
    <Container size="4" className="py-5">
      <Text size="6" weight="bold" align="center" mb="6">
        Pokemon Gallery
      </Text>
      {calloutMessage && (
        <Callout.Root color="red" className="my-4">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{calloutMessage}</Callout.Text>
        </Callout.Root>
      )}

      <Teams team1={team1} team2={team2} removePokemon={removePokemon} />
      <Battle
        battle={handleBattle}
        logs={battleLogs}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search Pokemon by name or number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 w-full border border-gray-300 rounded"
        />
      </div>
      <Grid columns={{ initial: "1", sm: "2", md: "3", lg: "4" }} gap="4">
        {pokemons
          .filter((pokemon) => {
            if (searchQuery.trim() === "") return true;
            return (
              pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              pokemon.num.toString().includes(searchQuery)
            );
          })
          .map((pokemon) => (
            <PokemonCard
              key={pokemon.num}
              pokemon={pokemon}
              onSelect={handleSelect}
            />
          ))}
      </Grid>
    </Container>
  );
}
