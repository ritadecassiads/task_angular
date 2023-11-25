import { Component } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "src/app/services/usuario.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/components/dialog/dialog.component";
import { Equipe } from "src/app/models/equipe.model";
import { HttpClient } from "@angular/common/http";
import { MatSelectChange } from "@angular/material/select";

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
    private client: HttpClient,
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
      // pego o id que vem na url para edição
      const usuarioId = +params["id"];
      if (usuarioId) {
        console.log("ID da usuario:", usuarioId);

        // busco a usuario para preencher os campos
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
          this.usuarioService.salvarUsuario(this.usuario);
        } catch (error) {
          console.log("Erro ao salvar usuario: ", error);
          return this.abrirModal("Indisponibilidade", "Erro ao salvar usuario");
        }

        return this.abrirModal("Sucesso", "Usuario salvo com sucesso!");
    }
  }

 /* editarUsuario() {
    try {
      this.usuarioService.editarUsuario(this.usuario);
    } catch (error) {
      console.log("Erro ao editar usuario: ", error);
      return this.abrirModal("Indisponibilidade", "Erro ao editar usuario");
    }

    this.abrirModal("Sucesso", "Usuario alterado com sucesso!");
    return this.router.navigate(["pages/usuario/listar"]);
  }*/

  abrirModal(title: string, message: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "300px",
      data: { title, message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      
    });
  }
}
