import { Component } from '@angular/core';
import { ExamenService } from '../../services/examen.service';
import { PreguntaConOpciones } from '../../models/pregunta.model';
import { Espanol,Ingles,Preguntas,Respuestas } from '../clases/clasesExamen';

@Component({
  standalone: false,
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})





export class ExamenComponent {
  // preguntasConOpciones: PreguntaConOpciones[] = [];
  nombre: string = '';
  tiempoRestante: number = 400;
  mostrarResultados = false;
  respuestas: any[] = [];
  Espanol: string[]=[];
  Ingles: string[]=[];
  preguntas: []=[];
  respuesta:[]=[];
  preguntasConOpciones: any[] = []; // Almacena todas las preguntas
  preguntaActualIndex: number = 0;  // Indice de la pregunta actual
  preguntaActual: any = null; // Pregunta en pantalla



  seleccionarRespuesta(pregunta: PreguntaConOpciones, opcionSeleccionada: string) {
    alert(
      opcionSeleccionada === pregunta.correcta
        ? '¡Correcto! 🎉'
        : 'Incorrecto ❌'
    );
  }


  
  // Nueva pregunta
  pregunta = "¿Cuál es la capital de Francia?";
  respuestaCorrecta = "París";
  respuestaUsuario = "";
  acierto = false;


  ngOnInit(): void {
    console.log('El componente se ha inicializado');
    
    this.consultarOpciones()
  }

  
  constructor(private ExamenService: ExamenService) {}

  iniciarExamen() {
    console.log('iniciarExamen')
    this.mostrarResultados = false;
    this.tiempoRestante = 400;
    this.acierto = false;
    this.respuestaUsuario = "";
    this.nombre = "";
  }

  verificarRespuesta() {
    console.log('verificarRespuesta')
    this.consultarPreguntas();
    this.acierto = this.respuestaUsuario.trim().toLowerCase() === this.respuestaCorrecta.toLowerCase();
  }

  recibirRespuestas(respuestas: any) {
    this.respuestas = respuestas;
    this.mostrarResultados = true;
  }

  enviarPuntaje() {
    console.log('enviarPuntaje')
    if (this.nombre.trim() !== "") {
      this.ExamenService.enviarPuntaje(this.nombre, 10).subscribe({
        next: () => alert("Puntaje enviado correctamente"),
        error: () => alert("Error al enviar puntaje")
      });
    }
  }



  
  consultarPreguntas() {
    console.log('Entre a consultar preguntas');
  
    this.ExamenService.consultarPreguntas('Diego', 'ingles').subscribe({
      next: (respuesta) => {
        if (Array.isArray(respuesta.preguntas)) {
          
          // 🔹 Asegurar que this.Espanol y this.Ingles sean strings
          const textoEspanol = typeof this.Espanol === 'string' ? this.Espanol : '';
          const textoIngles = typeof this.Ingles === 'string' ? this.Ingles : '';
  
          // 🔹 Convertir a arrays asegurando que no haya espacios extra
          const palabrasEspanol: string[] = textoEspanol.split(',').map(p => p.trim());
          const palabrasIngles: string[] = textoIngles.split(',').map(p => p.trim());
  
          console.log('Palabras en Español:', palabrasEspanol);
          console.log('Palabras en Inglés:', palabrasIngles);
  console.log(respuesta)
          this.preguntasConOpciones = respuesta.preguntas.map((element: any) => {
            let opcionesDisponibles: string[];
console.log(element.correcta)
console.log('element.correcta')
            if (palabrasEspanol.includes(element.correcta)) {
              opcionesDisponibles = palabrasEspanol;
            } else if (palabrasIngles.includes(element.correcta)) {
              opcionesDisponibles = palabrasIngles ;
            } else {
              //console.error(`Error: La respuesta correcta "${element.correcta}" no se encontró en ninguna lista`);
              opcionesDisponibles = palabrasIngles;
              //return null;
            }
  
            let opcionesFiltradas = opcionesDisponibles.filter(op => op !== element.correcta);
            if (opcionesFiltradas.length < 3) {
              let opcionesAlternativas = opcionesDisponibles === palabrasEspanol ? palabrasIngles : palabrasEspanol;
              let adicionales = opcionesAlternativas.filter(op => op !== element.correcta);
              opcionesFiltradas = [...opcionesFiltradas, ...adicionales];
            }
  
            let opcionesAleatorias = this.obtenerOpcionesAleatorias(opcionesFiltradas, 3);
            let opcionesFinales = this.mezclarOpciones([...opcionesAleatorias, element.correcta]);
  
            return {
              pregunta: element.pregunta,
              opciones: opcionesFinales,
              correcta: element.correcta
            };
          }).filter(Boolean);
          console.log('this.preguntasConOpciones')
          console.log(this.preguntasConOpciones)
          
          // 🔹 Mostrar la primera pregunta
          this.preguntaActualIndex = 0;
          this.preguntaActual = this.preguntasConOpciones.length > 0 ? this.preguntasConOpciones[0] : null;
  
          console.log('Preguntas cargadas:', this.preguntasConOpciones);
        } else {
          console.error("La propiedad 'preguntas' no es un array:", respuesta.preguntas);
        }
      },
      error: (error) => {
        console.error('Error al consultar preguntas:', error);
      }
    });
  }
  
  // 🔹 Función para avanzar a la siguiente pregunta
  siguientePregunta(opcionSeleccionada: any,pregunta:any) {


    console.log(opcionSeleccionada)
    console.log(pregunta)
    alert(
      opcionSeleccionada === pregunta
        ? '¡Correcto! 🎉'
        : 'Incorrecto ❌'
    );

    if (this.preguntaActualIndex < this.preguntasConOpciones.length - 1) {
      this.preguntaActualIndex++;
      this.preguntaActual = this.preguntasConOpciones[this.preguntaActualIndex];
    } else {
      console.log("No hay más preguntas");
      this.preguntaActual = null;
    }
  }
  
  /**
   * Función para seleccionar N opciones aleatorias de un array.
   */
  obtenerOpcionesAleatorias(lista: string[], cantidad: number): string[] {
    let opciones = [...lista]; // Copia para evitar mutación
    let seleccionadas: string[] = [];
  
    while (seleccionadas.length < cantidad && opciones.length > 0) {
      let indice = Math.floor(Math.random() * opciones.length);
      seleccionadas.push(opciones.splice(indice, 1)[0]);
    }
  
    return seleccionadas;
  }
  
  /**
   * Función para mezclar aleatoriamente las opciones.
   */
  mezclarOpciones(opciones: string[]): string[] {
    return opciones.sort(() => Math.random() - 0.5);
  }
  
  

  consultarOpciones() {
    console.log('entre')
    this.ExamenService.consultarOpciones('Diego').subscribe({
      next: (respuesta) => {






    this.Espanol=respuesta[0].opcion[0].espanol
    this.Ingles=respuesta[0].opcion[1].ingles


        
    console.log('ingles y espanol')
    console.log(this.Espanol)
    console.log(this.Ingles)
        
        console.log('Opciones recibidas:', respuesta);

        this.consultarPreguntas();
      },
      error: (error) => {
        console.error('Error al consultar opciones:', error);
      }
    });
  }
}
