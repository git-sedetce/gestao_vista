import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Acompanhamento } from '../../../shared/models/acompanhamento.model';
import { Router } from '@angular/router';
import { EventoService } from '../../../shared/services/evento.service';
import { AcompanhamentoService } from '../../../shared/services/acompanhamento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro-acompanhamento',
  templateUrl: './cadastro-acompanhamento.component.html',
  styleUrl: './cadastro-acompanhamento.component.css'
})
export class CadastroAcompanhamentoComponent implements OnInit {
  @ViewChild('formFollow') formFollow!: NgForm;
  follow!: Acompanhamento;

  lista_evento!: any[];

  constructor(
    private router: Router,
    private serviceEvento: EventoService,
    private serviceFollow: AcompanhamentoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.follow = new Acompanhamento();
    this.getEvento();

  }

  getEvento(): void{
    this.serviceEvento.getSimpleEvento('listEvent').subscribe((evt: any[]) => {
      this.lista_evento = evt;
      // console.log('lista_evento', this.lista_evento);
    }, (erro: any) => console.error('erro', erro)
    );
  }

  save(){
    // console.log('acompanhamento', this.follow);
    this.serviceFollow.cadastrar(this.follow).subscribe({
      next: (res: any) => {
        this.toastr.success('Acompanhamento cadastrado com sucesso!');
        this.router.navigate(['/home']);
        this.formFollow.reset();
      },
      error: (e) => (this.toastr.error(e), this.formFollow.reset())
    })
  }

}
