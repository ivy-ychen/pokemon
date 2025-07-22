import express from "express";
import { connectDB, initial } from "./db/connect-db";
import { battle } from "./routes/battle-api";
import { PokemonModel } from "./models/pokemon";
import cors from "cors";
import { validateBattleTeams } from "../src/validation/validation";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/pokemon", async (req, res) => {
  try {
    const pokemons = await PokemonModel.find({}).lean();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pokemon data." });
  }
});

app.post("/battle", async (req, res) => {
  const { team1, team2 } = req.body;
  if (!Array.isArray(team1) || !Array.isArray(team2)) {
    return res
      .status(400)
      .json({ error: "Both team1 and team2 must be arrays." });
  }
  try {
    validateBattleTeams(team1, team2);
    const team1Pokemons = await PokemonModel.find({
      name: { $in: team1 },
    }).lean();

    const team2Pokemons = await PokemonModel.find({
      name: { $in: team2 },
    }).lean();

    const logs = battle(team1Pokemons, team2Pokemons);
    res.json({ logs });
  } catch (error) {
    return res.status(400).json({
      error: error instanceof Error ? error.message : error,
    });
  }
});

const startServer = async () => {
  try {
    await connectDB();
    await initial();

    app.listen(5000, () => {
      console.log("Server is running on http://localhost:5000");
    });
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
};

startServer();
