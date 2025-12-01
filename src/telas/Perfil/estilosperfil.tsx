import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
    backgroundColor: "#f9f4ef",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 70, // título mais baixo, melhor leitura
    paddingBottom: 32,
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4a4420",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#6f6840",
    marginBottom: 16,
  },

  // Avatar / foto
  avatarSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  avatarCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: "#e6e3d0",
    backgroundColor: "#f1ecdd",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 38,
  },
  avatarButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6A6332",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  avatarButtonText: {
    color: "#fff",
    fontSize: 13,
    marginLeft: 6,
    fontWeight: "600",
  },

  // Bloco da câmera circular
  cameraBlock: {
    alignItems: "center",
    marginBottom: 18,
  },
  cameraWrapper: {
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: "hidden",
    backgroundColor: "#000",
    marginBottom: 12,
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  cameraControlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },
  cameraSmallButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  shutterInner: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#fff",
  },

  // Formulário
  form: {
    marginTop: 4,
    marginBottom: 12,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: "#7a7449",
    marginBottom: 4,
  },
  input: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0d7c4",
    paddingHorizontal: 12,
    backgroundColor: "#fdfaf4",
    color: "#333",
    fontSize: 14,
  },
  inlineRow: {
    flexDirection: "row",
    gap: 10,
  },
  inlineField: {
    flex: 1,
  },

  saveButton: {
    marginTop: 8,
    backgroundColor: "#6A6332",
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.5,
  },
});

export default styles;
