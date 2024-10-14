import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Md5 } from 'ts-md5';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  CriptografarMD5(value: string | undefined): string | undefined{
    return Md5.hashStr(value!).toString();
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  authenticated = false;

  cadastrar_users(data:any) : Observable<any> {
    return this.http.post(environment.apiUrl + 'register', data)
  }

  pegar_users(metodo: string): Observable<any> {
    return this.http.get(environment.apiUrl + metodo)
  }

  login(data:any): Observable<any> {
    return this.http.post<{ token: string}>(environment.apiUrl + 'login', data).pipe(
      map((res) => {
        //console.log('res', res)
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', res.token);
        this.authenticated = true;
        //window.location.reload();
        return this.router.navigate(['home'])
      }),
      catchError((e) =>{
        if(e.error.message) return throwError(() => e.error.message);
        return throwError(() => "Serviço fora de área!");
      })
    )
  }

  public logout(){
    localStorage.removeItem('access_token');
    window.location.reload();
    return this.router.navigate(['login'])
  }

  auth_user() : boolean {
    const token = localStorage.getItem('access_token');
    //console.log('token', token)
    if(!token) return false;
    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token)
  }

  reset_password(data:any) : Observable<any> {
    return this.http.post(environment.apiUrl + 'reset', data)
  }

  atualizarUser(data: any, id: number){
    return this.http.put<any>(environment.apiUrl + 'atualizaUser/' +id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteUser(id: number){
    return this.http.delete<any>(environment.apiUrl + 'user/' +id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
