import { EquipeService } from "src/app/services/equipe.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/components/dialog/dialog.component";
import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: "app-usuario-listar",
  templateUrl: "./usuario-listar.component.html",
  styleUrls: ["./usuario-listar.component.css"],
})
export class UsuarioListarComponent implements OnInit {
  constructor(
    private client: HttpClient,
    private usuarioService: UsuarioService,
    public dialog: MatDialog
  ) {}

  usuarios: Usuario[] = [];

  colunasTabela: string[] = [
    "nome",
    "username",
    "senha",
    "email",
    "telefone",
    "equipe",
    "equipeId"
  ];

  ngOnInit(): void {

    this.buscarUsuarios();
  }

  buscarUsuarios() {
    this.client
      .get<Usuario[]>("https://localhost:7213/usuario/listar")
      .subscribe({
        next: (usuarios) => {
          console.log(usuarios);
          this.usuarios = usuarios;
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  excluirUsuario(id?: number) {
    try {
      if (id != null) {
        this.usuarioService.excluirUsuario(id);
      }
    } catch (error) {
      return this.abrirModal("Indisponibilidade", "Erro ao editar usuario");
    }
    return this.abrirModal("Sucesso", "Usuario excluído com sucesso!");
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
}
