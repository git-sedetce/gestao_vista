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

@Component({
  selector: 'app-consulta-acompanhamento',
  templateUrl: './consulta-acompanhamento.component.html',
  styleUrl: './consulta-acompanhamento.component.css'
})
export class ConsultaAcompanhamentoComponent implements OnInit{

  lista_evento!: any[];
  lista_follow!: any[];
  lista_status!: any[];

  formIsertImgs!: FormGroup;
  formFollow!: FormGroup;
  followObj: Acompanhamento = new Acompanhamento();
  profile_id!: any;
  token!: any;

  multipleFiles!: any[];
  imgs_anexo: any;
  habilita_anexo_imgs!: boolean;
  imageSelected: boolean = false;
  finaliza = 0;

  constructor(
    public eventoService: EventoService,
    public typeService: TypesService,
    public auth: UserService,
    public followService: AcompanhamentoService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.formFollow = this.formBuilder.group({
      id: [''],
      situacao_atual: [''],
      resultado: [''],
      custo_realizado: [''],
      leads_realizados: [''],
      evento_id: ['']
    });

    this.getEvento();
    this.getFollows();
    this.getPerfil()

  }
  getEvento(): void{
    this.eventoService.getSimpleEvento('listEvent').subscribe((evt: any[]) => {
      this.lista_evento = evt;
      // console.log('lista_evento', this.lista_evento);
    }, (erro: any) => console.error('erro', erro)
    );
  }

  getFollows(){
    this.followService.listarAcompanhamento('listaFollow').subscribe((flw: any[]) =>{
      this.lista_follow = flw;
      // console.log('lista_follow', this.lista_follow);
    }, (erro: any) => console.error(erro)
    );
  }

  getFollowEvent(id: any){
    this.followService.listarAcompanhamentoByEvento(id).subscribe((flwEVT:any[]) =>{
      this.lista_follow = flwEVT;
    }, (erro: any) => console.error(erro)
    );
  }

  getFollowStats(stats: any){
    this.followService.listarAcompanhamentoByStatus('listaFollowByStatus/', stats ).subscribe((flwst:any[]) =>{
      this.lista_follow = flwst;
    }, (erro: any) => console.error(erro)
    );
  }

  getPerfil(){
    this.token = this.auth.getToken();
    const payload = JSON.parse(atob(this.token.split('.')[1]));
    this.profile_id = payload._profile_id;
    // console.log('profile', this.profile_id)
  }

  onEdit(follow: any){
    this.followObj.id = follow.id;
    this.formFollow.controls['situacao_atual'].setValue(follow.situacao_atual)
    this.formFollow.controls['resultado'].setValue(follow.resultado)
    this.formFollow.controls['custo_realizado'].setValue(follow.custo_realizado)
    this.formFollow.controls['leads_realizados'].setValue(follow.leads_realizados)
    this.formFollow.controls['evento_id'].setValue(follow.ass_acompanhamento_evento.nome_evento)
  }

  updateFollow(){
    this.followObj.situacao_atual = this.formFollow.value.situacao_atual;
    this.followObj.resultado = this.formFollow.value.resultado;
    this.followObj.custo_realizado = this.formFollow.value.custo_realizado;
    this.followObj.leads_realizados = this.formFollow.value.leads_realizados;
    this.followObj.evento_id = this.formFollow.value.evento_id;

    this.followService.updateFollow(this.followObj, Number(this.followObj.id)).subscribe(res=>{
      this.toastr.success('Atualiação realizada com sucesso!!!')
      this.formFollow.reset();
      this.getFollows();
    })

  }

  deletaFollow(follow: any){
    this.followService.deleteFollow(follow.id).subscribe(res=>{
      this.toastr.success('Exclusão realizada com sucesso!!!')
      this.getFollows();
    })

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
    }

    if (!allFilesAreJPEG) {
      this.toastr.error('Somente arquivo .jpeg, .jpg ou .png');
      this.imgs_anexo = 'Somente arquivo .jpeg, .jpg ou .png';
      // Aqui você pode adicionar um aviso para o usuário, se desejar
      return;
    }

    this.http
      .post(environment.apiUrl + 'anexo_imgs' + '/' + evento_id, files)
      .subscribe({
        next: (response: any) => {
          // console.log(response);

          this.habilita_anexo_imgs = true;
          this.imgs_anexo = response.message;
          this.finaliza = this.finaliza + 1;
          // console.log('imgs_anexo', this.imgs_anexo);
        },
        error: (e) => {
          this.habilita_anexo_imgs = false;
          this.imgs_anexo = e.error.message;
          // console.log('imgs_anexo', this.imgs_anexo);
        },
      });
  }

}
