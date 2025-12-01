import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import Texto from "./Texto";

const translateCardName = (name: string) => {
  const translations: Record<string, string> = {
    "The Fool": "O Louco",
    "The Magician": "O Mago",
    "The High Priestess": "A Sacerdotisa",
    "The Empress": "A Imperatriz",
    "The Emperor": "O Imperador",
    "The Hierophant": "O Hierofante",
    "The Lovers": "Os Amantes",
    "The Chariot": "A Carruagem",
    Strength: "A Força",
    "The Hermit": "O Eremita",
    "Wheel of Fortune": "A Roda da Fortuna",
    Justice: "A Justiça",
    "The Hanged Man": "O Enforcado",
    Death: "A Morte",
    Temperance: "A Temperança",
    "The Devil": "O Diabo",
    "The Tower": "A Torre",
    "The Star": "A Estrela",
    "The Moon": "A Lua",
    "The Sun": "O Sol",
    Judgement: "O Julgamento",
    "The World": "O Mundo",
  };
  return translations[name] || name;
};

const getProductSuggestion = (cardName: string) => {
  const suggestions: Record<string, string> = {
    "The Fool":
      "Traga um toque de espontaneidade com nossas velas aromáticas de lavanda.",
    "The Magician":
      "Potencialize sua energia com nosso kit aromático para manifestação.",
    "The High Priestess":
      "Harmonize seu espaço com sândalo e jasmim.",
    "The Empress":
      "Decore com macramê e fibras naturais.",
    "The Emperor":
      "Traga estrutura ao ambiente com crochê artesanal.",
    "The Hierophant":
      "Crie rituais diários com nossos home sprays.",
    "The Lovers":
      "Harmonize o ambiente com velas decoradas.",
    "The Chariot":
      "Impulsione sua energia com nossa coleção energética.",
    Strength:
      "Fortaleça seu lar com flores secas e velas.",
    "The Hermit":
      "Ilumine momentos de introspecção com velas meditativas.",
    "Wheel of Fortune":
      "Atraia prosperidade com velas douradas.",
    Justice:
      "Busque equilíbrio com essências calmantes.",
    "The Hanged Man":
      "Transforme o olhar com espelhos artesanais.",
    Death:
      "Renove-se com aromatizantes transformadores.",
    Temperance:
      "Encontre harmonia com difusores e velas.",
    "The Devil":
      "Limpe energias com velas purificadoras.",
    "The Tower":
      "Proteja seu lar com velas protetoras.",
    "The Star":
      "Ilumine sonhos com luminárias artesanais.",
    "The Moon":
      "Explore a intuição com velas lunares.",
    "The Sun":
      "Aqueça o ambiente com velas solares.",
    Judgement:
      "Desperte sentidos com nossa linha premium.",
    "The World":
      "Complete o ambiente com decoração artesanal.",
  };

  return (
    suggestions[cardName] ||
    "Explore nossa coleção artesanal para harmonizar seu ambiente."
  );
};

const translateCardMeaning = (meaning: any, cardName: string) => {
  const customMessages: Record<string, string> = {
    "The Fool":
      "Um novo começo está chegando. Confie em sua intuição e siga com leveza.",
    "The Magician":
      "Você tem todas as ferramentas que precisa. Use seu poder pessoal com intenção.",
    "The High Priestess":
      " Seu lado intuitivo está forte. O silêncio revelará respostas.",
    "The Empress":
      "Criatividade, acolhimento e abundância estão em destaque.",
    "The Emperor":
      "Momento de estruturar sua vida e assumir controle.",
    "The Hierophant":
      "Tradição, rituais e sabedoria espiritual te guiam.",
    "The Lovers":
      "Escolhas importantes pedem alinhamento com o coração.",
    "The Chariot":
      "Determinação trará vitória em breve.",
    Strength:
      "Sua força interior será suficiente para superar desafios.",
    "The Hermit":
      "Procure introspecção e escuta interna.",
    "Wheel of Fortune":
      "Mudanças positivas se aproximam.",
    Justice:
      "Equilíbrio e honestidade serão cruciais.",
    "The Hanged Man":
      "Mudança de perspectiva trará clareza.",
    Death:
      "Fim de ciclo necessário para o novo florescer.",
    Temperance:
      "Equilíbrio emocional e harmonia são essenciais.",
    "The Devil":
      "Liberte-se do que te limita.",
    "The Tower":
      "Mudanças inesperadas trazem renovação.",
    "The Star":
      "Esperança e inspiração iluminam seu caminho.",
    "The Moon":
      "Confie mais na intuição do que nas aparências.",
    "The Sun":
      "Alegria, vitalidade e clareza estão chegando.",
    Judgement:
      "Despertar interno e renovação profunda.",
    "The World":
      "Ciclo completo e sensação de realização.",
  };
  return customMessages[cardName] || "Uma energia especial envolve seu dia.";
};

