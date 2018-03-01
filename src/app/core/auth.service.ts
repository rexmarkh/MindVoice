import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { NotifyService} from './notify.service';

interface User{
  uid : string;
  email : string;
  photoUrl?:string;
  name?: string;
}

@Injectable()
export class AuthService {
  user: Observable<User>;
  showLoader:boolean = true;
  constructor(
    private notify: NotifyService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
      this.user = this.afAuth.authState
      .switchMap(user => {
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else{
          return Observable.of(null);
        }
      })
    }
    
  googleLogin() {
    // console.log("inside googlelogin method");
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    // console.log("inside oauthlogin method");    
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }
  private updateUserData(user) {
    // console.log("inside updateuserdata method");
    
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoUrl: user.photoURL
    }
    return userRef.set(data)
  }
   //// Anonymous Auth ////

   anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
        this.handleError(error);
      });
  }
    // If error, console log and notify user
    private handleError(error: Error) {
      console.error(error);
      this.notify.update(error.message, 'error');
    }
  
  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/admin']);
    });
  }
}
