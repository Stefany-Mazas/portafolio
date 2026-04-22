import { Routes } from '@angular/router';
import { ThreeSceneComponent } from './components/three-scene.component';

export const routes: Routes = [
  { path: '', component: ThreeSceneComponent },
  { path: '**', redirectTo: '' }
];
