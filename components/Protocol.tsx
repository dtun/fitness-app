import { protocolMap } from "@/constants/protocol";
import { generateWorkout } from "@/lib/ai-service";
import { addDays, formatDate, isToday, startOfWeek } from "date-fns";
import { useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { Button, Card, Input, Slider, Spinner, Text, View } from "tamagui";
import { IconSymbol } from "./ui/icon-symbol";

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

  let thisWeek = startOfWeek(new Date(), {
    weekStartsOn: 0,
  });
  let days = [1, 2, 3, 4, 5, 6, 7].map((d) => addDays(thisWeek, d - 1));

  return (
    <FlatList
      data={[
        {
          render: (
            <Card backgroundColor="$background" flex={1} width="100%">
              <View
                flexDirection="row"
                width={Dimensions.get("screen").width}
                justifyContent="space-between"
                paddingHorizontal={8}
              >
                <View gap="$2" flexDirection="row" paddingVertical={8}>
                  <Text flexDirection="row" fontSize="$10">
                    {formatDate(new Date(), "ccc")}
                  </Text>
                  <View
                    alignSelf="center"
                    height={20}
                    width={20}
                    backgroundColor="red"
                    borderRadius={24}
                  />
                </View>
                <View
                  gap="$1"
                  paddingVertical={8}
                  justifyContent="center"
                  alignItems="flex-end"
                >
                  <Text fontWeight="bold" flexDirection="row" fontSize="$4">
                    {`${formatDate(new Date(), "MMMM")} ${formatDate(
                      new Date(),
                      "dd"
                    )}`}
                  </Text>
                  <Text flexDirection="row" fontSize="$4">
                    {formatDate(new Date(), "yyyy")}
                  </Text>
                </View>
              </View>
              <View flexDirection="row" width={Dimensions.get("screen").width}>
                {days.map((d) => (
                  <View
                    key={d.getDay()}
                    flexDirection="column"
                    flex={1}
                    alignItems="center"
                    borderColor={isToday(d) ? "#ccc" : "transparent"}
                    borderWidth={2}
                    borderRadius={48}
                    paddingVertical={8}
                    gap="$3"
                    marginHorizontal={2}
                  >
                    <View flex={1} alignItems="center">
                      <Text
                        color={isToday(d) ? "red" : "#ccc"}
                        flexDirection="row"
                        fontWeight="bold"
                      >
                        {formatDate(d, "ccc")}
                      </Text>
                      <Text
                        color={isToday(d) ? "unset" : "#ccc"}
                        fontWeight="bold"
                        flexDirection="row"
                        fontSize="$7"
                      >
                        {formatDate(d, "d")}
                      </Text>
                    </View>
                    <IconSymbol color="#ccc" name="circle" size={32} />
                  </View>
                ))}
              </View>
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
