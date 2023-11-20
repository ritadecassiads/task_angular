import { Equipe } from "./equipe.model"

export interface Usuario {
    usuarioId: number,
    nome: string,
    username: string,
    senha: string,
    email: string,
    telefone: string
    equipe: Equipe,
    equipeId: number
}