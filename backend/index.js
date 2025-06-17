const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

app.get('/pokemons', async (req, res) => {
  const { offset = 0, limit = 20 } = req.query;
  try {
    const response = await axios.get(`${BASE_URL}?offset=${offset}&limit=${limit}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pokemons' });
  }
});

app.get('/pokemons/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ error: 'Pokémon não encontrado' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
