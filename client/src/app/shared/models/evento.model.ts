export class Evento {
  constructor(
    public mes?: string,
    public ano?: string,
    public nome_evento?: string,
    public descricao?: string,
    public publico_alvo?: string,
    public local?: string,
    public periodo?: string,
    public custo_previo?: string,
    public lead_previsto?: string,
    public sexec_id?: number,
    public tipo_evento_id?: number,
    public tipo_local_id?: number,
    public participacao_id?: number,
    public recursos_id?: number
  ){}
}
