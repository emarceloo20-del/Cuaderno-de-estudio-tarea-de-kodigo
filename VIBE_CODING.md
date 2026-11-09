# Proceso de Vibe Coding

Registro del desarrollo de **Cuaderno** con IA como copiloto (Claude). El flujo fue: definir el alcance, pedir la arquitectura antes del código, generar por capas, validar con `tsc`, `eslint`, `next build` y pruebas reales de las rutas, y corregir lo que fallaba.

## 1. Prompts principales

**Prompt 1 — alcance.** Se pegó el enunciado completo de la actividad (Next.js 16+, TypeScript, mínimo 4 rutas, API, Server y Client Components, `useState`/`useEffect`, responsive, loading y error UI, despliegue y entregables).

**Prompt 2 — delegación.** «Quiero que lo hagas tú.» La IA propuso el tema (planificador de estudio para una carrera universitaria) y la estructura de rutas, y construyó el proyecto por pasos.

**Prompt de arquitectura recomendado para repetir el flujo:**
> Actúa como desarrollador senior de Next.js 16 con App Router y TypeScript. Voy a construir un planificador de estudio. Propón la estructura de carpetas, las rutas y qué componentes serán Server o Client, antes de escribir código.

**Prompts por capa (en este orden):**
1. Datos y Route Handlers: `GET /api/materias`, `/api/materias/[id]`, `/api/frase`.
2. Diseño base: layout, navegación responsive y paleta propia (papel cuadriculado, tinta azul, margen rojo, resaltador).
3. Páginas de datos (`/`, `/materias`, `/materias/[id]`) con `loading.tsx`, `error.tsx` y `not-found.tsx`.
4. Componentes interactivos: tablero de tareas y temporizador Pomodoro.
5. Documentación y revisión final.

## 2. Iteraciones realizadas

| # | Qué pasó | Resultado |
| --- | --- | --- |
| 1 | `create-next-app` activó `cacheComponents` y `partialPrefetching`, que obligan a envolver todo acceso dinámico en `<Suspense>` o `use cache`. | Se desactivaron en `next.config.ts` para mantener el proyecto simple; la carga dinámica se resolvió con `loading.tsx` y `<Suspense>` donde importa. |
| 2 | El proyecto trae un `AGENTS.md` que avisa de cambios respecto a versiones previas. | Se leyó la documentación incluida en `node_modules/next/dist/docs` antes de escribir `error.tsx` y las páginas. |
| 3 | `error.tsx` usa `retry()` en esta versión, no `reset()`. | Se escribieron los dos `error.tsx` con `retry`. |
| 4 | ESLint (React 19) marcó `setState` directo dentro de un `useEffect` en el Pomodoro y en las tareas. | Pomodoro: se guarda la hora de fin (`Date.now() + segundos`) y el intervalo solo actualiza desde un callback; es además más exacto. Tareas: `localStorage` se lee con `useSyncExternalStore`, lo que evita desajustes de hidratación. |
| 5 | Prueba manual de la API: buscar «algebra» no encontraba «Álgebra». | Se añadió `normalizar()` (NFD + minúsculas) a la búsqueda. |
| 6 | `/materias/inexistente` devuelve 200 porque la respuesta ya empezó a transmitirse por `loading.tsx`. | Comportamiento documentado por Next.js; la página muestra la UI de «no existe» y lleva `noindex`. Se dejó así. |

## 3. Decisiones técnicas

- **Server Components para datos, Client Components solo donde hay interacción** (`Navbar`, `TaskBoard`, `PomodoroTimer`, páginas de error).
- **Los Server Components consumen la API propia** con un helper (`lib/api.ts`) que arma la URL absoluta desde los headers de la petición, así funciona igual en local y en Vercel sin configuración.
- **Route Handlers internos en lugar de Supabase**: no hay claves ni base de datos que mantener, y el requisito de «API interna» queda cubierto.
- **Tareas en `localStorage`**: persisten sin backend; se documenta en la interfaz que viven en el navegador.
- **Fuentes del sistema** (sin Google Fonts) para no depender de red en el build y cargar más rápido.
- **Accesibilidad**: foco visible, etiquetas en formularios, `aria-live` en contadores, `prefers-reduced-motion` respetado, menú móvil con `aria-expanded`.
- **Paleta propia** inspirada en el cuaderno escolar, con un único elemento memorable: la hoja rayada con línea de margen.

## 4. Desafíos y cómo se resolvieron con apoyo de IA

- **Versión nueva de Next.js con convenciones distintas.** En vez de confiar en la memoria del modelo, se le indicó leer la documentación instalada en el proyecto. Lección: con frameworks recientes, la IA debe consultar la documentación real.
- **Reglas estrictas de React 19 en el linter.** El primer código generado compilaba pero no pasaba lint; se pidió reescribir esas dos piezas con patrones recomendados.
- **Errores que solo aparecen al probar.** El fallo de búsqueda con acentos no lo detectaron ni TypeScript ni ESLint; apareció al probar la API con `curl`. Lección: validar el comportamiento, no solo que compile.

## 5. Mis notas personales

**Cómo trabajé.** Le pasé a la IA el enunciado completo y le pedí que construyera la aplicación. Yo me encargué de revisar el resultado, ejecutarlo en mi computadora (Windows), probar cada ruta en el navegador y llevarlo a GitHub y Vercel.

**Lo que probé.** Comprobé en el navegador las 6 rutas, la búsqueda de materias, agregar y marcar tareas (y que sigan ahí al recargar), el Pomodoro y la vista móvil.

**Un cambio hecho por mí.** Al correr `npm run dev`, la terminal mostró un aviso de Next.js sobre `scroll-behavior: smooth`. Lo corregí agregando `data-scroll-behavior="smooth"` en la etiqueta `<html>` de `src/app/layout.tsx` y lo subí en un commit propio.

**Problemas que encontré y cómo los resolví.**
- La IA me dio un comando `unzip` que no existe en Windows; lo resolví extrayendo el archivo con el Explorador y pidiéndole la alternativa para Windows.
- Configuré Git con un correo de ejemplo en lugar del mío y se coló un carácter extra al copiar un comando; lo corregí y reescribí el autor de los commits con `git rebase`, para que el historial muestre mi nombre y mi correo.
- Un commit no se ejecutó porque el mensaje se cortó en dos líneas en la terminal; lo repetí en una sola línea.

**Lo que aprendí.**
- Los comandos que da la IA hay que adaptarlos a mi sistema operativo y revisarlos antes de ejecutarlos.
- Que compile o pase el linter no basta: hay que probar la aplicación de verdad.
- [Agrega aquí una cosa que aprendiste tú sobre Next.js, por ejemplo la diferencia entre Server y Client Components.]

**Qué mejoraría.** [pondria mas accesibilidad para el diseño por ejemplo un modo oscuro para las personas que asi lo deseen, inclusive pondria un actualizador se podria decir para q ellos pudieran modificar bien que poner en cada materia o inclusive q creen su carpeta con las materias y temas q gustan]