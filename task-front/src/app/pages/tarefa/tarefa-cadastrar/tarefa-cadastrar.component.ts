import { Component } from "@angular/core";
import { Tarefa } from "src/app/models/tarefa.model";
import { TarefaService } from "src/app/services/tarefa.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/components/dialog/dialog.component";
import { Equipe } from "src/app/models/equipe.model";
import { HttpClient } from "@angular/common/http";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: "app-tarefa-cadastrar",
  templateUrl: "./tarefa-cadastrar.component.html",
  styleUrls: ["./tarefa-cadastrar.component.css"],
})
export class TarefaCadastrarComponent {
  constructor(
    private tarefaService: TarefaService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private client: HttpClient,
    private router: Router
  ) {}

  tarefa: Tarefa = {
    titulo: "",
    descricao: "",
    concluirEm: undefined,
  };

  equipes: Equipe[] = [];

  equipeSelecionada!: number;
  isLoading: boolean = false;

  ngOnInit() {
    this.buscarEquipes();
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
    this.isLoading = true;
    if (this.tarefa.titulo === "") {
      this.abrirModal("Campo obrigatório", "Titulo deve ser preenchido");
      return this.router.navigate(["pages/tarefa/cadastrar"]);
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

        this.isLoading = true;
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

    this.abrirModal("Sucesso", "Tarefa alterada com sucesso!");
    return this.router.navigate(["pages/tarefa/listar"]);
  }

  formataData(date: Date) {
    const data = new Date(date);
    const timezoneOffset = data.getTimezoneOffset();
    const dataUTC = new Date(data.getTime() + timezoneOffset * 60 * 1000);
    const dataFormatada = dataUTC.toISOString();
    this.tarefa.concluirEm = new Date(dataFormatada);
  }

  buscarEquipes() {
    this.client
      .get<Equipe[]>("https://localhost:7213/equipe/listar")
      .subscribe({
        next: (equipes) => {
          this.equipes = equipes;
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  salvaEquipesSelecionadas(event: MatSelectChange): void {
    this.equipeSelecionada = event.value as number;
    console.log("equipe selecionadas: ", this.equipeSelecionada);
    this.tarefa.equipeId = this.equipeSelecionada;
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
