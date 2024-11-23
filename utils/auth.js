import firebase from 'firebase/app';
import 'firebase/auth';

const signIn = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  } catch (error) {
    console.error('Error signing in:', error.message);
  }
};

const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.error('Error signing out:', error.message);
  }
};

export { signIn, signOut };
