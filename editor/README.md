# 🎨 Figma Lite Pro - Editor Visual

![Versión](https://img.shields.io/badge/versión-1.0-brightgreen)
![Plataforma](https://img.shields.io/badge/plataforma-Web-orange)
![Estado](https://img.shields.io/badge/estado-Estable-success)

## 📖 Descripción del Proyecto

**Figma Lite Pro** es un editor de diseño visual web completo, desarrollado en **JavaScript vanilla** sin frameworks. Permite crear, editar y exportar diseños de interfaz de usuario con funcionalidades similares a herramientas profesionales como Figma.

**🎯 Demo:** [Abrir Editor](figma.html)

> Este proyecto demuestra habilidades fundamentales para desarrollo frontend y arquitectura de software, directamente transferibles a Angular, React o Vue.

---

## ✨ Características Principales

### 📑 Sistema de Capas Jerárquicas

- **Árbol de capas** expandible/colapsable
- **Selección múltiple** con marquesina
- **Bloqueo y ocultamiento** de elementos
- **Arrastre y redimensionamiento** con handles
- **Grupos** de elementos anidados

### ↩️ Sistema Undo/Redo

- **Historial de 50 acciones** con patrón Memento
- **Persistencia en LocalStorage**
- **Restauración completa** del estado del workspace
- **Atajos de teclado** (Ctrl+Z, Ctrl+Y)

### 📱 Diseño Responsivo

- **Presets** para Desktop, Tablet y Mobile
- **Escalado inteligente** que mantiene proporciones
- **Vistas previas** de cada dispositivo
- **Ajustes dinámicos** según el frame

### 📋 Funciones de Portapapeles

- **Ctrl+C / Ctrl+V** para copiar/pegar elementos
- **Pegar imágenes** desde el navegador
- **Pegar texto** plano
- **Integración con navigator.clipboard API**

### 📤 Exportación Múltiple

- **PNG** - Captura completa con html2canvas
- **PDF** - Generación multipágina con jsPDF
- **ZIP** -Exportación individual con JSZip

### 🔲 Tipos de Elementos Soportados

- Rectángulos
- Círculos
- Texto
- Imágenes
- Grupos

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso en el Proyecto |
|------------|-------------------|
| **HTML5** | Estructura semántica |
| **CSS3** | Grid/Flexbox, animaciones, temas |
| **JavaScript ES6+** | Lógica completa (~3500 líneas) |
| **LocalStorage** | Persistencia de proyectos |
| **html2canvas** | Exportación a PNG |
| **jsPDF** | Generación de PDF |
| **JSZip** | Compresión ZIP |

---

## 📁 Estructura del Proyecto

```
editor/
├── figma.html        # Editor completo
├── presentacion.html # Página de presentación
└── README.md        # Este archivo
```

---

## 🚀 Instalación y Uso

### Ejecución local

```bash
# No requiere instalación
# Solo abre el archivo en el navegador
open figma.html       # macOS
start figma.html     # Windows
xdg-open figma.html  # Linux
```

---

## 🎮 Guía de Uso

### Herramientas Disponibles

| Herramienta | Atajo | Descripción |
|------------|------|-------------|
| Seleccionar | V | Seleccionar elementos |
| Mover | M | Mover elementos |
| Rectángulo | R | Crear rectángulos |
| Círculo | C | Crear círculos |
| Texto | T | Crear texto |
| Imagen | I |Insertar imagen |

### Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl + Z` | Deshacer |
| `Ctrl + Y` | Rehacer |
| `Ctrl + C` | Copiar |
| `Ctrl + V` | Pegar |
| `Delete` | Eliminar |
| `Ctrl + A` | Seleccionar todo |
| `Ctrl + S` | Guardar en LocalStorage |

---

## 🏗️ Patrones de Diseño Implementados

### Patrones usados en el código:

| Patrón | Descripción |
|--------|-----------|
| **Memento** | Sistema undo/redo |
| **Factory** | Creación de elementos por tipo |
| **Observer** | Event listeners para UI |
| **Singleton** | Estado global |
| **Command** | Acciones de usuario |

---

## 📊 Métricas

| Métrica | Valor |
|---------|-------|
| Líneas de código | ~3500 |
| Componentes principales | 8 |
| Tipos de elementos | 5 |
| Acciones de usuario | 25+ |
| Formatos de exportación | 3 |
| Presets de dispositivos | 3 |

---

## 🔧 Configuración Avanzada

### Agregar nuevos presets de dispositivos

```javascript
const responsivePresets = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
  // Agrega más aquí
  custom: { width: 1200, height: 800 } // Personalizado
};
```

### Ajustar el historial

```javascript
const MAX_HISTORY = 50; // Número de acciones guardadas
```

---

## 🌐 Navegadores Compatibles

| Navegador | Versión | Soporte |
|-----------|---------|---------|
| Chrome | 90+ | ✅ |
| Firefox | 88+ | ✅ |
| Safari | 14+ | ✅ |
| Edge | 90+ | ✅ |

---

## 🚧 Limitaciones Conocidas

1. **Rendimiento** - En dispositivos lentos, limitar número de elementos
2. **Imágenes** - Requiere CORS configurado en el servidor
3. **Exportación larga** - Para muchos frames, puede tomar tiempo

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas!

1. **Fork** el proyecto
2. Crea tu rama (`git checkout -b feature/NewFeature`)
3. **Commit** tus cambios
4. **Push** a la rama
5. Abre un **Pull Request**

---

## 📝 Licencia

Este proyecto es para propósitos educativos y de demostración.

---

## 📞 Contacto

- **GitHub:** [Stefany-Mazas](https://github.com/Stefany-Mazas)
- **Email:** stefanymazas@gmail.com

---

## 🎯 Lo que este Proyecto Demuestra

> *"Este proyecto fue desarrollado completamente en JavaScript vanilla para demostrar comprensión profunda de arquitectura de software, patrones de diseño y gestión de estado compleja."*

### Habilidades Demostradas:

1. ✅ **Arquitectura de componentes** - Organización modular
2. ✅ **Gestión de estado** - Undo/redo, persistencia
3. ✅ **Patrones de diseño** - Memento, Factory, Observer
4. ✅ **Canvas y DOM** - Manipulación de elementos
5. ✅ **Integración con APIs** - html2canvas, jsPDF, JSZip
6. ✅ **Diseño responsivo** - Múltiples dispositivos

### Equivalencias con Frameworks:

| Concepto Figma Lite | Equivalente en Angular |
|-------------------|---------------------|
| `currentFrame` | Componente con @Input() |
| `saveToHistory()` | BehaviorSubject |
| `createElement()` | Factory service |
| `localStorage` | Servicios configurables |

---

*📅 Última actualización: Abril 2026*
*👩‍💻 Desarrollado por Stefany Mazas*