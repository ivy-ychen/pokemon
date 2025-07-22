import { BattlePokemon } from "../models/battle-pokemon";
import { Pokemon } from "../models/pokemon";
// 1. weight>100kg hp will be higher
// 2. height>3m hp will be higher
// 3. size SML, S: height<1m, weight<20kg,hp:20-60; M:height:1~2m, weight:20~100kg, hp:50-100; L: height>2m, weight>100kg, hp:80-170
// 4. base=40, hp=base+weight/10+height*5
export const calculatePokemonHP = (height: string, weight: string): number => {
  const h = parseFloat(height);
  const w = parseFloat(weight);

  let hp = 40 + Math.floor(w / 10) + Math.floor(h * 5);

  if (w > 100) hp += 20;
  if (h > 3) hp += 20;
  //size factor SML
  if (h < 1 && w < 20) {
    hp = Math.max(20, Math.min(hp, 60));
  } else if (h >= 1 && h < 2 && w >= 20 && w < 100) {
    hp = Math.max(50, Math.min(hp, 100));
  } else if (h >= 2 && w >= 100) {
    hp = Math.max(80, Math.min(hp, 170));
  }

  return hp;
};

const calculateWM = (
  attackerTypes: String[],
  attackerWeaknesses: String[],
  defenderTypes: String[],
  defenderWeaknesses: String[]
): number => {
  let multiplier = 1;

  attackerTypes.forEach((type) => {
    if (defenderWeaknesses.includes(type)) {
      multiplier *= 1.5;
    }
  });

  if (attackerWeaknesses.some((weakness) => defenderTypes.includes(weakness))) {
    multiplier *= 0.5;
  }

  return multiplier;
};

const calculateSF = (height: string, weight: string): number => {
  const h = parseFloat(height);
  const w = parseFloat(weight);
  const sf = Math.sqrt((w / 100) * (h / 2));
  return sf;
};

export const calculatePokemonDamage = (
  attacker: BattlePokemon,
  defender: BattlePokemon
): number => {
  const h = parseFloat(attacker.height);
  const w = parseFloat(attacker.weight);
  // the value influences the damage: LEVEL(DEFAULT:50),POWER(DEFAULT:50),ATTACK(DEFAULT:50),DEFENSE(DEFAULT:30), WM(WEAKNESS MULTIPLIER),SF(SIZE FACTOR)
  const level = 50;
  const power = 50;
  const attack = 50;
  const defense = 30;

  const wm = calculateWM(
    attacker.type,
    attacker.weaknesses,
    defender.type,
    defender.weaknesses
  );
  const sf = calculateSF(attacker.height, attacker.weight);

  const levelFactor = Math.floor((level * 2) / 5 + 2);
  const base = (levelFactor * power * attack) / defense / 50 + 2;
  return Math.floor(base * wm * sf);
};

const getBattlePokemons = (pokemons: Pokemon[]): BattlePokemon[] => {
  return pokemons.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    hp: calculatePokemonHP(pokemon.height, pokemon.weight),
    type: pokemon.type,
    weaknesses: pokemon.weaknesses,
    height: pokemon.height,
    weight: pokemon.weight,
  }));
};

export const battle = (team1: Pokemon[], team2: Pokemon[]): string[] => {
  const logs: string[] = [];
  const battleTeam1 = getBattlePokemons(team1);
  const battleTeam2 = getBattlePokemons(team2);

  let round = 1;
  while (battleTeam1.length > 0 && battleTeam2.length > 0) {
    const attackingTeam: 1 | 2 = round % 2 == 0 ? 2 : 1;
    const [attacker] = attackingTeam == 1 ? battleTeam1 : battleTeam2;
    const [defender] = attackingTeam == 1 ? battleTeam2 : battleTeam1;

    const damage = calculatePokemonDamage(attacker, defender);
    defender.hp -= damage;

    logs.push(
      `Round ${round}: Team ${attackingTeam} ${attacker.name} attacks ${defender.name} for ${damage} damage.`
    );

    // effective if attacker's type is in defender's weaknesses
    const effective = attacker.type.some((type) =>
      defender.weaknesses.includes(type)
    );
    if (effective) {
      logs.push("super effective!");
    }

    const ineffective = attacker.weaknesses.some((weakness) =>
      defender.type.includes(weakness)
    );

    if (ineffective) {
      logs.push("not very effective...");
    }

    if (defender.hp <= 0) {
      logs.push(`${defender.name} has fainted`);
      if (attackingTeam == 1) {
        battleTeam2.shift();
      } else {
        battleTeam1.shift();
      }
    } else {
      logs.push(`${defender.name} has ${defender.hp} HP left`);
    }

    round++;
  }

  const winner = battleTeam1.length > 0 ? "Team 1" : "Team 2";
  logs.push(`${winner} wins the battle!`);

  return logs;
};
