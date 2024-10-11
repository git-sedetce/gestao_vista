import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TypesService } from '../../../shared/services/types.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit{
  @ViewChild("formCadastroUser") formCadastroUser!: NgForm
  user!: User;

  passwordPtn = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$";
  lista_sexec!: any[];

  constructor(
    private serviceUser: UserService,
    private toastr: ToastrService,
    private typeService: TypesService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = new User();
    this.getSexec();
  }

  getSexec(){
    this.typeService.getSexec('listaSexec').subscribe((sxc:any[]) =>{
      this.lista_sexec = sxc;
    }, (erro: any) => console.log(erro)
    );
  }

  verificaEmail(email: any){
    email = this.user.user_email?.split("@")
    //console.log('verificaEmail', email)
    if(email[1] != 'sde.ce.gov.br'){
      /*alert("Somente emaili @SDE podem ser cadastrados")
      let ref = document.getElementById('cancel')
      ref?.click();*/
      this.toastr.warning('Somente emaili @SDE podem ser cadastrados!')
      this.formCadastroUser.reset()
    }
  }

  saveUser(): void {
    this. user.user_active = false;
    //console.log('User', this.user);
    const nome_usuario = this.user.user_email?.split("@",1).toString();
    //console.log('nome_usuario', nome_usuario);
    this.user.user_name = nome_usuario;
    this.user.profile_id = 1;

    this.user.user_password = this.serviceUser.CriptografarMD5(this.user.user_password)
    this.serviceUser.cadastrar_users(this.user).subscribe({
      next: (res: any) => {
        this.user.id = res.id
        this.toastr.success('Usuário cadastrado com sucesso!!!')
      },
      error: (e) => console.error(e)
    })
    this.router.navigate(['/login'])
  }

}