type TarotCardState = {
  name: string;
  image: string;
  meaning: string;
};

export default function TarotCard() {
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState<TarotCardState | null>(null);

  const getImageUrl = (cardName: string) => {
    const cardNumbers: Record<string, string> = {
      "The Fool": "00",
      "The Magician": "01",
      "The High Priestess": "02",
      "The Empress": "03",
      "The Emperor": "04",
      "The Hierophant": "05",
      "The Lovers": "06",
      "The Chariot": "07",
      Strength: "08",
      "The Hermit": "09",
      "Wheel of Fortune": "10",
      Justice: "11",
      "The Hanged Man": "12",
      Death: "13",
      Temperance: "14",
      "The Devil": "15",
      "The Tower": "16",
      "The Star": "17",
      "The Moon": "18",
      "The Sun": "19",
      Judgement: "20",
      "The World": "21",
    };

    const number = cardNumbers[cardName];
    return `https://www.sacred-texts.com/tarot/pkt/img/ar${number}.jpg`;
  };

  const drawCard = async () => {
    setLoading(true);

    try {
      const allCards = [
        "The Fool",
        "The Magician",
        "The High Priestess",
        "The Empress",
        "The Emperor",
        "The Hierophant",
        "The Lovers",
        "The Chariot",
        "Strength",
        "The Hermit",
        "Wheel of Fortune",
        "Justice",
        "The Hanged Man",
        "Death",
        "Temperance",
        "The Devil",
        "The Tower",
        "The Star",
        "The Moon",
        "The Sun",
        "Judgement",
        "The World",
      ];

      const randomCard =
        allCards[Math.floor(Math.random() * allCards.length)];

      const meaning = translateCardMeaning(null, randomCard);

      setCard({
        name: randomCard,
        image: getImageUrl(randomCard),
        meaning,
      });
    } catch (error) {
      console.error("Erro ao tirar carta:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Card branco estilo Hecho */}
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.button}
          onPress={drawCard}
          disabled={loading}
          activeOpacity={0.9}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#f9f4ef" />
          ) : (
            <Texto style={styles.buttonText}>🔮 Tirar carta do tarot</Texto>
          )}
        </TouchableOpacity>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#6A6332" />
            <Texto style={styles.loadingText}>Embaralhando...</Texto>
          </View>
        )}

        {card && !loading && (
          <>
            <Texto style={styles.dataTexto}>
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Texto>

            <View style={styles.imageWrapper}>
              <Image
                source={{
                  uri: card.image,
                  headers: { "User-Agent": "Mozilla/5.0" },
                }}
                style={styles.cardImage}
                resizeMode="contain"
              />
            </View>

            <Texto style={styles.cardName}>{translateCardName(card.name)}</Texto>

            <Texto style={styles.cardMeaning}>
              {card.meaning}
            </Texto>

            <View style={styles.divisor} />

            <Texto style={styles.footerTitulo}>
              Harmonize com um toque Hecho:
            </Texto>
            <Texto style={styles.productSuggestion}>
              {getProductSuggestion(card.name)}
            </Texto>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e6e3d0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3.84,
    elevation: 3,
  },
  button: {
    backgroundColor: "#6A6332",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  loadingText: {
    marginTop: 4,
    fontSize: 12,
    color: "#6A6332",
  },
  dataTexto: {
    fontSize: 12,
    color: "#8d885c",
    textAlign: "center",
    marginBottom: 12,
    fontStyle: "italic",
  },
  imageWrapper: {
    alignSelf: "center",
    padding: 6,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#e6e3d0",
    marginBottom: 10,
  },
  cardImage: {
    width: 120,
    height: 190,
    borderRadius: 8,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6A6332",
    textAlign: "center",
    marginBottom: 8,
  },
  cardMeaning: {
    fontSize: 13,
    color: "#444",
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 12,
  },
  divisor: {
    height: 1,
    backgroundColor: "#e6e3d0",
    marginVertical: 12,
  },
  footerTitulo: {
    fontSize: 13,
    color: "#6A6332",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
  },
  productSuggestion: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
    textAlign: "center",
  },
});
