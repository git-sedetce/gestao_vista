import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../shared/services/evento.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Evento } from '../../../shared/models/evento.model';
import { ToastrService } from 'ngx-toastr';
import { TypesService } from '../../../shared/services/types.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Audit } from '../../../shared/models/audit.model';
import { AuditService } from '../../../shared/services/audit.service';

@Component({
  selector: 'app-consulta-evento',
  templateUrl: './consulta-evento.component.html',
  styleUrl: './consulta-evento.component.css',
})
export class ConsultaEventoComponent implements OnInit {
  lista_evento!: any[];
  lista_evento_filtrado!: any[];
  lista_evento_acompanhamento!: any[];
  lista_evento_acompanhamento_filtrado!: any[];
  formEvent!: FormGroup;
  eventoObj: Evento = new Evento();
  registro!: Audit;

  lista_sexec!: any[];
  lista_tipo_evento!: any[];
  lista_local!: any[];
  lista_participacao!: any[];
  lista_recursos!: any[];

  maxChars = 500;
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

  formFiltro!: FormGroup;
  filtroEventos: boolean = false;
  searchEvento: string = '';
  searchMes: string = '';
  searchSexec: string = '';
  searchAno: string = '';
  searchTipoEvento: string = '';
  searchTipoLocal: string = '';
  searchRecursos: string = '';

