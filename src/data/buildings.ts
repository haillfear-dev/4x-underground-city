import { BuildingType, Costs, ResourceKey } from '../types/game';
import { TIMINGS } from '../constants/theme';

export interface BuildingDefinition { type: BuildingType; name: string; icon: string; unique: boolean; maxLevel: 3; constructionTime: number; upgradeTime: number; costs: Costs[]; production?: { resource: ResourceKey; perMinute: number[] }; power: number[]; description: string }
export const BUILDINGS: Record<BuildingType, BuildingDefinition> = {
  garage:{type:'garage',name:'GARAGE',icon:'🔧',unique:true,maxLevel:3,constructionTime:TIMINGS.constructionMs,upgradeTime:TIMINGS.buildingUpgradeMs,costs:[{scrap:100},{scrap:180,fuel:40},{scrap:350,fuel:100}],power:[100,220,390],description:'Mechanical support for Core evolution.'},
  scrapYard:{type:'scrapYard',name:'SCRAP YARD',icon:'⚙️',unique:true,maxLevel:3,constructionTime:TIMINGS.constructionMs,upgradeTime:TIMINGS.buildingUpgradeMs,costs:[{scrap:80},{scrap:200,fuel:50},{scrap:400,fuel:120}],production:{resource:'scrap',perMinute:[10,18,30]},power:[80,190,340],description:'Recovers useful metal around the clock.'},
  fuelDepot:{type:'fuelDepot',name:'FUEL DEPOT',icon:'⛽',unique:true,maxLevel:3,constructionTime:TIMINGS.constructionMs,upgradeTime:TIMINGS.buildingUpgradeMs,costs:[{scrap:120,fuel:20},{scrap:220,fuel:70},{scrap:450,fuel:150}],production:{resource:'fuel',perMinute:[5,10,18]},power:[90,200,360],description:'Refines and stores precious fuel.'},
};
export const CORE_UPGRADES = { 2:{name:'ENGINE REBUILD',cost:{scrap:500,fuel:200},garageLevel:1},3:{name:'NEON SUPERCHARGER',cost:{scrap:900,fuel:400},garageLevel:2} } as const;
