import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private toast: ToastController) {

  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid){
      this.toast.create({
        message: 'Welcome to the skeleton app. This is a template for simple user authenticated applciation.',
        duration: 5000,
        showCloseButton: true
      }).present();
    } else {
      this.toast.create({
        message: 'User not logged in...',
        duration: 5000
      }).present();
      this.navCtrl.setRoot(LoginPage);
    }
    });

  }

  async logout() {
    console.log('login selected...');
    try {
      const result = await this.afAuth.auth.signOut();
      console.log("logout successful!");
      console.log(result);
    }
    catch(e) {
      console.log(e);
    }
  }

}
