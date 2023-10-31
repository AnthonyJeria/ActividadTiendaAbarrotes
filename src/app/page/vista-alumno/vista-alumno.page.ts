import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { AlumnoModel } from '../../models/UsersModel';
import { ActivatedRoute, Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { exists } from 'fs';

@Component({
  selector: 'app-vista-alumno',
  templateUrl: './vista-alumno.page.html',
  styleUrls: ['./vista-alumno.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class VistaAlumnoPage implements OnInit {

  userInfoReceived: AlumnoModel | undefined;
  idUserHtmlRouterLink: any;

  private supabase_A = createClient(environment.supabaseUrl_A, environment.supabaseKey);
  private supabase_C = createClient(environment.supabaseUrl_C, environment.supabaseKey);

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private alertController: AlertController) {
    this.userInfoReceived = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
  }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      subHeader: 'Asistencia Marcada Correctamente',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'No se ha marcado asistencia',
      subHeader: 'No hay Clases en curso',
      buttons: ['OK'],
    });

    await alert.present();
  }

  marcarAssistencia(): void{

    this.supabase_C.from('Clase').select('id_clase').eq('estado',true).then(({ data, error }) => {
      if (error) {
        console.error('Error fetching data:', error);
        
      } else {

        console.log(data);

        if(data.length == 1){

          this.supabase_A.from('Asistencia').update({estado:true})
          .eq('id_alumno', this.userInfoReceived?.id_alumno)
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
 
}
