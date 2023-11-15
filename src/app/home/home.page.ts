import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLinkWithHref } from '@angular/router';  
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule, HttpClientModule, NgFor, NgForOf],
})
export class HomePage {

  constructor(private route: Router) {}

  ngOnInit(): void {

  }

  AbrirAlumno(){
    this.route.navigate(['login-alumno']);
  }

  AbrirProfe(){
    this.route.navigate(['login-profe']);
  }
  
}
