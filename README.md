#Pokemon battle app

This is a full stack pokemon simulation battle app

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/ivy-ychen/pokemon.git
```

### 2. Start all services with Docker

```sh
docker-compose up --build
```

- **Backend**: http://localhost:5001

- **Frontend**: http://localhost:3000

---

## Backend API

### `GET /pokemon`

Fetch all Pokémon data from the database.

### `POST /battle`

Simulate a battle between two teams of Pokémon (by name).

**Request**

```http
POST /battle
Content-Type: application/json

{
  "team1": ["Bulbasaur", "Charmander","Venusaur"],
  "team2": ["Squirtle", "Pikachu","Charmeleon"]
}
```

---

## Running Backend Tests

Make sure dependencies are installed:

```sh
npm install
```

Then run tests:

```sh
npm test
```

---

## Project Time Allocation and future develop

\*\* Project Time Allocation

### 1. Calculate the hp according to the pokemons attributes

### 2. Calculate the attack value

### 3. First time to use mongoDB

\*\* Future

### 1. Beautify UI

### 2. Calculate the attack value

### 3. Random Events in Battle

- Introduce status effects like sleep, poison, paralysis, and confusion
- Add probability-based events (e.g. missed attacks, flinching, critical hits)

### 4.Battlefield Effects

- Implement terrain types (e.g. water, cave, grass, volcanic)
- Certain terrains give buffs or debuffs to specific Pokémon types (e.g. Water types gain HP in rain, Fire types lose attack in wet terrain)
