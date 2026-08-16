import { GameState } from '../types/game';
export const QUESTS = [
 {title:'Upgrade the Scrap Yard',done:(s:GameState)=>!!s.buildings.find(b=>b.type==='scrapYard'&&b.level>=1)},
 {title:'Build the Fuel Depot',done:(s:GameState)=>!!s.buildings.find(b=>b.type==='fuelDepot'&&b.status==='ready')},
 {title:'Upgrade the Garage',done:(s:GameState)=>!!s.buildings.find(b=>b.type==='garage'&&b.level>=2)},
 {title:'Upgrade the Core to Lv.2',done:(s:GameState)=>s.core.level>=2},
 {title:'Upgrade the Scrap Yard to Lv.2',done:(s:GameState)=>!!s.buildings.find(b=>b.type==='scrapYard'&&b.level>=2)},
 {title:'Upgrade the Core to Lv.3',done:(s:GameState)=>s.core.level>=3},
];
