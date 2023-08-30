import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-vista-trabajador',
  templateUrl: './vista-trabajador.page.html',
  styleUrls: ['./vista-trabajador.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VistaTrabajadorPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
