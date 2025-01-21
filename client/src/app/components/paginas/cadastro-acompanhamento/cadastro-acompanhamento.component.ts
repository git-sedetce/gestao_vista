import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Acompanhamento } from '../../../shared/models/acompanhamento.model';
import { Router } from '@angular/router';
import { EventoService } from '../../../shared/services/evento.service';
import { AcompanhamentoService } from '../../../shared/services/acompanhamento.service';
import { ToastrService } from 'ngx-toastr';
import { Audit } from '../../../shared/models/audit.model';
import { AuditService } from '../../../shared/services/audit.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-cadastro-acompanhamento',
  templateUrl: './cadastro-acompanhamento.component.html',
  styleUrl: './cadastro-acompanhamento.component.css'
})
export class CadastroAcompanhamentoComponent implements OnInit {
  @ViewChild('formFollow') formFollow!: NgForm;
  follow!: Acompanhamento;
  registro!: Audit

  lista_evento!: any[];
  user_id!: any;
  user_name!: any;
  profile_id!: any;
  token!: any;

  constructor(
    private router: Router,
    private serviceEvento: EventoService,
    private serviceFollow: AcompanhamentoService,
    private auditService: AuditService,
    public auth: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.follow = new Acompanhamento();
    this.registro = new Audit();
    this.getEvento();
    this.getPerfil();
  }

  getPerfil() {
    this.token = this.auth.getToken();
    const payload = JSON.parse(atob(this.token.split('.')[1]));
    this.profile_id = payload._profile_id;
    this.registro.user_id = payload._id;
    this.user_name = payload._user_name;
    console.log('profile', this.profile_id)
  }

  getEvento(): void{
    this.serviceEvento.getSimpleEvento('listEvent').subscribe((evt: any[]) => {
      this.lista_evento = evt;
      console.log('lista_evento', this.lista_evento);
    }, (erro: any) => console.error('erro', erro)
    );
  }

  save(){
    console.log('acompanhamento', this.follow);
    this.serviceFollow.cadastrar(this.follow).subscribe({
      next: (res: any) => {
        this.toastr.success('Acompanhamento cadastrado com sucesso!');
        this.saveRegister(this.follow.evento_id),
        this.router.navigate(['/home']);
        this.formFollow.reset();
      },
      error: (e) => (this.toastr.error(e), this.formFollow.reset())
    })
  }

  saveRegister(id: any): void {
    this.registro.tipo_acao = 'Cadastrar acompanhamento';
    this.registro.acao = `O acompanhamento do evento de ${id} foi cadastrado pelo usuário ${this.user_name}`;
    console.log('registro', this.registro)
    this.auditService.cadastrarRegistros(this.registro).subscribe({
    next: (res: any) => {
      console.log('registro', res)
    },
    error: (e) => (this.toastr.error(e))
  })
  }

}
