import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from 'src/app/services/pensamento.service';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {

  listarPensamentos: Pensamento[] = [] ;

  constructor(private pensamentoService: PensamentoService){}

  ngOnInit(): void {
    this.pensamentoService.list().subscribe((listaPensamentos) => {
        this.listarPensamentos = listaPensamentos;
    })
  }
}
