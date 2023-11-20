import { Tarefa } from 'src/app/models/tarefa.model';
import { Usuario } from "./usuario.model";

export interface Equipe {
    equipeId?: number,
    nome: string
    tarefa: Tarefa[],
    usuario: Usuario[]
}