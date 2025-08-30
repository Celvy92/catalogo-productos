Catálogo Interactivo de Productos

Aplicación Frontend en React (Vite) que muestra un catálogo de productos con búsqueda, filtros, favoritos/carrito y vista de detalle. El proyecto se construye de forma **paulatina** para repasar y profundizar características de React y preparar el despliegue en **Vercel**.

🎯 Objetivo
- Reforzar fundamentos de React.
- Practicar buenas prácticas de frontend (estructura, estado, rutas).
- Preparar un proyecto **portafolio** listo para producción en Vercel.

🚧 Alcance de la Parte 1
- Definición del proyecto y dinámica de trabajo (individual).
- Creación del repositorio con estructura base.
- Documentación inicial (README y acuerdos).

 Stack
- React + Vite
- JavaScript (ESNext)
- (Más adelante) React Router, estado global (Context/Redux/Zustand), fetching, etc.

Estructura inicial
catalogo-productos/
├─ src/
│ ├─ App.jsx
│ └─ main.jsx
├─ index.html
├─ package.json
├─ .gitignore
└─ README.md
 Dinámica de trabajo (Individual)
- Marco de referencia SCRUM adaptado a 1 persona:
  - Plan semanal (backlog breve con 3–5 tareas).
  - Tareas chicas (≤ 1 hora idealmente).
  - Revisión al final de la semana (qué funcionó y qué mejorar).
- **Ramas**: `main` (estable), `feat/*` para nuevas funciones.
- **Commits**: convenciones tipo *Conventional Commits* (ej. `feat:`, `fix:`, `docs:`).

 Acuerdos / Forma de Trabajo
- Trabajo individual por tiempos de universidad.
- Priorizar calidad de código, nombrados claros y commits descriptivos.
- Issues/To-Do dentro del README al final de cada sesión.

 Deploy (próximas partes)
- Preparación para Vercel (build con `vite build`).
- Variables de entorno y optimizaciones.

 To-Do inicial
- [ ] Configurar ESLint y reglas mínimas.
- [ ] Crear estructura de rutas (Landing, Catálogo, Detalle, Favoritos/Carrito).
- [ ] Mock de productos (JSON local).
- [ ] Buscar y filtrar.
- [ ] Preparar despliegue en Vercel.

---
Autora:Celeste Vianey Hernández Arauz

Acuerdos y Flujo de Trabajo (Individual)

Enfoque
- Proyecto individual por carga universitaria.
- Iteraciones semanales con mini-sprints de 3–5 tareas.

Flujo propuesto
1. Definir tareas de la semana (backlog).
2. Trabajar en ramas `feat/*`.
3. Abrir PR contra `main` (revisión personal: checklist de calidad).
4. Merge a `main` y tag si aplica.

Convenciones
- **Ramas**: `feat/filtros`, `feat/detalle-producto`, `fix/busqueda`, `docs/readme`.
- **Commits**:
  - `feat: módulo de filtros`
  - `fix: corrección de paginación`
  - `docs: actualización de acuerdos`
  - `refactor: separar componentes`
  - `chore: config ESLint`

Definición de Hecho (DoD)
- Código compila sin errores.
- Sin warnings críticos.
- Nombres claros y consistentes.
- README o comentarios breves si es necesario.

 Gestión de tareas
- Se registran como checklist al final del README.
- Revisión semanal: marcar completadas y planear siguientes.