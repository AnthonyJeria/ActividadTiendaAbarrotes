import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonCard, IonicModule } from '@ionic/angular';
import { UserService } from 'src/app/services/user-service';
import { IUserLogin } from 'src/app/models/IUserLogin';
import { NavigationExtras, Router, RouterLinkWithHref } from '@angular/router';
import { ProfesorModel } from 'src/app/models/UsersModel';
import { Preferences } from '@capacitor/preferences';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-profe',
  templateUrl: './login-profe.page.html',
  styleUrls: ['./login-profe.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLinkWithHref,HttpClientModule, NgFor, NgForOf],
  providers: [UserService]
})
export class LoginProfePage implements OnInit {

  @ViewChild(IonCard, { read: ElementRef })
  card!: ElementRef<HTMLIonButtonElement>;

  userLoginModal: IUserLogin = {
    email: '',
    password: ''
  };

  constructor(private route: Router, private alertController: AlertController, private usuarioService: UserService) { }

  ngOnInit() {
  }

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

  userLoginModalRestart(): void{
    this.userLoginModal.email = '';
    this.userLoginModal.password = '';
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  async setObject(user: ProfesorModel) {
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(user)
    });
  }

  async userLogin(userLoginInfo: IUserLogin) {

    if ((userLoginInfo.email == "") || (userLoginInfo.password =="")) {
      this.presentAlert2();
    }else{
          this.usuarioService.getLoginProfe(userLoginInfo.email, userLoginInfo.password).subscribe(
            {
              next: (user) => {
                if (user) {
                  //EXISTE
                  let userInfoSend: NavigationExtras = {
                    state: {
                      userInfo: user
                    }
                  }

                  this.setObject(user);
                  console.log(userInfoSend);
                  let sendInfo = this.route.navigate(['/vista-profe'], userInfoSend);
                } else {
                  //NO EXISTE
                }
              },
              error: (err) => {
                this.presentAlert();
                this.userLoginModalRestart();
              },
              complete: () => {
                this.userLoginModalRestart();
              }
            }
          )
    }
  }

}
