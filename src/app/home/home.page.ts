import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController, IonCard, IonicModule } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IUserLogin } from '../models/IUserLogin';
import { UserModel } from '../models/UserModel';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {

  private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  @ViewChild(IonCard, { read: ElementRef })
  card!: ElementRef<HTMLIonButtonElement>;

  listUser: UserModel[] = [
    new UserModel(1,'11987654-1','jgomez@duocuc.cl','jorge','gomez','jorge123','Alumno'),
    new UserModel(2,'12345678-9','fu.lalo@duocuc.cl','fulano','lalo','elgato12','Alumno')
  ];

  userLoginModal: IUserLogin = {
    email: '',
    password: ''
  };

  constructor(private route: Router, private alertController: AlertController) {}

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

  traerDatos(): void{
    this.supabase.from('Asistencia').select().then(({ data, error }) => {
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log('Fetched data:', data);
      }
    });
  }
  
}
