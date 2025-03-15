import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExamenComponent } from '../../components/examen/examen.component';
import { TemporizadorComponent } from '../../components/temporizador/temporizador.component';
import { ResultadosComponent } from '../../components/resultados/resultados.component';

@NgModule({
  declarations: [
    ExamenComponent,
    TemporizadorComponent,
    ResultadosComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ExamenComponent,
    TemporizadorComponent,  // 🔹 Exporta el componente aquí
    ResultadosComponent
  ]
})
export class ExamenModule { }
