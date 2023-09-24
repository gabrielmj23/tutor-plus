import { app } from './firebaseConfig'
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where
} from '@firebase/firestore'

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
    const tutorias = snapshot.data().tutorias ?? null
    let idTutorias = []
    if (tutorias) {
      idTutorias = tutorias.map(tutoria => tutoria.id)
    }
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
 * @param {Object} user
 * @param {string} user.uid
 */
export async function getTutoriasParaDar ({ uid }) {
  const snapshot = await getDoc(doc(db, 'users', uid))
  if (snapshot.exists()) {
    const { semestre, carrera } = snapshot.data()
    let materias
    if (semestre && carrera) {
      materias = await getDocs(query(
        collection(db, 'materias'),
        where('semestre', '<', semestre),
        where('carreras', 'array-contains', carrera)
      ))
    } else {
      materias = await getDocs(collection(db, 'materias'))
    }
    return materias.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }
  return []
}

/**
 * @param {Object} tutoria
 * @param {string} tutoria.materia
 * @param {string} tutoria.dia
 * @param {string} tutoria.hora
 * @param {string} tutoria.tutor
 */
export async function aspirarATutoria ({ materia, dia, hora, tutor }) {
  await addDoc(collection(db, 'tutorias'), {
    materia,
    dia,
    hora,
    tutor,
    estado: 'pendiente'
  })
}

/**
 * @param {Object} obj
 * @param {string} obj.userId
 * @param {Object} obj.tutoria
 */
export async function inscribirEnTutoria ({ userId, tutoria }) {
  const tutoriaRef = doc(db, 'tutorias', tutoria.id)
  await updateDoc(doc(db, 'users', userId), { tutorias: arrayUnion(tutoriaRef) })
}

/**
 * @param {Object} user
 * @param {string} user.nombre
 */
export async function getTutoriasDadas ({ nombre }) {
  const tutoriasSnapshot = await getDocs(query(
    collection(db, 'tutorias'),
    where('tutor', '==', nombre)
  ))
  const tutorias = tutoriasSnapshot.docs
    .filter(doc => doc.data().estado === 'activa')
    .map(doc => ({ id: doc.id, ...doc.data() }))
  return tutorias
}

export async function getAspirantes () {
  const tutoriasSnapshot = await getDocs(query(
    collection(db, 'tutorias'),
    where('estado', '==', 'pendiente')
  ))
  const aspirantes = []
  for (const tutoria of tutoriasSnapshot.docs) {
    const { materia, dia, hora, tutor } = tutoria.data()
    const tutorSnapshot = await getDocs(query(
      collection(db, 'users'),
      where('nombre', '==', tutor)
    ))
    const { cedula, email, nombre, telefono } = tutorSnapshot.docs[0].data()
    aspirantes.push({
      id: tutoria.id,
      materia,
      dia,
      hora,
      tutor: nombre,
      cedula,
      email,
      telefono
    })
  }
  return aspirantes
}

/**
 * @param {Object} obj
 * @param {string} obj.uid
 */
export async function aprobarSolicitud ({ uid }) {
  const tutoriaRef = doc(db, 'tutorias', uid)
  const modulos = ['1', '2', 'R', '4']
  const pisos = ['1', '2']
  const aulas = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  const salon = 'A' + modulos[Math.floor(Math.random() * modulos.length)] + '-' + pisos[Math.floor(Math.random() * pisos.length)] + aulas[Math.floor(Math.random() * aulas.length)]
  await updateDoc(tutoriaRef, { estado: 'activa', salon })
}

/**
 * @param {Object} obj
 * @param {string} obj.uid
 */
export async function rechazarSolicitud ({ uid }) {
  const tutoriaRef = doc(db, 'tutorias', uid)
  await deleteDoc(tutoriaRef)
}

/**
 * @param {Object} obj
 * @param {string} obj.uid
 */
export async function getEstudiantesDeTutoria ({ uid }) {
  const tutoriaRef = doc(db, 'tutorias', uid)
  const estudiantesSnapshot = await getDocs(query(
    collection(db, 'users'),
    where('tutorias', 'array-contains', tutoriaRef)
  ))
  return estudiantesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

/**
 * @param {Object} obj
 * @param {Object} obj.asistencia
 * @param {Date} obj.fecha
 * @param {string} obj.tutoriaId
 */
export async function guardarAsistencia ({ asistencia, fecha, tutoriaId }) {
  const tutoriaRef = doc(db, 'tutorias', tutoriaId)
  await addDoc(collection(db, 'asistencias'), {
    asistencia,
    fecha,
    tutoria: tutoriaRef
  })
}
