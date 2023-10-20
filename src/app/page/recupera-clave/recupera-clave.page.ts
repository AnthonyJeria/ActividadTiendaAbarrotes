import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonicModule } from '@ionic/angular';
import { UserService } from 'src/app/services/user-service';
import { IUserLogin } from 'src/app/models/IUserLogin';
import { NavigationExtras, RouterLinkWithHref } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { AlumnoModel } from 'src/app/models/UsersModel';

@Component({
  selector: 'app-recupera-clave',
  templateUrl: './recupera-clave.page.html',
  styleUrls: ['./recupera-clave.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLinkWithHref, HttpClientModule, NgFor, NgForOf],
  providers: [UserService]
})
export class RecuperaClavePage implements OnInit {

  @ViewChild(IonCard, { read: ElementRef })
  card!: ElementRef<HTMLIonButtonElement>;

  userLoginModal: IUserLogin = {
    email: '',
    password: ''
  };

  constructor(private _usuarioService: UserService) { }

  userLoginModalRestart(): void{
    this.userLoginModal.email = '';
    this.userLoginModal.password = '';
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
  }

  async setObject(user: AlumnoModel) {
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(user)
    });
  }

  async recuperarClave(userLoginInfo: IUserLogin) {
    this._usuarioService.getClave(userLoginInfo.email).subscribe(
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

}
