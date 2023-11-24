import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarefaListarComponent } from './pages/tarefa/tarefa-listar/tarefa-listar.component';
import { TarefaCadastrarComponent } from './pages/tarefa/tarefa-cadastrar/tarefa-cadastrar.component';
import { EquipeListarComponent } from './pages/equipe/equipe-listar/equipe-listar.component';
import { EquipeCadastrarComponent } from './pages/equipe/equipe-cadastrar/equipe-cadastrar.component';

const routes: Routes = [
  {
    path: "",
    component: TarefaListarComponent
  },
  {
    path: "pages/tarefa/listar",
    component: TarefaListarComponent
  },
  {
    path: "pages/tarefa/cadastrar",
    component: TarefaCadastrarComponent
  },
  { 
    path: "pages/tarefa/editar/:id", 
    component: TarefaCadastrarComponent 
  },
  {
    path: "pages/equipe/listar",
    component: EquipeListarComponent
  },
  {
    path: "pages/equipe/cadastrar",
    component: EquipeCadastrarComponent
  },
  {
    path: "pages/equipe/editar/:id",
    component: EquipeCadastrarComponent
  },
]; // toda vez que for criar uma nova rota pro componente escrever como um Objeto

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
