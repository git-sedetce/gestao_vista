export class Acompanhamento {
  constructor(
    public id?: number,
    public situacao_atual?: string,
    public resultado?: string,
    public custo_realizado?: number,
    public leads_realizados?: string,
    public evento_id?: number
  ){}
}
