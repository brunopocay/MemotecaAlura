import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from 'src/app/services/pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

    pensamento: Pensamento = {
      conteudo: '',
      autoria: '',
      modelo: 'modelo1'
    }

    constructor(private service: PensamentoService, private router: Router){}
    
    ngOnInit(): void {
      
    }

    criarPensamento(){
      this.service.create(this.pensamento).subscribe(() => this.router.navigate(['/Pensamentos']));
      
      // setTimeout(() => {
      //   window.location.reload()
      // },50);  
    }

    cancelar(){
      this.router.navigate(['/Pensamentos']);
    }   
}
