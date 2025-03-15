import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private apiUrl = 'http://localhost:5000/api/examen';

  constructor(private http: HttpClient) {}

  enviarExamen(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
