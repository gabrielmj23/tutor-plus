import { Store } from 'pullstate'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { auth } from './firebaseConfig'

export const AuthStore = new Store({
  isLoggedIn: false,
  initialized: false,
  user: null
})

export async function appSignIn (email, password) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    AuthStore.update(store => {
      store.user = res.user
      store.isLoggedIn = !!res.user
      store.initialized = true
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

export const appSignUp = async (email, password, displayName) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(res.user, { displayName })

    AuthStore.update((store) => {
      store.user = auth.currentUser
      store.isLoggedIn = true
      store.initialized = true
    })
    return { user: auth.currentUser }
  } catch (e) {
    return { error: e }
  }
}
