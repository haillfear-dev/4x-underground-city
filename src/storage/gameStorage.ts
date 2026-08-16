import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameState } from '../types/game';
const KEY='underground.save.v1';
export const loadGame=async()=>{const value=await AsyncStorage.getItem(KEY);return value?JSON.parse(value) as GameState:null};
export const saveGame=(state:GameState)=>AsyncStorage.setItem(KEY,JSON.stringify(state));
export const clearGame=()=>AsyncStorage.removeItem(KEY);
