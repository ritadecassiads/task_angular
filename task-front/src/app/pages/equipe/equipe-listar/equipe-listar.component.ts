import { Usuario } from "./../../../models/usuario.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/components/dialog/dialog.component";
import { Equipe } from "src/app/models/equipe.model";
import { Tarefa } from "src/app/models/tarefa.model";
import { EquipeService } from "src/app/services/equipe.service";
import { TarefaService } from "src/app/services/tarefa.service";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: "app-equipe-listar",
  templateUrl: "./equipe-listar.component.html",
  styleUrls: ["./equipe-listar.component.css"],
})
export class EquipeListarComponent implements OnInit {
  constructor(
    private client: HttpClient,
    private equipeService: EquipeService,
    private tarefaService: TarefaService,
    private usuarioService: UsuarioService,
    public dialog: MatDialog
  ) {}

  colunasTabela: string[] = [
    "nome",
    "tarefas",
    "usuarios",
    "alterar",
    "deletar",
  ];

  equipes: Equipe[] = [];
  tarefas: Tarefa[] = [];
  usuarios: Usuario[] = [];

  tarefasAssociadas: Tarefa[] = [];

  ngOnInit(): void {
    this.buscarEquipes();
  }

  buscarEquipes() {
    this.client
      .get<Equipe[]>("https://localhost:7213/equipe/listar")
      .subscribe({
        next: (equipes) => {
          this.equipes = equipes;
          console.log("Equipes encontradas:", this.equipes);
          // this.validaEquipesDasTarefas();
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  excluirEquipe(id?: number) {
    try {
      if (id != null) {
        this.equipeService.excluirEquipe(id);
      }
    } catch (error) {
      return this.abrirModal("Indisponibilidade", "Erro ao excluir equipe");
    }
    return this.abrirModal("Sucesso", "Equipe excluída com sucesso!");
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

  // buscarTarefas() {
  //   this.client
  //     .get<Tarefa[]>("https://localhost:7213/tarefa/listar")
  //     .subscribe({
  //       next: (tarefas) => {
  //         console.log(tarefas);
  //         this.tarefas = tarefas;
  //       },
  //       error: (erro) => {
  //         console.log(erro);
  //       },
  //     });
  // }

  // validaTarefasDasEquipes() {
  //   this.tarefas.forEach((tarefa) => {
  //     this.equipes.forEach((equipe) => {
  //       this.usuarios.forEach((usuario) => {
  //         if (
  //           tarefa.equipeId === equipe.equipeId ||
  //           usuario.equipeId === equipe.equipeId
  //         ) {
  //           tarefa.equipe = equipe;
  //           tarefa.usuario = usuario;
  //           this.tarefasAssociadas.push(tarefa);
  //           console.log("tarefas com equipes equipe: ", this.tarefasAssociadas);
  //         }
  //       });
  //     });
  //     // como o retorno do banco vem apenas o equipeId, atrelo o objeto equipe ao objeto tarefa
  //   });
  // }
}
