import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'viajes',
        loadChildren: () => import('../viajes/viajes.module').then( m => m.ViajesPageModule),
      },
      {
        path: 'portada',
        loadChildren: () => import('../portada/portada.module').then( m => m.PortadaPageModule),
      },
      {
        path: 'geo',
        loadChildren: () => import('../geo/geo.module').then( m => m.GeoPageModule),
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
      },      {
        path: 'administrar',
        loadChildren: () => import('../administrar/administrar.module').then( m => m.AdministrarPageModule)
      },
      {
        path: 'api',
        loadChildren: () => import('../api/api.module').then( m => m.ApiPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
