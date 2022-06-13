declare module '@ioc:Adonis/Core/Request' {
  export interface RequestContract {
    user_id: string
    user_role: number
  }
}
