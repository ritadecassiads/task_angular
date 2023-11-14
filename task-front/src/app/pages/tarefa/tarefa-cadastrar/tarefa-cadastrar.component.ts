import { Component } from "@angular/core";
import { Tarefa } from "src/app/models/tarefa.model";
import { TarefaService } from "src/app/services/tarefa.service";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/components/dialog/dialog.component";

@Component({
  selector: "app-tarefa-cadastrar",
  templateUrl: "./tarefa-cadastrar.component.html",
  styleUrls: ["./tarefa-cadastrar.component.css"],
})
export class TarefaCadastrarComponent {
  constructor(
    private tarefaService: TarefaService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  tarefa: Tarefa = {
    titulo: "",
    descricao: "",
    concluirEm: undefined,
  };

  ngOnInit() {
    this.route.params.subscribe((params) => {
      // pego o id que vem na url para edição
      const tarefaId = +params["id"];
      if (tarefaId) {
        console.log("ID da tarefa:", tarefaId);

        // busco a tarefa para preencher os campos
        this.buscarTarefaPorId(tarefaId);
      }
    });
  }

  buscarTarefaPorId(tarefaId: number) {
    this.tarefaService.getTarefaPorId(tarefaId).subscribe((tarefa) => {
      this.tarefa = tarefa;
    });
  }

  salvarTarefa() {
    if (this.tarefa.titulo === "") {
      this.abrirModal("Campo obrigatório", "Titulo deve ser preenchido");
    } else {
      if (this.tarefa.tarefaId == null) {
        try {
          if (this.tarefa.concluirEm != null) {
            this.formataData(this.tarefa.concluirEm);
          }
          this.tarefaService.salvarTarefa(this.tarefa);
        } catch (error) {
          console.log("Erro ao salvar tarefa: ", error);
          return this.abrirModal("Indisponibilidade", "Erro ao salvar tarefa");
        }

        return this.abrirModal("Sucesso", "Tarefa salva com sucesso!");
      } else {
        this.editarTarefa();
      }
    }
  }

  editarTarefa() {
    try {
      this.tarefaService.editarTarefa(this.tarefa);
    } catch (error) {
      console.log("Erro ao editar tarefa: ", error);
      return this.abrirModal("Indisponibilidade", "Erro ao editar tarefa");
    }

    return this.abrirModal("Sucesso", "Tarefa alterada com sucesso!");
  }

  formataData(date: Date) {
    const data = new Date(date);
    const timezoneOffset = data.getTimezoneOffset();
    const dataUTC = new Date(data.getTime() + timezoneOffset * 60 * 1000);
    const dataFormatada = dataUTC.toISOString();
    this.tarefa.concluirEm = new Date(dataFormatada);

    console.log("converteu a data", this.tarefa.concluirEm);
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
