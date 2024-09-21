import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { pokemons } from "@/assets/pokemon";
import { Pokemon as PokemonInterface } from "../interfaces/pokemon"; // Ajusta la ruta según tu estructura

const Pokemon = () => {
  const { id } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    const foundPokemon = pokemons.find((p) => p.id.toString() === id);
    setPokemon(foundPokemon); // Asegúrate de que sea null si no se encuentra
  }, [id]);

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
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
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
            <View style={styles.componente1}>
              <Text style={styles.compTitulo}>Descripción</Text>
              <Text style={styles.compText}>{pokemon.description}</Text>

              {/* peso y altura */}
              <View style={styles.cardPe}>
                <Text style={styles.compText}>
                  {(pokemon.peso / 10).toFixed(2)}kg
                </Text>
                <Text style={styles.compText}>
                  {(pokemon.tamaño / 10).toFixed(2)}m
                </Text>
              </View>

              {/* habilidades */}
              <Text style={styles.compTitulo}>Habilidades</Text>
              <View style={styles.viewHabilidades}>
                {pokemon.habilidades.map((habilidad: any) => (
                  <Text key={habilidad} style={styles.badgeHabilidad}>
                    {habilidad}
                  </Text>
                ))}
              </View>

              {/* linea Evolutiva */}
              <Text style={styles.compTitulo}>Linea Evolutiva</Text>
              <View style={styles.cardEvoluciones}>
                {pokemon.evoluciones.map((evolucion: any) => (
                  <View key={evolucion.id}>
                    <Link asChild href={`/${evolucion.id}`}>
                      <Pressable style={styles.viewEvoluciones}>
                        <Image
                          source={{
                            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolucion.id}.png`,
                          }}
                          style={styles.imgEvoluciones}
                          resizeMode="contain"
                        />
                        <Text style={styles.compText}>{evolucion.nombre}</Text>
                      </Pressable>
                    </Link>
                  </View>
                ))}
              </View>

              {/* como Evoluciono */}
              <Text style={styles.compTitulo}>¿Cómo ha evolucionado?</Text>
              {pokemon.evoluciones.map((evo: any) => (
                <View>
                  <Text style={styles.compText}>
                    {evo.id === pokemon.id
                      ? `Evoluciono al nivel ${evo.nivel_evolucion}`
                      : ""}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que el contenedor ocupe todo el espacio
    backgroundColor: "green",
  },
  top: {
    paddingHorizontal: 50,
    paddingTop: 30,
  },
  containerNombre: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
  },
  containerNombre_Text: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  containerTipos: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  imageView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  pokemonImage: {
    width: 200,
    height: 200,
  },
  scrollContent: {
    paddingBottom: 100, // Ajusta el espacio si es necesario
    paddingTop: 10,
    backgroundColor: "#290B47",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flexGrow: 1, // Para que se extienda el contenido en el ScrollView
  },
  navegacion: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navegacionText: {
    color: "white",
  },
  componente1: {
    marginTop: 15,
    paddingHorizontal: 50,
  },
  compTitulo: {
    color: "white",
    fontSize: 16,
  },
  compText: {
    color: "white",
    fontSize: 12,
  },
  cardPe: {
    marginVertical: 18,
    borderRadius: 40,
    backgroundColor: "#6C2FAA",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  viewHabilidades: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    marginTop: 10,
    marginBottom: 30,
  },
  badgeHabilidad: {
    backgroundColor: "#6C2FAA",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  cardEvoluciones: {
    marginVertical: 18,
    borderRadius: 40,
    backgroundColor: "#6C2FAA",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 20,
  },
  viewEvoluciones: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imgEvoluciones: {
    width: 100,
    height: 100,
  },
});

export default Pokemon;
