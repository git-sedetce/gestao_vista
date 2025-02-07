import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../shared/services/evento.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Evento } from '../../../shared/models/evento.model';
import { ToastrService } from 'ngx-toastr';
import { TypesService } from '../../../shared/services/types.service';
import * as XLSX from 'xlsx';
import { Audit } from '../../../shared/models/audit.model';
import { AuditService } from '../../../shared/services/audit.service';

@Component({
  selector: 'app-consulta-evento',
  templateUrl: './consulta-evento.component.html',
  styleUrl: './consulta-evento.component.css'
})
export class ConsultaEventoComponent implements OnInit{

  lista_evento!: any[];
  lista_evento_acompanhamento!: any[];
  formEvent!: FormGroup;
  eventoObj: Evento = new Evento()
  registro!: Audit

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
  user_name!: any;
  user_id!: any;
  id_sexec!: any;

   page: number = 1; // Página atual
   itemsPerPage: number = 10; // Itens por página


   //Variaáveis Filtro
   filter: boolean = false;
   filtro_resp!: any;
   filtro_mes!: any;
   filtro_ano!: any;
   filtro_tp_evt!: any;
   filtro_tp_lc!: any;
   filtro_fonte!: any;
   eventosFiltrados: any[] = [];

  constructor(
    public eventoService: EventoService,
    private userService: UserService,
    public typeService: TypesService,
    private auditService: AuditService,
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

      this.registro = new Audit();
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
      this.getEventosAcompanhamentos();
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
        this.filter = false;
        // console.log('lista_evento', this.lista_evento);
      }, (erro: any) => console.error(erro)
      );
    }

    getEventosAcompanhamentos(){
      this.eventoService.getEventFollow('listaEventoAcompanhamento').subscribe((evt_flw: any[]) =>{
        this.lista_evento_acompanhamento = evt_flw;
        //  console.log('lista_evento_acompanhamento', this.lista_evento_acompanhamento);
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
      this.user_name = payload._user_name;
      this.user_id = payload._id;
      this.registro.user_id = this.user_id;
      // console.log('payload', payload)
      this.getUserSexec(this.user_id);
    }

    getUserSexec(id: number){
      this.userService.pegar_sexec(id).subscribe((rp:any) =>{
        // console.log('rp', rp)
        this.id_sexec = rp.sexec_id;
        this.getEventoByRes(rp.sexec_id)
      }, (erro: any) => console.error(erro)
      );
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
        this.saveRegister();
        this.formEvent.reset();
        this.getEventos();
      })

    }

    deletaEvento(evento: any){
      this.eventoService.deleteEvento(evento.id).subscribe(res=>{
        this.toastr.success('Exclusão realizada com sucesso!!!')
        this.saveDeleteEvento(evento.nome_evento)
        this.getEventos();
      })

    }

    hour = this.date.getHours().toString().padStart(2, '0');
    minute = this.date.getMinutes().toString().padStart(2, '0');
    file_name = 'ConsultaPromocaoAtracaoSDE';
    fileName = `${this.hour}${this.minute}_${this.file_name}.xlsx`

  getReport(){
    /**passing table id**/
    let data = document.getElementById('table-evento-acompanhamento');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    /**Generate workbook and add the worksheet**/
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /*save to file*/
    XLSX.writeFile(wb, this.fileName);
  }

  getReportEvent(){
    /**passing table id**/
    let data = document.getElementById('table-evento');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    /**Generate workbook and add the worksheet**/
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /*save to file*/
    XLSX.writeFile(wb, this.fileName);
  }

  getReportFilter(){
    /**passing table id**/
    let data = document.getElementById('table-evento-filtro');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    /**Generate workbook and add the worksheet**/
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /*save to file*/
    XLSX.writeFile(wb, this.fileName);
  }

  saveRegister(): void {
    this.registro.tipo_acao = 'Edição de eventos'
    this.registro.acao = `O evento ${this.eventoObj.nome_evento} foi alterado pelo usuário ${this.user_name}`;
    // console.log('registro', this.registro)
    this.auditService.cadastrarRegistros(this.registro).subscribe({
    next: (res: any) => {
      // console.log('registro', res)
    },
    error: (e) => (this.toastr.error(e))
  })
  }

  saveDeleteEvento(name: any): void {
    this.registro.tipo_acao = 'Exclusão de eventos'
    this.registro.acao = `O evento ${name} foi excluido da base de dados pelo usuário ${this.user_name}`;
    this.auditService.cadastrarRegistros(this.registro).subscribe({
    next: (res: any) => {
      // console.log('registro', res)
    },
    error: (e) => (this.toastr.error(e))
  })

  }

  //FILTROS MULTIPLOS

  filtrarEventos() {
    this.eventosFiltrados = this.lista_evento.filter(evento => {
      return (
        (!this.filtro_mes || evento.mes.toLowerCase() === this.filtro_mes.toLowerCase()) &&
        (!this.filtro_ano || evento.ano === this.filtro_ano) &&
        (!this.filtro_tp_evt || evento.ass_evento_tipo.nome_evento.toLowerCase() === this.filtro_tp_evt.toLowerCase()) &&
        (!this.filtro_tp_lc || evento.ass_evento_local.id === +this.filtro_tp_lc) &&
        (!this.filtro_fonte || evento.ass_evento_recursos.id === +this.filtro_fonte) &&
        (!this.filtro_resp || evento.ass_evento_sexec.id === +this.filtro_resp)
      );
    });
    this.filter = true

    // console.log('Eventos filtrados:', this.eventosFiltrados);
  }

  limparFiltros(){
    this.filtro_resp = '';
    this.filtro_mes = '';
    this.filtro_ano = '';
    this.filtro_tp_evt = '';
    this.filtro_tp_lc = '';
    this.filtro_fonte = '';
    this.getEvento();
  }


}
