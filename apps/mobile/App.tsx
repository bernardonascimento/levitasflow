import "./global.css";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getHomeList, type HomeListResult } from "@mobile/application/useCases/getHomeList";
import HomeScreen from "@mobile/presentation/screens/HomeScreen";

const App = (): JSX.Element => {
  const [data, setData] = useState<HomeListResult | null>(null);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      const homeData = await getHomeList();
      setData(homeData);
    };

    void loadData();
  }, []);

  if (!data) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <Text className="text-slate-600">Carregando...</Text>
      </View>
    );
  }

  return (
    <>
      <HomeScreen data={data} />
      <StatusBar style="auto" />
    </>
  );
};

export default App;