  constructor(
    public eventoService: EventoService,
    private userService: UserService,
    public typeService: TypesService,
    private auditService: AuditService,
    public auth: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {}

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
      recursos_id: [''],
    });

    this.registro = new Audit();
    this.ano_atual = this.date.getFullYear();

    for (let y = 2023; y <= this.ano_atual + 1; y++) {
      this.lista_ano.push(y);
    }
    // console.log('lista_ano', this.lista_ano)

    for (let m = 0; m < 12; m++) {
      const data = new Date(this.ano_atual, m); // Criando uma data para cada mês do ano
      const nomeMes = data.toLocaleString('default', { month: 'long' }); // Nome do mês (ex: Janeiro)
      this.lista_mes.push(nomeMes);
    }

    this.formFiltro = this.formBuilder.group({
      evento: [''],
      sexec: [''],
      mes: [''],
      ano: [''],
      tipo_evento: [''],
      tipo_local: [''],
      recursos: [''],
    });
    // console.log('lista_meses', this.lista_mes);

    this.getEventosAcompanhamentos();
    this.getSexec();
    this.getEvento();
    this.getLocal();
    this.getPart();
    this.getRecursos();
    this.getPerfil();
  }

  getPerfil() {
    this.token = this.auth.getToken();
    const payload = JSON.parse(atob(this.token.split('.')[1]));
    this.profile_id = payload._profile_id;
    this.user_name = payload._user_name;
    this.user_id = payload._id;
    this.registro.user_id = this.user_id;
    // console.log('payload', payload)
    if (this.profile_id === 3) {
      this.getEventos();
    } else {
      this.getUserSexec(this.user_id);
    }
  }

  getUserSexec(id: number) {
    this.userService.pegar_sexec(id).subscribe(
      (rp: any) => {
        // console.log('rp', rp)
        this.id_sexec = rp.sexec_id;
        this.getEventoByRes(rp.sexec_id);
      },
      (erro: any) => console.error(erro),
    );
  }

  getEventos() {
    this.eventoService.getEvento('listaEvento').subscribe(
      (evt: any[]) => {
        this.lista_evento = evt;
        this.filter = false;
        this.lista_evento_filtrado = [...evt];
        // console.log('lista_evento', this.lista_evento);
      },
      (erro: any) => console.error(erro),
    );
  }

  private normalize(value: any): string {
    return (value ?? '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  filtrarEventos(): void {
    const { evento, sexec, mes, ano, tipo_evento, tipo_local, recursos } = this.formFiltro.value;

    this.lista_evento_filtrado = this.lista_evento.filter((evt) => {
      const matchEvento =
        !evento ||
        this.normalize(evt.nome_evento).includes(this.normalize(evento));

      const matchSexec = !sexec || evt.sexec_id === Number(sexec);

      const matchMes = !mes || evt.mes === mes;

      const matchAno = !ano || Number(evt.ano) === Number(ano);

      const matchTipoEvento =
        !tipo_evento || evt.tipo_evento_id === Number(tipo_evento);

      const matchTipoLocal =
        !tipo_local || evt.tipo_local_id === Number(tipo_local);

      const matchRecursos = !recursos || evt.recursos_id === Number(recursos);

      return (
        matchEvento &&
        matchSexec &&
        matchMes &&
        matchAno &&
        matchTipoEvento &&
        matchTipoLocal &&
        matchRecursos
      );
    });

    this.filtroEventos = true;
    this.page = 1;
  }

  limparFiltros(): void {
    this.formFiltro.reset({
      evento: '',
      sexec: '',
      mes: '',
      ano: '',
      tipo_evento: '',
      tipo_local: '',
      recursos: '',
    });

    this.lista_evento_filtrado = [...this.lista_evento];
    this.filtroEventos = false;
    this.page = 1;
  }

  exibirTodos(): void {
    this.searchEvento = '';
    this.searchMes = '';
    this.searchSexec = '';
    this.searchAno = '';
    this.searchTipoEvento = '';
    this.searchTipoLocal = '';
    this.searchRecursos = '';

    this.lista_evento_filtrado = [...this.lista_evento];
    this.page = 1;
  }

  getEventosAcompanhamentos() {
    this.eventoService.getEventFollow('listaEventoAcompanhamento').subscribe(
      (evt_flw: any[]) => {
        this.lista_evento_acompanhamento = evt_flw;
        this.lista_evento_acompanhamento_filtrado = [...evt_flw];
        // console.log(
        //   'lista_evento_acompanhamento',
        //   this.lista_evento_acompanhamento,
        // );
      },
      (erro: any) => console.error(erro),
    );
  }

  getSexec() {
    this.typeService.getSexec('listaSexec').subscribe(
      (sxc: any[]) => {
        this.lista_sexec = sxc;
      },
      (erro: any) => console.error(erro),
    );
  }

  getEvento() {
    this.typeService.getTipoEventos('listaTipoEvento').subscribe(
      (evt: any[]) => {
        this.lista_tipo_evento = evt;
      },
      (erro: any) => console.error(erro),
    );
  }

  getLocal() {
    this.typeService.getLocal('listaLocal').subscribe(
      (lc: any[]) => {
        this.lista_local = lc;
      },
      (erro: any) => console.error(erro),
    );
  }

  getPart() {
    this.typeService.getParticipacao('listaParticipacao').subscribe(
      (ptpc: any[]) => {
        this.lista_participacao = ptpc;
      },
      (erro: any) => console.error(erro),
    );
  }

  getRecursos() {
    this.typeService.getRecursos('listaRecursos').subscribe(
      (rc: any[]) => {
        this.lista_recursos = rc;
      },
      (erro: any) => console.error(erro),
    );
  }

  getEventoByRes(id: any) {
    this.eventoService.getEventoByResp('listaEventoSec/' + id).subscribe(
      (rp: any[]) => {
        this.lista_evento = rp;
        //         this.lista_evento = evt;
        // this.lista_evento_filtrado = [...evt];
      },
      (erro: any) => console.error(erro),
    );
  }

  onEdit(evento: any) {
    this.eventoObj.id = evento.id;
    this.formEvent.controls['mes'].setValue(evento.mes);
    this.formEvent.controls['ano'].setValue(evento.ano);
    this.formEvent.controls['nome_evento'].setValue(evento.nome_evento);
    this.formEvent.controls['descricao'].setValue(evento.descricao);
    this.formEvent.controls['publico_alvo'].setValue(evento.publico_alvo);
    this.formEvent.controls['local'].setValue(evento.local);
    this.formEvent.controls['periodo'].setValue(evento.periodo);
    this.formEvent.controls['custo_previo'].setValue(evento.custo_previo);
    this.formEvent.controls['lead_previsto'].setValue(evento.lead_previsto);
    this.formEvent.controls['sexec_id'].setValue(evento.sexec_id);
    this.formEvent.controls['tipo_evento_id'].setValue(evento.tipo_evento_id);
    this.formEvent.controls['tipo_local_id'].setValue(evento.tipo_local_id);
    this.formEvent.controls['participacao_id'].setValue(evento.participacao_id);
    this.formEvent.controls['recursos_id'].setValue(evento.recursos_id);
  }

  updateEvento() {
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

    this.eventoService
      .updateEvento(this.eventoObj, Number(this.eventoObj.id))
      .subscribe((res) => {
        this.toastr.success('Atualiação realizada com sucesso!!!');
        this.saveRegister();
        this.formEvent.reset();
        this.getEventos();
      });
  }

  deletaEvento(evento: any) {
    this.eventoService.deleteEvento(evento.id).subscribe((res) => {
      this.toastr.success('Exclusão realizada com sucesso!!!');
      this.saveDeleteEvento(evento.nome_evento);
      this.getEventos();
    });
  }

  hour = this.date.getHours().toString().padStart(2, '0');
  minute = this.date.getMinutes().toString().padStart(2, '0');
  file_name = 'ConsultaPromocaoAtracaoSDE';
  fileName = `${this.hour}${this.minute}_${this.file_name}.xlsx`;

  getReport() {
    /**passing table id**/
    let data = document.getElementById('table-evento-acompanhamento');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    /**Generate workbook and add the worksheet**/
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /*save to file*/
    XLSX.writeFile(wb, this.fileName);
  }

  //FUNÇÃO PARA CONVERSÃO DE DATA
  formatarData(
    data: string | Date | null,
    formato: 'BR' | 'ISO' = 'BR',
  ): string {
    if (!data) return '';

    const d = new Date(data);

    if (isNaN(d.getTime())) return '';

    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();

    return formato === 'BR'
      ? `${dia}/${mes}/${ano}` // dd/MM/yyyy
      : `${ano}/${dia}/${mes}`; // yyyy/dd/MM
  }

  getReportEvent(tipo: 'todos' | 'filtrados'): void {
    const dados =
      tipo === 'todos' ? this.lista_evento : this.lista_evento_filtrado;

    if (!dados || dados.length === 0) {
      this.toastr.warning('Nenhum dado disponível para exportação.');
      return;
    }

    const planilha = dados.map((evento) => ({
      Nome_evento: evento.nome_evento,
      Responsavel: evento.ass_evento_sexec?.secretaria ?? '',
      Mes: evento.mes,
      Ano: evento.ano,
      Tipo_evento: evento.ass_evento_tipo?.nome_evento ?? '',
      Local: evento.local,
      custo_previo: evento.custo_previo ?? '',
      Recursos: evento.ass_evento_recursos?.recursos ?? '',
      Leads_previous: evento.lead_previsto,
      Descricao: evento.descricao,
      Publico_alvo: evento.publico_alvo,
      Tipo_participacao: evento.ass_evento_participacao?.participacao,
      Ultima_atualizacao: this.formatarData(evento.updatedAt),
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(planilha);
    const workbook: XLSX.WorkBook = {
      Sheets: { Eventos: worksheet },
      SheetNames: ['Eventos'],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const nomeArquivo =
      tipo === 'todos' ? 'eventos_todos.xlsx' : 'eventos_filtrados.xlsx';

    saveAs(blob, nomeArquivo);
  }

  saveRegister(): void {
    this.registro.tipo_acao = 'Edição de eventos';
    this.registro.acao = `O evento ${this.eventoObj.nome_evento} foi alterado pelo usuário ${this.user_name}`;
    // console.log('registro', this.registro)
    this.auditService.cadastrarRegistros(this.registro).subscribe({
      next: (res: any) => {
        // console.log('registro', res)
      },
      error: (e) => this.toastr.error(e),
    });
  }

  saveDeleteEvento(name: any): void {
    this.registro.tipo_acao = 'Exclusão de eventos';
    this.registro.acao = `O evento ${name} foi excluido da base de dados pelo usuário ${this.user_name}`;
    this.auditService.cadastrarRegistros(this.registro).subscribe({
      next: (res: any) => {
        // console.log('registro', res)
      },
      error: (e) => this.toastr.error(e),
    });
  }

}
