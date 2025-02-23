import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(private http: HttpClient) { }

  cadastrarRegistros(data: any) : Observable<any> {
    return this.http.post(environment.apiUrl + 'newRegister', data)
  }
}
