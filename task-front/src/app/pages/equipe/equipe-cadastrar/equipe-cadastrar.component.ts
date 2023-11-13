import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from './../../../models/usuario.model';
import { Component } from '@angular/core';
import { Equipe } from 'src/app/models/equipe.model';
import { Tarefa } from 'src/app/models/tarefa.model';

@Component({
  selector: 'app-equipe-cadastrar',
  templateUrl: './equipe-cadastrar.component.html',
  styleUrls: ['./equipe-cadastrar.component.css']
})
export class EquipeCadastrarComponent {
  
  constructor(private client: HttpClient) {}
  
  equipe: Equipe = {
    nome: ""
  }
  
  tarefas: Tarefa[] = [];
  usuarios: Usuario[] = [];
  equipes: Equipe[] = [];

  ngOnInit(): void {
    // listo as tarefas
    this.client
    .get<Tarefa[]>("https://localhost:7213/tarefa/listar")
    .subscribe({
      next: (tarefas) => {
        if (tarefas) {
          this.tarefas = tarefas;
          console.log(tarefas)
          
        } else {
          console.log("Não há registros de tarefas no banco de dados")
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error("Ocorreu um erro ao listar as tarefas:", error);
      },
    });

    // listo os usuarios
    this.client
    .get<Usuario[]>("https://localhost:7213/usuario/listar")
    .subscribe({
      next: (usuarios) => {
        if(usuarios){
          this.usuarios = usuarios;
          console.log(usuarios)


        } else {
          console.log("Não há registros de usuarios no banco de dados")
        }

      },
      error: (error: HttpErrorResponse) => {
        console.error("Ocorreu um erro ao listar os usuarios:", error);
      },
    });
  }
}
