import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './component/inicio/inicio.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrarComponent } from './component/registrar/registrar.component';
import { TopicComponent } from './component/topic/topic.component';
import { TopicGuardGuard } from './guards/topic-guard.guard';

const routes: Routes = [
  {path:'inicio',component:InicioComponent},
  {path:'login',component:LoginComponent},
  {path:'registrar', component:RegistrarComponent},
  {path:'topic',component:TopicComponent, canActivate:[TopicGuardGuard]},
  {path:'', redirectTo:'/inicio',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
