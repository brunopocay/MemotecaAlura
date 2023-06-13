import { Component, OnInit } from '@angular/core';
import { PensamentoService } from 'src/app/services/pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
""
@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {


    formulario!: FormGroup;

    constructor(private service: PensamentoService, private router: Router, private formBuilder: FormBuilder){}
    
    ngOnInit(): void {
      this.formulario = this.formBuilder.group({
        conteudo: ['', Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/)
        ])],
        autoria: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
        modelo: ['modelo1']
      });
    }

    criarPensamento(){
      this.service.create(this.formulario.value).subscribe(() => this.router.navigate(['/Pensamentos']));
      
      // setTimeout(() => {
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
