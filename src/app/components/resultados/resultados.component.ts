import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {
  @Input() respuestas: any[] = [];
}
