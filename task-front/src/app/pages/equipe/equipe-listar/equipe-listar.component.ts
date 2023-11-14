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


  ngOnInit(): void {
    this.client
    .get<Equipe[]>("https://localhost:7213/equipe/listar")
    .subscribe({
      //
      next: (equipes) => {
        if (equipes) {
          this.equipes = equipes;
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error("Ocorreu um erro:", error);
      },
    });

    this.client
    .get<Tarefa[]>("https://localhost:7213/tarefa/listar")
    .subscribe({
      next: (tarefas) => {
        if (tarefas) {
          this.tarefas = tarefas;
          console.log("tarefas equipes: ", tarefas);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error("Ocorreu um erro:", error);
      },
    });
  }


  excluirEquipe(id?: number) {
      if (id != null) {
        this.equipeService.excluirEquipe(id);
      } else {
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

  // comparaInfos(){
  //   this.tarefas.forEach(tarefas => {
      
  //   });
  // }



}
