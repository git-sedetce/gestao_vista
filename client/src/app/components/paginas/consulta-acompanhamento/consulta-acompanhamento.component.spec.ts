import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAcompanhamentoComponent } from './consulta-acompanhamento.component';

describe('ConsultaAcompanhamentoComponent', () => {
  let component: ConsultaAcompanhamentoComponent;
  let fixture: ComponentFixture<ConsultaAcompanhamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultaAcompanhamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaAcompanhamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
