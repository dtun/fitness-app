import { protocolMap } from "@/constants/protocol";
import { Link } from "expo-router";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Text } from "tamagui";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ padding: 8 }}>
      <FlatList
        contentContainerStyle={{ gap: 8 }}
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
        ListHeaderComponent={
          <Link href="/settings" asChild>
            <Text style={{}}>Settings</Text>
          </Link>
        }
        renderItem={({ item }) => (
          <Link href={`/protocol/${item.protocol}`}>
            <Card
              backgroundColor="$background"
              borderColor={isToday(item.day) ? "$accent1" : "transparent"}
              borderWidth="$1.5"
              width="100%"
            >
              <Card.Header>
                <Text fontWeight="bold">{item.day}</Text>
                <Text fontSize="$2">{protocolMap[item.protocol].focus}</Text>
              </Card.Header>
              <Card.Footer></Card.Footer>
            </Card>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}

function isToday(day: string) {
  return day === new Date().toLocaleDateString("en-US", { weekday: "long" });
}
