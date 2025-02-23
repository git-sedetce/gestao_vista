import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  getEventFollow(rota:any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  getSimpleEvento(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'listEvent/' +id)
  }

  getEventos(rota:any): Observable<any> {
    return this.http.get(environment.apiUrl + rota )
  }

  updateEvento(data: any, id: any){
    return this.http.put<any>(environment.apiUrl + 'atuaizaEvento/' +id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteEvento(id: number){
    return this.http.delete<any>(environment.apiUrl + 'deletaEvento/' +id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getEventoByResp(id:any): Observable<any> {
    return this.http.get(environment.apiUrl + id)
  }

  getEventoByMes(mes: any): Observable<any> {
    return this.http.get(environment.apiUrl + mes)
  }

  getEventoByAno(ano: any): Observable<any> {
    return this.http.get(environment.apiUrl + ano)
  }

  getEventoByTipo(id: any): Observable<any> {
    return this.http.get(environment.apiUrl + id)
  }

  getEventoBylocal(id: any): Observable<any> {
    return this.http.get(environment.apiUrl + id)
  }

  getEventoByFonte(id: any): Observable<any> {
    return this.http.get(environment.apiUrl + id)
  }
  imagensByEvento(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'pegaImagesEvento/' + id)
  }

  contarImgs(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }
}
