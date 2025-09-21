import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input,OnChanges, Output } from '@angular/core';
import { IdPokemon } from '../id-pokemon/id-pokemon';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/PokemonService';

@Component({
  selector: 'app-detalhes',
  standalone:true,
  imports: [CommonModule, IdPokemon],
  templateUrl: './detalhes.html',
  styleUrls: ['./detalhes.scss']
})
export class Detalhes implements OnChanges{

  @Input() pokemon?: Pokemon;
  @Input() aberto:boolean = false;
  @Input() combiarAberto = new EventEmitter();
  descricao: string = '';
   @Output() clickid = new EventEmitter<string>();

  constructor(private pokemonService: PokemonService){};
  
    ngOnChanges(): void {
      if(this.pokemon){
  this.pokemonService.getDescricao(this.pokemon?.id).then(res => {
  this.descricao = res;
        });
        
      }
    }
      
  
   
}
