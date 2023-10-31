import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProfesorModel } from 'src/app/models/UsersModel';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vista-profe',
  templateUrl: './vista-profe.page.html',
  styleUrls: ['./vista-profe.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VistaProfePage implements OnInit {

  userInfoReceived: ProfesorModel | undefined;
  idUserHtmlRouterLink: any;

  private supabase_C = createClient(environment.supabaseUrl_C, environment.supabaseKey);

  constructor(private router: Router, private alertController: AlertController) {
    this.userInfoReceived = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
  }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      subHeader: 'Clase Iniciada',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'No se puede Iniciar Clase',
      subHeader: 'Ya hay una clase en curso',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlert3() {
    const alert = await this.alertController.create({
      subHeader: 'Clase Finalizada',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlert4() {
    const alert = await this.alertController.create({
      subHeader: 'No hay clases en curso',
      buttons: ['OK'],
    });

    await alert.present();
  }

  iniciarClase(): void{

    const today = new Date();
    const fechaHoy = today.toISOString().split('T')[0];

    this.supabase_C.from('Clase').select('id_clase').eq('estado',true).then(({ data, error }) => {
      if (error) {
        console.error('Error fetching data:', error);
        
      } else {

        console.log(data);

        if(data.length == 0){

          this.supabase_C.from('Clase').insert({fecha: fechaHoy, id_seccion : 1, id_sala : 1, estado : true})
          .then(({ data, error }) => {
            if (error) {
              console.error('Error fetching data:', error);
            } else {
              this.presentAlert();
            }
          });

        }else{
          this.presentAlert2();
        }

      }
    });
  }

  //--------------------------------------------------------------------------

  terminarClase(): void{

    this.supabase_C.from('Clase').select('id_clase').eq('estado',true).then(({ data, error }) => {
      if (error) {
        console.error('Error fetching data:', error);
      } else {

        console.log(data);

        if(data.length >= 1){

          this.supabase_C.from('Clase').update({estado : false}).eq('estado', true)
          .then(({ data, error }) => {
            if (error) {
              console.error('Error fetching data:', error);
            } else {
              this.presentAlert3();
            }
          });

        }else{
          this.presentAlert4();
        }

      }
    });
  }

}
