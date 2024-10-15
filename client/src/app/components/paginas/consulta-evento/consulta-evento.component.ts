import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../shared/services/evento.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Evento } from '../../../shared/models/evento.model';
import { ToastrService } from 'ngx-toastr';
import { TypesService } from '../../../shared/services/types.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-consulta-evento',
  templateUrl: './consulta-evento.component.html',
  styleUrl: './consulta-evento.component.css'
})
export class ConsultaEventoComponent implements OnInit{

  lista_evento!: any[];
  formEvent!: FormGroup;
  eventoObj: Evento = new Evento()

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
  profile_id!: any;
  token!: any;

  constructor(
    public eventoService: EventoService,
    public typeService: TypesService,
    public auth: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

    ngOnInit(): void {
      this.formEvent = this.formBuilder.group({
        id: [''],
        mes: [''],
        ano: [''],
        nome_evento: [''],
        descricao: [''],
        publico_alvo: [''],
        local: [''],
        periodo: [''],
        custo_previo: [''],
        lead_previsto: [''],
        sexec_id: [''],
        tipo_evento_id: [''],
        tipo_local_id: [''],
        participacao_id: [''],
        recursos_id: ['']
      })

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
    // console.log('lista_meses', this.lista_mes);

      this.getEventos();
      this.getSexec();
      this.getEvento();
      this.getLocal();
      this.getPart();
      this.getRecursos();
      this.getPerfil()

    }

    getEventos(){
      this.eventoService.getEvento('listaEvento').subscribe((evt: any[]) =>{
        this.lista_evento = evt;
        // console.log('lista_evento', this.lista_evento);
      }, (erro: any) => console.error(erro)
      );
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

    getEventoByRes(id: any){
      this.eventoService.getEventoByResp('listaEventoSec/' + id).subscribe((rp:any[]) =>{
        this.lista_evento = rp;
      }, (erro: any) => console.error(erro)
      );

    }

    getEventoByMes(mes: any){
      this.eventoService.getEventoByMes('listaEventoByMes/' + mes).subscribe((ms:any[]) =>{
        this.lista_evento = ms;
      }, (erro: any) => console.error(erro)
      );
    }

    getEventoByAno(ano: any){
      this.eventoService.getEventoByAno('listaEventoByAno/' + ano).subscribe((yr:any[]) =>{
        this.lista_evento = yr;
      }, (erro: any) => console.error(erro)
      );
    }

    getEventoByTipo(id: any){
      this.eventoService.getEventoByTipo('listaEvento/' + id).subscribe((tp:any[]) =>{
        this.lista_evento = tp;
      }, (erro: any) => console.error(erro)
      );
    }

    getEventoByLocal(id: any){
      this.eventoService.getEventoBylocal('listaEventoLocal/' + id).subscribe((lc:any[]) =>{
        this.lista_evento = lc;
      }, (erro: any) => console.error(erro)
      );
    }

    getEventoByFonte(id: any){
      this.eventoService.getEventoByFonte('listaEventoRec/' + id).subscribe((ft:any[]) =>{
        this.lista_evento = ft;
      }, (erro: any) => console.error(erro)
      );
    }

    getPerfil(){
      this.token = this.auth.getToken();
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      this.profile_id = payload._profile_id;
      // console.log('profile', this.profile_id)
    }

    onEdit(evento: any){
      this.eventoObj.id = evento.id;
      this.formEvent.controls['mes'].setValue(evento.mes)
      this.formEvent.controls['ano'].setValue(evento.ano)
      this.formEvent.controls['nome_evento'].setValue(evento.nome_evento)
      this.formEvent.controls['descricao'].setValue(evento.descricao)
      this.formEvent.controls['publico_alvo'].setValue(evento.publico_alvo)
      this.formEvent.controls['local'].setValue(evento.local)
      this.formEvent.controls['periodo'].setValue(evento.periodo)
      this.formEvent.controls['custo_previo'].setValue(evento.custo_previo)
      this.formEvent.controls['lead_previsto'].setValue(evento.lead_previsto)
      this.formEvent.controls['sexec_id'].setValue(evento.sexec_id)
      this.formEvent.controls['tipo_evento_id'].setValue(evento.tipo_evento_id)
      this.formEvent.controls['tipo_local_id'].setValue(evento.tipo_local_id)
      this.formEvent.controls['participacao_id'].setValue(evento.participacao_id)
      this.formEvent.controls['recursos_id'].setValue(evento.recursos_id)
    }

    updateEvento(){
      this.eventoObj.mes = this.formEvent.value.mes;
      this.eventoObj.ano = this.formEvent.value.ano;
      this.eventoObj.nome_evento = this.formEvent.value.nome_evento;
      this.eventoObj.descricao = this.formEvent.value.descricao;
      this.eventoObj.publico_alvo = this.formEvent.value.publico_alvo;
      this.eventoObj.local = this.formEvent.value.local;
      this.eventoObj.periodo = this.formEvent.value.periodo;
      this.eventoObj.custo_previo = this.formEvent.value.custo_previo;
      this.eventoObj.lead_previsto = this.formEvent.value.lead_previsto;
      this.eventoObj.sexec_id = this.formEvent.value.sexec_id;
      this.eventoObj.tipo_evento_id = this.formEvent.value.tipo_evento_id;
      this.eventoObj.tipo_local_id = this.formEvent.value.tipo_local_id;
      this.eventoObj.participacao_id = this.formEvent.value.participacao_id;
      this.eventoObj.recursos_id = this.formEvent.value.recursos_id;

      this.eventoService.updateEvento(this.eventoObj, Number(this.eventoObj.id)).subscribe(res=>{
        this.toastr.success('Atualiação realizada com sucesso!!!')
        this.formEvent.reset();
        this.getEventos();
      })

    }

    deletaEvento(evento: any){
      this.eventoService.deleteEvento(evento.id).subscribe(res=>{
        this.toastr.success('Exclusão realizada com sucesso!!!')
        this.getEventos();
      })

    }

}
