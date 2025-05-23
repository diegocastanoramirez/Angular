import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private apiUrl = 'https://pruebaback-fwaeawc0ckd9g6dh.westus2-01.azurewebsites.net/api';

  constructor(private http: HttpClient) {}

  enviarPuntaje(nombre: string, puntaje: number): Observable<any> {
    return this.http.post(this.apiUrl + '/examen/guardar-examen', { nombre, puntaje });

  }
  consultarPreguntas(Usuario: string,NombreExamen: string): Observable<any> {
    return this.http.post(this.apiUrl +'/examen/consultar-preguntas',{Usuario,NombreExamen});
  }

  consultarOpciones(Usuario: String): Observable<any> {
    return this.http.post(this.apiUrl +'/examen/consultar-opciones',{Usuario});
  }
  
  
}


