import { GameState } from '../types/game';
export const QUESTS = [
 {title:'Prepare o Pátio de Madeira',done:(s:GameState)=>!!s.buildings.find(b=>b.type==='lumberYard'&&b.level>=1)},
 {title:'Construa o Ferro-Velho',done:(s:GameState)=>!!s.buildings.find(b=>b.type==='ironWorks'&&b.status==='ready')},
 {title:'Construa o Quartel',done:(s:GameState)=>!!s.buildings.find(b=>b.type==='barracks'&&b.status==='ready')},
 {title:'Melhore a Oficina',done:(s:GameState)=>!!s.buildings.find(b=>b.type==='garage'&&b.level>=2)},
 {title:'Eleve o Core para Lv.2',done:(s:GameState)=>s.core.level>=2},
 {title:'Construa o Hospital',done:(s:GameState)=>!!s.buildings.find(b=>b.type==='hospital'&&b.status==='ready')},
 {title:'Construa a Igreja',done:(s:GameState)=>!!s.buildings.find(b=>b.type==='church'&&b.status==='ready')},
];
