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
  lista_imagens!: any[];
  lista_qtde!: any[];
  lista_sexec!: any[];
  lista_ano: number[] = [];
  lista_status: string[] = ['', 'A Iniciar', 'Andamento', 'Cancelado', 'Concluído'];
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
        console.log('lista_follow', this.lista_follow);
      },
      (erro: any) => console.error(erro)
    );
  }

  getFollows() {
    this.followService.listarAcompanhamento('listaFollow').subscribe(
      (flw: any[]) => {
        this.filtrar = false;
        this.lista_follow = flw;
        // console.log('lista_follow', this.lista_follow);
      },
      (erro: any) => console.error(erro)
    );
  }

  getFollowEvent(id: any) {
    this.followService.listarAcompanhamentoByEvento(id).subscribe(
      (flwEVT: any[]) => {
        this.lista_follow = flwEVT;
      },
      (erro: any) => console.error(erro)
    );
  }

  getFollowStats(stats: any) {
    this.followService
      .listarAcompanhamentoByStatus('listaFollowByStatus/', stats)
      .subscribe(
        (flwst: any[]) => {
          this.lista_follow = flwst;
        },
        (erro: any) => console.error(erro)
      );
  }

  filtroAno(ano: any){
    this.followService.listarAcompanhamentoByAno(ano).subscribe((yr:any[]) =>{
      this.lista_follow = yr;
    }, (erro: any) => console.error(erro)
    );
  }

  getSexec(){
    this.typeService.getSexec('listaSexec').subscribe((sxc:any[]) =>{
      this.lista_sexec = sxc;
    }, (erro: any) => console.error(erro)
    );
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

  filtrarEventos() {
    this.filtrar = true
    console.log('sexec', this.filtro_sexec)
    console.log('lista_acompanhamento', this.lista_follow)
    this.eventosFiltrados = this.lista_follow.filter(evento => {
      return (
        (!this.filtro_ano || evento.ass_acompanhamento_evento.ano === this.filtro_ano) &&
        (!this.filtro_status || evento.situacao_atual.toLowerCase() === this.filtro_status.toLowerCase()) &&
        (!this.filtro_sexec || evento.ass_acompanhamento_evento.ass_evento_sexec.id === +this.filtro_sexec)
      );
    });


    // console.log('Eventos filtrados:', this.eventosFiltrados);
  }

  limparFiltros(){
    this.filtro_sexec = '';
    this.filtro_status = this.lista_status[0];
    this.filtro_ano = '';
    this.getFollows();
  }

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
