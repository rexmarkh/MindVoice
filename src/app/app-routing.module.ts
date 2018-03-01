import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth.guard';

import { ChatComponent } from './chat/chat.component';
import { TimerComponent } from './timer/timer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'home',
    component: ChatComponent
  },
  {
    path:'timer',
    component: TimerComponent
  },
  { 
    path: '**',
    redirectTo: '/home' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// export const aboutRouting: ModuleWithProviders = RouterModule.forChild(routes);
export class AppRoutingModule { }
