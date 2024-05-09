import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    async function loadStorageValue() {
      try {
        const item = await AsyncStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.log(error);
      }
    }

    loadStorageValue();
  }, [key, initialValue]);

  const setValue = async (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black"
  },
  view: {
    height: "40%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 24
  },
  freeMoneyBtn: {
    backgroundColor: "#66ff66",
    paddingHorizontal: 6,
    paddingVertical: 12,
    borderRadius: 5
  },
  btnText: {
    color: "black"
  },
  bankruptBtn: {
    backgroundColor: "#ff6666",
    paddingHorizontal: 6,
    paddingVertical: 12,
    borderRadius: 5
  }
})

function RainbowText({string}) {
  const COLORS = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
  const letters = string.split('')
  return (
    <>
      {letters.map((letter, idx) => <Text style={{color: COLORS[idx%7], fontSize: 30}} key={idx}>{letter}</Text>)}
    </>
  )
}

function App() {
  const [money, setMoney] = useLocalStorage("money", 0)
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.view}>
          <Text style={styles.text}>You've made ${money}.00 in</Text>
          <Text><RainbowText string="FREE MONEY"/></Text>
        <TouchableOpacity onPress={() => setMoney(prev => prev + 1)} style={styles.freeMoneyBtn}><Text style={styles.btnText}>FREE MONEY WOW</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setMoney(0)} style={styles.bankruptBtn}><Text style={styles.btnText}>GO BANKRUPT TO EVADE TAXES</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


export default App;
