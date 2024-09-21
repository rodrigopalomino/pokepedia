import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Pokemon as PokemonInterface } from "../interfaces/pokemon"; // Asegúrate de ajustar la ruta

interface Componente1Props {
  pokemon: PokemonInterface; // Define el tipo de prop que esperas recibir
}

export const Componente1: React.FC<Componente1Props> = ({ pokemon }) => {
  return (
   <View style={styles.container}>
      {pokemon && (
        <View style={{ flex: 1 }}>
          <View style={styles.top}>
            {/* nombre */}
            <View style={styles.containerNombre}>
              <Text style={styles.containerNombre_Text}>{pokemon.nombre}</Text>
              <Text style={styles.containerNombre_Text}>#{pokemon.id}</Text>
            </View>
            {/* tipos */}
            <View style={styles.containerTipos}>
              {pokemon.tipos?.map((tipo: any) => (
                <View key={tipo.id}>
                  <Text style={styles.containerNombre_Text}>{tipo.tipo}</Text>
                </View>
              ))}
            </View>
            {/* imagen */}
            <View style={styles.imageView}>
              <Image
                source={{
                  uri: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png,
                }}
                style={styles.pokemonImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Parte inferior desplazable */}
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* navegacion */}
            <View style={styles.navegacion}>
              <Text style={styles.navegacionText}>1</Text>
              <Text style={styles.navegacionText}>2</Text>
            </View>

            {/* componente1 */}
            <Componente1 pokemon={pokemon}></Componente1>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#290B47",
    borderRadius: 10,
  },
  compTitulo: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  viewHabilidades: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    marginTop: 10,
  },
  badgeHabilidad: {
    backgroundColor: "#6C2FAA",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  viewEvoluciones: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  imgEvoluciones: {
    width: 100,
    height: 100,
  },
  compText: {
    color: "white",
    fontSize: 12,
  },
});
