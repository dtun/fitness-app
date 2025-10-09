import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <FlatList
        data={
          [
            { day: "Sunday", protocol: "1" },
            { day: "Monday", protocol: "2" },
            { day: "Tuesday", protocol: "3" },
            { day: "Wednesday", protocol: "4" },
            { day: "Thursday", protocol: "5" },
            { day: "Friday", protocol: "6" },
            { day: "Saturday", protocol: "7" },
          ] as const
        }
        renderItem={({ item }) => (
          <View
            style={[
              {
                borderColor: isToday(item.day) ? "red" : "transparent",
                borderWidth: 4,
              },
            ]}
          >
            <Text>{item.day}</Text>
            <Text>{protocolMap[item.protocol].title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function isToday(day: string) {
  return day === new Date().toLocaleDateString("en-US", { weekday: "long" });
}

let protocolMap = {
  "1": {
    title: "Long Endurance",
    protocol: "1",
  },
  "2": {
    title: "Legs Resistance",
    protocol: "2",
  },
  "3": {
    title: "Heat/Cold Exposure & Recovery",
    protocol: "3",
  },
  "4": {
    title: "Torso & Neck Resistance",
    protocol: "4",
  },
  "5": {
    title: "Cardio",
    protocol: "5",
  },
  "6": {
    title: "High Intensity Interval Training",
    protocol: "6",
  },
  "7": {
    title: "Arms, Neck, & Calves",
    protocol: "7",
  },
};
