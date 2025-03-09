import axios from "axios";

// Substitua pela chave da API do ExerciseDB
const API_KEY = "fe615e54dbmshf0d4858afdfebd8p15ab74jsn1248111b1c31"; // Sua chave da API

const api = axios.create({
  baseURL: "https://exercisedb.p.rapidapi.com/exercises",
  headers: {
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    "X-RapidAPI-Key": "fe615e54dbmshf0d4858afdfebd8p15ab74jsn1248111b1c31", // Sua chave da API
  },
});

export default api;
