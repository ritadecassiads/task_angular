import { EquipeService } from "src/app/services/equipe.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Equipe } from "src/app/models/equipe.model";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/components/dialog/dialog.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-equipe-cadastrar",
  templateUrl: "./equipe-cadastrar.component.html",
  styleUrls: ["./equipe-cadastrar.component.css"],
})
export class EquipeCadastrarComponent {
  constructor(
    private client: HttpClient,
    private equipeService: EquipeService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  equipe: Equipe = {
    nome: "",
  };

  equipes: Equipe[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // pego o id que vem na url para edição
      const equipeId = +params["id"];
      if (equipeId) {
        this.buscarEquipePorId(equipeId);
      }
    });
  }

  salvarEquipe() {
    if (this.equipe.nome != "") {
      if (this.equipe.equipeId == null) {
        this.equipeService.salvarEquipe(this.equipe);
        this.router.navigate(["pages/equipe/listar"]);
        return this.abrirModal("Sucesso", "Equipe salva com sucesso!");
      } else {
        this.editarEquipe();
      }
    } else {
      this.router.navigate(["pages/equipe/cadastrar"]);
      return this.abrirModal("Erro", "Nome obrigatório!");
    }
  }

  buscarEquipePorId(equipeId: number) {
    this.equipeService.getEquipePorId(equipeId).subscribe((equipe) => {
      this.equipe = equipe;
    });
  }

  editarEquipe() {
    try {
      this.equipeService.editarEquipe(this.equipe);
    } catch (error) {
      console.log("Erro ao editar tarefa: ", error);
      return this.abrirModal("Indisponibilidade", "Erro ao editar equipe");
    }

    this.abrirModal("Sucesso", "Equipe alterada com sucesso!");
    return this.router.navigate(["pages/equipe/listar"]);
  }

  abrirModal(title: string, message: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "300px",
      data: { title, message },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
