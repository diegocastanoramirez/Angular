export interface Pregunta {
    pregunta: string;
    correcta: string;
  }
  
  export interface PreguntaConOpciones {
    pregunta: string;
    opciones: string[];
    correcta: string;
  }
  
  // Definir interfaces para la estructura de respuesta
  export interface Opcion {
    id: number;
    ingles: string;
    espanol: string;
  }
  
  export interface Respuesta {
    id: number;
    opcion: Opcion[];
  }


  