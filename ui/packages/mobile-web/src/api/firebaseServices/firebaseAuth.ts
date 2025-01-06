import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebaseConfig'


const login = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user
        const idToken = await user.getIdToken();
        localStorage.setItem('token', idToken)
    } catch (error) {
        console.log(error)
    }
}

export { login }