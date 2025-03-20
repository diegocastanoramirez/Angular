import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ExamenModule } from './modules/examen/examen.module';
import { HttpClientModule } from '@angular/common/http'; // 👈 Asegúrate de importar esto

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // 👈 Agregar aquí para que esté disponible en toda la app
    ExamenModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
