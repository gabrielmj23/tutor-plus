import { Store } from 'pullstate'
import {
  getFirestore,
  doc,
  getDoc
} from 'firebase/firestore'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { app, auth } from './firebaseConfig'
import { guardarDatosDeUsuario } from './db'

export const AuthStore = new Store({
  isLoggedIn: false,
  initialized: false,
  user: null,
  roles: {
    estudiante: true,
    tutor: false,
    admin: false
  }
})

/**
 * @param {string} email
 * @param {string} password
 */
export async function appSignIn (email, password) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    // Determinar roles del usuario
    const db = getFirestore(app)
    const docSnap = await getDoc(doc(db, 'users', res.user.uid))
    // Guardar datos de sesion
    AuthStore.update(store => {
      store.user = res.user
      store.isLoggedIn = !!res.user
      store.initialized = true
      store.roles = docSnap.data().roles
    })
    return { user: auth.currentUser }
  } catch (error) {
    return { error }
  }
}

export async function appSignOut () {
  try {
    await signOut(auth)
    AuthStore.update(store => {
      store.user = null
      store.isLoggedIn = false
      store.initialized = true
    })
    return { user: null }
  } catch (error) {
    return { error }
  }
}

/**
 * @param {Object} user
 * @param {string} user.email
 * @param {string} user.nombre
 * @param {string} user.cedula
 * @param {string} user.telefono
 * @param {number?} user.semestre
 * @param {string?} user.carrera
 * @param {string} user.password
 */
export const appSignUp = async ({ email, nombre, cedula, telefono, semestre, carrera, password }) => {
  try {
    // Crear usuario
    const res = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(res.user, { displayName: nombre })

    // Guardar datos adicionales
    await guardarDatosDeUsuario({ uid: auth.currentUser?.uid, email, nombre, cedula, telefono, semestre, carrera })

    AuthStore.update((store) => {
      store.user = auth.currentUser
      store.isLoggedIn = true
      store.initialized = true
      store.roles = {
        ...store.roles,
        admin: !semestre
      }
    })
    return { user: auth.currentUser }
  } catch (e) {
    return { error: e }
  }
}
