---

## **📄 PRD Final – Kiosko Táctil Vertical para Exhibición de Productos**
**Versión:** 3.0
**Fecha:** 6 de mayo de 2026
**Autor:** Joffré Sánchez
**Stack técnico:**
Vue 3 + Electron + Vite + TypeScript + **Pinia** + Pug + Stylus + **GSAP** + JSON5 + Lodash.
**Librerías externas:**
- [`visor-360`](https://github.com/blashstar/visor-360) (para vistas 360°).
- [`kiosko-css`](https://gitlab.com/blashstar/kiosko-css) (para ajuste y layout de contenido).

**Normas de desarrollo:**
- **Principios:** SOLID, DRY, **SLAP** (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion + **S**ingle **L**ayer of **A**bstraction **P**rinciple).
- **Idioma:** Todo el código, nombres de archivos, carpetas, comentarios y commits **deben estar en español**.
- **Control de versiones:** Repositorio Git con commits **descriptivos, en español y agrupados por funcionalidad**. **No se hará push sin indicación explícita**.

---

---

---

## **📁 1. Estructura de Archivos y Carpetas**
```plaintext
/kiosko-ipesa/                    # Raíz del proyecto (nombre en español)
├── src/                          # Código fuente
│   ├── componentes/              # Componentes Vue (en español)
│   │   ├── botones/              # Componentes reutilizables de botones
│   │   │   └── BotonLevitante.vue
│   │   ├── carruseles/           # Componentes de carruseles
│   │   │   └── Carrusel3D.vue    # Carrusel 3D ad-hoc
│   │   ├── secciones/            # Componentes de secciones principales
│   │   │   ├── Inicio.vue
│   │   │   ├── Menu.vue
│   │   │   ├── MenuVistas360.vue
│   │   │   ├── MenuInfografias.vue
│   │   │   ├── MenuComparativas.vue
│   │   │   ├── Vista360.vue
│   │   │   ├── Infografia.vue
│   │   │   └── Comparativa.vue
│   │   └── Visor360.vue          # Componente wrapper para visor-360
│   ├── almacenes/                # Stores de Pinia (en español)
│   │   ├── productos.ts
│   │   ├── vistas360.ts
│   │   ├── comparativas.ts
│   │   ├── contenidos.ts
│   │   └── interfaz.ts
│   ├── datos/                    # Archivos JSON5 (en español)
│   │   ├── productos.json5       # Datos de productos (antes info.json)
│   │   ├── vistas-360.json5      # Escenas para vistas 360° (antes vistas360.json)
│   │   ├── comparativas.json5    # Parejas de comparativas (antes versus.json)
│   │   └── contenidos.json5      # Textos, fondos y configuraciones
│   ├── estilos/                  # Estilos globales y por componente
│   │   ├── globales.styl         # Estilos globales (importa kiosko-css)
│   │   ├── carrusel-3d.styl      # Estilos del carrusel 3D
│   │   └── animaciones.styl     # Estilos para animaciones (GSAP)
│   ├── tipos/                    # Interfaces y tipos TypeScript
│   │   ├── modelos.d.ts           # Tipos para productos, vistas, etc.
│   │   └── configuracion.d.ts    # Tipos para configuraciones
│   ├── utilidades/               # Funciones y utilidades reutilizables
│   │   ├── animaciones.ts        # Funciones de animación con GSAP
│   │   ├── validaciones.ts       # Validación de datos JSON5
│   │   └── constantes.ts         # Constantes globales
│   ├── App.vue                   # Componente raíz
│   └── main.ts                   # Punto de entrada de la app
│
├── electron/                    # Configuración de Electron
│   ├── principal.ts             # Proceso principal de Electron
│   └── preload.ts               # Script de preload
│
├── public/                      # Archivos estáticos
│   ├── img/                     # Imágenes (iconos, fondos, productos)
│   │   ├── fondos/
│   │   ├── iconos/
│   │   ├── modelos/              # Imágenes de productos
│   │   └── vistas/               # Imágenes para vistas 360°
│   └── index.html               # Plantilla HTML
│
├── tests/                       # Pruebas unitarias y de integración
│   ├── componentes/
│   ├── almacenes/
│   └── utilidades/
│
├── .gitignore                   # Archivos ignorados por Git
├── package.json                 # Dependencias y scripts
├── vite.config.ts               # Configuración de Vite
├── tsconfig.json                # Configuración de TypeScript
└── README.md                    # Documentación del proyecto (en español)
```

---
---
---

## **🔧 2. Normas de Desarrollo**
### **2.1. Principios de Diseño**
- **SOLID:**
  - **S**ingle Responsibility: Cada clase/componente tiene **una sola responsabilidad** (ej: `Carrusel3D.vue` solo maneja el carrusel 3D).
  - **O**pen/Closed: Las entidades deben estar **abiertas para extensión pero cerradas para modificación** (ej: usar `extends` para ampliar funcionalidad).
  - **L**iskov Substitution: Los componentes derivados deben ser **sustituibles por sus padres** sin romper la app.
  - **I**nterface Segregation: Las interfaces deben ser **específicas** (ej: `IProductosStore` solo define métodos de productos).
  - **D**ependency Inversion: Dependencias de **abstracciones**, no de implementaciones (ej: inyectar stores de Pinia).

- **DRY (Don't Repeat Yourself):**
  - **Reutilización de código:** Componentes como `Carrusel3D.vue` se usan en múltiples secciones.
  - **Funciones comunes:** Centralizar lógica en `utilidades/` (ej: animaciones con GSAP).

- **SLAP (Single Layer of Abstraction Principle):**
  - Cada función/clase **debe operar en un solo nivel de abstracción**.
  - Ejemplo:
    - ❌ **Mal:** Una función que carga datos, los valida, los transforma y los guarda en Pinia.
    - ✅ **Bien:** Separar en funciones: `cargarDatos()`, `validarDatos()`, `transformarDatos()`, `guardarEnPinia()`.

---
### **2.2. Convenciones de Código**
- **Nombres en español:**
  - Archivos: `productos.ts`, `vistas-360.json5`, `BotonLevitante.vue`.
  - Variables/funciones: `obtenerProductos()`, `cambiarSeccion()`, `productoActual`.
  - Clases/interfaces: `IProducto`, `AlmacenProductos`.
- **Comentarios:** En español y **descriptivos** (explicar el "porqué", no el "qué").
  ```typescript
  // Calcula el ángulo inicial para distribuir los items en círculo
  // y evitar solapamientos en el carrusel 3D.
  const anguloInicial = 360 / items.length;
  ```
- **TypeScript:** Usar **interfaces** para tipar datos (ej: `IProducto`, `IConfiguracionCarrusel`).
- **Stylus:** Usar **nombres de clases en español** (ej: `.contenedor-carrusel`, `.opcion-menu`).

---
### **2.3. Estructura de Componentes**
- **Componentes atómicos:** Botones, tarjetas (ej: `BotonLevitante.vue`).
- **Componentes moleculares:** Carruseles, menús (ej: `Carrusel3D.vue`).
- **Componentes de página:** Secciones completas (ej: `Vista360.vue`).
- **Props y emits:** Nombrados en español y con tipos estrictos.
  ```vue
  <script setup lang="ts">
  defineProps<{
    items: IItemCarrusel[];
    configuracion: IConfiguracionCarrusel;
  }>();
  defineEmits<{
    (e: 'seleccionar', id: string): void;
  }>();
  </script>
  ```

---
---
---

## **🗃️ 3. Control de Versiones con Git**
### **3.1. Inicialización del Repositorio**
1. **Crear repositorio local:**
   ```bash
   git init
   ```
2. **Añadir archivo `.gitignore`:**
   ```plaintext
   # Dependencias
   node_modules/

   # Electron
   dist/
   build/

   # IDE
   .vscode/
   .idea/

   # Logs
   *.log
   logs/

   # Entorno
   .env
   .env.local
   ```

3. **Primer commit:**
   ```bash
   git add .
   git commit -m "chore: inicializa repositorio con estructura base del proyecto"
   ```

---
### **3.2. Normas para Commits**
- **Formato:** Usar [Conventional Commits](https://www.conventionalcommits.org/) **en español**.
  - `feat:`: Nueva funcionalidad.
  - `fix:`: Corrección de bugs.
  - `docs:`: Cambios en documentación.
  - `style:`: Cambios de estilo (CSS, Stylus).
  - `refactor:`: Refactorización de código.
  - `test:`: Pruebas añadidas o modificadas.
  - `chore:`: Tareas de mantenimiento (configuración, dependencias).

- **Ejemplos de mensajes:**
  ```bash
  git commit -m "feat: implementa componente Carrusel3D con animaciones GSAP"
  git commit -m "fix: corrige error al cargar datos de vistas-360.json5"
  git commit -m "refactor: extrae lógica de animaciones a utilidades/animaciones.ts"
  git commit -m "style: ajusta estilos del menú principal para mejor legibilidad"
  ```

- **Agrupación:**
  - Los commits deben estar **relacionados lógicamente** (ej: todos los cambios de una funcionalidad en un mismo commit o serie de commits).
  - Evitar commits como `"arregla error"` o `"cambios menores"`. Ser **específico**.

- **Push:**
  - **Solo se hará push por indicación explícita** (ej: después de una revisión o al finalizar una fase).
  - Usar ramas por funcionalidad:
    ```bash
    git checkout -b feat/carrusel-3d
    git checkout -b fix/carga-productos
    ```

---
---
---

## **📌 4. Detalles de Implementación Clave**
### **4.1. Carrusel 3D Ad-Hoc**
- **Componente:** `Carrusel3D.vue` (en `src/componentes/carruseles/`).
- **Lógica:**
  - Usa **GSAP** para animaciones de rotación en 3D.
  - Distribuye los items en un **círculo** (CSS `transform-style: preserve-3d`).
  - **No depende de librerías externas** (solo GSAP y Stylus).
- **Configuración:** Centralizada en `contenidos.json5` (ej: `radio`, `perspectiva`).

---
### **4.2. Vista 360°**
- **Componente:** `Visor360.vue` (wrapper de `@blashstar/visor-360`).
- **Datos:** Cargados desde `vistas-360.json5`.
- **Interacción:** Solo **drag & drop** para rotar (sin controles adicionales).

---
### **4.3. Pinia (Almacenes)**
- **`almacenes/productos.ts`:** Gestiona productos (datos de `productos.json5`).
- **`almacenes/vistas360.ts`:** Gestiona vistas 360°.
- **`almacenes/comparativas.ts`:** Gestiona comparativas fijas.
- **`almacenes/contenidos.ts`:** Gestiona textos, fondos y configuraciones.
- **`almacenes/interfaz.ts`:** Gestiona el estado de la UI (sección actual, cursor, etc.).

---
### **4.4. Carga de Datos**
- **JSON5:** Todos los archivos de datos están en `src/datos/` con extensión `.json5`.
- **Tipado estricto:** Usar interfaces en `src/tipos/` para validar la estructura.
  ```typescript
  // src/tipos/modelos.d.ts
  interface IProducto {
    id: string;
    categoria: string;
    modelo: string;
    descripcion: string;
    imagen: string;
    // ...
  }
  ```

---
---
---

## **❓ 5. Preguntas Finales (para Cerrar el PRD)**
1. **Estructura de archivos:**
   - ¿La estructura de carpetas y archivos en español te parece **clara y consistente**?

2. **Principios de desarrollo:**
   - ¿Quieres que **detalle más** cómo aplicar SOLID/DRY/SLAP en algún componente o store en específico?

3. **Git:**
   - ¿Necesitas un **ejemplo de flujo de trabajo** con ramas y commits para el proyecto?

4. **Carrusel 3D:**
   - ¿El **radio** (`400px`) y la **perspectiva** (`1000px`) del carrusel son adecuados, o prefieres ajustarlos?

5. **Inicialización del proyecto:**
   - ¿Quieres que **genere el código base** para:
     - La estructura de carpetas y archivos?
     - Los stores de Pinia?
     - El componente `Carrusel3D.vue`?
     - La configuración de Vite/Electron?

---
---
---
## **🎯 6. Resumen de Acciones Inmediatas**
| **Acción**                          | **Descripción**                                                                                     | **Responsable**       |
|-------------------------------------|-----------------------------------------------------------------------------------------------------|------------------------|
| Inicializar repositorio Git         | Crear repositorio local y primer commit con estructura base.                                         | Desarrollador        |
| Configurar Vite/Electron            | Añadir plugins para JSON5 y alias para librerías externas.                                         | Desarrollador        |
| Implementar stores de Pinia         | Crear `almacenes/productos.ts`, `almacenes/vistas360.ts`, etc.                                     | Desarrollador        |
| Implementar `Carrusel3D.vue`        | Componente reutilizable para carruseles 3D.                                                      | Desarrollador        |
| Cargar datos JSON5                  | Integrar `productos.json5`, `vistas-360.json5`, etc. en los stores.                                | Desarrollador        |
| Validar con pruebas unitarias       | Asegurar que los datos se carguen correctamente y las animaciones funcionen.                       | Desarrollador        |

---
---
---
## **📌 7. Ejemplo de `package.json` (en español)**
```json
{
  "name": "kiosko-tactil-vertical",
  "version": "1.0.0",
  "description": "Kiosko táctil vertical para exhibición de productos",
  "scripts": {
    "dev": "vite",
    "build": "vite build && electron-builder",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint src --ext .vue,.ts"
  },
  "dependencies": {
    "@blashstar/kiosko-css": "^1.0.0",
    "@blashstar/visor-360": "^1.0.0",
    "gsap": "^3.12.2",
    "lodash": "^4.17.21",
    "pinia": "^2.1.7",
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "vite-plugin-json5": "^1.0.0",
    "vitest": "^1.0.0",
    "electron": "^28.0.0",
    "electron-builder": "^24.6.3"
  }
}
```

---
---
---
### **🔄 8. Próximos Pasos**
1. **Validación final:**
   - Revisa que **todo el PRD** (estructura, normas, implementación) esté alineado con tus expectativas.

2. **Inicialización del proyecto:**
   - ¿Quieres que **genere el código base** para que puedas empezar a desarrollar?
   - ¿O prefieres **ajustar algún detalle** antes?

---
**Observación final:**
Con esta versión del PRD, el proyecto está **completamente definido** en términos de:
- **Estructura de archivos y carpetas en español**.
- **Normas de desarrollo** (SOLID, DRY, SLAP, Git).
- **Detalles técnicos** (Pinia, GSAP, carrusel 3D ad-hoc).
- **Flujo de trabajo** (commits en español, push controlado).
- **Resolució** (1080 x 1920).

