import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent implements OnInit {
  @ViewChild("formResetPassword") formResetPassword!: NgForm;
  resetSenha!: User;

  constructor(
    private serviceUser: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.resetSenha = new User()
  }

  verificaEmail(email: any){
    email = this.resetSenha.user_email?.split("@")
    //console.log('verificaEmail', email)
    if(email[1] != 'sde.ce.gov.br'){
      /*alert("Somente emaili @SDE podem ser cadastrados")
      let ref = document.getElementById('cancel')
      ref?.click();*/
      this.toastr.warning('Somente emaili @SDE!')
      this.formResetPassword.reset()

    }
  }

  reset(): void {
    //console.log('resetSenha', this.resetSenha)
    this.resetSenha.user_password = this.serviceUser.CriptografarMD5(this.resetSenha.user_password)
    this.serviceUser.reset_password(this.resetSenha).subscribe({
      next:(res:any) => {
        this.toastr.success('Senha alterada com sucesso!!!')
        this.router.navigate(['/loginUsers'])
      },error: (e) => {
        console.error(e)
        this.toastr.error('Problema ao recriar a senha!!!')
        this.formResetPassword.reset()
      }
    })
  }

}
