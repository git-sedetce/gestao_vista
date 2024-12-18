import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/paginas/home/home.component';
import { CadastroEventoComponent } from './components/paginas/cadastro-evento/cadastro-evento.component';
import { CadastroAcompanhamentoComponent } from './components/paginas/cadastro-acompanhamento/cadastro-acompanhamento.component';
import { ConsultaEventoComponent } from './components/paginas/consulta-evento/consulta-evento.component';
import { ConsultaAcompanhamentoComponent } from './components/paginas/consulta-acompanhamento/consulta-acompanhamento.component';
import { LoginComponent } from './components/user/login/login.component';
import { CadastroComponent } from './components/user/cadastro/cadastro.component';
import { ResetComponent } from './components/user/reset/reset.component';
import { guardGuard } from './components/user/guard/guard.guard';
import { UsersComponent } from './components/paginas/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [guardGuard], data: { roles: ['admin', 'coordenador', 'user', 'secretario'] } },
  { path: 'cadastroevento', component: CadastroEventoComponent, canActivate: [guardGuard], data: { roles: ['admin', 'coordenador'] } },
  { path: 'cadastroacompanhamento', component: CadastroAcompanhamentoComponent, canActivate: [guardGuard], data: { roles: ['admin', 'coordenador'] } },
  { path: 'consultaeventos', component: ConsultaEventoComponent, canActivate: [guardGuard], data: { roles: ['admin', 'coordenador', 'user', 'secretario'] } },
  { path: 'consultaacompanhamento', component: ConsultaAcompanhamentoComponent, canActivate: [guardGuard], data: { roles: ['admin', 'coordenador', 'user', 'secretario'] } },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'resetSenha', component: ResetComponent },
  { path: 'users', component: UsersComponent, canActivate: [guardGuard], data: { roles: ['admin'] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
