import { Tarefa } from "src/app/models/tarefa.model";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../components/dialog/dialog.component";

@Injectable({
  providedIn: "root",
})
export class TarefaService {
  constructor(private client: HttpClient, public dialog: MatDialog) {}

  private apiUrl = "https://localhost:7213/tarefa";
  public tarefas: Tarefa[] = [];

  salvarTarefa(tarefa: Tarefa) {
    this.setaDataDaquiASeteDias(tarefa);

    this.client.post(`${this.apiUrl}/cadastrar`, tarefa).subscribe({
      next: (response) => {
        console.log("Serviço: Tarefa cadastrada!", response);
      },
      error: (error) => {
        console.error("Erro ao cadastrar tarefa:", error);
      },
    });
  }

  listarTarefas(): Tarefa[] {
    this.client.get<Tarefa[]>(`${this.apiUrl}/listar`).subscribe({
      next: (tarefas) => {
        this.tarefas = tarefas;
      },
      error: (error) => {
        console.error("Ocorreu um erro ao listar as tarefas:", error);
        return error;
      },
    });
    return this.tarefas;
  }

  editarTarefa(tarefa: Tarefa) {
    this.client
      .put(`${this.apiUrl}/alterar/${tarefa.tarefaId}`, tarefa)
      .subscribe({
        next: (response) => {
          console.log("Serviço: Tarefa editada!", response);
        },
        error: (error) => {
          console.error("Erro ao editar tarefa:", error);
        },
      });
  }

  excluirTarefa(id: number) {
    this.client.delete(`${this.apiUrl}/deletar/${id}`).subscribe(
      (response) => {
        console.log("Serviço: Item excluído!");
      },
      (error) => {
        console.error("Erro ao excluir o item", error);
      }
      );
  }

  getTarefaPorId(id: number) {
    return this.client.get<Tarefa>(`${this.apiUrl}/buscar/${id}`);
  }

  alteraStatus(tarefa: Tarefa){
    this.client
    .patch<Tarefa>(`${this.apiUrl}/alterarconcluida/${tarefa.tarefaId}`, tarefa)
    .subscribe({
      next: (tarefas) => {
        console.log(tarefas);
        window.location.reload();
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }

  setaDataDaquiASeteDias(tarefa: Tarefa) {
    // se o campo "concluirEm" estiver vazio, defino a data daqui a 7 dias
    if (!tarefa.concluirEm) {
      const dataDaquiA7Dias = new Date();
      dataDaquiA7Dias.setDate(dataDaquiA7Dias.getDate() + 7);
      tarefa.concluirEm = dataDaquiA7Dias;
      return tarefa.concluirEm;
    }
    return;
  }
}
