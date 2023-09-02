import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserModel } from '../models/UserModel';
import { IUserLogin } from '../models/IUserLogin';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  listUser: UserModel[] = [
    new UserModel(1,'11987654-1','jgomez@duocuc.cl','jorge','gomez','jorge123','Alumno'),
    new UserModel(2,'12345678-9','fu.lalo@duocuc.cl','fulano','lalo','elgato12','Alumno')
  ];

  userLoginModal: IUserLogin = {
    email: '',
    password: ''
  };

  constructor(private route: Router) { }

  ngOnInit() {
    this.userLoginModalRestart()
  }

  userLogin(userLoginInfo: IUserLogin): boolean{
    for(let i = 0; i < this.listUser.length; i++){
      if((this.listUser[i].email == userLoginInfo.email) && (this.listUser[i].password == userLoginInfo.password)){
        console.log('User Loged...', this.userLoginModal.email, this.userLoginModal.password);
        let userInfoSend: NavigationExtras = {
          state: {
            user: this.listUser[i]
          }
        }
        let sendInfo = this.route.navigate(['/vista-alumno'], userInfoSend);
      }
    }
    this.userLoginModalRestart();
    return false;
    
  }

  userLoginModalRestart(): void{
    this.userLoginModal.email = '';
    this.userLoginModal.password = '';
  }

}
