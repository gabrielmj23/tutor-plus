import React, { useState } from 'react'
import { ScrollView, View, Text, Button, Pressable } from 'react-native'
import StudentList from './StudentList.jsx'
import students from './data/StudentsExample';
import Index from '../index.js';
import DateTimePicker from "@react-native-community/datetimepicker";
import react from 'react';


export default function AdministrarTutoriaIndex() {

    const [showStudents, setShowStudents] = useState(false);
    const [checkAsistencia, setPasarAsistencia] = useState(false);
    const [asistencia, setAsistencia] = useState(Array(students.length).fill(false));
    const [selectedDate, setSelectedDate] = useState(null);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const verEstudiantes = () => {
        setShowStudents(!showStudents);
    }



    const pasarAsistencia = () => {
        setPasarAsistencia(!checkAsistencia);
        setShowPicker(!showPicker);
    }

    const handleAsistencia = (index) => {
        const newAsistencia = [...asistencia];
        newAsistencia[index] = !newAsistencia[index];
        setAsistencia(newAsistencia);
    }

    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    }

    const onChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setSelectedDate(selectedDate);
        }
    };

    const enviarReporte = () => {
        {/* aca se deberia mandar selectecDate y asistencia */}
    }

    const estudiantes = students;

    return (
        <ScrollView className='flex-1 bg-gray-200' >
            <View >
                <Text className='text-gray-200 text-4xl font-bold bg-slate-500 p-6'>TutorPlus</Text>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 24, backgroundColor: 'ligh-gray'}}>Administrar tutoria</Text>
            </View>


            <View className='border solid border-black mx-20 my-10'>
                <Button title='Ver Estudiantes' onPress={verEstudiantes}>
                </Button>
            </View>

            {showStudents && (
                <View style={{ flex: 1, marginHorizontal: 50 }}>
                    <StudentList />
                </View>
            )}

            <View className='border solid border-black  mx-20 my-10'>
                <Button title='Pasar Asistencia' onPress={pasarAsistencia}>
                </Button>
            </View>
            {checkAsistencia && (
                <View>
                    <View style={{marginLeft: 20}}>
                        <Text>Fecha de la tutoria</Text>
                        {selectedDate && (
                            <Text style={{flexDirection: 'column'}}>Fecha seleccionada: {selectedDate.toLocaleDateString()}</Text>
                        )}
                        <View className='border solid border-black mx-20 my-3'>
                        <Button  title='Seleccionar fecha' onPress={() => setShowPicker(true)} />
                        </View>
                        
                        {showPicker && (
                            <DateTimePicker
                                mode="date"
                                display="calendar"
                                value={date}
                                onChange={onChange}
                            />
                        )}
                    </View>


                    <View style={{ flex: 1, padding: 5, marginHorizontal: 20, marginVertical: 15, borderWidth: 1, borderColor: 'black' }}>
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
                                <View style={{ flex: 1, margin: 0 }}>
                                    {asistencia[students.indexOf(student)] ? (
                                        <Button color='green' title='Presente' onPress={() => handleAsistencia(students.indexOf(student))} />
                                    ) : (
                                        <Button color='orange' title='Ausente' onPress={() => handleAsistencia(students.indexOf(student))} />
                                    )




                                    }

                                </View>
                            </View>
                        ))}
                        <Button title="Enviar reporte" onPress={enviarReporte}/>
                    </View>
                </View>
            )}
        </ScrollView>
    )
}