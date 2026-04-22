import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface Project {
  id: string;
  name: string;
  description: string;
  color: number;
  icon: string;
  link: string;
  technologies: string[];
}

@Component({
  selector: 'app-three-scene',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="portfolio-container">
      <!-- Canvas 3D -->
      <canvas #canvas3d class="three-canvas"></canvas>
      
      <!-- UI Overlay -->
      <div class="ui-overlay">
        <header class="header">
          <h1>✨ Stefany Mazas</h1>
          <p class="subtitle">Desarrolladora Full Stack</p>
        </header>
        
        <div class="instructions">
          <span>🎮 Haz clic en los cubos para ver los proyectos</span>
          <span>🖱️ Arrastra para rotar la vista</span>
        </div>
      </div>
      
      <!-- Tarjeta de proyecto seleccionada -->
      @if (selectedProject()) {
        <div class="project-card" 
             [style.borderColor]="'#' + selectedProject()!.color.toString(16)"
             @cardAnimation>
          <button class="close-btn" (click)="closeCard()">✕</button>
          
          <div class="card-icon" [style.background]="'#' + selectedProject()!.color.toString(16)">
            {{ selectedProject()!.icon }}
          </div>
          
          <h2>{{ selectedProject()!.name }}</h2>
          <p class="description">{{ selectedProject()!.description }}</p>
          
          <div class="tech-stack">
            @for (tech of selectedProject()!.technologies; track tech) {
              <span class="tech-tag">{{ tech }}</span>
            }
          </div>
          
          <a [href]="selectedProject()!.link" target="_blank" class="btn-project">
            Ver Proyecto →
          </a>
        </div>
      }
      
      <!-- Indicador de scroll -->
      <div class="scroll-indicator">
        <span>↓</span>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
    
    .portfolio-container {
      width: 100%;
      height: 100vh;
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%);
      font-family: 'Space Mono', monospace;
    }
    
    .three-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    
    .ui-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      pointer-events: none;
    }
    
    .header {
      position: absolute;
      top: 40px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      color: white;
    }
    
    .header h1 {
      font-size: 2.5rem;
      margin: 0;
      background: linear-gradient(135deg, #8b5cf6, #06b6d4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
    }
    
    .subtitle {
      font-size: 1rem;
      color: #94a3b8;
      margin-top: 8px;
    }
    
    .instructions {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 20px;
      color: #64748b;
      font-size: 0.85rem;
    }
    
    .project-card {
      position: absolute;
      top: 50%;
      right: 5%;
      transform: translateY(-50%);
      width: 380px;
      background: rgba(15, 15, 25, 0.95);
      border: 2px solid;
      border-radius: 20px;
      padding: 30px;
      z-index: 100;
      backdrop-filter: blur(20px);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      animation: slideIn 0.4s ease-out;
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-50%) translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateY(-50%) translateX(0);
      }
    }
    
    .close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s;
    }
    
    .close-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: rotate(90deg);
    }
    
    .card-icon {
      width: 60px;
      height: 60px;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      margin-bottom: 20px;
    }
    
    .project-card h2 {
      color: white;
      font-size: 1.5rem;
      margin-bottom: 15px;
    }
    
    .description {
      color: #94a3b8;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    
    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 25px;
    }
    
    .tech-tag {
      background: rgba(139, 92, 246, 0.2);
      color: #a78bfa;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
    }
    
    .btn-project {
      display: inline-block;
      padding: 12px 24px;
      background: linear-gradient(135deg, #8b5cf6, #06b6d4);
      color: white;
      text-decoration: none;
      border-radius: 10px;
      font-weight: 600;
      transition: all 0.3s;
    }
    
    .btn-project:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px -10px rgba(139, 92, 246, 0.5);
    }
    
    .scroll-indicator {
      position: absolute;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      color: #64748b;
      font-size: 1.5rem;
      animation: bounce 2s infinite;
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(10px); }
    }
    
    @media (max-width: 768px) {
      .header h1 { font-size: 1.8rem; }
      .project-card {
        width: 90%;
        right: 5%;
        left: 5%;
        top: auto;
        bottom: 20px;
        transform: none;
      }
      .instructions {
        flex-direction: column;
        gap: 5px;
        text-align: center;
      }
    }
  `]
})
export class ThreeSceneComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas3d') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  selectedProject = signal<Project | null>(null);
  
  // Three.js objects
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private cubes: THREE.Mesh[] = [];
  private animationId!: number;
  private isDragging = false;
  private previousMousePosition = { x: 0, y: 0 };
  private targetRotation = { x: 0, y: 0 };
  
  // Proyectos del portafolio
  projects: Project[] = [
    {
      id: 'aw',
      name: 'AdventureWorks E-commerce',
      description: 'Migración completa de ASP.NET MVC 4 a .NET 8 con Angular 21. API REST, Entity Framework Core, SQL Server y autenticación con Identity.',
      color: 0x512bd4,
      icon: '🛒',
      link: 'https://stefany-mazas.github.io/portafolio/AW_Migration/',
      technologies: ['.NET 8', 'Angular 21', 'EF Core', 'SQL Server', 'Identity']
    },
    {
      id: 'editor',
      name: 'Figma Lite Pro',
      description: 'Editor visual de diseño con sistema de capas, undo/redo, exportación PNG/PDF/ZIP y diseño responsivo. 3500+ líneas de JS vanilla.',
      color: 0xec4899,
      icon: '🎨',
      link: 'https://stefany-mazas.github.io/portafolio/editor/',
      technologies: ['JavaScript', 'Canvas', 'html2canvas', 'jsPDF']
    },
    {
      id: 'cafeteria',
      name: 'Camper Café Pro',
      description: 'Sistema Order & Pickup con PWA, QR codes, panel staff (POS), sincronización en tiempo real y accesibilidad WCAG.',
      color: 0x4caf50,
      icon: '☕',
      link: 'https://stefany-mazas.github.io/portafolio/cafeteria/',
      technologies: ['PWA', 'QRCode.js', 'LocalStorage', 'ARIA']
    },
    {
      id: 'juego',
      name: 'Digital Circus Runner',
      description: 'Juego endless runner con IA adaptativa, sistema de récords por períodos, comentarios y panel de admin oculto.',
      color: 0xf59e0b,
      icon: '🎮',
      link: 'https://stefany-mazas.github.io/portafolio/juego/',
      technologies: ['JavaScript', 'IA', 'Web Audio', 'LocalStorage']
    },
    {
      id: 'angular',
      name: 'Demo Angular',
      description: 'Proyecto demo de migración AngularJS → Angular 21. Demuestra Signals, Standalone Components, Control Flow y TypeScript.',
      color: 0xdd0031,
      icon: '🚀',
      link: 'https://github.com/Stefany-Mazas/portafolio/tree/main/angular/demo-migracion-angular',
      technologies: ['Angular 21', 'TypeScript', 'Signals', 'HTTP']
    }
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    this.initThree();
    this.createCubes();
    this.addEventListeners();
    this.animate();
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.onResize);
    this.canvasRef.nativeElement.removeEventListener('click', this.onClick);
    this.canvasRef.nativeElement.removeEventListener('mousedown', this.onMouseDown);
    this.canvasRef.nativeElement.removeEventListener('mousemove', this.onMouseMove);
    this.canvasRef.nativeElement.removeEventListener('mouseup', this.onMouseUp);
    this.renderer.dispose();
  }

  private initThree() {
    const canvas = this.canvasRef.nativeElement;
    
    // Scene
    this.scene = new THREE.Scene();
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 8;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x8b5cf6, 1, 100);
    pointLight1.position.set(5, 5, 5);
    this.scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x06b6d4, 1, 100);
    pointLight2.position.set(-5, -5, 5);
    this.scene.add(pointLight2);
    
    // Background particles
    this.createParticles();
  }

  private createParticles() {
    const geometry = new THREE.BufferGeometry();
    const count = 500;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    
    const particles = new THREE.Points(geometry, material);
    this.scene.add(particles);
  }

  private createCubes() {
    const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    
    // Posiciones en semicírculo
    const totalCubes = this.projects.length;
    const radius = 4;
    const angleStep = Math.PI / (totalCubes + 1);
    
    this.projects.forEach((project, index) => {
      const angle = angleStep * (index + 1) - Math.PI / 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius * 0.3 - 2;
      
      const material = new THREE.MeshStandardMaterial({
        color: project.color,
        metalness: 0.3,
        roughness: 0.4,
        emissive: project.color,
        emissiveIntensity: 0.2
      });
      
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, 0, z);
      cube.userData = { project, index };
      
      // Add glow effect
      const glowGeometry = new THREE.BoxGeometry(1.4, 1.4, 1.4);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: project.color,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      cube.add(glow);
      
      // Add icon (as a sprite)
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'white';
      ctx.font = '80px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(project.icon, 64, 64);
      
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture, 
        transparent: true 
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(0.8, 0.8, 1);
      sprite.position.y = 1.5;
      cube.add(sprite);
      
      this.cubes.push(cube);
      this.scene.add(cube);
      
      // Animate entrance
      cube.scale.set(0, 0, 0);
      gsap.to(cube.scale, {
        x: 1, y: 1, z: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'back.out(1.7)'
      });
    });
  }

  private addEventListeners() {
    window.addEventListener('resize', this.onResize);
    this.canvasRef.nativeElement.addEventListener('click', this.onClick);
    this.canvasRef.nativeElement.addEventListener('mousedown', this.onMouseDown);
    this.canvasRef.nativeElement.addEventListener('mousemove', this.onMouseMove);
    this.canvasRef.nativeElement.addEventListener('mouseup', this.onMouseUp);
    this.canvasRef.nativeElement.addEventListener('touchstart', this.onTouchStart);
    this.canvasRef.nativeElement.addEventListener('touchmove', this.onTouchMove);
    this.canvasRef.nativeElement.addEventListener('touchend', this.onTouchEnd);
  }

  private onResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  private onClick = (event: MouseEvent) => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.cubes);
    
    if (intersects.length > 0) {
      const cube = intersects[0].object as THREE.Mesh;
      const project = cube.userData['project'] as Project;
      this.selectProject(cube, project);
    }
  };

  private onMouseDown = (event: MouseEvent) => {
    this.isDragging = false;
    this.previousMousePosition = { x: event.clientX, y: event.clientY };
  };

  private onMouseMove = (event: MouseEvent) => {
    const deltaX = event.clientX - this.previousMousePosition.x;
    const deltaY = event.clientY - this.previousMousePosition.y;
    
    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      this.isDragging = true;
    }
    
    if (this.isDragging) {
      this.targetRotation.y += deltaX * 0.005;
      this.targetRotation.x += deltaY * 0.005;
    }
    
    this.previousMousePosition = { x: event.clientX, y: event.clientY };
  };

  private onMouseUp = () => {
    setTimeout(() => { this.isDragging = false; }, 100);
  };

  private onTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 1) {
      this.previousMousePosition = { 
        x: event.touches[0].clientX, 
        y: event.touches[0].clientY 
      };
    }
  };

  private onTouchMove = (event: TouchEvent) => {
    if (event.touches.length === 1) {
      const deltaX = event.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = event.touches[0].clientY - this.previousMousePosition.y;
      
      this.targetRotation.y += deltaX * 0.005;
      this.targetRotation.x += deltaY * 0.005;
      
      this.previousMousePosition = { 
        x: event.touches[0].clientX, 
        y: event.touches[0].clientY 
      };
    }
  };

  private onTouchEnd = (event: TouchEvent) => {
    // Handle tap as click
  };

  private selectProject(cube: THREE.Mesh, project: Project) {
    // Animate cube
    gsap.to(cube.scale, {
      x: 1.3, y: 1.3, z: 1.3,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });
    
    // Show card
    this.selectedProject.set(project);
  }

  closeCard() {
    this.selectedProject.set(null);
  }

  private animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    // Rotate cubes
    this.cubes.forEach((cube, i) => {
      cube.rotation.y += 0.005;
      cube.rotation.x += 0.002;
      
      // Floating animation
      cube.position.y = Math.sin(Date.now() * 0.001 + i) * 0.15;
    });
    
    // Smooth camera rotation
    this.scene.rotation.y += (this.targetRotation.y - this.scene.rotation.y) * 0.05;
    this.scene.rotation.x += (this.targetRotation.x - this.scene.rotation.x) * 0.05;
    
    this.renderer.render(this.scene, this.camera);
  }
}
