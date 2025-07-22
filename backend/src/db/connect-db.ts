import mongoose from "mongoose";
import dataset from "../../data/pokemon.json";
import { PokemonModel } from "../models/pokemon";

export const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://mongodb:27017/pokemon_db";
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export const initial = async () => {
  await PokemonModel.deleteMany({});
  await PokemonModel.insertMany(dataset.pokemon);
  console.log("Pokemon data inserted");
};
