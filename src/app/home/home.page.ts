import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController, IonCard, IonicModule } from '@ionic/angular';
import { NavigationExtras, Router, RouterLinkWithHref } from '@angular/router';  
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IUserLogin } from '../models/IUserLogin';
import { AlumnoModel } from '../models/UsersModel';
import { UserService } from '../services/user-service';
import { HttpClientModule } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule, HttpClientModule, NgFor, NgForOf],
  providers: [UserService]
})
export class HomePage {

  @ViewChild(IonCard, { read: ElementRef })
  card!: ElementRef<HTMLIonButtonElement>;

  userLoginModal: IUserLogin = {
    email: '',
    password: ''
  };

  constructor(private route: Router, private alertController: AlertController, private _usuarioService: UserService) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Email o contraseña incorrecta',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Debe llenar todos los campos',
      buttons: ['OK'],
    });

    await alert.present();
  }

  validar = false;

  userLoginModalRestart(): void{
    this.userLoginModal.email = '';
    this.userLoginModal.password = '';
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

  }

  async setObject(user: AlumnoModel) {
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(user)
    });
  }

  async userLogin(userLoginInfo: IUserLogin) {
    this._usuarioService.getLoginUser(userLoginInfo.email, userLoginInfo.password).subscribe(
      {
        next: (user) => {
          console.log(user);
          if (user) {
            //EXISTE
            let userInfoSend: NavigationExtras = {
              state: {
                userInfo: user.id_alumno
              }
            }
            console.log("Usuario existe...");
            this.setObject(user);
            console.log(userInfoSend);
          } else {
            //NO EXISTE
            console.log("Usuario no existe...");
          }
        },
        error: (err) => {

        },
        complete: () => {

        }
      }
    )
  }

  //recuperar contraseña

recuperarClave(){
  this.route.navigate(['recupera-clave']);
}
  
}
