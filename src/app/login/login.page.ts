import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonicModule } from '@ionic/angular';
import { UserModel } from '../models/UserModel';
import { IUserLogin } from '../models/IUserLogin';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  @ViewChild(IonCard, { read: ElementRef })
  card!: ElementRef<HTMLIonButtonElement>;

  private animation: Animation | undefined;

  listUser: UserModel[] = [
    new UserModel(1,'11987654-1','jgomez@duocuc.cl','jorge','gomez','jorge123','Alumno'),
    new UserModel(2,'12345678-9','fu.lalo@duocuc.cl','fulano','lalo','elgato12','Alumno')
  ];

  userLoginModal: IUserLogin = {
    email: '',
    password: ''
  };

  constructor(private route: Router, private alertController: AlertController, private animationCtrl: AnimationController) { }

  ngOnInit() {
    this.userLoginModalRestart()
  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(3000)
      .iterations(Infinity)
      .direction('alternate')
      .fromTo('background', 'blue', 'var(--background)');

    this.animation.play();
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

  validar = false;

  userLogin(userLoginInfo: IUserLogin): boolean{

    if ((userLoginInfo.email == "") || (userLoginInfo.password =="")) {
      this.presentAlert2();
    }else{

      for(let i = 0; i < this.listUser.length; i++){
        if((this.listUser[i].email == userLoginInfo.email) && (this.listUser[i].password == userLoginInfo.password)){
          this.validar = true;
          console.log('User Loged...', this.userLoginModal.email, this.userLoginModal.password);
          let userInfoSend: NavigationExtras = {
            state: {
              user: this.listUser[i]
            }
          }
          let sendInfo = this.route.navigate(['/vista-alumno'], userInfoSend);
        }
      }
  
      if (this.validar == false) {
        this.presentAlert();
      }

    }

    this.userLoginModalRestart();
    return false;
    
  }

  userLoginModalRestart(): void{
    this.userLoginModal.email = '';
    this.userLoginModal.password = '';
  }

}
