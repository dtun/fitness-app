import { IconSymbol } from "@/components/ui/icon-symbol";
import { protocolMap } from "@/constants/protocol";
import { Link } from "expo-router";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Text, View, XStack } from "tamagui";

export default function HomeScreen() {
  return (
    <SafeAreaView edges={["bottom"]} style={{ padding: 8 }}>
      <FlatList
        contentContainerStyle={{ gap: 8, height: "100%" }}
        style={{ height: "25%" }}
        data={
          [
            { day: "Sunday", protocol: "1", icons: ["heart"] },
            { day: "Monday", protocol: "2", icons: ["dumbbell"] },
            { day: "Tuesday", protocol: "3", icons: ["flame", "snowflake"] },
            { day: "Wednesday", protocol: "4", icons: ["dumbbell"] },
            { day: "Thursday", protocol: "5", icons: ["heart"] },
            { day: "Friday", protocol: "6", icons: ["dumbbell", "heart"] },
            { day: "Saturday", protocol: "7", icons: ["dumbbell"] },
          ] as const
        }
        horizontal
        renderItem={({ item }) => (
          <Link href={`/protocol/${item.protocol}`}>
            <Card
              backgroundColor="$background"
              borderColor={isToday(item.day) ? "$accent1" : "transparent"}
              borderWidth="$1.5"
            >
              <Card.Header flex={1} gap="$2">
                <XStack height="$2" alignItems="center" gap="$2">
                  <Text fontWeight="bold">{item.day}</Text>
                  {isToday(item.day) ? (
                    <Text
                      backgroundColor="$accent1"
                      fontSize="$1"
                      fontWeight="bold"
                      padding="$1.5"
                      borderRadius="$8"
                      themeInverse
                    >
                      Today
                    </Text>
                  ) : null}
                  <View
                    flexDirection="row"
                    flex={1}
                    justifyContent="flex-end"
                    gap="$2"
                  >
                    {item.icons.map((name) => (
                      <IconSymbol
                        key={name}
                        name={name}
                        color={getIconColor(name)}
                        size={24}
                      />
                    ))}
                  </View>
                </XStack>
                <Text fontSize="$2">{protocolMap[item.protocol].focus}</Text>
              </Card.Header>
              <Card.Footer justifyContent="flex-end"></Card.Footer>
            </Card>
          </Link>
        )}
        showsHorizontalScrollIndicator={false}
      />
      <View style={{ flex: 1 }}></View>
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
