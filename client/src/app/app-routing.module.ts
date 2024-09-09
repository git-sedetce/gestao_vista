import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/paginas/home/home.component';
import { CadastroEventoComponent } from './components/paginas/cadastro-evento/cadastro-evento.component';
import { CadastroAcompanhamentoComponent } from './components/paginas/cadastro-acompanhamento/cadastro-acompanhamento.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cadastroevento', component: CadastroEventoComponent},
  { path: 'cadastroacompanhamento', component: CadastroAcompanhamentoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
