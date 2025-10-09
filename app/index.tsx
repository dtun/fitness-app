import { protocolMap } from "@/constants/protocol";
import { Link } from "expo-router";
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
          <Link href={`/protocol/${item.protocol}`}>
            <View
              style={[
                {
                  borderColor: isToday(item.day) ? "red" : "transparent",
                  borderWidth: 4,
                  width: "100%",
                },
              ]}
            >
              <Text>{item.day}</Text>
              <Text>{protocolMap[item.protocol].title}</Text>
            </View>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}

function isToday(day: string) {
  return day === new Date().toLocaleDateString("en-US", { weekday: "long" });
}
