import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../shared/services/evento.service';
import { TypesService } from '../../../shared/services/types.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AcompanhamentoService } from '../../../shared/services/acompanhamento.service';
import { Acompanhamento } from '../../../shared/models/acompanhamento.model';
import { UserService } from '../../../shared/services/user.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AuditService } from '../../../shared/services/audit.service';
import { Audit } from '../../../shared/models/audit.model';

@Component({
  selector: 'app-consulta-acompanhamento',
  templateUrl: './consulta-acompanhamento.component.html',
  styleUrl: './consulta-acompanhamento.component.css',
})
export class ConsultaAcompanhamentoComponent implements OnInit {
  lista_evento!: any[];
  lista_follow!: any[];
  lista_follow_filtered!: any[];
  lista_imagens!: any[];
  lista_qtde!: any[];
  lista_sexec!: any[];
  lista_ano: number[] = [];
  lista_status: string[] = ['A Iniciar', 'Andamento', 'Cancelado', 'Concluído'];
  registro!: Audit

  formIsertImgs!: FormGroup;
  formFollow!: FormGroup;
  followObj: Acompanhamento = new Acompanhamento();
  profile_id!: any;
  token!: any;
  showMessage!: any;
  showTitle!: any;
  exibirImg!: any;
  user_name!: any;
  user_id!: any;
  date = new Date();
  ano_atual!: any;

  multipleFiles!: any[];
  imgs_anexo: any;
  habilita_anexo_imgs!: boolean;
  imageSelected: boolean = false;
  finaliza = 0;

  //filtros
  filtrar: boolean = false
  filtro_sexec!: any;
  filtro_ano!: any;
  filtro_status!: any;
  eventosFiltrados: any[] = [];

  formFiltro!: FormGroup;
  filtroEventos: boolean = false;
  searchEvento: string = '';
  searchSexec: string = '';
  searchStatus: string = '';
  searchAno: string = '';

  page: number = 1; // Página atual
  itemsPerPage: number = 10; // Itens por página

  constructor(
    public eventoService: EventoService,
    public typeService: TypesService,
    public auth: UserService,
    private auditService: AuditService,
    public followService: AcompanhamentoService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.formFollow = this.formBuilder.group({
      id: [''],
      situacao_atual: [''],
      resultado: [''],
      custo_realizado: [''],
      leads_realizados: [''],
      evento_id: [''],
    });

    this.formFiltro = this.formBuilder.group({
      evento: [''],
      sexec: [''],
      status: [''],
      ano: ['']
    });

    this.ano_atual = this.date.getFullYear();
    for (let y = 2023; y <= this.ano_atual+1; y++) {
      this.lista_ano.push(y);
    }
    this.registro = new Audit();

    this.getPerfil();
    this.getQtdImgs();
    this.getSexec();
  }

  getPerfil() {
    this.token = this.auth.getToken();
    const payload = JSON.parse(atob(this.token.split('.')[1]));
    this.profile_id = payload._profile_id;
    this.registro.user_id = payload._id;
    this.user_name = payload._user_name;
    this.user_id = payload._id;
    if(this.profile_id === 2){
      this.getUserSexec(Number(this.user_id));
    }else{
      this.getFollows()
    }
    // console.log('payload', payload)
  }

  getUserSexec(id: number){
    this.userService.pegar_sexec(id).subscribe((rp:any) =>{
      // console.log('rp', rp)
      this.getFollowSexec(rp.sexec_id)
    }, (erro: any) => console.error(erro)
    );
  }
  getFollowSexec(sexec_id: any): void{
    this.followService.listarAcompanhamentoBySexec(sexec_id).subscribe(
      (flw: any[]) => {
        this.lista_follow = flw;
        this.lista_follow_filtered = [...flw];
      },
      (erro: any) => console.error(erro)
    );
  }

  getFollows() {
    this.followService.listarAcompanhamento('listaFollow').subscribe(
      (flw: any[]) => {
        this.filtrar = false;
        this.lista_follow = flw;
        this.lista_follow_filtered = [...flw];
        // console.log('lista_follow', this.lista_follow);
      },
      (erro: any) => console.error(erro)
    );
  }

