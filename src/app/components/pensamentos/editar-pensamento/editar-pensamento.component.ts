import { Component, OnInit } from '@angular/core';
import { PensamentoService } from 'src/app/services/pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { watchLowerCase } from './verificarLowerCase';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {
  
  formulario!: FormGroup

  constructor(private service: PensamentoService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder){}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.searchById(parseInt(id!)).subscribe((pensamento) => {
        this.formulario = this.formBuilder.group({
          id: [pensamento.id],
          conteudo: [pensamento.conteudo, Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/)
          ])],
          autoria: [pensamento.autoria, Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])],
          modelo: [pensamento.modelo],
          isFavorite: [pensamento.isFavorite]
        })
    })   
  }

  editarPensamento(){
    this.service.edit(this.formulario.value).subscribe(() => this.router.navigate(['/Pensamentos']));

    // setTimeout (() => {
    //   window.location.reload()
    // },50);
  }

  cancelar(){
    this.router.navigate(['/Pensamentos']);
  }

  habilitarBotao(){
    if(this.formulario.valid){
      return 'botao'
    }
    else
    {
      return 'botao__desabilitado'
    }
  }


}
