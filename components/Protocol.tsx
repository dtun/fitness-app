import { Calendar } from "@/components/Calendar";
import { protocolMap } from "@/constants/protocol";
import { generateWorkout } from "@/lib/ai-service";
import { useState } from "react";
import { FlatList } from "react-native";
import { Button, Card, Input, Slider, Spinner, Text, View } from "tamagui";

export function Protocol({ id }: { id: string }) {
  let protocol = protocolMap[id as keyof typeof protocolMap];
  let [time, setTime] = useState("30");
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
        time: time ? `${time} minutes` : undefined,
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
            <Card backgroundColor="$background" flex={1} width="100%">
              <Calendar />
              <Card.Header gap="$2">
                <Text fontWeight="bold">{protocol.focus}</Text>
                <Text>Time available: {time} min</Text>
                <Slider
                  marginVertical="$4"
                  max={120}
                  min={10}
                  onValueChange={(update) => setTime(update.toString())}
                  step={5}
                  value={[Number(time)]}
                >
                  <Slider.Track>
                    <Slider.TrackActive />
                  </Slider.Track>
                  <Slider.Thumb size="$3" index={0} circular />
                </Slider>

                <Input
                  placeholder="Equipment (optional, e.g., 'Dumbbells, Resistance Bands')"
                  value={equipment}
                  onChangeText={setEquipment}
                />

                <Button onPress={handleGenerateWorkout} disabled={isGenerating}>
                  {isGenerating ? "Generating..." : "Generate Workout"}
                </Button>

                {isGenerating ? <Spinner size="large" /> : null}

                {error ? <Text>{error}</Text> : null}

                {workout ? (
                  <View gap="$3">
                    <Text fontSize="$2" fontWeight="bold">
                      Your Workout Plan:
                    </Text>
                    <Text fontSize="$2">{workout}</Text>
                  </View>
                ) : null}
              </Card.Header>
            </Card>
          ),
        },
      ]}
      renderItem={({ item }) => item.render}
    />
  );
}
