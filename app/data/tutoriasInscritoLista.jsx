import React from "react";
import { Text,  FlatList } from 'react-native';
import tutoriasInscrito from "./tutoriasInscrito";
import TutoriaItem from "./tutoriasItem";


const TutoriasInscritoLista = () => {
    return (
        <FlatList  
            data={tutoriasInscrito}
            ItemSeparatorComponent={() => <Text></Text>}
            renderItem={({ item: tutoria }) => <TutoriaItem tutoria={tutoria} />}
        />
    )

}

export default TutoriasInscritoLista;