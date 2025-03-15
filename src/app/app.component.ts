import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <h1>Examen</h1>
    <app-temporizador></app-temporizador>
    <app-examen></app-examen>
    <app-resultados></app-resultados>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
