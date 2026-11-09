export type Materia = {
  id: string;
  nombre: string;
  descripcion: string;
  color: string;
  horasSemana: number;
  temas: string[];
  consejo: string;
};

export const materias: Materia[] = [
  {
    id: "programacion",
    nombre: "Programación",
    descripcion:
      "Lógica, estructuras de datos y desarrollo web. Se aprende escribiendo código todos los días, no leyendo sobre él.",
    color: "#2563EB",
    horasSemana: 6,
    temas: ["Algoritmos y lógica", "Estructuras de datos", "React y Next.js", "Git y GitHub"],
    consejo: "Después de cada clase, reescribe el ejemplo sin mirar y cambia una cosa para ver qué se rompe.",
  },
  {
    id: "matematicas",
    nombre: "Matemáticas",
    descripcion:
      "Álgebra, funciones y cálculo. El avance viene de resolver muchos ejercicios, cada vez más difíciles.",
    color: "#D64550",
    horasSemana: 5,
    temas: ["Álgebra y ecuaciones", "Funciones", "Límites y derivadas", "Geometría analítica"],
    consejo: "Resuelve un simulacro cronometrado por semana y revisa solo los errores.",
  },
  {
    id: "filosofia",
    nombre: "Filosofía",
    descripcion:
      "Lectura crítica y argumentación. Entender una postura antes de discutirla es la mitad del trabajo.",
    color: "#7C3AED",
    horasSemana: 3,
    temas: ["Lógica y argumentos", "Ética", "Antropología filosófica", "Textos clásicos"],
    consejo: "Resume cada lectura en tres frases: qué afirma el autor, por qué y qué objeción tendría.",
  },
  {
    id: "teologia",
    nombre: "Teología",
    descripcion:
      "Fe, doctrina social y documentos de la Iglesia. Conviene leer con el texto abierto y subrayar las ideas centrales.",
    color: "#B45309",
    horasSemana: 3,
    temas: ["Doctrina social", "Sagrada Escritura", "Moral fundamental", "Documentos pontificios"],
    consejo: "Anota las citas con número de párrafo desde el principio; te ahorra horas al citar.",
  },
  {
    id: "redaccion",
    nombre: "Técnicas de redacción",
    descripcion:
      "Estructura, claridad y normas APA. Un buen texto se reescribe más de una vez.",
    color: "#0F766E",
    horasSemana: 2,
    temas: ["Estructura del ensayo", "Normas APA 7", "Citas y referencias", "Revisión y estilo"],
    consejo: "Escribe un borrador malo rápido y deja la corrección para otra sesión distinta.",
  },
];

export const frases: string[] = [
  "Una hora concentrada vale más que tres con el celular al lado.",
  "No necesitas ganas para empezar; necesitas empezar para que lleguen las ganas.",
  "Lo que no puedes explicar con tus palabras, todavía no lo entiendes.",
  "Estudiar poco cada día supera estudiar mucho la noche anterior.",
  "Un error corregido hoy es un punto ganado en el examen.",
  "Descansar también es parte del plan de estudio.",
  "Divide la tarea hasta que el primer paso dure menos de diez minutos.",
];

export function buscarMaterias(q?: string | null): Materia[] {
  if (!q) return materias;
  const t = q.trim().toLowerCase();
  if (!t) return materias;
  return materias.filter(
    (m) =>
      m.nombre.toLowerCase().includes(t) ||
      m.temas.some((x) => x.toLowerCase().includes(t)),
  );
}

export function materiaPorId(id: string): Materia | undefined {
  return materias.find((m) => m.id === id);
}
