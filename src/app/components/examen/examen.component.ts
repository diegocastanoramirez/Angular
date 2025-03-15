import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent {
  nombre: string = '';
  tiempoRestante: number = 400;
  mostrarResultados = false;
  respuestas: any[] = [];

  iniciarExamen() {
    this.mostrarResultados = false;
    this.tiempoRestante = 400;
  }

  recibirRespuestas(respuestas: any) {
    this.respuestas = respuestas;
    this.mostrarResultados = true;
  }
}
