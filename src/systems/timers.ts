import { GameState } from '../types/game';
export function resolveTimers(s:GameState,now=Date.now()):GameState {
 let core=s.core; if(core.timer&&core.timer.endsAt<=now) core={level:Math.min(3,core.level+1) as 1|2|3};
 const buildings=s.buildings.map(b=>b.timer&&b.timer.endsAt<=now?{...b,level:b.timer.kind==='upgrade'?b.level+1:b.level,status:'ready' as const,timer:undefined}:b);
 return {...s,core,buildings};
}
