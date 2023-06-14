import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from 'src/app/services/pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {

  listarPensamentos: Pensamento[] = [] ;
  paginaAtual: number = 0;
  MaisPensamentos: boolean = true;
  filtro: string = '';
  isfavorite: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural';

  constructor(private pensamentoService: PensamentoService, private router: Router){}

  ngOnInit(): void {
    this.pensamentoService.list(this.paginaAtual, this.filtro, this.isfavorite).subscribe((listaPensamentos) => {
        this.listarPensamentos = listaPensamentos;
    })
  }

  loadPensamentos(){
    this.pensamentoService.list(++this.paginaAtual, this.filtro, this.isfavorite).subscribe(listaPensamentos => {
      this.listarPensamentos.push(...listaPensamentos);
      if(!listaPensamentos.length){
        this.MaisPensamentos = false;
      }
    })
      
  }

  pesquisar(){
    this.MaisPensamentos = true;
    this.paginaAtual = 1;
    this.pensamentoService.list(this.paginaAtual, this.filtro, this.isfavorite).subscribe(listaPensamentos => {
      this.listarPensamentos = listaPensamentos;
    })
  }

  searchFavorites(){
    this.titulo = "Meus Favoritos";
    this.isfavorite = true;
    this.MaisPensamentos = true;
    this.paginaAtual = 1;
    this.pensamentoService.list(this.paginaAtual, this.filtro, this.isfavorite).subscribe(listaPensamentosFavoritos => {
      this.listarPensamentos = listaPensamentosFavoritos
      this.listaFavoritos = listaPensamentosFavoritos
    })
  }

  refresh(){
    this.isfavorite = false;
    this.paginaAtual = 1;
    window.location.reload();
  }
}
