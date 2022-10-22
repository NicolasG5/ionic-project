import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';



@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  //VAMOS A CREAR EL GRUPO DEL FORMULARIO:
  alumno = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duocuc).(cl)')]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('', [Validators.required])
    });

  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  usuarios: any[] = [];
  verificar_password: string;

  constructor(private usuarioService: UsuarioService,private validaciones: ValidacionesService, private router: Router) { }

  ngOnInit() {
    
    //this.usuarios = this.usuarioService.obtenerUsuarios();
  }
  
   

  //método del formulario
  registrar(){
        //validación de salida para buscar un rut válido.
        if (!this.validaciones.validarRut(this.alumno.controls.rut.value)) {
          alert('Rut incorrecto!');
          return;
        }
        //validación de salida para verificar que persona tenga al menos 17 años.
        if (!this.validaciones.validarEdadMinima(17, this.alumno.controls.fecha_nac.value)) {
          alert('Edad mínima 17 años!');
          return; 
        }

    if (this.alumno.controls.password.value != this.verificar_password) {
      alert('CONTRASEÑAS NO COINCIDEN!');
      return;
    }
    this.usuarioService.agregarUsuario(this.alumno.value);
    alert('USUARIO REGISTRADO!');
    this.router.navigate(['/login']);
    //this.alumno.reset();
    //this.verificar_password = '';
  }

  

}
