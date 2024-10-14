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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cadastroevento', component: CadastroEventoComponent },
  { path: 'cadastroacompanhamento', component: CadastroAcompanhamentoComponent },
  { path: 'consultaeventos', component: ConsultaEventoComponent },
  { path: 'consultaacompanhamento', component: ConsultaAcompanhamentoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'resetSenha', component: ResetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
