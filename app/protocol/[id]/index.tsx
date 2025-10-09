import { protocolMap } from "@/constants/protocol";
import { usePathname } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function ProtocolScreen() {
  let id = usePathname().split("/").pop();
  let protocol = protocolMap[id as keyof typeof protocolMap];

  return (
    <FlatList
      data={[
        {
          render: (
            <View>
              <Text>{protocol.focus}</Text>
              <Text>{protocol.description.join("\n\n")}</Text>
              <Text>{protocol.exerciseExamples.join("\n\n")}</Text>
            </View>
          ),
        },
      ]}
      renderItem={({ item }) => item.render}
    />
  );
}
