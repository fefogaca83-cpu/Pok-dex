import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Resultado } from '../../interfaces/pokeAPI';
import { PokemonService } from '../../services/PokemonService';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../interfaces/pokemon';


@Component({
  selector: 'app-id-pokemon',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './id-pokemon.html',
  styleUrl: './id-pokemon.scss',
})
export class IdPokemon implements OnChanges {
  constructor(private pokemonService: PokemonService) {}

  ngOnChanges(): void {
    this.extrairId();
  }

  @Input() data?: Resultado;
  @Input() seleccionado: boolean  = false;
  @Input() fullData?: Pokemon
  @Output() clickid = new EventEmitter<string>();
  id: string = '0';

  extrairId() {
    if (this.data && this.data.url !== "") {
      this.id = this.data.url.substring(34, this.data.url.length-1);
      return
    }
    if(this.fullData){
      this.id = this.fullData.species.url.substring(42, this.fullData.species.url.length-1);
      this.data = {
        name: this.fullData.species.name,
        url: ""
      }
    }
  }
}
