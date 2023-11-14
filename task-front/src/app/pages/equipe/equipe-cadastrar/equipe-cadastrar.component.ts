import { EquipeService } from 'src/app/services/equipe.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from './../../../models/usuario.model';
import { Component } from '@angular/core';
import { Equipe } from 'src/app/models/equipe.model';
import { Tarefa } from 'src/app/models/tarefa.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatSelectChange } from '@angular/material/select';
import { TarefaService } from 'src/app/services/tarefa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipe-cadastrar',
  templateUrl: './equipe-cadastrar.component.html',
  styleUrls: ['./equipe-cadastrar.component.css']
})
export class EquipeCadastrarComponent {
  
  constructor(private client: HttpClient, private equipeService: EquipeService, private tarefaService: TarefaService, public dialog: MatDialog, private router: Router) {}
  
  equipe: Equipe = {
    equipeId: 0,
    nome: ""
  }
  
  tarefas: Tarefa[] = [];
  usuarios: Usuario[] = [];
  equipes: Equipe[] = [];

  tarefasSelecionadas: Tarefa[] = [];
  usuariosSelecionados: number[] = [];

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

  salvarEquipe(){
    if (this.equipe.nome != null) {
      this.equipeService.salvarEquipe(this.equipe, this.tarefasSelecionadas)
      this.router.navigate(["pages/equipe/listar"]);
    } else {
      return this.abrirModal("Erro", "Não deu!");
    }
    return this.abrirModal("Sucesso", "Equipe salva com sucesso!");
  }

  salvaTarefasSelecionadas(event: MatSelectChange): void {
    this.tarefasSelecionadas = event.value as Tarefa[];
    console.log("tarefas selecionadas: ", this.tarefasSelecionadas)
  }

  abrirModal(title: string, message: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "300px",
      data: { title, message },
    });

    dialogRef.afterClosed().subscribe((result) => {

    });
  }
}
