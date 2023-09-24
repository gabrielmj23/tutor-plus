import React, { useState } from 'react'
import { ScrollView, View, Text, Button } from 'react-native'
import StudentList from './StudentList.jsx'
import students from './data/StudentsExample';
import Index from '../index.js';


export default function AdministrarTutoriaIndex() {

    const [showStudents, setShowStudents] = useState(false);
    const [checkAsistencia, setPasarAsistencia] = useState(false);
    const [asistencia, setAsistencia] = useState(Array(students.length).fill(false));

    const verEstudiantes = () => {
        setShowStudents(!showStudents);
    }

    

    const pasarAsistencia = () => {
        setPasarAsistencia(!checkAsistencia);
    }

    const handleAsistencia = (index) => {
        const newAsistencia = [...asistencia];
        newAsistencia[index] = !newAsistencia[index];
        setAsistencia(newAsistencia);
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
                <Button title='Ver Estudiantes' onPress={verEstudiantes}>
                </Button>
            </View>

            {showStudents && (
                <View style={{ flex: 1 }}>
                    <StudentList />
                </View>
            )}

            <View className='border solid border-black p-4 m-10'>
                <Button title='Pasar Asistencia' onPress={pasarAsistencia}>
                </Button>
            </View>
            {checkAsistencia && (<View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text>Nombre</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text>Asistencia</Text>
                    </View>
                </View>
                {students.map((student) => (
                    <View key={student.id} style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
                        <View style={{ flex: 1 }}>
                            <Text>{student.name}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            {asistencia[students.indexOf(student)] ? (
                                <Button title='Presente' onPress={() => handleAsistencia(students.indexOf(student))} />
                            ) : (
                                <Button title='Ausente' onPress={() => handleAsistencia(students.indexOf(student))} />
                            )}
            
                        </View>
                    </View>
                ))}
            </View>
            )}   
        </ScrollView>
    )
}