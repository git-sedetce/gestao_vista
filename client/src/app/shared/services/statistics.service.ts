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

  getEventoporTipo(rota: any, year: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota + year)
  }

  getEventoporResp(rota: any, year: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota + year)
  }

  getEventoporPartc(rota: any, year: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota + year)
  }

  getEventoporRecursos(rota: any, year: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota + year)
  }

  getEventoporLocal(rota: any, year: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota + year)
  }
}
