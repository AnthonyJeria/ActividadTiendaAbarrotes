import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { AlumnoModel } from '../../models/UsersModel';
import { ActivatedRoute, Router } from '@angular/router';

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
 
}
