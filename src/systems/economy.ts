import { BUILDINGS } from '../data/buildings';
import { Costs, GameState, ResourceKey, Resources } from '../types/game';
export const RESOURCE_KEYS:ResourceKey[]=['wood','iron','water','food','diamond'];
export const canAfford=(r:Resources,c:Costs)=>Object.entries(c).every(([k,v])=>r[k as ResourceKey]>=(v??0));
export const spend=(r:Resources,c:Costs):Resources=>RESOURCE_KEYS.reduce((next,key)=>({...next,[key]:next[key]-(c[key]??0)}),{...r});
export function applyProduction(state:GameState, now=Date.now()):GameState {
 const minutes=Math.max(0,now-state.lastProductionAt)/60000; const resources={...state.resources};
 state.buildings.filter(b=>b.status==='ready').forEach(b=>{const p=BUILDINGS[b.type]?.production;if(p) resources[p.resource]+=minutes*(p.perMinute[b.level-1]??0)});
 return {...state,resources,lastProductionAt:now};
}
export const powerOf=(s:GameState)=>s.core.level*500+s.buildings.reduce((n,b)=>n+(BUILDINGS[b.type]?.power[b.level-1]??0),0);
