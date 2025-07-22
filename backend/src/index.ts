import express from "express";
import { connectDB, initial } from "./db/connect-DB";
import { battle } from "./routes/battle-api";
import { PokemonModel } from "./models/pokemon";

const app = express();
app.use(express.json());

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
    const team1Pokemons = await PokemonModel.find({
      name: { $in: team1 },
    }).lean();

    const team2Pokemons = await PokemonModel.find({
      name: { $in: team2 },
    }).lean();

    const logs = battle(team1Pokemons, team2Pokemons);
    res.json({ logs });
  } catch (error) {
    res.status(500).json({ error: "Battle simulation failed." });
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
