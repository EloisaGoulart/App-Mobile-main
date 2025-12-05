import React from "react";
import {
  useFonts,
  Montserrat_300Light,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAudioPlayer } from "expo-audio";

import SobreNos from "./src/telas/SobreNos";
import Produto from "./src/telas/Produtos";
import MockProdutos from "./src/telas/Produtos/listaProduto";
import PerfilCamera from "./src/telas/Perfil/expo-camera";
import ListaDeDesejos from "./src/telas/Lista de Desejos/Lista";
import AstrologiaAPI from "./src/telas/Perfil/AstrologiaAPI";
import { FavoritosProvider } from "./src/telas/Lista de Desejos/FavoritosContext";
import { tema } from "./src/telas/tema";

const Tab = createBottomTabNavigator();

// ---------- PRODUTOS ----------
function MenuProdutos() {
  return <Produto {...MockProdutos} />;
}

// ---------- ÁUDIO ----------
function MenuAudio() {
  const audioSource = require("./src/assets/audio/acdc_highway_to_hell.mp3");
  const player = useAudioPlayer(audioSource);

  const onOff = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 90,
        right: 16,
        alignItems: "flex-end",
      }}
    >
      <TouchableOpacity
        onPress={onOff}
        style={{
          backgroundColor: tema.cores.primario,
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderRadius: 999,
          flexDirection: "row",
          alignItems: "center",
          ...tema.sombra.card,
        }}
      >
        <Ionicons
          name={player.playing ? "pause" : "play"}
          size={18}
          color="#fff"
          style={{ marginRight: 6 }}
        />
        <Text
          style={{
            color: "#fff",
            fontFamily: "FonteBold",
            fontSize: 13,
            letterSpacing: 0.8,
          }}
        >
          {player.playing ? "Pausar trilha" : "Tocar trilha"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------- PERFIL ----------
function Perfil() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: tema.cores.fundo }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginBottom: 24 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: tema.cores.textoTitulo,
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Seu espaço na Hecho
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: tema.cores.textoPadrao,
            textAlign: "center",
          }}
        >
          Personalize seu perfil e descubra suas inspirações com astrologia.
        </Text>
      </View>

      <View
        style={{
          backgroundColor: tema.cores.card,
          borderRadius: 20,
          padding: 16,
          marginBottom: 20,
          ...tema.sombra.card,
        }}
      >
        <PerfilCamera />
      </View>

      <View
        style={{
          borderRadius: 20,
          overflow: "hidden",
          ...tema.sombra.card,
        }}
      >
        <AstrologiaAPI />
      </View>
    </ScrollView>
  );
}

// ---------- MENU ----------
function Menu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let icoName = "";

          if (route.name === "Sobre Nós") {
            icoName = focused ? "sparkles" : "sparkles-outline";
          } else if (route.name === "Produtos") {
            icoName = focused ? "bag" : "bag-outline";
          } else if (route.name === "Lista de Desejos") {
            icoName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Perfil") {
            icoName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={icoName} size={22} color={color} />;
        },
        tabBarActiveTintColor: tema.cores.primario,
        tabBarInactiveTintColor: "#B0AA8B",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 16,
          backgroundColor: "#ffffff",
          borderRadius: 24,
          borderTopWidth: 0,
          height: 60,
          paddingTop: 4,
          paddingBottom: 6,
          ...tema.sombra.card,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          letterSpacing: 0.8,
          fontFamily: "FonteRegular",
        },
      })}
    >
      <Tab.Screen name="Sobre Nós" component={SobreNos} />
      <Tab.Screen name="Produtos" component={MenuProdutos} />
      <Tab.Screen name="Lista de Desejos" component={ListaDeDesejos} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

// ---------- APP PRINCIPAL ----------
export default function App() {
  const [fonteCarregada] = useFonts({
    FonteLight: Montserrat_300Light,
    FonteBold: Montserrat_700Bold,
  });

  if (!fonteCarregada) return null;

  return (
    <FavoritosProvider>
      <NavigationContainer>
        <Menu />
        <MenuAudio />
      </NavigationContainer>
    </FavoritosProvider>
  );
}
