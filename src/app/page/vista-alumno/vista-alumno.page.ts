import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { AlumnoModel } from '../../models/UsersModel';
import { ActivatedRoute, Router } from '@angular/router';
import { Barcode, BarcodeFormat, BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { __values } from 'tslib';
import { createClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-vista-alumno',
  templateUrl: './vista-alumno.page.html',
  styleUrls: ['./vista-alumno.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class VistaAlumnoPage implements OnInit {

  isSupported = false;
  barcodes: Barcode[] = [];
  public formGroup = new UntypedFormGroup({
    formats: new UntypedFormControl([]),
    lensFacing: new UntypedFormControl(LensFacing.Back),
    googleBarcodeScannerModuleInstallState: new UntypedFormControl(0),
    googleBarcodeScannerModuleInstallProgress: new UntypedFormControl(0),
  });

  supabaseUrl_A= 'https://jhrdaqawmuiumnkewpdt.supabase.co/rest/v1/Asistencia?select=*'
  supabaseUrl_C= 'https://jhrdaqawmuiumnkewpdt.supabase.co/rest/v1/Clase?select=*'
  supabaseKey= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpocmRhcWF3bXVpdW1ua2V3cGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NjgzNjIsImV4cCI6MjAxMTM0NDM2Mn0.NhD9PBIZTowZ3aGJAeBY6hCR4cBDpcKT2A-2M2r659Y'

  private supabase_A = createClient(this.supabaseUrl_A, this.supabaseKey);
  private supabase_C = createClient(this.supabaseUrl_C, this.supabaseKey);

  userInfoReceived: AlumnoModel | undefined;
  idUserHtmlRouterLink: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private alertController: AlertController) {
    this.userInfoReceived = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
  }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async presentAlert3() {
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

  async scan(): Promise<void> {

    this.installGoogleBarcodeScannerModule();
    const { barcodes } = await BarcodeScanner.scan({
    formats: [BarcodeFormat.QrCode],
  });
    this.barcodes.push(...barcodes);
    this.leer();
  }

  leer(){
    for (let barcode of this.barcodes) {
      this.marcarAssistencia(barcode.rawValue);
    }
  }

  async installGoogleBarcodeScannerModule(){
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  };

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  marcarAssistencia(fecha: string): void{

    this.supabase_C.from('Clase').select('id_clase').eq('estado',true).then(({ data, error }) => {
      if (error) {
        console.error('Error fetching data:', error);
        
      } else {

        console.log(data);

        if(data.length == 1){

          this.supabase_A.from('Asistencia').update({estado:true})
          .eq('id_alumno', this.userInfoReceived?.id_alumno).eq('fecha',fecha)
          .then(({ data, error }) => {
            if (error) {
              console.error('Error fetching data:', error);
            } else {
              this.presentAlert3();
            }
          });

        }else{
          this.presentAlert2();
        }

      }
    });
  }
 
}
