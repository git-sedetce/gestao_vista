export class User {
  constructor(
    public nome_completo: string,
    public user_name: string,
    public user_email: string,
    public user_active: boolean,
    public user_password: string,
    public confirm_password: string,
    public profile_id: number,
    public sexec_id: number,
  ) {}
}
