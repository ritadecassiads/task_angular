import { Usuario } from "./usuario.model";

export interface Tarefa {
    tarefaId?: number,
    titulo: string,
    descricao?: string,
    criadaEm?: Date,
    concluirEm?: Date,
    concluida?: boolean,
    usuario?: Usuario
}