import { EquipeService } from "src/app/services/equipe.service";
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
    private equipeService: EquipeService,
    public dialog: MatDialog
  ) {}

  tarefas: Tarefa[] = [];
  equipes: Equipe[] = [];
  equipeDasTarefas: Equipe[] = [];
  isLoading: boolean = false;

  colunasTabela: string[] = [
    "titulo",
    "descricao",
    "concluirEm",
    "criadaEm",
    "status",
    "equipe",
    "alterar",
    "deletar",
  ];

  ngOnInit(): void {
    this.isLoading = true;

    this.buscarTarefas();
    this.buscarEquipes();

    this.isLoading = false;

    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 3000); // Atraso de 3 segundos para simular carregamento
  }

  buscarTarefas() {
    this.client
      .get<Tarefa[]>("https://localhost:7213/tarefa/listar")
      .subscribe({
        next: (tarefas) => {
          console.log(tarefas);
          this.tarefas = tarefas;
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  buscarEquipes() {
    this.client
      .get<Equipe[]>("https://localhost:7213/equipe/listar")
      .subscribe({
        next: (equipes) => {
          this.equipes = equipes;
          this.validaEquipesDasTarefas();

        },
        error: (erro) => {
          console.log(erro);
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

  alteraStatus(tarefa: Tarefa) {
    this.client
      .patch<Tarefa>(
        `https://localhost:7213/tarefa/alterarconcluida/${tarefa.tarefaId}`,
        tarefa
      )
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
