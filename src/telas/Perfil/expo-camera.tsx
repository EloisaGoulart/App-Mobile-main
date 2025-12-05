import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Texto from "../../Componentes/Texto";
import styles from "./estilosperfil";
import supabase from "../supabase";
import { useFavoritos } from "../Lista de Desejos/FavoritosContext";

const STORAGE_KEY_PROFILE_ID = "@hecho_profile_id";

// ---------------- HELPERS ----------------

function formatarDataDigitada(valor: string) {
  const digits = valor.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function normalizarDataParaISO(valor: string): string | null {
  const digits = valor.replace(/\D/g, "");
  if (digits.length === 0) return null;
  if (digits.length !== 8) return null;
  const dia = digits.slice(0, 2);
  const mes = digits.slice(2, 4);
  const ano = digits.slice(4);
  return `${ano}-${mes}-${dia}`;
}

function emailValido(email: string): boolean {
  if (!email) return false;
  const trimmed = email.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(trimmed);
}

async function emailJaExiste(email: string, ignorarId?: string | null) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email);

  if (error) {
    console.log("Erro ao verificar email:", error);
    return false;
  }

  if (!data || data.length === 0) return false;
  if (!ignorarId) return true;

  return data.some((p) => p.id !== ignorarId);
}

// ---------------- COMPONENTE ----------------

