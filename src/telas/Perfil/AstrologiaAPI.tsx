import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";

// Offset para compensar barra de status no Android
const ANDROID_OFFSET =
  Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

interface DadosAstrologicos {
  signo: string;
  elemento: string;
  caracteristicas: string;
  horoscopo: string;
  idade?: number;
  compatibilidade?: string;
  humor?: string;
  cor?: string;
  numeroSorte?: string;
}

// ---------- HELPERS DE LÓGICA ASTROLÓGICA ----------

function calcularSigno(dia: number, mes: number): string {
  if ((dia >= 21 && mes === 3) || (dia <= 20 && mes === 4)) return "Áries";
  if ((dia >= 21 && mes === 4) || (dia <= 20 && mes === 5)) return "Touro";
  if ((dia >= 21 && mes === 5) || (dia <= 20 && mes === 6)) return "Gêmeos";
  if ((dia >= 21 && mes === 6) || (dia <= 22 && mes === 7)) return "Câncer";
  if ((dia >= 23 && mes === 7) || (dia <= 22 && mes === 8)) return "Leão";
  if ((dia >= 23 && mes === 8) || (dia <= 22 && mes === 9)) return "Virgem";
  if ((dia >= 23 && mes === 9) || (dia <= 22 && mes === 10)) return "Libra";
  if ((dia >= 23 && mes === 10) || (dia <= 21 && mes === 11)) return "Escorpião";
  if ((dia >= 22 && mes === 11) || (dia <= 21 && mes === 12)) return "Sagitário";
  if ((dia >= 22 && mes === 12) || (dia <= 20 && mes === 1)) return "Capricórnio";
  if ((dia >= 21 && mes === 1) || (dia <= 18 && mes === 2)) return "Aquário";
  if ((dia >= 19 && mes === 2) || (dia <= 20 && mes === 3)) return "Peixes";
  return "Signo desconhecido";
}

function getElemento(signo: string): string {
  const fogo = ["Áries", "Leão", "Sagitário"];
  const terra = ["Touro", "Virgem", "Capricórnio"];
  const ar = ["Gêmeos", "Libra", "Aquário"];
  const agua = ["Câncer", "Escorpião", "Peixes"];

  if (fogo.includes(signo)) return "Fogo";
  if (terra.includes(signo)) return "Terra";
  if (ar.includes(signo)) return "Ar";
  if (agua.includes(signo)) return "Água";
  return "Desconhecido";
}

function getCaracteristicas(signo: string): string {
  const mapa: Record<string, string> = {
    Áries: "Impulsivo, direto, cheio de iniciativa e coragem.",
    Touro: "Paciente, sensorial, persistente e amante do conforto.",
    Gêmeos: "Comunicativo, curioso, versátil e mentalmente ágil.",
    Câncer: "Sensível, acolhedor, nostálgico e intuitivo.",
    Leão: "Expressivo, generoso, criativo e cheio de brilho.",
    Virgem: "Detalhista, organizado, analítico e prestativo.",
    Libra: "Diplomático, sociável, estético e busca harmonia.",
    Escorpião: "Intenso, profundo, transformador e misterioso.",
    Sagitário: "Expansivo, aventureiro, filosófico e otimista.",
    Capricórnio: "Responsável, ambicioso, focado e disciplinado.",
    Aquário: "Original, idealista, inovador e independente.",
    Peixes: "Empático, sonhador, artístico e espiritualizado.",
  };
  return (
    mapa[signo] ||
    "Uma energia única, com traços muito pessoais e singulares."
  );
}

function getHoroscopo(signo: string): string {
  const mapa: Record<string, string> = {
    Áries: "Hoje é dia de dar o primeiro passo em algo que você vem adiando.",
    Touro: "Busque conforto em pequenos rituais. Seu corpo pede aconchego.",
    Gêmeos: "Conversas importantes podem abrir portas inesperadas.",
    Câncer: "Cuide do seu espaço emocional. Uma pausa será bem-vinda.",
    Leão: "Seu brilho está em alta. Não tenha medo de se posicionar.",
    Virgem: "Organizar sua rotina vai aliviar muitas tensões internas.",
    Libra: "Equilibrar limites e afetos será o tema do dia.",
    Escorpião: "Transformações internas estão amadurecendo em silêncio.",
    Sagitário: "Planeje um novo horizonte: uma viagem, um estudo, uma expansão.",
    Capricórnio: "Pequenos passos consistentes valem mais do que grandes impulsos.",
    Aquário: "Uma ideia diferente pode ser a chave para desbloquear algo.",
    Peixes: "Sonhos e intuições estão mais fortes. Anote o que sentir.",
  };
  return (
    mapa[signo] ||
    "O dia pede escuta interna, presença e gentileza consigo mesmx."
  );
}

