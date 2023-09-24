import { app } from './firebaseConfig'
import { arrayUnion, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from '@firebase/firestore'

const db = getFirestore(app)

export async function getCarreras () {
  const snapshot = await getDocs(collection(db, 'carreras'))
  const carreras = []
  snapshot.forEach(doc => {
    carreras.push({ ...doc.data() })
  })
  return carreras
}

/**
 * @param {Object} user
 * @param {string} user.uid
 * @param {string} user.email
 * @param {string} user.nombre
 * @param {string} user.cedula
 * @param {string} user.telefono
 * @param {number?} user.semestre
 * @param {string?} user.carrera
 * @param {string} user.password
 */
export async function guardarDatosDeUsuario ({ uid, email, nombre, cedula, telefono, semestre, carrera }) {
  // Guardar datos de usuario
  const datos = { uid, email, nombre, cedula, telefono }
  if (semestre && carrera) {
    datos.semestre = semestre
    datos.carrera = carrera
  }
  await setDoc(doc(db, 'users', uid), {
    ...datos,
    roles: {
      estudiante: true,
      tutor: false,
      admin: !semestre
    }
  })
}

/**
 * @param {Object} user
 * @param {string} user.uid
 */
export async function getTutoriasInscritas ({ uid }) {
  const snapshot = await getDoc(doc(db, 'users', uid))
  if (snapshot.exists()) {
    const { tutorias } = snapshot.data()
    const tutoriasInscritas = []
    for (const tutoria of tutorias) {
      const snapshotTutoria = await getDoc(doc(db, 'tutorias', tutoria.id))
      if (snapshotTutoria.data().estado === 'activa') {
        tutoriasInscritas.push({ id: tutoria.id, ...snapshotTutoria.data() })
      }
    }
    return tutoriasInscritas
  }
  return []
}

/**
 * @param {Object} user
 * @param {string} user.uid
 */
export async function getTutoriasDisponibles ({ uid }) {
  const snapshot = await getDoc(doc(db, 'users', uid))
  if (snapshot.exists()) {
    // Obtener tutorias ya registradas por el usuario
    const { tutorias } = snapshot.data()
    const idTutorias = tutorias.map(tutoria => tutoria.id)
    // Obtener todas las tutorias disponibles
    const snapTutorias = await getDocs(query(
      collection(db, 'tutorias'),
      where('estado', '==', 'activa')
    ))
    // Extraer informacion
    const tutoriasDisponibles = snapTutorias
      .docs
      .filter(doc => idTutorias.indexOf(doc.id) === -1)
      .map(doc => ({ id: doc.id, ...doc.data() }))
    return tutoriasDisponibles
  }
  return []
}

/**
 * @param {Object} obj
 * @param {string} obj.userId
 * @param {Object} obj.tutoria
 */
export async function inscribirEnTutoria ({ userId, tutoria }) {
  console.log(userId, tutoria)
  const tutoriaRef = doc(db, 'tutorias', tutoria.id)
  await updateDoc(doc(db, 'users', userId), { tutorias: arrayUnion(tutoriaRef) })
}
