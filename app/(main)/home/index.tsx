import { testSocket } from "@/socket/socketEvent";
import HomeScreen from "@/src/features/home/screens/HomeScreen";
import { useEffect } from "react";

const Home = () => {
  const callbackHanlder = (data: any) => {
    console.log("get response from test socket event", data);
  };

  useEffect(() => {
    console.log("socket emit1");
    testSocket(callbackHanlder);
    testSocket(null);
    return () => {
      testSocket(callbackHanlder, true);
    };
  }, []);
  return <HomeScreen />;
};

export default Home;