function getExtras(signo: string) {
  const mapa: Record<
    string,
    { compatibilidade: string; humor: string; cor: string; numeroSorte: string }
  > = {
    Áries: {
      compatibilidade: "Leão, Sagitário",
      humor: "Corajoso",
      cor: "Vermelho queimado",
      numeroSorte: "1",
    },
    Touro: {
      compatibilidade: "Virgem, Capricórnio",
      humor: "Sereno",
      cor: "Verde oliva",
      numeroSorte: "4",
    },
    Gêmeos: {
      compatibilidade: "Libra, Aquário",
      humor: "Curioso",
      cor: "Amarelo suave",
      numeroSorte: "5",
    },
    Câncer: {
      compatibilidade: "Peixes, Escorpião",
      humor: "Sensível",
      cor: "Prata",
      numeroSorte: "2",
    },
    Leão: {
      compatibilidade: "Áries, Sagitário",
      humor: "Confiante",
      cor: "Dourado",
      numeroSorte: "8",
    },
    Virgem: {
      compatibilidade: "Touro, Capricórnio",
      humor: "Prático",
      cor: "Bege",
      numeroSorte: "6",
    },
    Libra: {
      compatibilidade: "Gêmeos, Aquário",
      humor: "Diplomático",
      cor: "Rosa claro",
      numeroSorte: "7",
    },
    Escorpião: {
      compatibilidade: "Câncer, Peixes",
      humor: "Intenso",
      cor: "Vinho",
      numeroSorte: "9",
    },
    Sagitário: {
      compatibilidade: "Áries, Leão",
      humor: "Aventureiro",
      cor: "Azul royal",
      numeroSorte: "3",
    },
    Capricórnio: {
      compatibilidade: "Touro, Virgem",
      humor: "Focado",
      cor: "Cinza grafite",
      numeroSorte: "10",
    },
    Aquário: {
      compatibilidade: "Gêmeos, Libra",
      humor: "Original",
      cor: "Turquesa",
      numeroSorte: "11",
    },
    Peixes: {
      compatibilidade: "Câncer, Escorpião",
      humor: "Sonhador",
      cor: "Azul água",
      numeroSorte: "12",
    },
  };

  return (
    mapa[signo] || {
      compatibilidade: "Signos afins de coração aberto",
      humor: "Profundo",
      cor: "Neutros aconchegantes",
      numeroSorte: "0",
    }
  );
}

function calcularIdade(ano: number | null): number | undefined {
  if (!ano) return undefined;
  const hoje = new Date();
  return hoje.getFullYear() - ano;
}

// ---------- COMPONENTE PRINCIPAL ----------

