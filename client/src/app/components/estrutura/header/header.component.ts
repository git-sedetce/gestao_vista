import { Component, DoCheck } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements DoCheck {
  authenticated = false;
  user_name: any;

  constructor(
    private serviceUser: UserService
  ) { }

  ngDoCheck(): void {
    this.isLogged();
  }

  isLogged(){
    const token = localStorage.getItem('token');
    // console.log('token', token)
    if(token){
      this.authenticated = true
      // console.log('authenticated', this.authenticated)
      const loginUsers:any =  JSON.parse(atob(token!.split('.')[1]))
      this.user_name = loginUsers._user_name;
      //console.log('loginUsers', loginUsers)
    }
  }

  logout() {
    this.serviceUser.logout()
  }

}
