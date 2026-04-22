# 🎪 Digital Circus Runner - Juego con IA

![Versión](https://img.shields.io/badge/versión-3.0-brightgreen)
![Licencia](https://img.shields.io/badge/licencia-MIT-blue)
![Plataforma](https://img.shields.io/badge/plataforma-Web-orange)
![Estado](https://img.shields.io/badge/estado-Estable-success)

## 📖 Descripción del Proyecto

**Digital Circus Runner** es un juego de plataformas estilo *endless runner* (como el T-Rex de Chrome) pero con temática de comida rápida. El dinosaurio debe esquivar obstáculos mientras corre infinitamente.

Lo que hace único a este juego:
- 🤖 **Inteligencia Artificial** que juega sola y aprende
- 🏆 **Sistema de récords** filtrado por períodos
- 💬 **Comunidad** con comentarios y likes
- 🔐 **Panel de administración** oculto

**🎮 Jugar ahora:** [Abrir Juego](circus.html)

---

## ✨ Características Principales

### 🎮 Gameplay

- **Dinosaurio animado** con sprite sheet de 7x3 frames
- **6 tipos de obstáculos** (hamburguesas, pizzas, cuchillos, etc.)
- **Sistema de puntuación** progresiva
- **Velocidad dinámica** que aumenta con el tiempo
- **Efectos visuales** al saltar

### 🤖 Modo IA

- **IA adaptativa** que aprende de sus errores
- **Detección automática** de obstáculos
- **Puntuación separada** para la IA
- **Mejora continua** con cada partida

### 🏆 Sistema de Récords

- **Récords por período:** Hoy, Semana, Mes, Historial
- **Top 10 jugadores** por cada categoría
- **Validación estricta** de nombres
- **Firma de integridad** anti-manipulación

### 💬 Comunidad

- **Comentarios** con sistema de likes
- **Validación de contenido** (bloqueo de groserías)
- **Diseño glassmorphism**
- **Persistencia local**

### 🔐 Administración

- **Acceso oculto:** 3 clics en "TABLA DE RÉCORDS"
- **Contraseña encriptada** en Base64
- **Moderación completa** de comentarios

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso en el Proyecto |
|------------|-------------------|
| **HTML5** | Estructura semántica |
| **CSS3** | Animaciones, Flexbox, Grid, Glassmorphism |
| **JavaScript ES6+** | Programación orientada a objetos |
| **Canvas/DOM** | Animaciones con sprite sheets |
| **LocalStorage** | Persistencia de datos |
| **Web Audio API** | Efectos de sonido |
| **Base64** | Ofuscación de contraseña admin |

---

## 📁 Estructura del Proyecto

```
juego/
├── circus.html        # Juego completo
├── presentacion.html # Página de presentación
├── Readme.txt        # Documentación técnica original
└── README.md         # Este archivo
```

---

## 🚀 Instalación y Uso

### Ejecución local

```bash
# No requiere instalación
# Solo abre el archivo en el navegador
open circus.html      # macOS
start circus.html    # Windows
xdg-open circus.html # Linux
```

---

## 🎮 Cómo Jugar

### Controles

| Tecla | Acción |
|-------|--------|
| `ESPACIO` | Saltar |
| `R` | Reiniciar (cuando hay Game Over) |
| `Clic` | Saltar (móvil) |

### Modos de Juego

| Modo | Descripción |
|------|-------------|
| **NORMAL** | Controlas al dinosaurio |
| **IA** | La computadora juega sola |

### Dificultades

| Dificultad | Velocidad Base | Velocidad Máx |
|------------|---------------|---------------|
| **FÁCIL** | 3 | 10 |
| **NORMAL** | 5 | 15 |
| **DIFÍCIL** | 7 | 20 |

---

## 🔧 Configuración Avanzada

### Cambiar contraseña de admin

Edita en `circus.html`:

```javascript
const ADMIN_PASSWORD_HASH = btoa("tu-contraseña-aqui");
```

### Ajustar velocidad del juego

```javascript
this.baseSpeed = 5;    // Velocidad inicial
this.maxSpeed = 15;    // Velocidad máxima
this.gravity = 0.8;    // Gravedad
this.jumpPower = -11;  // Fuerza del salto
```

---

## 📊 Sistema de Datos

### LocalStorage

| Clave | Contenido |
|-------|-----------|
| `trexRunnerRecords` | Récords de todos los tiempos |
| `trexRunnerSignature` | Firma de integridad |
| `trexHighScore` | Mejor puntuación personal |
| `trexComments` | Comentarios de la comunidad |

---

## 🛡️ Seguridad Implementada

### Validaciones

- ✅ Nombres: 3-15 caracteres, solo letras/números
- ✅ Bloqueo de groserías en 3 idiomas
- ✅ Firma de integridad anti-trampas
- ✅ Panel admin oculto

### Recomendaciones para Producción

| Aspecto | Actual | Producción |
|---------|--------|------------|
| Auth | Base64 | JWT/Firebase |
| Datos | localStorage | Firebase/PostgreSQL |
| XSS | Cliente | Servidor + CSP |

---

## 🌐 Navegadores Compatibles

| Navegador | Versión | Soporte |
|-----------|---------|---------|
| Chrome | 90+ | ✅ |
| Firefox | 88+ | ✅ |
| Safari | 14+ | ✅ |
| Edge | 90+ | ✅ |
| iOS Safari | 14+ | ✅ |
| Android | 90+ | ✅ |

---

## 🚧 Mejoras Futuras

- [ ] Multiplicador de puntuación por combos
- [ ] Power-ups (escudos, imanes)
- [ ] Diferentes personajes
- [ ] Tabla de récords online con Firebase
- [ ] Logros y medallas
- [ ] Modo multijugador

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas!

1. **Fork** el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios
4. **Push** a la rama
5. Abre un **Pull Request**

---

## 📝 Licencia

Distribuido bajo licencia **MIT**.

---

## 📞 Contacto

- **GitHub:** [Stefany-Mazas](https://github.com/Stefany-Mazas)
- **Email:** stefanymazas@gmail.com

---

## 🎯 Lo que este Proyecto Demuestra

> *"Desarrollado en JavaScript vanilla para demostrar programación orientada a objetos, gestión de estado, y patrones de diseño transferibles a frameworks modernos."*

### Habilidades Demostradas:

1. ✅ **POO en JavaScript** - Clases encapsuladas
2. ✅ **Gestión de memoria** - requestAnimationFrame
3. ✅ **LocalStorage** - Persistencia robusta
4. ✅ **Seguridad** - Validación, sanitización XSS
5. ✅ **UX** - Feedback, animaciones, glassmorphism
6. ✅ **IA básica** - Algoritmos de decisión

---

## 📈 Estadísticas

| Métrica | Valor |
|---------|-------|
| Animaciones | 21 frames |
| Tipos de obstáculos | 6 |
| Dificultades | 3 |
| Períodos de récords | 4 |
| Líneas de código | ~2000 |

---

*📅 Última actualización: Abril 2026*
*👩‍💻 Desarrollado por Stefany Mazas*
