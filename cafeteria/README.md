# ☕ Camper Café Pro - Sistema de Order & Pickup

![Versión](https://img.shields.io/badge/versión-2.0-brightgreen)
![Plataforma](https://img.shields.io/badge/plataforma-Web-orange)
![Estado](https://img.shields.io/badge/estado-Estable-success)

## 📖 Descripción del Proyecto

**Camper Café Pro** es un sistema completo de Order & Pickup para cafeterías, desarrollado completamente en **JavaScript vanilla**. Resuelve un problema real: en plataformas como Starbucks no puedes personalizar tu café con extras y ver el precio actualizado en tiempo real antes de pagar.

**🎯 Demo:** [Ver Tienda (Cliente)](camp.html) | [Ver Panel Staff (POS)](scanner.html)

> **Nota:** Este proyecto fue desarrollado para demostrar habilidades de desarrollo frontend sin usar frameworks. La lógica implementada es directamente transferible a React, Vue o Angular.

---

## ✨ Características Principales

### 🛒 Sistema de Pedidos (Cliente)

- **Personalización completa** de productos: tamaño, tipo de leche, shots extra
- **Cálculo dinámico** de precios en tiempo real según personalizaciones
- **Carrito de compras** persistente en localStorage
- **Filtrado por categoría** (Café, Postres, Bebidas)
- **Búsqueda con debounce** para optimización de rendimiento

### 🏪 Panel de Staff (POS Scanner)

- **Escáner de códigos QR** para validar pedidos
- **Sincronización en tiempo real** con la vista del cliente
- **Validación de precios** para evitar manipulación
- **Historial de pedidos** con cálculos automáticos
- **Modo oscuro** integrado

### 🎨 UX y Accesibilidad

- **Skeleton loaders** para carga progresiva
- **Toasts con undo** para mejor feedback
- **Focus trap** en modales para accesibilidad
- **Skip link** y **ARIA labels**
- **Anuncios para screen readers**
- **Navegación por teclado completa**

### 📲 PWA (Progressive Web App)

- **Manifest.json** para instalación
- **Service Worker** para funcionamiento offline
- **Experiencia de app nativa** en dispositivos móviles

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso en el Proyecto |
|------------|-------------------|
| **HTML5** | Estructura semántica con ARIA |
| **CSS3** | Grid/Flexbox, variables CSS, modo oscuro |
| **JavaScript Vanilla** | Estado global, manipulación del DOM |
| **LocalStorage** | Persistencia de datos |
| **QRCode.js** | Generación de códigos QR |
| **PWA** | Manifest + Service Worker |

### Patrones de Diseño Implementados

- ✅ **Estado centralizado** - Variables globales para cart y orders
- ✅ **Debounce** - Optimización en búsqueda
- ✅ **Skeleton loaders** - Carga progresiva
- ✅ **Focus trap** - Accesibilidad en modales

---

## 📁 Estructura del Proyecto

```
cafeteria/
├── camp.html          # Vista del cliente (tienda)
├── scanner.html       # Vista del staff (POS)
├── presentacion.html # Página de presentación
└── README.md         # Este archivo
```

---

## 🚀 Instalación y Uso

### Opción 1: Ejecución local

```bash
# No requiere instalación
# Solo abre el archivo en el navegador
open camp.html        # macOS
start camp.html      # Windows
xdg-open camp.html   # Linux
```

### Opción 2: Servidor local (recomendado)

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

---

## 🎮 Cómo Usar

### Como Cliente

1. Abre `camp.html` en tu navegador
2. Explora los productos por categoría
3. Personaliza tu café (tamaño, leche, shots)
4. Agrega al carrito
5. Genera el código QR para recoger

### Como Staff

1. Abre `scanner.html` en otra pestaña o dispositivo
2. Escanea el código QR del cliente
3. Valida el pedido y el precio
4. Marca como entregado

---

## 📊 Sistema de Datos

### Datos en LocalStorage

| Clave | Contenido |
|-------|-----------|
| `camp_cart` | Carrito de compras activo |
| `camp_orders` | Historial de pedidos |
| `camp_products` | Catálogo de productos |

### Estructura de Pedido

```javascript
{
  id: "ORD-123456",
  items: [
    {
      name: "Latte",
      size: "Venti",
      milk: "Almendra",
      extras: 2,
      price: 75,
      quantity: 1
    }
  ],
  total: 75,
  qrCode: "...",
  status: "pending" | "preparing" | "ready"
}
```

---

## 🔧 Configuración Avanzada

### Agregar nuevos productos

Edita el array `products` en `camp.html`:

```javascript
const products = [
  { id: 1, name: "Espresso", category: "cafe", basePrice: 35, image: "☕" },
  { id: 2, name: "Croissant", category: "postre", basePrice: 45, image: "🥐" },
  // Agrega más productos aquí
];
```

### Personalizar precios de extras

```javascript
const pricing = {
  sizes: { tall: 0, grande: 10, venti: 15 },
  milks: { entera: 0, deslactosada: 5, almendra: 8, soja: 8 },
  shots: 7  // Precio por shot extra
};
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

## 🚧 Diferencias con Producción

| Aspecto | Actual | Producción (recomendado) |
|---------|--------|-------------------------|
| Backend | localStorage | Node.js/Express + PostgreSQL |
| Autenticación | Ninguna | JWT |
| Validación | Cliente | Servidor |
| Testing | No | Jest + Cypress |

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas:

1. **Fork** el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
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

> *"Este proyecto fue desarrollado completamente en JavaScript vanilla para demostrar comprensión profunda de los fundamentos de frontend. Las habilidades aquí demostradas son directamente transferibles a frameworks como React, Vue o Angular."*

### Habilidades Demostradas:

1. ✅ **Gestión de estado complejo** - Carrito, pedidos, sincronización
2. ✅ **Manipulación del DOM** - Creación dinámica de elementos
3. ✅ **Persistencia de datos** - localStorage como base de datos
4. ✅ **Accesibilidad WCAG** - ARIA, focus trap, screen readers
5. ✅ **UX profesional** - Skeleton loaders, toasts, feedback
6. ✅ **PWA** - Service worker, manifest, offline

---

*📅 Última actualización: Abril 2026*
*👩‍💻 Desarrollado por Stefany Mazas*
