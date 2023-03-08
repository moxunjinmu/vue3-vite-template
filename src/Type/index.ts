export interface Login {
  password: string;
  name: string;
}

export interface UserState {
  token: string;
  user: object;
}