import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ExamenModule } from './modules/examen/examen.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ExamenModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
