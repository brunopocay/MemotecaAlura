import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from 'src/app/services/pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {
  
  pensamento: Pensamento = {
    conteudo: '',
    autoria:'',
    modelo:''
  }

  constructor(private service: PensamentoService, private router: Router, private route: ActivatedRoute){}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.searchById(parseInt(id!)).subscribe((pensamento) => {
        this.pensamento = pensamento;
    })
  }

  editarPensamento(){
    this.service.edit(this.pensamento).subscribe(() => this.router.navigate(['/Pensamentos']));

    // setTimeout (() => {
    //   window.location.reload()
    // },50);
  }

  cancelar(){
    this.router.navigate(['/Pensamentos']);
  }

}
