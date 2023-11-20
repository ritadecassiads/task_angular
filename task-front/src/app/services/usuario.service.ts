import { Usuario } from "src/app/models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../components/dialog/dialog.component";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  constructor(private client: HttpClient, public dialog: MatDialog) {}

  private apiUrl = "https://localhost:7213/usuario";
  public usuarios: Usuario[] = [];

  salvarUsuario(usuario: Usuario) {
    this.client.post(`${this.apiUrl}/cadastrar`, usuario).subscribe({
      next: (response) => {
        console.log("Serviço: Usuario cadastrada!", response);
      },
      error: (error) => {
        console.error("Erro ao cadastrar usuario:", error);
      },
    });
  }

  listarUsuarios(): Usuario[] {
    this.client.get<Usuario[]>(`${this.apiUrl}/listar`).subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (error) => {
        console.error("Ocorreu um erro ao listar as usuarios:", error);
        return error;
      },
    });
    return this.usuarios;
  }

  editarUsuario(usuario: Usuario) {
    this.client
      .put(`${this.apiUrl}/alterar/${usuario.usuarioId}`, usuario)
      .subscribe({
        next: (response) => {
          console.log("Serviço: Usuario editado!", response);
        },
        error: (error) => {
          console.error("Erro ao editar usuario:", error);
        },
      });
  }

  excluirUsuario(id: number) {
    this.client.delete(`${this.apiUrl}/deletar/${id}`).subscribe(
      (response) => {
        console.log("Serviço: Item excluído!");
      },
      (error) => {
        console.error("Erro ao excluir o item", error);
      }
      );
  }

  getUsuarioPorId(id: number) {
    return this.client.get<Usuario>(`${this.apiUrl}/buscar/${id}`);
  }
}
