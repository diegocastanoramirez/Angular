import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-temporizador',
  template: `<div>Tiempo: {{ tiempo }}</div>`,
  styleUrls: ['./temporizador.component.css']
})
export class TemporizadorComponent {
  tiempo: number = 400;
  @Output() tiempoFinalizado = new EventEmitter<void>();

  constructor() {
    setInterval(() => {
      if (this.tiempo > 0) {
        this.tiempo--;
      } else {
        this.tiempoFinalizado.emit();
      }
    }, 1000);
  }
}
