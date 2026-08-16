import { BuildingFutureStats, BuildingType, Costs, ResourceKey } from '../types/game';
import { TIMINGS } from '../constants/theme';

export interface BuildingDefinition { type: BuildingType; name: string; icon: string; accent: string; unique: boolean; maxLevel: 3; constructionTime: number; upgradeTime: number; costs: Costs[]; production?: { resource: ResourceKey; perMinute: number[] }; futureStats?: BuildingFutureStats; power: number[]; description: string }
const common={unique:true,maxLevel:3 as const,constructionTime:TIMINGS.constructionMs,upgradeTime:TIMINGS.buildingUpgradeMs};
export const BUILDINGS: Record<BuildingType, BuildingDefinition> = {
 garage:{...common,type:'garage',name:'OFICINA',icon:'🔧',accent:'#f28b30',costs:[{wood:90,iron:45},{wood:180,iron:100},{wood:340,iron:220}],power:[100,220,390],description:'Peças, ferramentas e apoio para evoluir a moto do Core.'},
 lumberYard:{...common,type:'lumberYard',name:'PÁTIO DE MADEIRA',icon:'🪵',accent:'#e7a64a',costs:[{wood:60,iron:20},{wood:150,iron:65},{wood:310,iron:140}],production:{resource:'wood',perMinute:[10,18,30]},power:[75,175,320],description:'Reaproveita pallets e vigas da vizinhança.'},
 ironWorks:{...common,type:'ironWorks',name:'FERRO-VELHO',icon:'⚙️',accent:'#83b9c5',costs:[{wood:75,iron:30},{wood:160,iron:90},{wood:330,iron:180}],production:{resource:'iron',perMinute:[8,15,25]},power:[80,185,330],description:'Separa ferro útil do entulho urbano.'},
 waterStill:{...common,type:'waterStill',name:'CAIXA D’ÁGUA',icon:'💧',accent:'#38bde8',costs:[{wood:85,iron:35},{wood:170,iron:85},{wood:350,iron:170}],production:{resource:'water',perMinute:[9,16,27]},power:[75,180,325],description:'Filtra e armazena água para a comunidade.'},
 communityKitchen:{...common,type:'communityKitchen',name:'COZINHA',icon:'🥫',accent:'#75c96b',costs:[{wood:75,water:30},{wood:155,iron:55,water:60},{wood:320,iron:130,water:110}],production:{resource:'food',perMinute:[9,16,27]},power:[75,180,325],description:'Transforma doações e hortas em comida.'},
 barracks:{...common,type:'barracks',name:'QUARTEL',icon:'🥊',accent:'#e04b3f',costs:[{wood:130,iron:80,food:35},{wood:250,iron:160,food:80},{wood:470,iron:300,food:150}],futureStats:{trainingSpeed:[1,1.08,1.18]},power:[120,260,450],description:'Galpão improvisado onde a gangue treina.'},
 hospital:{...common,type:'hospital',name:'HOSPITAL',icon:'✚',accent:'#e9eee9',costs:[{wood:115,iron:65,water:55},{wood:230,iron:140,water:110},{wood:440,iron:280,water:210}],futureStats:{woundedCapacity:[50,100,180],healingSpeed:[1,1.1,1.25]},power:[110,245,430],description:'Clínica precária preparada para cuidar dos feridos.'},
 church:{...common,type:'church',name:'IGREJA',icon:'♰',accent:'#b889dc',costs:[{wood:120,iron:55,food:45},{wood:240,iron:125,food:100},{wood:460,iron:250,food:190}],power:[105,235,415],description:'Refúgio urbano onde as histórias dos Heróis começam.'},
};
export const CORE_UPGRADES = {2:{name:'REBUILD DA MOTO',cost:{wood:400,iron:180,water:80},garageLevel:1},3:{name:'MOTOR DA COMUNIDADE',cost:{wood:800,iron:380,water:180,food:160},garageLevel:2}} as const;
