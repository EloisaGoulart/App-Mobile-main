import React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import Texto from "../Componentes/Texto";
import TarotCard from "../Componentes/TarotCard";

export default function SobreNos() {
  const player = useVideoPlayer(
    "https://drive.google.com/uc?export=download&id=1p71OkoOzCbOWSYXVkimeZa2WOpZ-5itj",
    (p) => {
      p.loop = true;
      p.play();
    }
  );

  return (
    <View style={estilos.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f4ef" />

      <ScrollView
        contentContainerStyle={estilos.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* BANNER */}
        <Image
          source={require("../../assets/hecho.png")}
          style={estilos.heroImage}
          resizeMode="cover"
        />

        {/* HERO */}
        <View style={estilos.heroCard}>
          <Texto style={estilos.heroTitle}>Hecho</Texto>
          <Texto style={estilos.heroSubtitle}>
            Artesanato autoral com toque místico para transformar a sua casa em
            refúgio.
          </Texto>

          <View style={estilos.heroTagsRow}>
            <Texto style={estilos.heroTag}>Velas artesanais</Texto>
            <Texto style={estilos.heroTag}>Crochê & fibras</Texto>
            <Texto style={estilos.heroTag}>Home spray</Texto>
          </View>
        </View>

        {/* BANNER VÍDEO */}
        <View style={estilos.bannerCard}>
          <Texto style={estilos.sectionLabel}>Por trás da marca</Texto>
          <Texto style={estilos.sectionTitle}>Feito à mão, com alma</Texto>
          <Texto style={estilos.sectionText}>
            Cada peça nasce de um processo cuidadoso, com atenção aos detalhes
            e respeito ao tempo da criação.
          </Texto>

          <View style={estilos.bannerWrapper}>
            <VideoView
              style={estilos.bannerVideo}
              player={player}
              allowsFullscreen
              allowsPictureInPicture
            />
          </View>
        </View>

        {/* SOBRE A MARCA */}
        <View style={estilos.sectionCard}>
          <Texto style={estilos.sectionLabel}>Nossa essência</Texto>
          <Texto style={estilos.sectionTitle}>Quem é a Hecho</Texto>
          <Texto style={estilos.sectionText}>
            A Hecho nasce da vontade de unir estética, aconchego e propósito.
            Trabalhamos com peças feitas à mão, em pequena escala, valorizando
            o processo artesanal e a energia de cada criação.
          </Texto>

          <View style={estilos.bullets}>
            <View style={estilos.bulletRow}>
              <View style={estilos.bulletDot} />
              <Texto style={estilos.bulletText}>
                Produção autoral e cuidadosamente selecionada.
              </Texto>
            </View>
            <View style={estilos.bulletRow}>
              <View style={estilos.bulletDot} />
              <Texto style={estilos.bulletText}>
                Materiais que valorizam textura, aroma e conforto visual.
              </Texto>
            </View>
            <View style={estilos.bulletRow}>
              <View style={estilos.bulletDot} />
              <Texto style={estilos.bulletText}>
                Peças pensadas para criar rituais de pausa e bem-estar.
              </Texto>
            </View>
          </View>
        </View>

        {/* PRODUTOS */}
        <View style={estilos.sectionCard}>
          <Texto style={estilos.sectionLabel}>Coleções</Texto>
          <Texto style={estilos.sectionTitle}>Universos Hecho</Texto>
          <View style={estilos.chipsGrid}>
            <Texto style={estilos.chip}>Velas aromáticas</Texto>
            <Texto style={estilos.chip}>Crochê & macramê</Texto>
            <Texto style={estilos.chip}>Louça decoupage</Texto>
            <Texto style={estilos.chip}>Home spray</Texto>
            <Texto style={estilos.chip}>Kits presente</Texto>
          </View>
        </View>

        {/* TAROT */}
        <View style={estilos.tarotCard}>
          <Texto style={estilos.tarotLabel}>Astrologia & Tarot</Texto>
          <Texto style={estilos.tarotTitle}>Rituais que contam histórias</Texto>
          <Texto style={estilos.tarotText}>
            Além do artesanal, a Hecho também te acompanha em jornadas de
            autoconhecimento. Explore nosso tarot do dia e sinta qual mensagem
            conversa com o seu momento.
          </Texto>

          <View style={estilos.tarotComponentWrapper}>
            <TarotCard />
          </View>
        </View>

        {/* ESPAÇO EXTRA BEGE PARA NÃO FICAR SOB O BOTÃO DE TRILHA */}
        <View style={estilos.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f9f4ef", // bege da tela
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 140,
  },

  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    marginBottom: 18,
    backgroundColor: "#f1ecdd",
  },

  heroCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 18,
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 2,
    color: "#4a4420",
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    color: "#6f6840",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 10,
  },
  heroTagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 4,
  },
  heroTag: {
    fontSize: 11,
    color: "#6A6332",
    backgroundColor: "#f1ecdd",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginHorizontal: 4,
    marginVertical: 2,
  },

  bannerCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  bannerWrapper: {
    marginTop: 10,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  bannerVideo: {
    width: "100%",
    aspectRatio: 16 / 9,
  },

  sectionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#a08e61",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4a4420",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 13,
    color: "#625c37",
    lineHeight: 21,
  },

  bullets: {
    marginTop: 12,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#6A6332",
    marginTop: 6,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: "#625c37",
    lineHeight: 20,
  },

  chipsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  chip: {
    fontSize: 12,
    color: "#4a4420",
    backgroundColor: "#f1ecdd",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },

  // 🔮 TAROT
  tarotCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#e6e3d0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  tarotLabel: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#a08e61",
    marginBottom: 4,
  },
  tarotTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4a4420",
    marginBottom: 8,
  },
  tarotText: {
    fontSize: 13,
    color: "#625c37",
    lineHeight: 21,
    marginBottom: 14,
  },
  tarotComponentWrapper: {
    marginTop: 4,
    width: "100%",
    alignItems: "center",
  },

  bottomSpacer: {
    height: 80,
  },
});
