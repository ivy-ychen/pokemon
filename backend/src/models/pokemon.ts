import mongoose, { Document, Schema } from "mongoose";

export interface Pokemon extends Document {
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

const PokemonSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  num: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  type: { type: [String], required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  candy: { type: String, required: true },
  candy_count: { type: Number },
  egg: { type: String, required: true },
  spawn_chance: { type: Number, required: true },
  avg_spawns: { type: Number, required: true },
  spawn_time: { type: String, required: true },
  multipliers: { type: [Number] },
  weaknesses: { type: [String], required: true },
  next_evolution: [{ num: String, name: String }],
  prev_evolution: [{ num: String, name: String }],
});

export const PokemonModel = mongoose.model<Pokemon>("Pokemon", PokemonSchema);
