import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AcompanhamentoService {

  constructor(private http: HttpClient) { }

  cadastrar(data: any) : Observable<any> {
    return this.http.post(environment.apiUrl + 'cadastroFollow', data)
  }

  listarAcompanhamento(rota: any): Observable<any> {
    return this.http.get(environment.apiUrl + rota)
  }

  listarAcompanhamentoByEvento(id: number): Observable<any> {
    return this.http.get(environment.apiUrl +'listaFollowByEvento/' + id)
  }

  listarAcompanhamentoByStatus(metodo: string, stats: string): Observable<any>{
    return this.http.get(environment.apiUrl + metodo + stats)
  }

  updateFollow(data: any, id: any){
    return this.http.put<any>(environment.apiUrl + 'atualizaFollow/' +id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteFollow(id: number){
    return this.http.delete<any>(environment.apiUrl + 'deletaFollow/' +id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
