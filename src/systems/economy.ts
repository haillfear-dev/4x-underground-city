import { BUILDINGS } from '../data/buildings';
import { Costs, GameState, Resources } from '../types/game';
export const canAfford=(r:Resources,c:Costs)=>Object.entries(c).every(([k,v])=>r[k as keyof Resources]>=(v??0));
export const spend=(r:Resources,c:Costs):Resources=>({...r,scrap:r.scrap-(c.scrap??0),fuel:r.fuel-(c.fuel??0),cash:r.cash-(c.cash??0)});
export function applyProduction(state:GameState, now=Date.now()):GameState {
 const minutes=Math.max(0,now-state.lastProductionAt)/60000; const resources={...state.resources};
 state.buildings.filter(b=>b.status==='ready').forEach(b=>{const p=BUILDINGS[b.type].production;if(p) resources[p.resource]+=minutes*(p.perMinute[b.level-1]??0)});
 return {...state,resources,lastProductionAt:now};
}
export const powerOf=(s:GameState)=>s.core.level*500+s.buildings.reduce((n,b)=>n+(BUILDINGS[b.type].power[b.level-1]??0),0);
