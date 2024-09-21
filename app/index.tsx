import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { pokemons } from "@/assets/pokemon";
import { Link } from "expo-router";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);

  useEffect(() => {
    if (searchText) {
      const filtered = pokemons.filter(
        (pokemon) =>
          isNaN(Number(searchText)) // Si no es un número
            ? pokemon.nombre.toLowerCase().includes(searchText.toLowerCase())
            : pokemon.id.toString() === searchText // Si es un número, comparar ID
      );
      setFilteredPokemons(filtered);
    } else {
      setFilteredPokemons(pokemons); // Si no hay texto, mostrar todos
    }
  }, [searchText]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#ff69b4", "#ff0000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <StatusBar style="light" />
        <Text style={styles.text}>POKEPEDIA</Text>

        <TextInput
          style={styles.input}
          placeholder="nombre o ID"
          placeholderTextColor="white"
          value={searchText}
          onChangeText={setSearchText} // Actualiza el estado al escribir
        />

        <View style={styles.contenedor}>
          <FlatList
            data={filteredPokemons}
            keyExtractor={(pokemon) => pokemon.id.toString()}
            renderItem={({ item }) => (
              <Link asChild href={`/${item.id}`}>
                <Pressable>
                  <LinearGradient
                    colors={["#ff69b4", "#ff0000"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.card}
                  >
                    <Image
                      source={{
                        uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`,
                      }}
                      style={styles.pokemonImage}
                      resizeMode="contain"
                    />
                    <Text style={styles.cardText}>
                      {item.id < 10 ? "#00" : "#0"}
                      {item.id}
                    </Text>
                    <Text style={styles.cardText}>{item.nombre}</Text>
                  </LinearGradient>
                </Pressable>
              </Link>
            )}
            contentContainerStyle={styles.listPokemon}
          />
        </View>
      </LinearGradient>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#6C2FAA",
    backgroundColor: "#290B47",
    borderWidth: 1,
    borderRadius: 20,
    width: "80%",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    alignSelf: "center",
  },
  contenedor: {
    width: "100%",
    height: "100%",
    backgroundColor: "#290B47",
    paddingTop: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
  },
  listPokemon: {
    width: "100%",
    backgroundColor: "#290B47",
  },
  card: {
    width: "80%",
    backgroundColor: "#6C2FAA",
    borderRadius: 10,
    marginVertical: 7,
    paddingLeft: 10,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cardText: {
    color: "white",
    fontSize: 18,
    marginRight: 20,
  },
  pokemonImage: {
    width: 60,
    height: 60,
    aspectRatio: 1,
  },
});

export default Home;