  getSexec(){
    this.typeService.getSexec('listaSexec').subscribe((sxc:any[]) =>{
      this.lista_sexec = sxc;
    }, (erro: any) => console.error(erro)
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
    const { evento, sexec, status, ano } = this.formFiltro.value;

    this.lista_follow_filtered = this.lista_follow.filter((evt) => {
      const matchEvento =
        !evento ||
        this.normalize(evt.ass_acompanhamento_evento.nome_evento).includes(this.normalize(evento));

      const matchSexec = !sexec || evt.ass_acompanhamento_evento.ass_evento_sexec.id === Number(sexec);

      const matchStatus = !status || evt.situacao_atual === status;

      const matchAno = !ano || Number(evt.ass_acompanhamento_evento.ano) === Number(ano);
      // const matchAno = !ano || new Date(evt.data_evento).getFullYear() === Number(ano);


      return (
        matchEvento &&
        matchSexec &&
        matchStatus &&
        matchAno
      );
    });

    this.filtroEventos = this.lista_follow_filtered.length !== this.lista_follow.length;

    this.page = 1;
  }

  limparFiltros(): void {
    this.formFiltro.reset({
      evento: '',
      sexec: '',
      status: '',
      ano: '',
    });

    this.lista_follow_filtered = [...this.lista_follow];
    this.filtroEventos = false;
    this.page = 1;
  }

  exibirTodos(): void {
    this.searchEvento = '';
    this.searchStatus = '';
    this.searchSexec = '';
    this.searchAno = '';

    this.lista_follow_filtered = [...this.lista_follow];
    this.page = 1;
  }

  getQtdImgs() {
    this.eventoService.contarImgs('countImgs').subscribe(
      (qtde: any[]) => {
        this.lista_qtde = qtde;
        //  console.log('lista_qtde', this.lista_qtde);
      },
      (erro: any) => console.error('erro', erro)
    );
  }

  onEdit(follow: any) {
    // console.log('follow', follow);
    this.followObj.id = follow.id;
    this.formFollow.controls['situacao_atual'].setValue(follow.situacao_atual);
    this.formFollow.controls['resultado'].setValue(follow.resultado);
    this.formFollow.controls['custo_realizado'].setValue(
      follow.custo_realizado
    );
    this.formFollow.controls['leads_realizados'].setValue(
      follow.leads_realizados
    );
    this.formFollow.controls['evento_id'].setValue(
      follow.ass_acompanhamento_evento.nome_evento
    );

    this.showTitle = follow.ass_acompanhamento_evento.nome_evento;
  }

  updateFollow() {
    this.followObj.situacao_atual = this.formFollow.value.situacao_atual;
    this.followObj.resultado = this.formFollow.value.resultado;
    this.followObj.custo_realizado = this.formFollow.value.custo_realizado;
    this.followObj.leads_realizados = this.formFollow.value.leads_realizados;

    this.followService
      .updateFollow(this.followObj, Number(this.followObj.id))
      .subscribe((res) => {
        this.toastr.success('Atualiação realizada com sucesso!!!');
        this.saveRegister();
        this.formFollow.reset();
        this.getFollows();
      });
  }

  deletaFollow(follow: any) {
    // console.log('Deletando -> ',follow)
    this.showTitle = follow.ass_acompanhamento_evento.nome_evento;
    this.followService.deleteFollow(follow.id).subscribe((res) => {
      this.toastr.success('Exclusão realizada com sucesso!!!');
      this.saveDeleteFollow(this.showTitle)
      this.getFollows();
    });
  }

  onImageSelected(event: any): void {
    this.imageSelected = event.target.files.length > 0;
    // console.log('imageSelected', this.imageSelected);
  }

  selectMultipleFiles(event: any) {
    if (event.target.files.length > 0) {
      this.multipleFiles = event.target.files;
    }
  }

  imgsUpload() {
    const files = new FormData();
    const evento_id = this.followObj.id;
    let allFilesAreJPEG = true;

    for (let file of this.multipleFiles) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (
        fileExtension !== 'jpeg' &&
        fileExtension !== 'jpg' &&
        fileExtension !== 'png'
      ) {
        allFilesAreJPEG = false;
        break;
      }
      files.append('files', file);
      // console.log('file', files);
    }

    if (!allFilesAreJPEG) {
      this.toastr.error('Somente arquivo .jpeg, .jpg ou .png');
      this.imgs_anexo = 'Somente arquivo .jpeg, .jpg ou .png';
      // Aqui você pode adicionar um aviso para o usuário, se desejar
      return;
    }

    this.http
      .post(environment.apiUrl + 'evento_imgs' + '/' + evento_id, files)
      .subscribe({
        next: (response: any) => {
          // console.log(response);

          this.habilita_anexo_imgs = true;
          this.imgs_anexo = response.message;
          this.finaliza = this.finaliza + 1;
          // console.log('imgs_anexo', this.imgs_anexo);
          this.saveRegisterImagem();
        },
        error: (e) => {
          this.habilita_anexo_imgs = false;
          this.imgs_anexo = e.error.message;
          // console.log('imgs_anexo', this.imgs_anexo);
        },
      });

  }

  viewImg(follow: any) {
    this.getImagens(follow.id);
  }