export default function PerfilCamera() {
  const [facing, setFacing] = useState<CameraType>("front");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cidade, setCidade] = useState("");

  const [fotoUri, setFotoUri] = useState<string | null>(null);

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);

  const { limparFavoritos } = useFavoritos();

  useEffect(() => {
    carregarPerfilAtivo();
  }, []);

  // ---------- CARREGAR PERFIL ATIVO ----------
  async function carregarPerfilAtivo() {
    try {
      const storedId = await AsyncStorage.getItem(STORAGE_KEY_PROFILE_ID);

      if (!storedId) {
        setCarregando(false);
        return;
      }

      setProfileId(storedId);

      const { data: perfil, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", storedId)
        .maybeSingle();

      if (error) console.log("Erro ao buscar perfil:", error);

      if (perfil) {
        setNome(perfil.nome ?? "");
        setEmail(perfil.email ?? "");
        setTelefone(perfil.telefone ?? "");
        setCidade(perfil.cidade ?? "");

        if (perfil.data_nascimento) {
          const [ano, mes, dia] = perfil.data_nascimento.split("-");
          setDataNascimento(`${dia}/${mes}/${ano}`);
        }
        if (perfil.foto_url) setFotoUri(perfil.foto_url);
      }
    } catch (e) {
      console.log("Erro inesperado ao carregar perfil:", e);
    } finally {
      setCarregando(false);
    }
  }

  // ---------- CÂMERA ----------
  function alternarCamera() {
    setFacing((p) => (p === "back" ? "front" : "back"));
  }

  async function abrirCamera() {
    if (!permission) return;

    if (!permission.granted) {
      const res = await requestPermission();
      if (!res.granted) {
        Alert.alert(
          "Permissão necessária",
          "Precisamos da câmera para atualizar sua foto."
        );
        return;
      }
    }

    setIsCameraOpen(true);
  }

  async function tirarFoto() {
    try {
      if (!cameraRef.current) return;
      const foto = await cameraRef.current.takePictureAsync();
      if (foto?.uri) {
        setFotoUri(foto.uri);
        setIsCameraOpen(false);
      }
    } catch (e) {
      Alert.alert("Erro", "Não foi possível capturar a foto.");
    }
  }

  // ---------- UPLOAD DE FOTO ----------
  async function uploadAvatar(uri: string): Promise<string | null> {
    try {
      if (uri.startsWith("http")) return uri;

      const response = await fetch(uri);
      const blob = await response.blob();

      const fileName = `${Date.now()}.jpg`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(fileName, blob, {
          contentType: "image/jpeg",
          upsert: false,
        });

      if (error) {
        console.log("Erro Supabase upload:", error);
        return null;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
      return data.publicUrl;
    } catch (e) {
      console.log("Erro inesperado upload:", e);
      return null;
    }
  }

  // ---------- SALVAR PERFIL ----------
  async function salvarPerfil() {
    try {
      setSalvando(true);

      // Validações de campos obrigatórios
      if (!nome.trim()) {
        Alert.alert("Nome obrigatório", "Por favor, preencha o nome.");
        return;
      }

      if (!emailValido(email)) {
        Alert.alert(
          "E-mail inválido",
          "Digite um e-mail válido, por exemplo: nome@dominio.com"
        );
        return;
      }

      const dataISO = dataNascimento
        ? normalizarDataParaISO(dataNascimento)
        : null;

      if (dataNascimento && !dataISO) {
        Alert.alert(
          "Data inválida",
          "Use o formato DD/MM/AAAA, por exemplo 01/08/1995."
        );
        return;
      }

      // Verifica email
      const existe = await emailJaExiste(email.trim(), profileId);
      if (existe) {
        Alert.alert(
          "E-mail já cadastrado",
          "Este e-mail já está sendo usado em outro perfil."
        );
        return;
      }

      // subir a foto
      let fotoUrl: string | null = null;
      if (fotoUri) {
        const uploaded = await uploadAvatar(fotoUri);
        if (uploaded) {
          fotoUrl = uploaded;
        } else {
          console.log("Falha ao enviar foto, seguindo sem atualizar foto_url.");
        }
      }

      const payload = {
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim(),
        cidade: cidade.trim(),
        data_nascimento: dataISO,
        foto_url: fotoUrl ?? fotoUri ?? null,
      };

      // Salva perfil
      if (profileId) {
        const { error } = await supabase
          .from("profiles")
          .update(payload)
          .eq("id", profileId);

        if (error) {
          console.log("Erro ao atualizar perfil:", error);
          Alert.alert("Erro", "Não foi possível salvar seu perfil agora.");
          return;
        }
      } else {
        const { data, error } = await supabase
          .from("profiles")
          .insert(payload)
          .select("id")
          .single();

        if (error) {
          console.log("Erro ao criar perfil:", error);
          Alert.alert("Erro", "Não foi possível criar seu perfil agora.");
          return;
        }

        if (data?.id) {
          setProfileId(data.id);
          await AsyncStorage.setItem(STORAGE_KEY_PROFILE_ID, data.id);
        }
      }

      Alert.alert("Perfil atualizado", "Seus dados foram salvos com sucesso.");
    } catch (e) {
      console.log("Erro geral ao salvar perfil:", e);
      Alert.alert("Erro", "Algo inesperado aconteceu ao salvar o perfil.");
    } finally {
      setSalvando(false);
    }
  }

  // ---------- CRIAR NOVO PERFIL ----------
  async function criarNovoPerfil() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY_PROFILE_ID);
      limparFavoritos();

      setProfileId(null);
      setNome("");
      setEmail("");
      setTelefone("");
      setCidade("");
      setDataNascimento("");
      setFotoUri(null);
      setIsCameraOpen(false);

      Alert.alert(
        "Novo perfil",
        "Preencha os dados para adicionar outra conta. Os favoritos foram limpos para este novo perfil."
      );
    } catch (e) {
      console.log("Erro ao criar novo perfil:", e);
      Alert.alert(
        "Erro",
        "Não foi possível iniciar um novo perfil. Tente novamente."
      );
    }
  }

  if (!permission) {
    return <View style={{ flex: 1, backgroundColor: "#f9f4ef" }} />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoiding}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardContainer}>
          <Texto style={styles.cardTitle}>
            {profileId ? "Seu perfil na Hecho" : "Criar perfil na Hecho"}
          </Texto>
          <Texto style={styles.cardSubtitle}>
            {profileId
              ? "Edite seus dados ou adicione outra conta se quiser separar perfis."
              : "Preencha os dados para criar seu primeiro perfil na Hecho."}
          </Texto>

          {carregando ? (
            <View style={{ alignItems: "center", marginVertical: 20 }}>
              <ActivityIndicator size="small" color="#6A6332" />
              <Texto style={{ marginTop: 8, fontSize: 12, color: "#7a7449" }}>
                Carregando...
              </Texto>
            </View>
          ) : (
            <>
              {/* Avatar */}
              <View style={styles.avatarSection}>
                <View style={styles.avatarCircle}>
                  {fotoUri ? (
                    <Image source={{ uri: fotoUri }} style={styles.avatarImage} />
                  ) : (
                    <Ionicons name="person-outline" size={40} color="#6A6332" />
                  )}
                </View>
                <TouchableOpacity style={styles.avatarButton} onPress={abrirCamera}>
                  <Ionicons name="camera-outline" size={18} color="#fff" />
                  <Texto style={styles.avatarButtonText}>
                    {fotoUri ? "Trocar foto" : "Adicionar foto"}
                  </Texto>
                </TouchableOpacity>
              </View>

              {/* Câmera circular */}
              {isCameraOpen && (
                <View style={styles.cameraBlock}>
                  <View style={styles.cameraWrapper}>
                    <CameraView
                      ref={cameraRef}
                      style={styles.camera}
                      facing={facing}
                    />
                  </View>

                  <View style={styles.cameraControlsRow}>
                    <TouchableOpacity
                      style={styles.cameraSmallButton}
                      onPress={() => setIsCameraOpen(false)}
                    >
                      <Ionicons name="close" size={20} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.cameraSmallButton}
                      onPress={alternarCamera}
                    >
                      <Ionicons
                        name="camera-reverse-outline"
                        size={20}
                        color="#fff"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.shutterButton}
                      onPress={tirarFoto}
                    >
                      <View style={styles.shutterInner} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Formulário */}
              <View style={styles.form}>
                <View style={styles.field}>
                  <Texto style={styles.label}>Nome completo</Texto>
                  <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Como você quer ser chamado(a)?"
                    placeholderTextColor="#b1aa8a"
                  />
                </View>

                <View style={styles.field}>
                  <Texto style={styles.label}>E-mail</Texto>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="seuemail@exemplo.com"
                    placeholderTextColor="#b1aa8a"
                  />
                </View>

                <View style={styles.inlineRow}>
                  <View style={[styles.field, styles.inlineField]}>
                    <Texto style={styles.label}>Telefone</Texto>
                    <TextInput
                      style={styles.input}
                      value={telefone}
                      onChangeText={setTelefone}
                      keyboardType="phone-pad"
                      placeholder="(00) 00000-0000"
                      placeholderTextColor="#b1aa8a"
                    />
                  </View>
                  <View style={[styles.field, styles.inlineField]}>
                    <Texto style={styles.label}>Nascimento</Texto>
                    <TextInput
                      style={styles.input}
                      value={dataNascimento}
                      onChangeText={(v) =>
                        setDataNascimento(formatarDataDigitada(v))
                      }
                      keyboardType="numeric"
                      placeholder="DD/MM/AAAA"
                      placeholderTextColor="#b1aa8a"
                    />
                  </View>
                </View>

                <View style={styles.field}>
                  <Texto style={styles.label}>Cidade / Estado</Texto>
                  <TextInput
                    style={styles.input}
                    value={cidade}
                    onChangeText={setCidade}
                    placeholder="Onde você está?"
                    placeholderTextColor="#b1aa8a"
                  />
                </View>
              </View>

              {/* Botões */}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={salvarPerfil}
                disabled={salvando}
              >
                {salvando ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Texto style={styles.saveButtonText}>
                    {profileId ? "Salvar alterações" : "Criar perfil"}
                  </Texto>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.saveButton,
                  { marginTop: 8, backgroundColor: "#d6d0bd" },
                ]}
                onPress={criarNovoPerfil}
                disabled={salvando}
              >
                <Texto
                  style={[styles.saveButtonText, { color: "#4a4420" }]}
                >
                  Adicionar outra conta
                </Texto>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
