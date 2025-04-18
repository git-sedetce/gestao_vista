import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/estrutura/header/header.component';
import { FooterComponent } from './components/estrutura/footer/footer.component';
import { HomeComponent } from './components/paginas/home/home.component';
import { CadastroEventoComponent } from './components/paginas/cadastro-evento/cadastro-evento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadastroAcompanhamentoComponent } from './components/paginas/cadastro-acompanhamento/cadastro-acompanhamento.component';
import { ConsultaEventoComponent } from './components/paginas/consulta-evento/consulta-evento.component';
import { ConsultaAcompanhamentoComponent } from './components/paginas/consulta-acompanhamento/consulta-acompanhamento.component';
import { CadastroComponent } from './components/user/cadastro/cadastro.component';
import { LoginComponent } from './components/user/login/login.component';
import { ResetComponent } from './components/user/reset/reset.component';
import { UsersComponent } from './components/paginas/users/users.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CadastroEventoComponent,
    CadastroAcompanhamentoComponent,
    ConsultaEventoComponent,
    ConsultaAcompanhamentoComponent,
    CadastroComponent,
    LoginComponent,
    ResetComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
