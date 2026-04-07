#  Mistic Runner - Documentación Técnica

##  Descripción
**Mistic Runner** es un juego web tipo *endless runner* construido con Vanilla JS, CSS3 y HTML5. Combina mecánicas clásicas de salto y esquivar obstáculos con funcionalidades avanzadas como modo IA, tabla de líderes filtrada por períodos, sistema de comentarios con valoraciones y panel de administración protegido.

---

##  Arquitectura y Razonamiento de Diseño

###  1. Arquitectura Orientada a Objetos (ES6+)
**Qué se hizo:** Se estructuró el código en clases encapsuladas (`TrexRunnerGame`, `RecordSystem`, `NameValidator`), separando la lógica del juego, la persistencia y la validación de datos.
**Por qué:** 
- **Separación de responsabilidades (SoC):** Evita el "código espagueti", facilita el mantenimiento y permite testear cada módulo de forma aislada.
- **Escalabilidad:** Si en el futuro se migra a un framework (Angular/React), la lógica ya está desacoplada del DOM, facilitando la migración a servicios/componentes.

###  2. Persistencia Ligera con `localStorage`
**Qué se hizo:** Se utiliza `localStorage` para persistir récords y comentarios sin depender de un backend.
**Por qué:** 
- **Rendimiento y simplicidad:** Para un proyecto frontend autónomo, evita la sobrecarga de configuraciones de servidor o llamadas a APIs innecesarias.
- **Experiencia de usuario inmediata:** Los récords y comentarios se cargan instantáneamente sin latencia de red, mejorando la UX en entornos offline o de baja conexión.

###  3. Validación y Sanitización en Cliente
**Qué se hizo:** Implementación de `NameValidator` con expresiones regulares y lista de palabras prohibidas. Uso de `escapeHtml()` para sanitizar comentarios antes de renderizarlos.
**Por qué:**
- **Prevención de XSS:** `escapeHtml()` previene inyecciones de scripts maliciosos (`<script>`, `<>`, etc.), mitigando ataques de tipo XSS en un entorno sin backend que filtre el contenido.
- **Calidad de datos:** La validación con Regex y lista de filtrado evita spam y contenido inapropiado antes de persistir en `localStorage`.

---

##  Gestión de Memoria y Ciclo de Vida (Enfoque Analítico)

>  *Como se mencionó en la solicitud, valoro especialmente la gestión de recursos y la prevención de fugas de memoria. Aunque este proyecto está en Vanilla JS (sin Angular), el mismo principio se aplica de forma nativa.*

###  Gestión del `GameLoop` y `requestAnimationFrame`
**Qué se hizo:** Se utiliza `requestAnimationFrame` en lugar de `setInterval` para el bucle principal del juego.
**Por qué:** 
- `requestAnimationFrame` se sincroniza con el *refresh rate* del monitor, evitando renderizados innecesarios y consumiendo menos CPU/GPU.
- **Prevención de fugas:** Aunque no hay un framework con `ngOnDestroy`, en producción se implementaría un método `game.destroy()` que llama a `cancelAnimationFrame(this.gameLoopId)` y limpia los `addEventListener` del DOM para evitar *memory leaks* en SPAs.

### Limpieza de Suscripciones y Listeners (Principio Angular aplicado)
**Qué se hizo:** Se utilizan listeners declarativos y se agrupan en `setupEventListeners()`.
**Por qué (Visión Angular/Arquitectónica):**
- En Angular, `ngOnDestroy` es crítico para desuscribirse de `Observables` y evitar *memory leaks*. En este proyecto Vanilla JS, se aplica el mismo principio conceptual: **centralizar la suscripción y planificar su limpieza**. En un entorno de producción con enrutamiento, se añadiría un `window.addEventListener('beforeunload', this.cleanup)` o un patrón de `Subject` + `takeUntil` si se migrara a RxJS.
- **Buena práctica aplicada:** Se evitó `setInterval` para lógica crítica (se usa `requestAnimationFrame`), y se agrupan los `addEventListener` en un solo método (`setupEventListeners`) para facilitar una futura limpieza centralizada o migración a `HostListener`/`ngOnDestroy` en Angular.

---

## Stack Tecnológico
| Capa | Tecnología |
| **Frontend** | HTML5, CSS3 (Variables, Flexbox/Grid, Glassmorphism), Vanilla JS (ES6+) |
| **Persistencia** | `localStorage` (Récords, Comentarios, HighScore) |
| **Renderizado** | `requestAnimationFrame` + DOM Manipulation directa |
| **Seguridad** | Sanitización básica (`escapeHtml`), filtrado de palabras prohibidas |
| **Extras** | Base64 para ofuscación básica de contraseña admin, CSS Glassmorphism, Modo Noche |

---

## ¿Cómo Ejecutar?
```bash
# 1. Clonar o descargar el proyecto
git clone <tu-repo>

# 2. No requiere instalación de dependencias
# 3. Abrir directamente en el navegador
open index.html
# o simplemente abrir el archivo con doble clic
```

---

## Notas de Seguridad y Producción
| Aspecto | Estado Actual | Recomendación para Producción |
|---------|---------------|-------------------------------|
| **Auth Admin** | Contraseña ofuscada en Base64 (`btoa`) | Migrar a autenticación segura (JWT, Auth0, Firebase Auth) con validación en backend. |
| **Persistencia** | `localStorage` | Migrar a base de datos real (Firebase, Supabase, PostgreSQL) para evitar límites de almacenamiento y permitir sincronización entre dispositivos. |
| **Seguridad XSS** | `escapeHtml()` en cliente | Implementar sanitización en servidor y políticas CSP (`Content-Security-Policy`). |
| **Gestión de Memoria** | `requestAnimationFrame` sin cleanup explícito | Implementar `game.destroy()` con `cancelAnimationFrame` y `removeEventListener` para evitar *memory leaks* en SPAs con routing. |

---

## Roadmap / Mejoras Futuras
-  Migrar arquitectura a **Angular** con `ngOnDestroy` para gestión explícita de suscripciones (`takeUntil`, `ngOnDestroy`) y gestión de estado con `NgRx` o `Signals`.
-  Implementar backend ligero (Node.js/Express + PostgreSQL/Firebase) para persistencia segura de récords y comentarios.
- Añadir sistema de autenticación y roles (Usuario/Admin).
- Optimizar renderizado con `Canvas` o `PixiJS` para mayor rendimiento en móviles.
-  Implementar PWA (Service Worker, manifest, offline support).

---
Documento generado para revisión técnica. Enfocado en decisiones arquitectónicas, gestión de recursos y preparación para escalabilidad
