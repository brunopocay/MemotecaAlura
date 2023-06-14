import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from 'src/app/services/pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.css']
})
export class ExcluirPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: '',
    isFavorite: false
  }

  constructor(private service: PensamentoService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.searchById(parseInt(id!)).subscribe((pensamento) =>{
      this.pensamento = pensamento;
    })
  }

  excluirPensamento(){
    if(this.pensamento.id){
        this.service.delete(this.pensamento.id).subscribe(() => this.router.navigate(['/Pensamentos']));        
    }
    // setTimeout(() => {
    //     window.location.reload()
    // },50);
  }

  cancelar(){
    this.router.navigate(['/Pensamentos']);
  }
}
