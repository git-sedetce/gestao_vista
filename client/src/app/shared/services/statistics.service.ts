import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  getEventoporAnos(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  getEventoporTipo(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  getEventoporResp(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  getEventoporPartc(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  getEventoporRecursos(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  getEventoporLocal(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }
}
