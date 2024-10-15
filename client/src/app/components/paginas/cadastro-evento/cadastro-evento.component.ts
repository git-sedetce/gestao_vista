import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Evento } from '../../../shared/models/evento.model';
import { Router } from '@angular/router';
import { EventoService } from '../../../shared/services/evento.service';
import { ToastrService } from 'ngx-toastr';
import { TypesService } from '../../../shared/services/types.service';

@Component({
  selector: 'app-cadastro-evento',
  templateUrl: './cadastro-evento.component.html',
  styleUrl: './cadastro-evento.component.css'
})
export class CadastroEventoComponent implements OnInit{
  @ViewChild('formEvento') formEvento!: NgForm;
  evento!: Evento;

  lista_sexec!: any[];
  lista_tipo_evento!: any[];
  lista_local!: any[];
  lista_participacao!: any[];
  lista_recursos!: any[];

  maxChars = 500
  lista_ano: number[] = [];
  lista_mes: any[] = [];
  date = new Date();
  ano_atual!: any;
  mes_atual!: any;

  constructor(
    private router: Router,
    private eventoservice: EventoService,
    private typeService: TypesService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.evento = new Evento();

    this.ano_atual = this.date.getFullYear();

    for (let y = 2023; y <= this.ano_atual+1; y++) {
      this.lista_ano.push(y);
    }
    // console.log('lista_ano', this.lista_ano)

    for (let m = 0; m < 12; m++) {
      const data = new Date(this.ano_atual, m); // Criando uma data para cada mês do ano
      const nomeMes = data.toLocaleString('default', { month: 'long' }); // Nome do mês (ex: Janeiro)
      this.lista_mes.push(nomeMes);
    }

    this.getSexec();
    this.getEvento();
    this.getLocal();
    this.getPart();
    this.getRecursos();

  }

  getSexec(){
    this.typeService.getSexec('listaSexec').subscribe((sxc:any[]) =>{
      this.lista_sexec = sxc;
    }, (erro: any) => console.error(erro)
    );
  }

  getEvento(){
    this.typeService.getTipoEventos('listaTipoEvento').subscribe((evt:any[]) =>{
      this.lista_tipo_evento = evt;
    }, (erro: any) => console.error(erro)
    );
  }

  getLocal(){
    this.typeService.getLocal('listaLocal').subscribe((lc:any[]) =>{
      this.lista_local = lc;
    }, (erro: any) => console.error(erro)
    );
  }

  getPart(){
    this.typeService.getParticipacao('listaParticipacao').subscribe((ptpc:any[]) =>{
      this.lista_participacao = ptpc;
    }, (erro: any) => console.error(erro)
    );
  }

  getRecursos(){
    this.typeService.getRecursos('listaRecursos').subscribe((rc:any[]) =>{
      this.lista_recursos = rc;
    }, (erro: any) => console.error(erro)
    );
  }

  save(){
    // console.log('evento', this.evento);
    this.eventoservice.cadastrar(this.evento).subscribe({
      next: (res: any) => {
        this.toastr.success('Evento cadastrado com sucesso!');
        this.router.navigate(['/cadastroacompanhamento']);
        this.formEvento.reset();
      },
      error: (e) => (this.toastr.error(e), this.formEvento.reset())
    })
  }
}
