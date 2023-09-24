import React from "react";
import { Text, FlatList, TouchableOpacity, Alert } from "react-native";
import tutoriasInscrito from "./tutoriasInscrito";
import TutoriaItem from "./tutoriasItem";

const TutoriasInscritoLista = () => {
  const handleDeleteTutoria = (tutoria) => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Está seguro que desea eliminar la tutoría "${tutoria.id}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            // TODO: IMPLEMENTAR ELIMINACIÓN
            console.log(`eliminando tutoria ${tutoria.id}`);
          },
        },
      ]
    );
  };

  const renderHeader = () => {
    return <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, padding:10 , paddingTop: 10 }}>Tutorias Inscritas</Text>;
  };

  return (
    <FlatList
      data={tutoriasInscrito}
      ItemSeparatorComponent={() => <Text></Text>}
      renderItem={({ item: tutoria }) => (
        <TouchableOpacity onPress={() => handleDeleteTutoria(tutoria)}>
          <TutoriaItem tutoria={tutoria} />
        </TouchableOpacity>
      )}
      ListHeaderComponent = {renderHeader}	
    />
  );
};

export default TutoriasInscritoLista;