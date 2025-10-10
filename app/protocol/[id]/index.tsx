import { protocolMap } from "@/constants/protocol";
import { generateWorkout } from "@/lib/ai-service";
import { usePathname } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ProtocolScreen() {
  let id = usePathname().split("/").pop();
  let protocol = protocolMap[id as keyof typeof protocolMap];
  let [time, setTime] = useState("");
  let [equipment, setEquipment] = useState("");
  let [workout, setWorkout] = useState("");
  let [isGenerating, setIsGenerating] = useState(false);
  let [error, setError] = useState("");

  async function handleGenerateWorkout() {
    setIsGenerating(true);
    setError("");
    setWorkout("");

    try {
      let text = await generateWorkout({
        protocolId: id!,
        protocolFocus: protocol.focus,
        protocolDescription: protocol.description,
        protocolExerciseExamples: protocol.exerciseExamples,
        time,
        equipment,
      });

      setWorkout(text);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate workout"
      );
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <FlatList
      data={[
        {
          render: (
            <View style={{ gap: 16, padding: 8 }}>
              <Text>{protocol.focus}</Text>

              <View style={{ gap: 8 }}>
                <Text>Generate Personalized Workout</Text>

                <TextInput
                  placeholder="Time available (optional, e.g., '45 min')"
                  value={time}
                  onChangeText={setTime}
                  style={{ borderWidth: 1, padding: 8 }}
                />

                <TextInput
                  placeholder="Equipment (optional, e.g., 'Dumbbells, Resistance Bands')"
                  value={equipment}
                  onChangeText={setEquipment}
                  style={{ borderWidth: 1, padding: 8 }}
                />

                <Button
                  title={isGenerating ? "Generating..." : "Generate Workout"}
                  onPress={handleGenerateWorkout}
                  disabled={isGenerating}
                />

                {isGenerating && <ActivityIndicator size="large" />}

                {error && <Text>{error}</Text>}

                {workout && (
                  <View style={{ gap: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      Your Workout Plan:
                    </Text>
                    <Text>{workout}</Text>
                  </View>
                )}
              </View>
            </View>
          ),
        },
      ]}
      renderItem={({ item }) => item.render}
    />
  );
}
