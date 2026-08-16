import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { AppState } from 'react-native';
import { BUILDINGS, CORE_UPGRADES } from '../data/buildings';
import { QUESTS } from '../data/quests';
import { TIMINGS } from '../constants/theme';
import { BuildingType, GameState, Position, ResourceKey } from '../types/game';
import { applyProduction, canAfford, powerOf, spend } from '../systems/economy';
import { resolveTimers } from '../systems/timers';
import { clearGame, loadGame, saveGame } from '../storage/gameStorage';

const initialState=():GameState=>({resources:{scrap:1250,fuel:680,cash:320},core:{level:1},buildings:[
 {id:'garage-1',type:'garage',level:1,position:{x:245,y:260},status:'ready'},
 {id:'scrap-1',type:'scrapYard',level:0,position:{x:680,y:245},status:'ready'},
],slots:[{id:'slot-a',position:{x:160,y:610}},{id:'slot-b',position:{x:735,y:590}},{id:'slot-c',position:{x:830,y:390}}],questIndex:0,lastProductionAt:Date.now(),lastPower:680});
type Action={type:'set';state:GameState}|{type:'mutate';fn:(s:GameState)=>GameState};
const reducer=(s:GameState,a:Action)=>a.type==='set'?a.state:a.fn(s);
interface API {state:GameState;ready:boolean;message:string|null;build:(slot:string,type:BuildingType)=>void;upgradeBuilding:(id:string)=>void;upgradeCore:()=>void;addResource:(k:ResourceKey,n:number)=>void;completeTimers:()=>void;reset:()=>void}
const Context=createContext<API|null>(null);

export function GameProvider({children}:{children:React.ReactNode}){
 const [state,dispatch]=useReducer(reducer,undefined,initialState); const [ready,setReady]=useState(false); const [message,setMessage]=useState<string|null>(null);
 const flash=useCallback((m:string)=>{setMessage(m);setTimeout(()=>setMessage(null),1800)},[]);
 useEffect(()=>{loadGame().then(saved=>{if(saved)dispatch({type:'set',state:resolveTimers(applyProduction(saved))});setReady(true)})},[]);
 useEffect(()=>{if(ready)saveGame(state)},[state,ready]);
 useEffect(()=>{const tick=setInterval(()=>dispatch({type:'mutate',fn:s=>resolveTimers(applyProduction(s))}),TIMINGS.tickMs);return()=>clearInterval(tick)},[]);
 useEffect(()=>{const sub=AppState.addEventListener('change',v=>{if(v==='active')dispatch({type:'mutate',fn:s=>resolveTimers(applyProduction(s))})});return()=>sub.remove()},[]);
 useEffect(() => {
  if (!ready) return;
  let q = state.questIndex;
  while (q < QUESTS.length && (QUESTS[q]?.done(state) ?? false)) q++;
  if (q !== state.questIndex) {
   flash('MISSION COMPLETE  +100 CASH');
   dispatch({type:'mutate',fn:s=>({...s,questIndex:q,resources:{...s.resources,cash:s.resources.cash+100}})});
  }
 }, [state,ready,flash]);
 const mutate=(fn:(s:GameState)=>GameState)=>dispatch({type:'mutate',fn:s=>{const next=fn(s);const p=powerOf(next);if(p>s.lastPower)flash(`POWER +${p-s.lastPower}`);return {...next,lastPower:p}}});
 const build=(slotId:string,type:BuildingType)=>mutate(s=>{const d=BUILDINGS[type];if(d.unique&&s.buildings.some(b=>b.type===type)){flash('UNIQUE BUILDING ALREADY EXISTS');return s}if(!canAfford(s.resources,d.costs[0])){flash('NOT ENOUGH RESOURCES');return s}const slot=s.slots.find(x=>x.id===slotId);if(!slot)return s;const building={id:`${type}-${Date.now()}`,type,level:1,position:slot.position,status:'constructing' as const,timer:{kind:'construct' as const,endsAt:Date.now()+d.constructionTime}};return {...s,resources:spend(s.resources,d.costs[0]),buildings:[...s.buildings,building],slots:s.slots.filter(x=>x.id!==slotId)}});
 const upgradeBuilding=(id:string)=>mutate(s=>{const b=s.buildings.find(x=>x.id===id);if(!b||b.status!=='ready')return s;if(b.level>=3){flash('MAX LEVEL');return s}if(b.level>=s.core.level){flash(`Requer Core Lv.${b.level+1}`);return s}const cost=BUILDINGS[b.type].costs[b.level]??{};if(!canAfford(s.resources,cost)){flash('NOT ENOUGH RESOURCES');return s}return {...s,resources:spend(s.resources,cost),buildings:s.buildings.map(x=>x.id===id?{...x,status:'upgrading' as const,timer:{kind:'upgrade' as const,endsAt:Date.now()+BUILDINGS[x.type].upgradeTime}}:x)}});
 const upgradeCore=()=>mutate(s=>{if(s.core.timer||s.core.level>=3)return s;const target=(s.core.level+1) as 2|3;const u=CORE_UPGRADES[target];const garage=s.buildings.find(b=>b.type==='garage');if(!garage||garage.level<u.garageLevel){flash(`REQUIRES GARAGE LV.${u.garageLevel}`);return s}if(!canAfford(s.resources,u.cost)){flash('NOT ENOUGH RESOURCES');return s}return {...s,resources:spend(s.resources,u.cost),core:{...s.core,timer:{kind:'core',endsAt:Date.now()+TIMINGS.coreUpgradeMs}}}});
 const api=useMemo<API>(()=>({state,ready,message,build,upgradeBuilding,upgradeCore,addResource:(k,n)=>mutate(s=>({...s,resources:{...s.resources,[k]:s.resources[k]+n}})),completeTimers:()=>mutate(s=>resolveTimers({...s,core:s.core.timer?{...s.core,timer:{...s.core.timer,endsAt:0}}:s.core,buildings:s.buildings.map(b=>b.timer?{...b,timer:{...b.timer,endsAt:0}}:b)})),reset:()=>{clearGame().then(()=>dispatch({type:'set',state:initialState()}));flash('SAVE RESET')} }),[state,ready,message]);
 return <Context.Provider value={api}>{children}</Context.Provider>;
}
export const useGame=()=>{const c=useContext(Context);if(!c)throw Error('useGame outside provider');return c};
