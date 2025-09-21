import { Injectable } from '@angular/core';
import { Resultado } from '../interfaces/pokeAPI';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor() {}

  async getByPege(page: number, size: number = 40): Promise<Resultado[]> {
    if (page > 5) return [];
    const offset = size * (page - 1);
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${size}&offset=${offset}`);
    const resJason = await res.json();
    if (resJason.results.length > 0) return resJason.results;
    return [];
  }

  async getById(id: string): Promise<Pokemon> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await res.json();
  }

  async getDescricao(id: string | number): Promise<string> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const resJson = await res.json();
    const texto = resJson.flavor_text_entries.find((texto: any) => texto.language.name === 'es');
    return texto.flavor_text;
  }
}
