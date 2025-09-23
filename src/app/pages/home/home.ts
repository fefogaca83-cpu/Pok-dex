import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FotoPokemon } from '../../conponents/foto-pokemon/foto-pokemon';
import { IdPokemon } from '../../conponents/id-pokemon/id-pokemon';
import { PokemonService } from '../../services/PokemonService';
import { Resultado } from '../../interfaces/pokeAPI';
import { Pokemon } from '../../interfaces/pokemon';
import { Detalhes } from '../../conponents/detalhes/detalhes';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FotoPokemon, IdPokemon, Detalhes],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  constructor(private pokemonServise: PokemonService) {}

  @ViewChild('targetas') trajetasElements!: ElementRef;

  listaPokemon: Resultado[] = [];

  pagina: number = 1;
  carregando: boolean = false;
  pokemonSelecionado?: Pokemon;
  detalle: boolean = false;

  ngOnInit(): void {
    this.carregarLista();
    this.pokemonServise.getById('1')
  }

  async carregarLista() {
    this.carregando = true;
    this.listaPokemon = [
      ...this.listaPokemon,
      ...(await this.pokemonServise.getByPege(this.pagina)),
    ];
    this.carregando = false;
    this.pagina++;
  }

  onScroll(e: any) {
    if (this.carregando) return;
    if (
      Math.round(
        this.trajetasElements.nativeElement.clientHeight +
          this.trajetasElements.nativeElement.scrollTop
      ) === e.srcElement.scrollHeight
    ) {
      this.carregarLista();
    }
  }

 async targetaClickId(id:string){
  if(this.pokemonSelecionado && id === this.pokemonSelecionado?.id.toString()){
    return this.cambiarEstadoDetalle()
  }

  this.pokemonSelecionado = await this.pokemonServise.getById(id);
  
}

  cambiarEstadoDetalle(){
    if(this.pokemonSelecionado)
    this.detalle = !this.detalle;

  }
}
