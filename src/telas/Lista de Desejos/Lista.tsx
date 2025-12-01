import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Texto from "../../Componentes/Texto";
import { useFavoritos } from "./FavoritosContext";
import { Ionicons } from "@expo/vector-icons";

export default function ListaDeDesejos() {
  const { favoritos, removerFavorito } = useFavoritos();
  const vazio = favoritos.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Ionicons name="heart-outline" size={26} color="#6A6332" />
          <View>
            <Texto style={styles.titulo}>Meus favoritos</Texto>
            <Texto style={styles.subtitulo}>
              Salve aqui as peças que mais te encantam.
            </Texto>
          </View>
        </View>

        {vazio ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="heart-dislike-outline"
              size={42}
              color="#B0AA8B"
              style={{ marginBottom: 8 }}
            />
            <Texto style={styles.emptyTitle}>Sua lista está vazia</Texto>
            <Texto style={styles.emptyText}>
              Toque no coração dos produtos para guardar seus preferidos e
              montar seu ritual Hecho.
            </Texto>
          </View>
        ) : (
          favoritos.map((produto) => (
            <View key={produto.id} style={styles.card}>
              <Image source={produto.imagem} style={styles.imagem} />

              <View style={styles.info}>
                <Texto style={styles.nome}>{produto.nome}</Texto>
                <Texto style={styles.descricao} numberOfLines={2}>
                  {produto.descricao}
                </Texto>

                <View style={styles.footerCard}>
                  <Texto style={styles.preco}>
                    R$ {produto.preco.toFixed(2).replace(".", ",")}
                  </Texto>
                  <View style={styles.tagContainer}>
                    <Texto style={styles.tag}>Feito à mão</Texto>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.botaoRemover}
                onPress={() => removerFavorito(produto.id)}
              >
                <Ionicons name="trash-outline" size={18} color="#B44B4B" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f4ef",
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f4ef",
    paddingHorizontal: 16,
    paddingTop: 40, // mais afastado do topo
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4a4420",
  },
  subtitulo: {
    fontSize: 12,
    color: "#7a7449",
  },

  emptyState: {
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4a4420",
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 13,
    color: "#6f6840",
    textAlign: "center",
    lineHeight: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    marginBottom: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ece3d6",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  nome: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4a4420",
    marginBottom: 2,
  },
  descricao: {
    fontSize: 13,
    color: "#6f6840",
  },
  footerCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  preco: {
    fontSize: 15,
    fontWeight: "700",
    color: "#6A6332",
  },
  tagContainer: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#e6e3d0",
  },
  tag: {
    color: "#6A6332",
    fontWeight: "bold",
    fontSize: 11.5,
  },
  botaoRemover: {
    marginLeft: 8,
    padding: 6,
    backgroundColor: "#f9f6f0",
    borderRadius: 50,
    alignSelf: "flex-start",
  },
});
