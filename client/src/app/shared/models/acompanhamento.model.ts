export class Acompanhamento {
  constructor(
    public situacao_atual: string,
    public resultado: string,
    public custo_realizado: string,
    public leads_realizados: string,
    public evento_id: number
  ){}
}