  getImagens(id: any) {
    this.eventoService.imagensByEvento(id).subscribe(
      (imagensData: any[]) => {
        if (imagensData && imagensData.length > 0) {
          this.lista_imagens = imagensData.map((imagem) => {
            const decodedImage = 'data:image/jpeg;base64,' + imagem.base64;
            const safeImageUrl: SafeUrl =
              this.sanitizer.bypassSecurityTrustUrl(decodedImage);
            return {
              id: imagem.id,
              showTitle: imagem.nome_evento,
              imagem: safeImageUrl,
            };
          });
        } else {
          this.lista_imagens = [];
          console.warn('Nenhuma imagem encontrada');
          // Exibir mensagem ao usuário, por exemplo:
          this.showMessage('Nenhuma imagem encontrada.');
        }
        // console.log('imagens', this.lista_imagens);
      },

      (erro: any) => {
        console.error('Erro ao buscar imagens:', erro);
        // Exibir mensagem ao usuário, por exemplo:
        this.showMessage('Erro ao buscar imagens. Tente novamente mais tarde.');
      }
    );
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

      const dados = tipo === 'todos' ? this.lista_follow : this.lista_follow_filtered;

      if(!dados || dados.length === 0) {
        this.toastr.warning('Nenhum dado disponível para exportação.');
        return;
      }

      const planilha = dados.map((evento) => ({
        Nome_evento: evento.ass_acompanhamento_evento.nome_evento,
        Responsavel: evento.ass_acompanhamento_evento.ass_evento_sexec?.secretaria ?? '',
        Mes: evento.ass_acompanhamento_evento.mes,
        Ano: evento.ass_acompanhamento_evento.ano,
        Tipo_evento: evento.ass_acompanhamento_evento.ass_evento_tipo?.nome_evento ?? '',
        Local: evento.ass_acompanhamento_evento.local,
        custo_previo: evento.ass_acompanhamento_evento.custo_previo ?? '',
        Recursos: evento.ass_acompanhamento_evento.ass_evento_recursos?.recursos ?? '',
        Leads_previous: evento.ass_acompanhamento_evento.lead_previsto,
        Descricao: evento.ass_acompanhamento_evento.descricao,
        Publico_alvo: evento.ass_acompanhamento_evento.publico_alvo,
        Tipo_participacao: evento.ass_acompanhamento_evento.ass_evento_participacao?.participacao,
        Atualizacao_evento: this.formatarData(evento.ass_acompanhamento_evento.updatedAt),
        Situacao_atual: evento.situacao_atual,
        Resultados_alcancado: evento.resultado,
        Custos_realizados: evento.custo_realizado,
        Leads_realizados: evento.leads_realizados,
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
        tipo === 'todos'
          ? 'eventos_acompanhamento.xlsx'
          : 'eventos_acompanhamentos_filtrados.xlsx';

      saveAs(blob, nomeArquivo);
    }

  saveRegister(): void {
    this.registro.tipo_acao = 'Edição de acompanhamento';
    this.registro.acao = `O acompanhamento do evento ${ this.showTitle} foi alterado pelo usuário ${this.user_name}`;
    // console.log('registro', this.registro)
    this.auditService.cadastrarRegistros(this.registro).subscribe({
    next: (res: any) => {
      // console.log('registro', res)
    },
    error: (e) => (this.toastr.error(e))
  })
  }

  saveRegisterImagem(): void {
    this.registro.tipo_acao = 'Inserção de imagens';
    this.registro.acao = `O evento ${ this.showTitle } foi inserido imagens pelo usuário ${this.user_name}`;
    // console.log('registro', this.registro)
    this.auditService.cadastrarRegistros(this.registro).subscribe({
    next: (res: any) => {
      // console.log('registro', res)
    },
    error: (e) => (this.toastr.error(e))
  })
  }

  saveDeleteFollow(name: any): void {
    this.registro.tipo_acao = 'Exclusão de acompanhamento';
    this.registro.acao = `O evento ${name} foi excluido da base de dados de acompanhamento pelo usuário ${this.user_name}`;
    this.auditService.cadastrarRegistros(this.registro).subscribe({
    next: (res: any) => {
      // console.log('registro', res)
    },
    error: (e) => (this.toastr.error(e))
  })

  }

  // filtrarEventos() {
  //   this.filtrar = true
  //   console.log('sexec', this.filtro_sexec)
  //   console.log('lista_acompanhamento', this.lista_follow)
  //   this.eventosFiltrados = this.lista_follow.filter(evento => {
  //     return (
  //       (!this.filtro_ano || evento.ass_acompanhamento_evento.ano === this.filtro_ano) &&
  //       (!this.filtro_status || evento.situacao_atual.toLowerCase() === this.filtro_status.toLowerCase()) &&
  //       (!this.filtro_sexec || evento.ass_acompanhamento_evento.ass_evento_sexec.id === +this.filtro_sexec)
  //     );
  //   });

  // }

  // limparFiltros(){
  //   this.filtro_sexec = '';
  //   this.filtro_status = this.lista_status[0];
  //   this.filtro_ano = '';
  //   this.getFollows();
  // }

  // hour = this.date.getHours().toString().padStart(2, '0');
  // minute = this.date.getMinutes().toString().padStart(2, '0');
  // file_name = 'ConsultaAcompanhamentoSDE';
  // fileName = `${this.hour}${this.minute}_${this.file_name}.xlsx`

  // getReport(){
  //   /**passing table id**/
  //   let data = document.getElementById('table-follow');
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

  //   /**Generate workbook and add the worksheet**/
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /*save to file*/
  //   XLSX.writeFile(wb, this.fileName);
  // }
}
