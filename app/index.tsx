import { Protocol } from "@/components/Protocol";
import { useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "tamagui";

let data = [
  { day: "Sunday", protocol: "1", icons: ["heart"] },
  { day: "Monday", protocol: "2", icons: ["dumbbell"] },
  { day: "Tuesday", protocol: "3", icons: ["flame", "snowflake"] },
  { day: "Wednesday", protocol: "4", icons: ["dumbbell"] },
  { day: "Thursday", protocol: "5", icons: ["heart"] },
  { day: "Friday", protocol: "6", icons: ["dumbbell", "heart"] },
  { day: "Saturday", protocol: "7", icons: ["dumbbell"] },
] as const;

let { width } = Dimensions.get("screen");

export default function HomeScreen() {
  let [today] = useState(data.find((p) => isToday(p.day)));

  return (
    <SafeAreaView edges={["bottom"]} style={{}}>
      <FlatList
        contentContainerStyle={{ flex: 1 }}
        style={{ flex: 1 }}
        data={data}
        horizontal
        renderItem={({ item }) => (
          <Text
            fontWeight="bold"
            width={width / 7}
            textAlign="center"
            borderColor="transparent"
            borderWidth="$1.5"
            borderBottomColor={
              today?.protocol === item.protocol ? "$accent1" : "transparent"
            }
          >
            {item.day.slice(0, 1)}
          </Text>
        )}
        showsHorizontalScrollIndicator={false}
      />
      <Protocol id={today?.protocol || ""} />
    </SafeAreaView>
  );
}

function isToday(day: string) {
  return day === new Date().toLocaleDateString("en-US", { weekday: "long" });
}

function getIconColor(icon: string) {
  switch (icon) {
    case "heart":
      return "#ef4444"; // Red for heart
    case "dumbbell":
      return "#22c55e"; // Green for dumbbell (strength/growth)
    case "flame":
      return "#eab308"; // Yellow for flame (energy/heat)
    case "snowflake":
      return "#3b82f6"; // Blue for snowflake (cold/ice)
  }
  return "#6b7280";
}
