import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDD4zLJUpQ7RvXS1giuLXbE791jzjeDgLU",
    authDomain: "edusearch-680ef.firebaseapp.com",
    databaseURL: "https://edusearch-680ef-default-rtdb.firebaseio.com",
    projectId: "edusearch-680ef",
    storageBucket: "edusearch-680ef.appspot.com",
    messagingSenderId: "392155943776",
    appId: "1:392155943776:web:36565178c844e2dc8d4405"
}

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** User API ***
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');
}

export default Firebase;