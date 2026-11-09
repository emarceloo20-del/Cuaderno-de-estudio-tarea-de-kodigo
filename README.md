# Cuaderno · Planificador de estudio

Aplicación web hecha con **Next.js 16 (App Router) y TypeScript** para organizar el estudio universitario: materias con sus temas y horas sugeridas, un tablero de tareas y un temporizador Pomodoro.

Proyecto de la actividad evaluada *Implementación de Aplicación Next.js mediante Vibe Coding*.

- **Despliegue:** `https://TU-APP.vercel.app` ← reemplaza con tu URL de Vercel
- **Proceso con IA:** ver [`VIBE_CODING.md`](./VIBE_CODING.md)

## Rutas

| Ruta | Tipo | Qué hace |
| --- | --- | --- |
| `/` | Server Component | Inicio: nota del día y carga semanal (consume la API interna) |
| `/materias` | Server Component | Listado con búsqueda (`?q=`), con `loading.tsx` y `error.tsx` |
| `/materias/[id]` | Server Component | Detalle de una materia; `not-found.tsx` si no existe |
| `/tareas` | Server + Client | Tablero de tareas con `useState`/`useEffect` (se guarda en el navegador) |
| `/pomodoro` | Server + Client | Temporizador de bloques de foco y descanso |
| `/acerca` | Server Component | Stack y rutas de la API |

### Route Handlers

- `GET /api/materias` — lista de materias (acepta `?q=`, sin distinguir acentos)
- `GET /api/materias/[id]` — detalle (404 si no existe)
- `GET /api/frase` — nota de estudio al azar

## Requisitos

- Node.js 20.9 o superior
- npm

## Instalación y uso

```bash
git clone https://github.com/TU-USUARIO/cuaderno.git
cd cuaderno
npm install
cp .env.example .env.local
npm run dev
```

Abre <http://localhost:3000>.

Otros comandos:

```bash
npm run lint    # ESLint
npm run build   # build de producción
npm run start   # servir el build
```

## Variables de entorno

Ver `.env.example`. La app **no necesita claves** para funcionar; `NEXT_PUBLIC_SITE_URL` es opcional. Las claves reales van siempre en `.env.local`, que está en `.gitignore`.

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En [vercel.com/new](https://vercel.com/new) importa el repositorio (Vercel detecta Next.js solo).
3. Pulsa **Deploy** y pega la URL resultante en este README.

## Estructura

```
src/
  app/            rutas, layouts y Route Handlers (api/)
  components/     Navbar, TaskBoard, PomodoroTimer, etc.
  lib/            datos (data.ts) y helper para llamar a la API (api.ts)
```
