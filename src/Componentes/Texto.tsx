import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

// Tipagem inline para as props
export default function Texto(props: TextProps) {
    return <Text {...props} />;
}

const estilos = StyleSheet.create({
  padrao: {
    fontFamily:"FonteRegular",
    fontSize: 16,
    textAlign: "justify",
    lineHeight: 25,
  },
});