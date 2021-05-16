import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFrame = () => {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    } else {
        firebase.app();
    }
}

export const handleGoogleSignIn = () => {
    const gProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth()
        .signInWithPopup(gProvider)
        .then(res => {
            console.log(res);
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })

}


export const handleFbSignIn = () => {
    var fbProvider = new firebase.auth.FacebookAuthProvider();

    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            var user = result.user;
            user.success = true
            return user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorCode, errorMessage, email, credential)
        });
}


export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {

            const signOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                password: '',
                photo: '',
                error: ''
            }
            return signOutUser

        }).catch((err) => {

        });
}

export const createNewUserWithEmailAndPassword = (email, password, name) => {
   return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user
            newUserInfo.error = "";
            newUserInfo.success = true;
            updateUserInfo(name) 
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message
            newUserInfo.success = false; 
            return newUserInfo
        });
}


export const signInUserWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
           return newUserInfo
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message
            newUserInfo.success = false;
            return newUserInfo
        });
}


const updateUserInfo = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
        // photoURL: ; 
    }).then(() => {
        console.log('user name updated successfully');
    }).catch(error => {
        console.log(error);
    });
}

