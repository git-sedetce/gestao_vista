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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [guardGuard] },
  { path: 'cadastroevento', component: CadastroEventoComponent, canActivate: [guardGuard] },
  { path: 'cadastroacompanhamento', component: CadastroAcompanhamentoComponent, canActivate: [guardGuard] },
  { path: 'consultaeventos', component: ConsultaEventoComponent, canActivate: [guardGuard] },
  { path: 'consultaacompanhamento', component: ConsultaAcompanhamentoComponent, canActivate: [guardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'resetSenha', component: ResetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
