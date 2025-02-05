import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../shared/services/user.service';
import { TypesService } from '../../../shared/services/types.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  lista_users!: any []
  lista_sexec!: any []
  formUser!: FormGroup;
  userObj: User = new User()

  page: number = 1; // Página atual
  itemsPerPage: number = 10; // Itens por página

  constructor(
    private user: UserService,
    private typeService: TypesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

    ngOnInit(): void {
      this.formUser = this.formBuilder.group({
        id: [''],
        nome_completo: [''],
        user_name: [''],
        user_email: [''],
        user_active: [false],
        user_password: [''],
        profile_id: [''],
        sexec_id: ['']
      })

      this.getUsers();
      this.getSexec();

    }

    getUsers() {
      this.user.pegar_users('allUser').subscribe((usr: any[]) => {
        this.lista_users = usr;
        // console.log('lista_users', this.lista_users)
      }, (erro: any) => console.error(erro))
    }

    getSexec(){
      this.typeService.getSexec('listaSexec').subscribe((sxc:any[]) =>{
        this.lista_sexec = sxc;
      }, (erro: any) => console.error(erro)
      );
    }

    onEdit(user: any){
      this.userObj.id = user.id;
      this.formUser.controls['nome_completo'].setValue(user.nome_completo)
      this.formUser.controls['user_name'].setValue(user.user_name)
      this.formUser.controls['user_email'].setValue(user.user_email)
      this.formUser.controls['user_active'].setValue(user.user_active)
      this.formUser.controls['user_password'].setValue(user.user_password)
      this.formUser.controls['profile_id'].setValue(user.ass_user_profile.id)
      this.formUser.controls['sexec_id'].setValue(user.sexec_id)
    }
    updateUser(){
      this.userObj.nome_completo = this.formUser.value.nome_completo;
      this.userObj.user_name = this.formUser.value.user_name;
      this.userObj.user_email = this.formUser.value.user_email;
      this.userObj.user_active = this.formUser.value.user_active;
      this.userObj.user_password = this.formUser.value.user_password;
      this.userObj.profile_id = this.formUser.value.profile_id;
      this.userObj.sexec_id = this.formUser.value.sexec_id;


      this.user.atualizarUser(this.userObj, Number(this.userObj.id)).subscribe(res=>{
        this.toastr.success('Atualiação realizada com sucesso!!!')
        this.formUser.reset();
        this.getUsers();
      })

    }
    deletaEvento(user: any){
      this.user.deleteUser(user.id).subscribe(res=>{
        this.toastr.success('Exclusão realizada com sucesso!!!')
        this.getUsers();
      })

    }

}
