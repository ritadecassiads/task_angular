import { EquipeService } from 'src/app/services/equipe.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from './../../../models/usuario.model';
import { Component } from '@angular/core';
import { Equipe } from 'src/app/models/equipe.model';
import { Tarefa } from 'src/app/models/tarefa.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatSelectChange } from '@angular/material/select';
import { TarefaService } from 'src/app/services/tarefa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipe-cadastrar',
  templateUrl: './equipe-cadastrar.component.html',
  styleUrls: ['./equipe-cadastrar.component.css']
})
export class EquipeCadastrarComponent {
  
  constructor(private client: HttpClient, private equipeService: EquipeService, private tarefaService: TarefaService, public dialog: MatDialog, private router: Router) {}
  
  equipe: Equipe = {
    equipeId: 0,
    nome: "",
    tarefa: [],
    usuario: []
  }
  
  tarefas: Tarefa[] = [];
  usuarios: Usuario[] = [];
  equipes: Equipe[] = [];

  tarefasSelecionadas: Tarefa[] = [];
  usuariosSelecionados: Usuario[] = [];

  ngOnInit(): void {
    this.buscarTarefas();
    this.buscarUsuarios();
  }
  
  async buscarTarefas(): Promise<void> {
    try {
      const tarefas = await this.client
        .get<Tarefa[]>("https://localhost:7213/tarefa/listar")
        .toPromise();

      if (tarefas) {
        this.tarefas = tarefas;
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  }

  async buscarUsuarios(): Promise<void> {
    try {
      const usuarios = await this.client
        .get<Usuario[]>("https://localhost:7213/usuario/listar")
        .toPromise();

      if (usuarios) {
        this.usuarios = usuarios;
        console.log("usuarios listados: ", this.usuarios)
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  }

  salvarEquipe(){
    if (this.equipe.nome != null) {
      this.equipeService.salvarEquipe(this.equipe, this.tarefasSelecionadas, this.usuariosSelecionados);
      // this.associaEquipeAoUsuario(this.usuariosSelecionados, this.equipe);
      this.router.navigate(["pages/equipe/listar"]);
    } else {
      return this.abrirModal("Erro", "Não deu!");
    }
    return this.abrirModal("Sucesso", "Equipe salva com sucesso!");
  }

  salvaTarefasSelecionadas(event: MatSelectChange): void {
    this.tarefasSelecionadas = event.value as Tarefa[];
    console.log("tarefas selecionadas: ", this.tarefasSelecionadas)
  }

  salvaUsuariosSelecionadas(event: MatSelectChange): void {
    this.usuariosSelecionados = event.value as Usuario[];
    console.log("usuarios selecionadas: ", this.usuariosSelecionados)
  }

  // associaEquipeAoUsuario(usuarios: Usuario[], equipes: Equipe[]){
  //   usuarios.forEach(usuario => {
  //     equipes.forEach(equipe => {
  //       if(usuario.equipeId){
  //         if (usuario.equipeId == equipe.equipeId) {
  //           equipe.usuario.push(usuario)
  //           console.log("teste equipe do usuario: ", usuario.equipe)
  //         }
  //       }
  //     })
  //   });
  // }

  abrirModal(title: string, message: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "300px",
      data: { title, message },
    });

    dialogRef.afterClosed().subscribe((result) => {

    });
  }
}
