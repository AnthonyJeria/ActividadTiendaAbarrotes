import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.page.html',
  styleUrls: ['./vista-admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VistaAdminPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
