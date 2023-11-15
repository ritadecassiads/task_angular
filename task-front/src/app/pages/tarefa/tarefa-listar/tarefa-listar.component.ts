import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/components/dialog/dialog.component";
import { Equipe } from "src/app/models/equipe.model";
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
  equipes: Equipe[] = [];
  equipeDasTarefas: Equipe[] = [];

  ngOnInit(): void {
    this.buscarTarefas();
    this.buscarEquipes();
  }

  async buscarTarefas(): Promise<void> {
    try {
      const tarefas = await this.client
        .get<Tarefa[]>("https://localhost:7213/tarefa/listar")
        .toPromise();

      if (tarefas) {
        this.tarefas = tarefas;
        console.log("Tarefas encontradas:", this.tarefas);
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  }

  async buscarEquipes(): Promise<void> {
    try {
      const equipes = await this.client
        .get<Equipe[]>("https://localhost:7213/equipe/listar")
        .toPromise();

      if (equipes) {
        this.equipes = equipes;
        console.log("Equipes encontradas:", this.equipes);
        this.validaEquipesDasTarefas();
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
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

  mostrarEquipes() {
    const containerEquipe = document.querySelector(".containerEquipe");
    containerEquipe?.classList.remove("desativado");
  }

  validaEquipesDasTarefas() {
    this.tarefas.forEach((tarefa) => {
      this.equipes.forEach((equipe) => {
        // como o retorno do banco vem apenas o equipeId, atrelo o objeto equipe ao objeto tarefa
        if (tarefa.equipeId === equipe.equipeId) {
          tarefa.equipe = equipe;
        }
      });
    });
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
