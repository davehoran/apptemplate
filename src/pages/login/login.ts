import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

//import { RegisterPage } from '../register/register';
//import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  loginMessage = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User) {
    console.log('login selected...');
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log("login successful!");
      console.log(result);
      this.navCtrl.setRoot("HomePage");
    }
    catch(e) {
      console.log(e);
      this.loginMessage = "User account not found!";
    }
  }

  register() {
    console.log('redirecting to Register page.');
    this.navCtrl.setRoot("RegisterPage");
  }



}
