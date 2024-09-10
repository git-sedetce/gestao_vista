import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
