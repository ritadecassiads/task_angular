import { Component } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "src/app/services/usuario.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/components/dialog/dialog.component";

@Component({
  selector: "app-usuario-cadastrar",
  templateUrl: "./usuario-cadastrar.component.html",
  styleUrls: ["./usuario-cadastrar.component.css"],
})
export class UsuarioCadastrarComponent {
  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  usuario: Usuario = {
    nome: "",
    username: "",
    senha: "",
    email: "",
    telefone: ""
  };

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const usuarioId = +params["id"];
      if (usuarioId) {
        this.buscarUsuarioPorId(usuarioId);
      }
    });
  }

  buscarUsuarioPorId(usuarioId: number) {
    this.usuarioService.getUsuarioPorId(usuarioId).subscribe((usuario) => {
      this.usuario = usuario;
    });
  }

  salvarUsuario() {
    if (this.usuario.username === "") {
      this.abrirModal("Campo obrigatório", "Username deve ser preenchido");
      return this.router.navigate(["pages/usuario/cadastrar"]);
    } else {
      try {
        if (this.usuario.senha === "" || this.usuario.nome === "") {
          this.abrirModal("Campo obrigatório", "Senha e Nome deve ser preenchido");
        }
        
        if (this.usuario.usuarioId) {
          this.editarUsuario();
        } else {
          this.usuarioService.salvarUsuario(this.usuario);
        }
      } catch (error) {
        console.log("Erro ao salvar usuário: ", error);
        return this.abrirModal("Indisponibilidade", "Erro ao salvar usuário");
      }
      this.abrirModal("Sucesso", "Usuário salvo com sucesso!");
      return this.router.navigate(["pages/usuario/listar"]);
    }
  }

  editarUsuario() {
    try {
      this.usuarioService.editarUsuario(this.usuario)
        this.abrirModal("Sucesso", "Usuário alterado com sucesso!");
        this.router.navigate(["pages/usuario/listar"]);
    } catch (error) {
      console.log("Erro ao editar usuário: ", error);
      return this.abrirModal("Indisponibilidade", "Erro ao editar usuário");
    }
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
