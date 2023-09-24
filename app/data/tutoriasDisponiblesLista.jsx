import React, { useState } from "react";
import { Text, FlatList } from "react-native";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import tutoriasDisponibles from "./tutoriasDisponibles";
import TutoriaItem from "./tutoriasItem";

const TutoriasDisponiblesLista = () => {
    const [selectedSemestre, setSelectedSemestre] = useState("");
    const [selectedCarrera, setSelectedCarrera] = useState("");

    const handleSemestreChange = (value) => {
        setSelectedSemestre(value);
    };

    const handleCarreraChange = (value) => {
        setSelectedCarrera(value);
    };

    const semestres = [
        { label: "Todos los semestres", value: "" },
        { label: "1er semestre", value: "1" },
        { label: "2do semestre", value: "2" },
        { label: "3er semestre", value: "3" },
        { label: "4to semestre", value: "4" },
        { label: "5to semestre", value: "5" },
        { label: "6to semestre", value: "6" },
        { label: "7mo semestre", value: "7" },
        { label: "8vo semestre", value: "8" },
    ];

    const carreras = [
        { label: "Todas las carreras", value: "" },
        { label: "Comunicacion social", value: "Comunicacion social" },
        { label: "Ingenieria", value: "Ingenieria" },
        { label: "Derecho", value: "Derecho" },
        { label: "Administracion y Contaduria", value: "Administracion y Contaduria" },
    ];

    let filteredTutorias = tutoriasDisponibles;

    if (selectedSemestre) {
        filteredTutorias = filteredTutorias.filter(
            (tutoria) => tutoria.semestre === selectedSemestre
        );
    }

    if (selectedCarrera) {
        filteredTutorias = filteredTutorias.filter(
            (tutoria) => tutoria.carrera === selectedCarrera
        );
    }

    const renderHeader = () => {
        return <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, padding:10 , paddingTop: 10 }}>Tutorias Disponibles</Text>;
      };

    return (
        <>
            <SelectPicker
                selectedValue={selectedSemestre}
                onValueChange={handleSemestreChange}
            >
                {semestres.map((semestre) => (
                    <SelectPicker.Item
                        key={semestre.value}
                        label={semestre.label}
                        value={semestre.value}
                    />
                ))}
            </SelectPicker>
            <SelectPicker
                selectedValue={selectedCarrera}
                onValueChange={handleCarreraChange}
            >
                {carreras.map((carrera) => (
                    <SelectPicker.Item
                        key={carrera.value}
                        label={carrera.label}
                        value={carrera.value}
                    />
                ))}
            </SelectPicker>
            {filteredTutorias.length > 0 ? (
                <FlatList
                    data={filteredTutorias}
                    ItemSeparatorComponent={() => <Text></Text>}
                    renderItem={({ item: tutoria }) => <TutoriaItem tutoria={tutoria} />}
                    ListHeaderComponent = {renderHeader}	
                />
                
            ) : (
                <Text style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 18,
                    textAlign: 'center',
                    marginTop: '50%',
                    width: 'auto',
                    backgroundColor: 'grey',
                }}> No hay tutorias disponibles</Text>
            )}
        </>
    );
};

export default TutoriasDisponiblesLista;