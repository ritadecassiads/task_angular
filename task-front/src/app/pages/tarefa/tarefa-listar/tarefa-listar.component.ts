import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/components/dialog/dialog.component";
import { Tarefa } from "src/app/models/tarefa.model";
import { TarefaService } from "src/app/services/tarefa.service";

@Component({
  selector: "app-tarefa-listar",
  templateUrl: "./tarefa-listar.component.html",
  styleUrls: ["./tarefa-listar.component.css"],
})
export class TarefaListarComponent implements OnInit {
  constructor(
    private client: HttpClient,
    private tarefaService: TarefaService,
    public dialog: MatDialog
  ) {}

  tarefas: Tarefa[] = [];

  ngOnInit(): void {
    console.log("componente listar onInit");
    this.client
      .get<Tarefa[]>("https://localhost:7213/tarefa/listar")
      .subscribe({
        next: (tarefas) => {
          if (tarefas) {
            this.tarefas = tarefas;
          } else {
            alert("Não há registros de tarefas no banco de dados");
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error("Ocorreu um erro:", error);
        },
      });
  }

  excluirTarefa(id?: number) {
    try {
      if (id != null) {
        this.tarefaService.excluirTarefa(id);
      }
    } catch (error) {
      return this.abrirModal("Indisponibilidade", "Erro ao editar tarefa");
    }
    return this.abrirModal("Sucesso", "Tarefa excluída com sucesso!");
  }

  abrirModal(title: string, message: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "300px",
      data: { title, message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      window.location.reload();

    });
  }
}
