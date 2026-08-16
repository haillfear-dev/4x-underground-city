import { Hero, TroopClass } from '../types/game';

export const TROOP_CLASSES: Record<TroopClass,{icon:string;name:string;description:string;color:string}>={
 INFANTRY:{icon:'🛡️',name:'INFANTRY',description:'Pesados da linha de frente com escudos e armas improvisadas.',color:'#9bd26f'},
 SHOOTER:{icon:'🎯',name:'SHOOTER',description:'Atiradores leves, rápidos e perigosos à distância.',color:'#ef5952'},
 CHEMICAL:{icon:'⚗️',name:'CHEMICAL',description:'Especialistas excêntricos em dano, gases e debuffs.',color:'#55d8c6'},
};
export const HEROES: Hero[]=[
 {id:'sergetsu',name:'SERGETSU',class:'INFANTRY',role:'TANK / DEFENSE',rarity:'RARE',cardsOwned:0,cardsRequired:5,unlocked:false,level:1,expeditionBuffs:[{id:'infantryDefense',label:'Infantry DEF',value:10,unit:'percent'}],cityBuffs:[{id:'hospitalCapacity',label:'Hospital Capacity',value:5,unit:'percent'}],visual:{icon:'🛡️',accent:'#9bd26f',description:'Grandalhão simpático de verde, protegido por uma tampa de lixo.'}},
 {id:'vex',name:'VEX',class:'SHOOTER',role:'RANGED DPS',rarity:'RARE',cardsOwned:0,cardsRequired:5,unlocked:false,level:1,expeditionBuffs:[{id:'shooterAttack',label:'Shooter ATK',value:10,unit:'percent'}],cityBuffs:[{id:'trainingSpeed',label:'Training Speed',value:5,unit:'percent'}],visual:{icon:'🎯',accent:'#ef5952',description:'Atiradora magra e sarcástica com uma arma grande demais.'}},
 {id:'doc-fizz',name:'DOC FIZZ',class:'CHEMICAL',role:'AOE / DEBUFF',rarity:'RARE',cardsOwned:0,cardsRequired:5,unlocked:false,level:1,expeditionBuffs:[{id:'chemicalDamage',label:'Chemical Damage',value:10,unit:'percent'}],cityBuffs:[{id:'waterProduction',label:'Water Production',value:5,unit:'percent'}],visual:{icon:'⚗️',accent:'#55d8c6',description:'Cientista irresponsável de cabelo branco e mochila borbulhante.'}},
];
