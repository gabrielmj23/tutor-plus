import React, { useState } from 'react'
import { ScrollView, View, Text, Button } from 'react-native'
import StudentList from './StudentList.jsx'
import students from './data/StudentsExample.js';
import Index from '../index.js';


export default function AdministrarTutoriaIndex() {

    const [showStudents, setShowStudents] = useState(false);
    const [checkConfirmacion, setPasarConfirmacion] = useState(false);
    const [confirmacion, setConfirmacion] = useState(Array(students.length).fill(false));

    const verEstudiantes = () => {
        setShowStudents(!showStudents);
    }

    function eliminarEstudiante(id) {
        const updatedStudents = students.filter(student => student.id !== id);
    
        // Si se eliminó un estudiante, actualiza los IDs de los estudiantes restantes
        if (updatedStudents.length < students.length) {
            for (let i = 0; i < updatedStudents.length; i++) {
                updatedStudents[i].id = (i + 1).toString();
            }
        }
    
        setStudents(updatedStudents); // Actualiza el estado con el arreglo filtrado
        guardarEstudiantes(updatedStudents); // Opcionalmente, puedes guardar los cambios en AsyncStorage
    }

    const pasarConfirmacion = () => {
        setPasarConfirmacion(!checkConfirmacion);
    }

    const handleConfirmacion = (index) => {
        const newConfirmacion = [...confirmacion];
        newConfirmacion[index] = !newConfirmacion[index];
        setConfirmacion(newConfirmacion);
    }
    const estudiantes = students;
    
    return (
        <ScrollView className='flex-1 bg-white' >
            <View >
                <Text className='bg-slate-500 p-4'>TutorPlus</Text>
                <Text className='bg-slate-500'>Hola tutoria</Text>
            </View>
            {/*add button to view students*/}

            <View className='border solid border-black p-4 m-10'>
                <Button title='Ver Tutores' onPress={verEstudiantes}>
                </Button>
            </View>

            {showStudents && (
                <View style={{ flex: 1 }}>
                    <StudentList />
                </View>
            )}

            <View className='border solid border-black p-4 m-10'>
                <Button title='Aprobar Tutoria' onPress={pasarConfirmacion}>
                </Button>
            </View>
            {checkConfirmacion && (<View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text>Informacion del aspirante</Text>
                    </View>
                </View>
                {students.map((student) => (
                    <View key={student.id} style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
                        <View style={{ flex: 1 }}>
                            <Text>{student.name}</Text>
                            <Text>{student.email}</Text>
                            <Text>{student.phone}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                        <Button title='Rechazar' onPress={() => {
                            handleConfirmacion(students.indexOf(student));
                            eliminarEstudiante(student.id); // Elimina el estudiante cuando se presiona "Rechazar"
                        }} />
                        </View>
                        <View style={{ flex: 1 }}>
                        <Button title='Confirmar' onPress={() => {
                            handleConfirmacion(students.indexOf(student));
                            eliminarEstudiante(student.id); // El estudiante pasa de ser aspirante a tutor
                        }} />
                        </View>
                    </View>
                ))}
            </View>
            )}   
        </ScrollView>
    )
}
