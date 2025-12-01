import React, { useRef, useState, useEffect } from "react";
import { Card, Button } from "react-native-paper";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal as RNModal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";

import Texto from "../../Componentes/Texto";
import {
  useFavoritos,
  ProdutoFavorito,
} from "../Lista de Desejos/FavoritosContext";
import { tema } from "../tema";

interface Produto extends ProdutoFavorito {
  categoria?: string;
}

interface ItemProps {
  cadaProduto: Produto;
}

const { width } = Dimensions.get("window");

export default function Item({ cadaProduto }: ItemProps) {
  const { favoritos, adicionarFavorito, removerFavorito } = useFavoritos();
  const [modalVisible, setModalVisible] = useState(false);
  const pagerRef = useRef<PagerView | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(0);

  const isFavorito = favoritos.some((f) => f.id === cadaProduto.id);

  const toggleFavorito = () => {
    if (isFavorito) {
      removerFavorito(cadaProduto.id);
    } else {
      adicionarFavorito(cadaProduto);
    }
  };

  const abrirDetalhes = () => setModalVisible(true);
  const fecharDetalhes = () => setModalVisible(false);

  const temSlider = Array.isArray(cadaProduto.slider) && cadaProduto.slider.length > 0;

  const irParaPagina = (page: number) => {
    if (!temSlider || !pagerRef.current) return;
    pagerRef.current.setPage(page);
  };

  useEffect(() => {
    if (!temSlider) return;
    setPaginaAtual(0);
  }, [modalVisible, temSlider]);

  return (
    <View style={styles.container}>
      <Card style={styles.card} elevation={0}>
        <TouchableOpacity activeOpacity={0.92} onPress={abrirDetalhes}>
          <Image source={cadaProduto.imagem} style={styles.image} />

          <View style={styles.cardInfo}>
            <Texto style={styles.nome}>{cadaProduto.nome}</Texto>
            {cadaProduto.categoria ? (
              <Texto style={styles.categoria}>{cadaProduto.categoria}</Texto>
            ) : null}
            <Texto style={styles.descricao}>{cadaProduto.descricao}</Texto>
            <Texto style={styles.preco}>
              R$ {cadaProduto.preco.toFixed(2).replace(".", ",")}
            </Texto>
          </View>
        </TouchableOpacity>

        <View style={styles.cardFooter}>
          <TouchableOpacity
            style={[styles.botaoDetalhes]}
            onPress={abrirDetalhes}
          >
            <Texto style={styles.botaoDetalhesTexto}>Ver detalhes</Texto>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoFavorito}
            onPress={toggleFavorito}
          >
            <Ionicons
              name={isFavorito ? "heart" : "heart-outline"}
              size={24}
              color={isFavorito ? "#D65B5B" : "#B0AA8B"}
            />
          </TouchableOpacity>
        </View>
      </Card>

      {/* MODAL DETALHES */}
      <RNModal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={fecharDetalhes}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={fecharDetalhes}
            >
              <Ionicons name="close" size={18} color="#fff" />
            </TouchableOpacity>

            {/* Slider de imagens */}
            <View style={styles.modalImagemContainer}>
              {temSlider ? (
                <>
                  <PagerView
                    style={styles.pager}
                    initialPage={0}
                    ref={pagerRef}
                    onPageSelected={(e) =>
                      setPaginaAtual(e.nativeEvent.position)
                    }
                  >
                    {cadaProduto.slider!.map((img: any, index: number) => (
                      <View style={styles.pagina} key={index}>
                        <Image source={img} style={styles.modalImagem} />
                      </View>
                    ))}
                  </PagerView>

                  <View style={styles.pageIndicatorContainer}>
                    {cadaProduto.slider!.map((_, index: number) => (
                      <View
                        key={index}
                        style={[
                          styles.pageIndicatorDot,
                          paginaAtual === index &&
                            styles.pageIndicatorDotActive,
                        ]}
                      />
                    ))}
                  </View>
                </>
              ) : (
                <Image
                  source={cadaProduto.imagem}
                  style={styles.modalImagem}
                />
              )}
            </View>

            <Texto style={styles.nomeModal}>{cadaProduto.nome}</Texto>

            <Texto style={styles.precoModal}>
              R$ {cadaProduto.preco.toFixed(2).replace(".", ",")}
            </Texto>

            {cadaProduto.descricaoDetalhada ? (
              <Texto style={styles.descricaoDetalhada}>
                {cadaProduto.descricaoDetalhada}
              </Texto>
            ) : (
              <Texto style={styles.descricaoDetalhada}>
                Peça criada com carinho, seguindo o estilo e a autenticidade da
                Hecho – perfeita para compor um cantinho especial.
              </Texto>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.botaoFavoritoModal}
                onPress={toggleFavorito}
              >
                <Ionicons
                  name={isFavorito ? "heart" : "heart-outline"}
                  size={20}
                  color={isFavorito ? "#D65B5B" : tema.cores.primario}
                />
                <Texto style={styles.botaoFavoritoModalTexto}>
                  {isFavorito ? "Remover dos favoritos" : "Salvar nos favoritos"}
                </Texto>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RNModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  card: {
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: tema.cores.card,
    borderWidth: 1,
    borderColor: tema.cores.bordaSuave,
    ...tema.sombra.card,
  },
  image: {
    width: "100%",
    height: 260,
  },
  cardInfo: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 8,
  },
  nome: {
    fontWeight: "700",
    fontSize: 17,
    color: tema.cores.textoTitulo,
    marginBottom: 4,
  },
  categoria: {
    fontSize: 12,
    color: tema.cores.primarioSuave,
    marginBottom: 4,
  },
  descricao: {
    fontSize: 13.5,
    color: tema.cores.textoPadrao,
    marginBottom: 8,
  },
  preco: {
    fontSize: 16,
    fontWeight: "700",
    color: tema.cores.primario,
    backgroundColor: tema.cores.fundoSecundario,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: tema.radius.sm,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: tema.cores.bordaSuave,
  },
  botaoDetalhes: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: tema.cores.primario,
    borderRadius: tema.radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  botaoDetalhesTexto: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    marginRight: 4,
  },
  botaoFavorito: {
    padding: 4,
  },

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: tema.cores.card,
    borderRadius: 24,
    padding: 20,
    width: "92%",
    maxHeight: "88%",
    ...tema.sombra.card,
  },
  modalCloseButton: {
    position: "absolute",
    right: 12,
    top: 12,
    zIndex: 1,
    backgroundColor: tema.cores.primario,
    borderRadius: 999,
    padding: 6,
  },
  modalImagemContainer: {
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 14,
  },
  pager: {
    width: "100%",
    height: width * 0.7,
  },
  pagina: {
    flex: 1,
  },
  modalImagem: {
    width: "100%",
    height: width * 0.7,
    resizeMode: "cover",
  },
  pageIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  pageIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e6e3d0",
    marginHorizontal: 4,
  },
  pageIndicatorDotActive: {
    backgroundColor: "#6A6332",
    width: 10,
    height: 10,
  },
  nomeModal: {
    fontSize: 18,
    fontWeight: "700",
    color: tema.cores.textoTitulo,
    textAlign: "center",
    marginBottom: 4,
  },
  precoModal: {
    fontSize: 16,
    fontWeight: "700",
    color: tema.cores.primario,
    textAlign: "center",
    marginBottom: 10,
  },
  descricaoDetalhada: {
    fontSize: 14,
    color: tema.cores.textoPadrao,
    lineHeight: 21,
    marginBottom: 16,
    textAlign: "left",
  },
  modalActions: {
    borderTopWidth: 1,
    borderTopColor: tema.cores.bordaSuave,
    paddingTop: 12,
    alignItems: "center",
  },
  botaoFavoritoModal: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: tema.radius.pill,
    borderWidth: 1,
    borderColor: tema.cores.primario,
  },
  botaoFavoritoModalTexto: {
    fontSize: 13,
    fontWeight: "600",
    color: tema.cores.primario,
    marginLeft: 8,
  },
});
