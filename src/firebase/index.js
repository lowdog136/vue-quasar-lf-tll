import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDDia5rtXZVcI4szxUj0oXupZjmKmaw8B4',
  authDomain: 'lf-tll.firebaseapp.com',
  projectId: 'lf-tll',
  storageBucket: 'lf-tll.appspot.com',
  messagingSenderId: '1013864039845',
  appId: '1:1013864039845:web:d49e07c510f5c0e547144c'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { auth, db }
