import { supabase } from "@/lib/supabase-client";
import { useEffect } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";

export default function Page() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // router.replace("/(tabs)/home/");
        console.log(session);
      } else {
        console.log("no user");
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // router.replace("/(tabs)/home/");
        console.log(session);
      } else {
        console.log("no user");
        // router.replace("/(auth)/login");
      }
    });
  }, []);
  return (
    <View>
      <SafeAreaView>
        <Text>aaa</Text>
      </SafeAreaView>
    </View>
  );
}
