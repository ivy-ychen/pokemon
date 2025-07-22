export interface Pokemon {
  id: number;
  num: string;
  name: string;
  img: string;
  type: string[];
  height: string;
  weight: string;
  candy: string;
  candy_count?: number;
  egg: string;
  spawn_chance: number;
  avg_spawns: number;
  spawn_time: string;
  multipliers?: number[];
  weaknesses: string[];
  next_evolution?: { num: string; name: string }[];
  prev_evolution?: { num: string; name: string }[];
}

export interface Team {
  pokemons: Pokemon[];
  selected: Pokemon[];
  setSelected: (team: Pokemon[]) => void;
  side: "left" | "right";
}
