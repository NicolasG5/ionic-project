import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {
// varibles globales  auxiliares
  cantidad_capitulos : number;
  capitulos: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
   //mi variable datos es un observable de la peticion de http;
   let datos = this.api.getDatos();
   console.log(datos);

  //para recorrer un observable 
   datos.subscribe(
    (data: any) => {
      //console.log(data.info.count)
      this.cantidad_capitulos = data.info.count;
      this.capitulos = data.results;
    }
  
   );
  }

}
