import { Equipe } from "src/app/models/equipe.model";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { TarefaService } from "./tarefa.service";
import { UsuarioService } from "./usuario.service";

import { Tarefa } from "../models/tarefa.model";
import { Usuario } from "../models/usuario.model";

@Injectable({
  providedIn: "root",
})

export class EquipeService {
  constructor(private client: HttpClient, private tarefaService: TarefaService, private usuarioService: UsuarioService) {}

  private apiUrl = "https://localhost:7213/equipe";
  public equipes: Equipe[] = [];

  salvarEquipe(equipe: Equipe) {
    this.client.post<Equipe>(`${this.apiUrl}/cadastrar`, equipe).subscribe({
      next: (data) => {
        console.log("Serviço: Equipe cadastrada!", data.equipeId);

        // if (data.equipeId != undefined) {
        //   this.editaTabelaTarefa(tarefasSelecionadas, data);
        // }
        // if (data.equipeId != undefined) {
        //   this.editaTabelaUsuario(usuariosSelecionados, data);
        // }

      },
      error: (error) => {
        console.error("Erro ao cadastrar equipe:", error);
        return error;
      },
    });
  }

  listarEquipes(): Equipe[] {
    this.client.get<Equipe[]>(`${this.apiUrl}/listar`).subscribe({
      next: (equipes) => {
        this.equipes = equipes;
      },
      error: (error) => {
        console.error("Ocorreu um erro ao listar as equipes:", error);
        return error;
      },
    });
    return this.equipes;
  }

  editarEquipe(equipe: Equipe) {
    this.client
      .put(`${this.apiUrl}/alterar/${equipe.equipeId}`, equipe)
      .subscribe({
        next: (response) => {
          console.log("Serviço: Equipe editada!", equipe);
        },
        error: (error) => {
          console.error("Erro ao editar equipe:", error);
        },
      });
  }

  excluirEquipe(id: number) {
    this.client.delete(`${this.apiUrl}/deletar/${id}`).subscribe(
      (response) => {
        console.log("Serviço: Item excluído!");
      },
      (error) => {
        console.error("Erro ao excluir o item", error);
      }
      );
  }

  getEquipePorId(id: number) {
    return this.client.get<Equipe>(`${this.apiUrl}/buscar/${id}`);
  }

  // editaTabelaTarefa(tarefasSelecionadas: Tarefa[], equipe: Equipe){
  //   tarefasSelecionadas.forEach(tarefa => {
  //     tarefa.equipe = equipe;
  //     tarefa.equipeId = equipe.equipeId;

  //     this.tarefaService.editarTarefa(tarefa)
  //   });
  // }

  // editaTabelaUsuario(usuariosSelecionados: Usuario[], equipe: Equipe){
  //   usuariosSelecionados.forEach(usuario => {
  //     if(equipe.equipeId != undefined){
  //       usuario.equipe = equipe;
  //       usuario.equipeId = equipe.equipeId;

  //       console.log("usuario com equipe: ", usuario)
  //       this.usuarioService.editarUsuario(usuario)
  //     }
  //   });
  // }
}
