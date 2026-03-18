import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface TarefaType {
  id: number;
  titulo: string;
  concluida: boolean;
}

interface TarefaItemProps {
  tarefa: TarefaType;
  onToggle: (id: number) => void;
}

export default function TarefaItem({ tarefa, onToggle }: TarefaItemProps) {
  return (
    <View style={styles.card}>
      <Pressable onPress={() => onToggle(tarefa.id)} hitSlop={8}>
        <Ionicons
          name={tarefa.concluida ? "checkmark-circle" : "ellipse-outline"}
          size={28}
          color={tarefa.concluida ? "#10b981" : "#d1d5db"}
        />
      </Pressable>

      <Text style={[styles.titulo, tarefa.concluida && styles.tituloConcluido]}>
        {tarefa.titulo}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  titulo: {
    marginLeft: 14,
    fontSize: 18,
    color: "#111827",
  },
  tituloConcluido: {
    color: "#9ca3af",
    textDecorationLine: "line-through",
  },
});
