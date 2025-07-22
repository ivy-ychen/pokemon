import { Avatar, Box, Button, Flex, Text } from "@radix-ui/themes";
import { Pokemon } from "../type/global-type";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function Teams({
  team1,
  team2,
  removePokemon,
}: {
  team1: Pokemon[];
  team2: Pokemon[];
  removePokemon: (pokemon: Pokemon, side: "left" | "right") => void;
}) {
  return (
    <Flex justify="between" className="mb-8 w-full mt-6 px-6">
      {/* Team 1 */}

      <Flex direction="column" align="start" gap="3">
        <Text size="3" weight="bold" className="text-red-500">
          Team 1
        </Text>
        <Flex direction="row" gap="5">
          {[0, 1, 2].map((i) => {
            const pokemon = team1[i];

            return (
              <Box key={i} className="relative  w-fit">
                <Avatar
                  src={pokemon?.img}
                  fallback={"?"}
                  size="6"
                  radius="full"
                  className={`border-2 ${
                    pokemon ? "border-red-500" : "border-red-300  opacity-50"
                  }`}
                />

                {pokemon && (
                  <Button
                    size="1"
                    color="gray"
                    variant="soft"
                    className="absolute -top-2 -right-2"
                    onClick={() => removePokemon(pokemon, "left")}
                  >
                    <Cross2Icon />
                  </Button>
                )}
              </Box>
            );
          })}
        </Flex>
      </Flex>

      {/* Team 2 */}

      <Flex direction="column" align="end" gap="3">
        <Text size="3" weight="bold" className="text-blue-500">
          Team 2
        </Text>
        <Flex direction="row" gap="5">
          {[0, 1, 2].map((i) => {
            const pokemon = team2[i];
            return (
              <Box key={i} className="relative  w-fit">
                <Avatar
                  src={pokemon?.img}
                  fallback={"?"}
                  size="6"
                  radius="full"
                  className={`border-2 ${
                    pokemon ? "border-blue-500" : "border-blue-300  opacity-50"
                  }`}
                />
                {pokemon && (
                  <Button
                    size="1"
                    color="gray"
                    variant="soft"
                    className="absolute -top-2 -right-2"
                    onClick={() => removePokemon(pokemon, "right")}
                  >
                    <Cross2Icon />
                  </Button>
                )}
              </Box>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}
