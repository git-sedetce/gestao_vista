import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin!: NgForm;
  loginUsers!: User;

  constructor(
    private serviceUser: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginUsers = new User();
  }

  verificaEmail(email: any) {
    email = this.loginUsers.user_email?.split('@');
    //console.log('verificaEmail', email)
    if (email[1] != 'sde.ce.gov.br') {
      /*alert("Somente emaili @SDE podem ser cadastrados")
      let ref = document.getElementById('cancel')
      ref?.click();*/
      this.toastr.warning('Somente emaili @SDE!');
      this.formLogin.reset();
    }
  }

  login(): void {
    this.loginUsers.user_password = this.serviceUser.CriptografarMD5(
      this.loginUsers.user_password
    );
    //console.log('loginUser', this.loginUsers)
    this.serviceUser.login(this.loginUsers).subscribe({
      next: (res) => res,
      error: (e) => (
        this.toastr.error(e),
        this.formLogin.reset() /*this.loginUsers.user_password = ''*/
      ),
    });
  }
}
