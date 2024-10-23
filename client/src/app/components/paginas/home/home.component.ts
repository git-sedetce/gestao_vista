import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../shared/services/statistics.service';
import { Evento } from '../../../shared/models/evento.model';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  lista_evento_por_anos!: any[];
  lista_tipo_evento!: any[];
  lista_evento_por_resp!: any[];
  lista_evento_por_part!: any[];
  lista_evento_por_recursos!: any[];
  lista_evento_por_local!: any[];
  year: any[] = [];
  eventsByYear: any[] = [];
  qtd_type_evt: any[] =[];
  tipoEventos: any[] = [];
  eventsByResp: any[] = [];
  qtd_resp_evt: any[] = [];
  eventsByPart: any[] = [];
  qtd_part_evt: any[] = [];
  eventsByRec: any[] = [];
  qtd_rec_evt: any[] = [];
  eventsByLocal: any[] = [];
  qtd_local_evt: any[] = [];

  lista_ano: number[] = [];
  date = new Date();
  ano_atual!: any;
  mes_atual!: any;

  barchartTipo: any;
  barchartResp: any;
  barchartPart: any;
  barchartRec: any;
  barchartLocal: any;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.getEvento();
    this.getTipoEvento(this.ano_atual);
    this.getResp(this.ano_atual);
    this.getPart(this.ano_atual);
    this.getRecursos(this.ano_atual);
    this.getLocal(this.ano_atual);

    this.ano_atual = this.date.getFullYear();

    for (let y = 2023; y <= this.ano_atual+1; y++) {
      this.lista_ano.push(y);
    }
    // console.log('lista_ano', this.lista_ano)
  }

  filterByYear(year: any){
    this.getTipoEvento(year);
    this.getResp(year);
    this.getPart(year);
    this.getRecursos(year);
    this.getLocal(year);
  }

  getEvento(): void {
    this.statisticsService.getEventoporAnos('countEventByYear').subscribe(
      (evt: any[]) => {
        this.lista_evento_por_anos = evt;

        if (this.lista_evento_por_anos != null) {
          this.lista_evento_por_anos.map(evts => {
            this.year.push(evts.ano);
            this.eventsByYear.push(evts.eventos);
          });
          this.Renderbarchart(this.year, this.eventsByYear);
        }
        // console.log('lista_evento_por_anos', this.lista_evento_por_anos);
      },
      (erro: any) => console.error('erro', erro)
    );
  }

  getTipoEvento(year: any): void {
    this.statisticsService.getEventoporTipo('countTypeEventByYear/', year).subscribe(
      (evt: any[]) => {
        this.lista_tipo_evento = evt;
        this.year = [];
        this.tipoEventos = [];
        this.qtd_type_evt = [];

        if (this.lista_tipo_evento != null) {
          this.lista_tipo_evento.map(evts => {
            this.year.push(evts.ano);
            this.tipoEventos.push(evts.ass_evento_tipo.nome_evento);
            this.qtd_type_evt.push(evts.qtd_tipo_evento);
          });
          this.Renderbarchart_tipo(this.tipoEventos, this.qtd_type_evt);
        }
        // console.log('lista_tipo_evento', this.lista_tipo_evento);
      },
      (erro: any) => console.error('erro', erro)
    );
  }

  getResp(year: any): void {
    this.statisticsService.getEventoporResp('countRespByYear/', year).subscribe(
      (evt: any[]) => {
        this.lista_evento_por_resp = evt;
        this.year = [];
        this.eventsByResp = [];
        this.qtd_resp_evt = [];

        if (this.lista_evento_por_resp != null) {
          this.lista_evento_por_resp.map(evts => {
            this.year.push(evts.ano);
            this.eventsByResp.push(evts.ass_evento_sexec.sigla);
            this.qtd_resp_evt.push(evts.qtd_resp);
          });
          this.Renderbarchart_resp(this.eventsByResp, this.qtd_resp_evt);
        }
        // console.log('lista_evento_por_resp', this.lista_evento_por_resp);
      },
      (erro: any) => console.error('erro', erro)
    );
  }

  getPart(year: any): void {
    this.statisticsService.getEventoporPartc('countTypePartcByYear/', year).subscribe(
      (evt: any[]) => {
        this.lista_evento_por_part = evt;
        this.year  =[];
        this.eventsByPart  =[];
        this.qtd_part_evt  =[];

        if (this.lista_evento_por_part != null) {
          this.lista_evento_por_part.map(evts => {
            this.year.push(evts.ano);
            this.eventsByPart.push(evts.ass_evento_participacao.participacao);
            this.qtd_part_evt.push(evts.qtd_participacao);
          });
          this.Renderbarchart_part(this.eventsByPart, this.qtd_part_evt);
        }
        // console.log('lista_evento_por_part', this.lista_evento_por_part);
      },
      (erro: any) => console.error('erro', erro)
    );
  }

  getRecursos(year: any): void {
    this.statisticsService.getEventoporRecursos('countTypeRecByYear/', year).subscribe(
      (evt: any[]) => {
        this.lista_evento_por_recursos = evt;
        this.year = [];
        this.eventsByRec = [];
        this.qtd_rec_evt = [];

        if (this.lista_evento_por_recursos != null) {
          this.lista_evento_por_recursos.map(evts => {
            this.year.push(evts.ano);
            this.eventsByRec.push(evts.ass_evento_recursos.recursos);
            this.qtd_rec_evt.push(evts.qtd_recursos);
          });
          this.Renderbarchart_rec(this.eventsByRec, this.qtd_rec_evt);
        }
        // console.log('lista_evento_por_recursos', this.lista_evento_por_recursos);
      },
      (erro: any) => console.error('erro', erro)
    );
  }

  getLocal(year: any): void {
    this.statisticsService.getEventoporLocal('countTypeLocalByYear/', year).subscribe(
      (evt: any[]) => {
        this.lista_evento_por_local = evt;
        this.year = [];
        this.eventsByLocal = [];
        this.qtd_local_evt = [];

        if (this.lista_evento_por_local != null) {
          this.lista_evento_por_local.map(evts => {
            this.year.push(evts.ano);
            this.eventsByLocal.push(evts.ass_evento_local.local_evento);
            this.qtd_local_evt.push(evts.qtd_local);
          });
          this.Renderbarchart_local(this.eventsByLocal, this.qtd_local_evt);
        }
        // console.log('lista_evento_por_local', this.lista_evento_por_local);
      },
      (erro: any) => console.error('erro', erro)
    );
  }
  //Charts.js

  Renderbarchart(labeldata: any, valuedata: any) {
    this.Renderchart(labeldata, valuedata, 'barchart', 'bar');
  }

  Renderbarchart_tipo(labeldatatipo: any, valuedatatipo: any) {
    this.RenderChartTipo(labeldatatipo, valuedatatipo, 'barcharttipo', 'bar');
  }

  Renderbarchart_resp(labeldataresp: any, valuedataresp: any) {
    this.RenderChartResp(labeldataresp, valuedataresp, 'barchartresp', 'bar');
  }

  Renderbarchart_part(labeldatapart: any, valuedatapart: any) {
    this.RenderChartPart(labeldatapart, valuedatapart, 'barchartpart', 'bar');
  }

  Renderbarchart_rec(labeldatarec: any, valuedatarec: any) {
    this.RenderChartRec(labeldatarec, valuedatarec, 'barchartrec', 'bar');
  }

  Renderbarchart_local(labeldatalocal: any, valuedatalocal: any) {
    this.RenderChartLocal(labeldatalocal, valuedatalocal, 'barchartlocal', 'bar');
  }
  Renderchart(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Eventos por Ano',
            data: valuedata,
            backgroundColor: '#3F7FBF',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  RenderChartTipo(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    if (this.barchartTipo) {
      this.barchartTipo.destroy();
    }
    // Seleciona o canvas pelo id
  const ctx_tipo = document.getElementById(chartid) as HTMLCanvasElement;

  // Cria o gráfico e armazena a instância em `barchartTipo`
  this.barchartTipo = new Chart(ctx_tipo, {
    type: charttype,
    data: {
      labels: labeldata,
      datasets: [
        {
          label: 'Tipo de Eventos',
          data: valuedata,
          backgroundColor: '#339966',
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  }

  RenderChartResp(labeldata: any, valuedata: any, chartid: string, charttype: any){

    if (this.barchartResp) {
      this.barchartResp.destroy();
    }

    const ctx_resp = document.getElementById(chartid) as HTMLCanvasElement;

    this.barchartResp = new Chart(ctx_resp, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Responsáveis',
            data: valuedata,
            backgroundColor: '#FADFA1',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

  }

  RenderChartPart(labeldata: any, valuedata: any, chartid: string, charttype: any){

    if (this.barchartPart) {
      this.barchartPart.destroy();
    }

    const ctx_part = document.getElementById(chartid) as HTMLCanvasElement;

    this.barchartPart = new Chart(ctx_part, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Participação',
            data: valuedata,
            backgroundColor: '#3F7FBF',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

  }
  RenderChartRec(labeldata: any, valuedata: any, chartid: string, charttype: any){

    if (this.barchartRec) {
      this.barchartRec.destroy();
    }

    const ctx_rec = document.getElementById(chartid) as HTMLCanvasElement;

    this.barchartRec = new Chart(ctx_rec, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Recursos',
            data: valuedata,
            backgroundColor: '#339966',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

  }
  RenderChartLocal(labeldata: any, valuedata: any, chartid: string, charttype: any){

    if (this.barchartLocal) {
      this.barchartLocal.destroy();
    }
    const ctx_local = document.getElementById(chartid) as HTMLCanvasElement;
    this.barchartLocal = new Chart(ctx_local, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Tipo de locais',
            data: valuedata,
            backgroundColor: '#FADFA1',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

  }
}
