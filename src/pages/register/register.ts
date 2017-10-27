import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';

import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user: User){
    console.log('register page: register clicked.');
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log("successful user registration...");

      // if successfully registered, send out verification email
      var currentUser = this.afAuth.auth.currentUser;
      currentUser.sendEmailVerification().then(function() {
        console.log("successfully send verification email...");
      }).catch(function(e) {
        console.log("error sending verification email...");
        console.log(e);
      });
      
    }
    catch(e){
      console.error(e);
    }
  }

  login(){
    console.log('register page: login clicked.');
    this.navCtrl.setRoot(LoginPage);
  }

}
