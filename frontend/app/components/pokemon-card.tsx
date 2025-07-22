"use client";
import { Avatar, Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { Pokemon } from "../type/global-type";

export default function PokemonCard({
  pokemon,
  onSelect,
  side,
}: {
  pokemon: Pokemon;
  onSelect: (pokemon: Pokemon, side: "left" | "right" | null) => void;
  side?: "left" | "right";
}) {
  return (
    //info card for each pokemon
    //display pokemon image, name, height, weight, type, egg, spawn chancexw
    <Card
      size="5"
      className={`w-full relative transition-all
        ${side === "left" ? "border-2 border-red-500" : ""}
        ${side === "right" ? "border-2 border-blue-500" : ""}
      `}
    >
      <Box className="absolute top-2 left-3 bg-gray-100  text-gray-700 rounded px-2 py-1 text-xs font-bold shadow">
        {pokemon.num}
      </Box>
      <Flex direction="column" align="center" gap="3">
        <Avatar
          size="6"
          src={pokemon.img}
          radius="full"
          fallback={pokemon.name[0]}
        />
        <Text size="4" weight="bold" align="center">
          {pokemon.name}
        </Text>

        <Text size="2" color="gray" align="center">
          Height: {pokemon.height}
        </Text>
        <Text size="2" color="gray" align="center">
          Weight: {pokemon.weight}
        </Text>
        <Flex gap="2" wrap="wrap" justify="center" className="mt-2">
          {pokemon.type.map((type) => (
            <Box
              key={type}
              className="px-2 py-1 rounded-full bg-blue-100  text-blue-700 text-xs font-semibold"
            >
              {type}
            </Box>
          ))}
        </Flex>
        <Text as="div" size="2" color="gray" align="center" className="mt-2">
          Egg: {pokemon.egg}
        </Text>
        <Text as="div" size="2" color="gray" align="center">
          Spawn Chance: {pokemon.spawn_chance}
        </Text>
        <Flex gap="2" wrap="wrap" justify="center" className="mt-2">
          {pokemon.weaknesses.map((w) => (
            <Box
              key={w}
              className="px-2 py-1  rounded-full bg-red-100 text-red-700 text-xs font-semibold"
            >
              {w}
            </Box>
          ))}
        </Flex>
        <Flex gap="2" className="mt-4" justify="center">
          <Button
            variant="soft"
            size="2"
            className="w-full"
            onClick={() => onSelect(pokemon, "left")}
          >
            Add to Team1
          </Button>
          <Button
            variant="soft"
            color="blue"
            size="2"
            className="w-full"
            onClick={() => onSelect(pokemon, "right")}
          >
            Add to Team2
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
