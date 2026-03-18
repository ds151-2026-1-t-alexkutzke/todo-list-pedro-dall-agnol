import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TarefaItem, { TarefaType } from "./components/TarefaItem";

/* Mock de tarefas apenas para teste, deixei aqui por conveniencia, professor.

export const tarefasIniciais: TarefaType[] = [
  { id: 1, titulo: "Tarefa 1", concluida: false },
  { id: 2, titulo: "T4r3fA_@2", concluida: false },
  { id: 3, titulo: "Tarefa_Teste_Linha_Do_mei0", concluida: true },
];
*/

export default function App() {
  const [textoTarefa, setTextoTarefa] = useState("");
  //  const [tarefas, setTarefas] = useState<TarefaType[]>(tarefasIniciais);
  const [tarefas, setTarefas] = useState<TarefaType[]>([]);

  const adicionarTarefa = () => {
    const tituloLimpo = textoTarefa.trim();

    if (!tituloLimpo) {
      Alert.alert("Campo vazio", "Digite o nome da tarefa antes de adicionar.");
      return;
    }

    const novaTarefa: TarefaType = {
      id: Date.now(),
      titulo: tituloLimpo,
      concluida: false,
    };

    setTarefas((estadoAnterior) => [...estadoAnterior, novaTarefa]);
    setTextoTarefa("");
  };

  const alternarConclusao = (id: number) => {
    setTarefas((estadoAnterior) =>
      estadoAnterior.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
      ),
    );
  };

  const resumo = useMemo(() => {
    const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
    return `${concluidas}/${tarefas.length} concluída(s)`;
  }, [tarefas]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.cabecalho}>
          <Text style={styles.titulo}>To-Do List DS151</Text>
          <Text style={styles.subtitulo}>{resumo}</Text>
        </View>

        <View style={styles.linhaEntrada}>
          <TextInput
            style={styles.input}
            placeholder="Adicione uma nova tarefa..."
            placeholderTextColor="#9ca3af"
            value={textoTarefa}
            onChangeText={setTextoTarefa}
            returnKeyType="done"
            onSubmitEditing={adicionarTarefa}
          />

          <Pressable style={styles.botaoAdicionar} onPress={adicionarTarefa}>
            <Ionicons name="add" size={26} color="#ffffff" />
          </Pressable>
        </View>

        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TarefaItem tarefa={item} onToggle={alternarConclusao} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            <Text style={styles.listaVazia}>Nenhuma tarefa adicionada.</Text>
          }
        />
        <Text style={styles.easteregg}>(Um abraço, professor!)</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  cabecalho: {
    marginBottom: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: "#6b7280",
  },
  linhaEntrada: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  input: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    color: "#111827",
  },
  botaoAdicionar: {
    marginLeft: 12,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  lista: {
    paddingBottom: 24,
  },
  listaVazia: {
    textAlign: "center",
    color: "#9ca3af",
    marginTop: 24,
    fontSize: 16,
  },
  easteregg: {
    textAlign: "center",
    color: "#9ca3af7e",
    marginTop: 24,
    fontSize: 12,
  },
});
