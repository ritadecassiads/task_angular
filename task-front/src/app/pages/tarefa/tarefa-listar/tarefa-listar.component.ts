import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Tarefa } from "src/app/models/tarefa.model";

@Component({
  selector: "app-tarefa-listar",
  templateUrl: "./tarefa-listar.component.html",
  styleUrls: ["./tarefa-listar.component.css"],
})
export class TarefaListarComponent implements OnInit {
  constructor(private client: HttpClient) {
    // sempre utilizar o HttpClient para fazer requisições e utilizar ele no construtor
  }

  tarefas: Tarefa[] = []; // Variável para armazenar as tarefas da API e se comunicar com o html

  ngOnInit(): void {
    // automaticamente carregado sempre que o componente for renderizado

    // ja digo que o get vai retornar um array de Tarefa
    this.client
      .get<Tarefa[]>("https://localhost:7213/tarefa/listar")
      .subscribe({
        //
        next: (tarefas) => {
          this.tarefas = tarefas; // Armazena as tarefas recebidos na variavel que vai pro html
          console.table(tarefas);
        },
        error: (error: HttpErrorResponse) => {
          console.error("Ocorreu um erro:", error);
        },
      });
  }

  editarTarefa(tarefa: Tarefa, id?: number){
    
  }

  excluirTarefa(id?: number) {
    const apiUrl = `https://localhost:7213/tarefa/deletar/${id}`; // Substitua pela URL correta da sua API

    this.client.delete(apiUrl).subscribe(
        (response) => {
          alert("Item excluído com sucesso");
          // Adicione qualquer lógica adicional após a exclusão
        },
        (error) => {
          console.error("Erro ao excluir o item", error);
          // Adicione tratamento de erro, se necessário
        }
      );
  }
}
