import { auth } from './firebase'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  EmailAuthProvider,
  linkWithCredential,
  fetchSignInMethodsForEmail,
  signOut
} from 'firebase/auth'

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const registerUser = async (email, password) => {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.includes('google.com')) {
      throw new Error('This email is already associated with a Google account. Please sign in with Google and add a password in settings.');
    }
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}

export const linkEmailPassword = async (email, password) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No user is currently signed in');

  const credential = EmailAuthProvider.credential(email, password);
  return linkWithCredential(user, credential);
}

export const linkGoogleAccount = async () => {
  const provider = new GoogleAuthProvider();
  const user = auth.currentUser;
  if (!user) throw new Error('No user is currently signed in');
  return linkWithCredential(user, provider);
}

export const logoutUser = () => {
  return signOut(auth)
}

export const checkNeedsPassword = (user) => {
  return user.providerData.every(provider => provider.providerId !== 'password');
}
