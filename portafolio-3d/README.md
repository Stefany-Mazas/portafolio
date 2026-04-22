# 🎮 Portafolio 3D Interactivo

![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge)

Portafolio 3D interactivo creado con **Angular 21**, **Three.js** y **GSAP**. Los proyectos se presentan como cubos flotantes en un entorno 3D.

## ✨ Características

- 🎯 **Experiencia 3D inmersiva** - Cubos flotantes con efecto glow
- 🖱️ **Interacción completa** - Clic para abrir proyectos, arrastrar para rotar
- 📱 **Responsivo** - Funciona en desktop y móvil
- 🚀 **Alto rendimiento** - Animaciones suaves a 60fps
- 🎨 **Efectos visuales** - Partículas, glow, transiciones GSAP

## 🛠️ Tecnologías

| Tecnología | Uso |
|------------|-----|
| **Angular 21** | Framework principal |
| **Three.js** | Gráficos 3D |
| **GSAP** | Animaciones |
| **TypeScript** | Tipado estático |

## 🚀 Cómo Ejecutar

### Desarrollo

```bash
npm install
npm start
# Abrir http://localhost:4200
```

### Producción

```bash
npm run build
# Output: dist/portafolio-3d/browser/
```

## 📁 Estructura

```
portafolio-3d/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── three-scene.component.ts  # Componente 3D principal
│   │   ├── app.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── styles.css
│   └── index.html
├── angular.json
├── package.json
└── README.md
```

## 🎮 Controles

| Acción | Desktop | Móvil |
|--------|---------|-------|
| Ver proyecto | Clic en cubo | Tocar cubo |
| Rotar vista | Arrastrar | Deslizar |
| Cerrar tarjeta | Clic en X | Tocar X |

## 📋 Proyectos Incluidos

1. **AdventureWorks E-commerce** - Migración .NET 8 + Angular 21
2. **Figma Lite Pro** - Editor visual de diseño
3. **Camper Café Pro** - Sistema Order & Pickup con PWA
4. **Digital Circus Runner** - Juego con IA adaptativa
5. **Demo Angular** - Proyecto de migración AngularJS → Angular

## 🌐 Despliegue

Este proyecto está configurado para desplegarse en **GitHub Pages** automáticamente con GitHub Actions.

### Configuración manual

1. Compilar: `npm run build`
2. Subir contenido de `dist/portafolio-3d/browser/` a GitHub Pages
3. Listo!

## 📝 Personalización

### Agregar nuevos proyectos

Editar `projects` en `three-scene.component.ts`:

```typescript
projects: Project[] = [
  {
    id: 'nuevo',
    name: 'Mi Nuevo Proyecto',
    description: 'Descripción del proyecto',
    color: 0xFF5733,  // Color hex
    icon: '🚀',
    link: 'https://mi-proyecto.com',
    technologies: ['Tech1', 'Tech2']
  }
];
```

## 📄 Licencia

MIT

---

## 👩‍💻 Autor

**Stefany Mazas**
- GitHub: [Stefany-Mazas](https://github.com/Stefany-Mazas)
- Portafolio: [stefany-mazas.github.io](https://stefany-mazas.github.io)
