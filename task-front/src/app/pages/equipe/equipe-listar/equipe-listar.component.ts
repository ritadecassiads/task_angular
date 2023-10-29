import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Equipe } from 'src/app/models/equipe.model';

@Component({
  selector: 'app-equipe-listar',
  templateUrl: './equipe-listar.component.html',
  styleUrls: ['./equipe-listar.component.css']
})
export class EquipeListarComponent implements OnInit{
  constructor(private client: HttpClient) {
    // sempre utilizar o HttpClient para fazer requisições e utilizar ele no construtor
  }

  equipes: Equipe[] = [];

  ngOnInit(): void {
    this.client
    .get<Equipe[]>("https://localhost:7213/equipe/listar")
    .subscribe({
      //
      next: (equipes) => {
        this.equipes = equipes; // Armazena as tarefas recebidos na variavel que vai pro html
        console.table(equipes);
      },
      error: (error: HttpErrorResponse) => {
        console.error("Ocorreu um erro:", error);
      },
    });
  }

}
