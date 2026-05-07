# AGENTS.md – Kiosko Táctil Vertical

**Fuente de verdad:** `prd.md`

---

## Stack Técnico
- **Framework:** Vue 3 + Electron + Vite + TypeScript
- **Estado:** Pinia
- **Estilos:** Pug + Stylus (usa `kiosko-css` externo)
- **Animaciones:** GSAP
- **Datos:** JSON5
- **Librerías externas:** `@blashstar/visor-360`, `@blashstar/kiosko-css`

---

## Reglas del Repo

**Idioma:** Todo en español — código, archivos, carpetas, comentarios, commits.

**Commits:** Conventional Commits en español.
```bash
feat: implementa componente Carrusel3D
fix: corrige error al cargar datos
refactor: extrae lógica a utilidades
```

**Push:** Solo cuando se indique explícitamente.

---

## Comandos

```bash
npm run dev      # Desarrollo
npm run build    # Build + electron-builder
npm run test     # vitest
npm run lint     # eslint
```

---

## Estructura

```
src/
├── componentes/      # Vue componentes
├── almacenes/        # Pinia stores
├── datos/            # JSON5 (info.json5, vistas360.json5, versus.json5)
├── estilos/          # Stylus globals
├── utilidades/      # Funciones reutilizables
electron/            # main + preload
public/img/          # Imágenes
```

---

## Conventions Importantes

- **SLAP:** Una función = un nivel de abstracción.
- **DRY:** Reutilizar componentes y funciones comunes.
- **Tipado:** Interfaces en `src/tipos/` para validar JSON5.
- Resolución target: **1080 x 1920** (vertical).

---

## Datos

Los archivos JSON5 en `src/datos/`:
- `info.json5` — productos
- `vistas360.json5` — vistas 360°
- `versus.json5` — comparativas