import { Usuario } from './../../../models/usuario.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Equipe } from 'src/app/models/equipe.model';
import { Tarefa } from 'src/app/models/tarefa.model';
import { EquipeService } from 'src/app/services/equipe.service';

@Component({
  selector: 'app-equipe-listar',
  templateUrl: './equipe-listar.component.html',
  styleUrls: ['./equipe-listar.component.css']
})
export class EquipeListarComponent implements OnInit{
  constructor(private client: HttpClient, private equipeService: EquipeService, public dialog: MatDialog) {
  }

  equipes: Equipe[] = [];
  tarefas: Tarefa[] = [];
  usuarios: Usuario[] = [];

  ngOnInit(): void {
    this.buscarEquipes();
    this.buscarTarefas();
    this.buscarUsuarios();
  }

  async buscarEquipes(): Promise<void> {
    try {
      const equipes = await this.client
        .get<Equipe[]>("https://localhost:7213/equipe/listar")
        .toPromise();

      if (equipes) {
        this.equipes = equipes;
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  }

  async buscarTarefas(): Promise<void> {
    try {
      const tarefas = await this.client
        .get<Tarefa[]>("https://localhost:7213/tarefa/listar")
        .toPromise();

      if (tarefas) {
        this.tarefas = tarefas;
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  }

  async buscarUsuarios(): Promise<void> {
    try {
      const usuarios = await this.client
        .get<Usuario[]>("https://localhost:7213/usuario/listar")
        .toPromise();

      if (usuarios) {
        this.usuarios = usuarios;
        console.log("usuarios listados: ", this.usuarios)
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
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

  // associaEquipeAoUsuario(usuarios: Usuario[], equipes: Equipe[]){
  //   usuarios.forEach(usuario => {
  //     equipes.forEach(equipe => {
  //       if(usuario.equipeId){
  //         if (usuario.equipeId == equipe.equipeId) {
  //           equipe.usuario.push(usuario)
  //           console.log("teste equipe do usuario: ", usuario.equipe)
  //         }
  //       }
  //     })
  //   });
  // }

  abrirModal(title: string, message: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "300px",
      data: { title, message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      window.location.reload();
    });
  }

  // validaTarefasDasEquipes(){
  //   this.tarefas.forEach((tarefa, index) => {
  //     if(tarefa.equipeId == this.equipes[index].equipeId){
  //       this.tarefasDasEquipes.push(tarefa)
  //       console.log("tarefas atreladas a alguma equipe: ", this.tarefasDasEquipes)
  //     }
  //   });
  // }

}
