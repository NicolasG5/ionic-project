import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.page.html',
  styleUrls: ['./administrar.page.scss'],
})
export class AdministrarPage implements OnInit {

  //variable grupo:
  alumno = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duocuc).(cl)')]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('', [Validators.required])
  });
  repetir_clave: string;
  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService, private alertController: AlertController, private validaciones: ValidacionesService) { }

  ngOnInit() {
    this.usuarios = this.usuarioService.obtenerUsuarios();
  }

  //métodos:
  registrar() {
    if (!this.validar()) {
      return;
    }

    if (this.usuarioService.agregarUsuario(this.alumno.value)) {
      alert('Usuario registrado!');
      this.alumno.reset();
      this.repetir_clave = '';
    } else {
      alert('Usuario ya existe!');
    }
  }

  buscar(rutBuscar) {
    var usuarioEncontrado = this.usuarioService.obtenerUsuario(rutBuscar);
    this.alumno.setValue(usuarioEncontrado);
    this.repetir_clave = usuarioEncontrado.clave;
  }

  async eliminar(rutEliminar) {
    const alert = await this.alertController.create({
      header: '¿Seguro que desea eliminar al usuario de rut ' + rutEliminar + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('NO ELIMINA!');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.usuarioService.eliminarUsuario(rutEliminar);
          },
        },
      ],
    });

    await alert.present();
  }

  modificar() {
    if (!this.validar()) {
      return;
    }

    this.usuarioService.modificarUsuario(this.alumno.value);
    alert('Usuario modificado!');
    this.alumno.reset();
  }

  //método para validar:
  validar() {
    if (!this.validaciones.validarRut(this.alumno.controls.rut.value)) {
      alert('Rut incorrecto!');
      return false;
    }

    if (!this.validaciones.validarEdadMinima(17, this.alumno.controls.fecha_nac.value)) {
      alert('Edad mínima 17 años!');
      return false;
    }

    if (this.alumno.controls.password.value != this.repetir_clave) {
      alert('Contraseñas no coinciden!');
      return false;
    }
  }

}