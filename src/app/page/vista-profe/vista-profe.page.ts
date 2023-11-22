import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, IonModal } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProfesorModel } from 'src/app/models/UsersModel';
import { ClaseModel } from 'src/app/models/ServiciosModel';
import { ClaseService } from 'src/app/services/clase-service';

@Component({
  selector: 'app-vista-profe',
  templateUrl: './vista-profe.page.html',
  styleUrls: ['./vista-profe.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VistaProfePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  userInfoReceived: ProfesorModel | undefined;
  idUserHtmlRouterLink: any;

  clases : any;
  clase: ClaseModel = {
    id_clase: 0,
    fecha: new Date(),
    id_sala: 0,
    id_seccion: 0,
    estado: false

  };

  constructor(private router: Router,private claseServisio: ClaseService, private alertController: AlertController) {
    this.userInfoReceived = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
  }

  ngOnInit() {
  }

  //async getClases() {
  //  this.clases = this.claseServisio.getClases();
  //  console.log(this.clases);
  //}

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


}
