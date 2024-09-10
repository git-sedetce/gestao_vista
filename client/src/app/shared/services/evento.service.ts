import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient) { }

  cadastrar(data: any) : Observable<any> {
    return this.http.post(environment.apiUrl + 'cadastroEvento', data)
  }

  getEvento(rota:any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }
}
