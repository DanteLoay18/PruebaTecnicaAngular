import { Usuario } from "../../user";

export interface LoginAuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: Usuario;
}


export interface RegisterAuthRequest {
  username: string;
  password: string;
  role: string;
}