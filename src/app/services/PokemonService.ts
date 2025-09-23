import { Injectable } from '@angular/core';
import { Resultado } from '../interfaces/pokeAPI';
import { Pokemon } from '../interfaces/pokemon';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor() {}

  async getByPege(page: number, size: number = 40): Promise<Resultado[]> {
    if (page > 5) return [];
    const offset = size * (page - 1);
    const res = await fetch(`/api/pokemon/?limit=${size}&offset=${offset}`);
    const resJason = await res.json();
    if (resJason.results.length > 0) return resJason.results;
    return [];
  }

  async getById(id: string): Promise<Pokemon> {
    console.log('🔍 Buscando pokemon ID:', id);
    const res = await fetch(`/api/pokemon/${id}`);
    const pokemon = await res.json();
    console.log('✅ Pokemon encontrado:', pokemon.name, 'Altura:', pokemon.height, 'Peso:', pokemon.weight);
    return pokemon;
  }

  async getDescricao(id: string | number): Promise<string> {
    const res = await fetch(`/api/pokemon-species/${id}`);
    const resJson = await res.json();
    const texto = resJson.flavor_text_entries.find((texto: any) => texto.language.name === 'es');
    return texto.flavor_text;
  }
}