export default function AstrologiaAPI() {
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [dadosAstrologicos, setDadosAstrologicos] =
    useState<DadosAstrologicos | null>(null);

  function handleInputChange(
    text: string,
    setter: (v: string) => void,
    maxLength: number
  ) {
    const numeric = text.replace(/\D/g, "");
    setter(numeric.slice(0, maxLength));
  }

  function validarDia(valor: string) {
    const n = Number(valor);
    return n >= 1 && n <= 31;
  }

  function validarMes(valor: string) {
    const n = Number(valor);
    return n >= 1 && n <= 12;
  }

  function validarAno(valor: string) {
    const n = Number(valor);
    return n >= 1900 && n <= new Date().getFullYear();
  }

  function handleAnalisar() {
    if (!validarDia(dia) || !validarMes(mes) || !validarAno(ano)) {
      return;
    }

    const d = Number(dia);
    const m = Number(mes);
    const y = Number(ano);

    const signo = calcularSigno(d, m);
    const elemento = getElemento(signo);
    const caracteristicas = getCaracteristicas(signo);
    const horoscopo = getHoroscopo(signo);
    const idade = calcularIdade(y);
    const extras = getExtras(signo);

    setDadosAstrologicos({
      signo,
      elemento,
      caracteristicas,
      horoscopo,
      idade,
      compatibilidade: extras.compatibilidade,
      humor: extras.humor,
      cor: extras.cor,
      numeroSorte: extras.numeroSorte,
    });
  }

  const botaoDesabilitado =
    !validarDia(dia) || !validarMes(mes) || !validarAno(ano);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={ANDROID_OFFSET + 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.titulo}>Perfil Astrológico 🔮</Text>

          {/* Inputs de data */}
          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dia</Text>
              <TextInput
                style={styles.inputSmall}
                placeholder="DD"
                value={dia}
                onChangeText={(text) => handleInputChange(text, setDia, 2)}
                keyboardType="numeric"
                maxLength={2}
                placeholderTextColor="#999"
              />
            </View>

            <Text style={styles.separator}>/</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mês</Text>
              <TextInput
                style={styles.inputSmall}
                placeholder="MM"
                value={mes}
                onChangeText={(text) => handleInputChange(text, setMes, 2)}
                keyboardType="numeric"
                maxLength={2}
                placeholderTextColor="#999"
              />
            </View>

            <Text style={styles.separator}>/</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ano</Text>
              <TextInput
                style={styles.inputMedium}
                placeholder="AAAA"
                value={ano}
                onChangeText={(text) => handleInputChange(text, setAno, 4)}
                keyboardType="numeric"
                maxLength={4}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Botão */}
          <TouchableOpacity
            style={[styles.botao, botaoDesabilitado && styles.botaoDesabilitado]}
            onPress={handleAnalisar}
            disabled={botaoDesabilitado}
          >
            <Text style={styles.botaoTexto}>Ver perfil astrológico</Text>
          </TouchableOpacity>

          {/* Resultado */}
          {dadosAstrologicos && (
            <View style={styles.resultadoContainer}>
              <Text style={styles.signoTexto}>{dadosAstrologicos.signo}</Text>

              {dadosAstrologicos.idade !== undefined && (
                <Text style={styles.idadeTexto}>
                  {dadosAstrologicos.idade} anos de jornada
                </Text>
              )}

              <Text style={styles.elementoTexto}>
                Elemento: {dadosAstrologicos.elemento}
              </Text>

              <Text style={styles.caracteristicasTexto}>
                {dadosAstrologicos.caracteristicas}
              </Text>

              <View style={styles.divisor} />

              <Text style={styles.sectionTitle}>Horóscopo do dia</Text>
              <Text style={styles.horoscopoTexto}>
                {dadosAstrologicos.horoscopo}
              </Text>

              <View style={styles.divisor} />

              {dadosAstrologicos.compatibilidade && (
                <Text style={styles.infoExtra}>
                  Compatibilidade de hoje: {dadosAstrologicos.compatibilidade}
                </Text>
              )}
              {dadosAstrologicos.humor && (
                <Text style={styles.infoExtra}>
                  Clima emocional: {dadosAstrologicos.humor}
                </Text>
              )}
              {dadosAstrologicos.cor && (
                <Text style={styles.infoExtra}>
                  Cor para harmonizar: {dadosAstrologicos.cor}
                </Text>
              )}
              {dadosAstrologicos.numeroSorte && (
                <Text style={styles.infoExtra}>
                  Número de sorte: {dadosAstrologicos.numeroSorte}
                </Text>
              )}
            </View>
          )}
        </View>

        {/* 👇 Espaço extra bege para o botão de trilha não cobrir nada */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ---------- ESTILOS ----------

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: "#f9f4ef", // bege do app
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 140, // 👈 mais espaço bege na parte de baixo
    flexGrow: 1,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6A6332",
    marginBottom: 20,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  inputGroup: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  inputSmall: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#e6e3d0",
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#fff",
  },
  inputMedium: {
    width: 80,
    height: 50,
    borderWidth: 2,
    borderColor: "#e6e3d0",
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#fff",
  },
  separator: {
    fontSize: 24,
    color: "#6A6332",
    fontWeight: "bold",
    marginBottom: 10,
    marginHorizontal: 5,
  },
  botao: {
    backgroundColor: "#6A6332",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  botaoDesabilitado: {
    backgroundColor: "#ccc",
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultadoContainer: {
    marginTop: 20,
  },
  signoTexto: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6A6332",
    textAlign: "center",
  },
  idadeTexto: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  elementoTexto: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6A6332",
    marginTop: 6,
    textAlign: "center",
  },
  caracteristicasTexto: {
    fontSize: 15,
    color: "#444",
    marginVertical: 8,
    lineHeight: 22,
    textAlign: "center",
  },
  divisor: {
    height: 1,
    backgroundColor: "#e6e3d0",
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A6332",
    marginBottom: 8,
    textAlign: "center",
  },
  horoscopoTexto: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    fontStyle: "italic",
    textAlign: "center",
  },
  infoExtra: {
    fontSize: 14,
    color: "#6A6332",
    marginBottom: 3,
    textAlign: "center",
  },
});
