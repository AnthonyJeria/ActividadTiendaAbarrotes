import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlumnoModel } from '../../models/UsersModel';
import { ActivatedRoute, Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

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

  private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.userInfoReceived = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
  }

  ngOnInit() {
  }

  marcarAssistencia(): void{
    this.supabase.from('Asistencia').update({estado:true}).eq('id_alumno', this.userInfoReceived?.id_alumno).then(({ data, error }) => {
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log('Fetched data:', data);
      }
    });
  }

}
