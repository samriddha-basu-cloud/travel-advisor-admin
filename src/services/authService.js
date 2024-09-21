import { auth, provider } from './firebaseConfig';
import { signInWithPopup, signOut } from 'firebase/auth';

export const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error('Logout failed');
  }
};