import { addDays, formatDate, isToday, startOfWeek } from "date-fns";
import { Dimensions } from "react-native";
import { Text, View } from "tamagui";
import { IconSymbol } from "./ui/icon-symbol";

export function Calendar() {
  let thisWeek = startOfWeek(new Date(), {
    weekStartsOn: 0,
  });
  let days = [1, 2, 3, 4, 5, 6, 7].map((d) => addDays(thisWeek, d - 1));

  return (
    <>
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
    </>
  );
}
