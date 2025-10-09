import { protocolMap } from "@/constants/protocol";
import { usePathname } from "expo-router";
import { Text, View } from "react-native";

export default function ProtocolScreen() {
  let id = usePathname().split("/").pop();
  let protocol = protocolMap[id as keyof typeof protocolMap];

  return (
    <View>
      <Text>{protocol.title}</Text>
    </View>
  );
}
