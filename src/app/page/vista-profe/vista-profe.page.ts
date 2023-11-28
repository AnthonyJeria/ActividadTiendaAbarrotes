import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router, RouterLinkWithHref } from '@angular/router';
import { ProfesorModel } from 'src/app/models/UsersModel';
import { ClaseService } from 'src/app/services/clase-service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-vista-profe',
  templateUrl: './vista-profe.page.html',
  styleUrls: ['./vista-profe.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, RouterLinkWithHref],
  providers: [ClaseService]
})
export class VistaProfePage implements OnInit {

  userInfoReceived: ProfesorModel | undefined;
  idUserHtmlRouterLink: any;

  mostrarImagen = false;
  imagenSrc = '../../assets/imagenes/logo.png';

  constructor(private router: Router, private alertController: AlertController, private claseService: ClaseService) {
    this.userInfoReceived = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
  }

  ngOnInit() {
    this.GetClase();
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

   
  }

  //--------------------------------------------------------------------------

  GetClase(): void{
    
  }

  //--------------------------------------------------------------------------

  generarQR(): void{

    const today = new Date();
    const fechaHoy = today.toISOString().split('T')[0];

    const qr = this.claseService.QRgenerator(fechaHoy, 1, 1);
    console.log(qr)

    this.mostrarImagen = !this.mostrarImagen;
    this.imagenSrc = qr;

  }

  //--------------------------------------------------------------------------

  terminarClase(): void{

    
  }

}