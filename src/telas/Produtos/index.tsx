import React from "react";
import { View, FlatList, StyleSheet, SafeAreaView } from "react-native";
import Texto from "../../Componentes/Texto";
import Item from "./Item";

interface Props {
  itens: {
    lista: any[];
  };
}

export default function Produtos({ itens }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <Texto style={styles.title}>Coleção Hecho</Texto>
          <Texto style={styles.subtitle}>
            Peças artesanais selecionadas com cuidado para o seu espaço.
          </Texto>
        </View>

        <FlatList
          data={itens.lista}
          renderItem={({ item }) => <Item cadaProduto={item} />}
          keyExtractor={(item) => String(item.id ?? item.nome)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f4ef",
  },
  screen: {
    flex: 1,
    backgroundColor: "#f9f4ef",
    paddingHorizontal: 16,
    paddingTop: 40, // mais afastado do topo
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#4a4420",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#6f6840",
  },
  listContent: {
    paddingBottom: 32,
    paddingTop: 6,
  },
});
