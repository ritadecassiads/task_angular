import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Tarefa } from "src/app/models/tarefa.model";

@Component({
  selector: "app-tarefa-cadastrar",
  templateUrl: "./tarefa-cadastrar.component.html",
  styleUrls: ["./tarefa-cadastrar.component.css"],
})
export class TarefaCadastrarComponent {
  constructor(private client: HttpClient) {}

  tarefa: Tarefa = {
    titulo: "",
    descricao: "",
    concluirEm: undefined,
  };

  cadastrarTarefa(tarefa: Tarefa) {
    const apiUrl = "https://localhost:7213/tarefa/cadastrar";
    this.validaData();

    this.client.post(apiUrl, tarefa).subscribe({
      next: (response) => {
        alert("Tarefa cadastrada com sucesso!")
        console.log("Tarefa cadastrada com sucesso!", response);
        // Adicione qualquer outra lógica que você deseja após o cadastro
      },
      error: (error) => {
        console.error("Erro ao cadastrar tarefa:", error);
        // Adicione tratamento de erro, se necessário
      },
    });
  }

  validaData() {
    // se o campo "concluirEm" estiver vazio, defino a data daqui a 7 dias
    if (!this.tarefa.concluirEm) {
      const dataDaquiA7Dias = new Date();
      dataDaquiA7Dias.setDate(dataDaquiA7Dias.getDate() + 7);
      this.tarefa.concluirEm = dataDaquiA7Dias;
    }
  }
}
