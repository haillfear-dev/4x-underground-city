import AsyncStorage from '@react-native-async-storage/async-storage';
import { HEROES } from '../data/heroes';
import { GameState } from '../types/game';
const KEY='underground.save.v2';
const LEGACY_KEY='underground.save.v1';
const valid=(value:unknown):value is GameState=>!!value&&typeof value==='object'&&(value as GameState).saveVersion===2;
export const loadGame=async()=>{try{const value=await AsyncStorage.getItem(KEY);if(!value){await AsyncStorage.removeItem(LEGACY_KEY);return null}const parsed:unknown=JSON.parse(value);return valid(parsed)?{...parsed,heroes:(parsed.heroes?.length?parsed.heroes:HEROES.map(h=>({...h})))}:null}catch{return null}};
export const saveGame=(state:GameState)=>AsyncStorage.setItem(KEY,JSON.stringify(state));
export const clearGame=async()=>{await Promise.all([AsyncStorage.removeItem(KEY),AsyncStorage.removeItem(LEGACY_KEY)])};
