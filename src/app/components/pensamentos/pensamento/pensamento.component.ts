import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from 'src/app/services/pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {


  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    isFavorite: false
  }

  @Input() listaFavoritos: Pensamento[] = [];

  constructor(private service: PensamentoService){

  }

  ngOnInit(): void {
    
  }

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256){
        return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  isFavorite(): string{
    if(this.pensamento.isFavorite == false){
      return 'inativo'
    }    
    return 'ativo'
  }

  updateFavorite(){
    this.service.changeFavorite(this.pensamento).subscribe(() => {
      this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento), 1);
    })
  }
}
