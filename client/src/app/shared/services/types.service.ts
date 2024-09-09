import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  constructor(private http: HttpClient) { }

  getSexec(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota);
  }

  getTipoEventos(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota);
  }

  getLocal(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota);
  }

  getParticipacao(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota);
  }

  getRecursos(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota )
  }
}
