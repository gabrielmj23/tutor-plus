import { app } from './firebaseConfig'
import { collection, doc, getDocs, getFirestore, setDoc } from '@firebase/firestore'

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
