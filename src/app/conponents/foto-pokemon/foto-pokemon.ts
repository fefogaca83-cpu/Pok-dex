import { Component, Input,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../interfaces/pokemon';


@Component({
  selector: 'app-foto-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foto-pokemon.html',
  styleUrls: [`./foto-pokemon.scss`]
})
export class FotoPokemon{
  @Input() pokemon?: Pokemon;


}
