import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAcompanhamentoComponent } from './cadastro-acompanhamento.component';

describe('CadastroAcompanhamentoComponent', () => {
  let component: CadastroAcompanhamentoComponent;
  let fixture: ComponentFixture<CadastroAcompanhamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroAcompanhamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroAcompanhamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
