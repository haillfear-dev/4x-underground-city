export type ResourceKey = 'scrap' | 'fuel' | 'cash';
export type BuildingType = 'garage' | 'scrapYard' | 'fuelDepot';
export type BuildingStatus = 'ready' | 'constructing' | 'upgrading';
export interface Position { x: number; y: number }
export interface Costs { scrap?: number; fuel?: number; cash?: number }
export interface TimedAction { kind: 'construct' | 'upgrade' | 'core'; endsAt: number }
export interface Building { id: string; type: BuildingType; level: number; position: Position; status: BuildingStatus; timer?: TimedAction }
export interface ConstructionSlot { id: string; position: Position; building?: Building }
export interface CoreCarState { level: 1 | 2 | 3; timer?: TimedAction }
export interface Resources { scrap: number; fuel: number; cash: number }
export interface GameState { resources: Resources; core: CoreCarState; buildings: Building[]; slots: ConstructionSlot[]; questIndex: number; lastProductionAt: number; lastPower: number }
