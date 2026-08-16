export type ResourceType = 'wood' | 'iron' | 'water' | 'food';
export type ResourceKey = ResourceType | 'diamond';
export type TroopClass = 'INFANTRY' | 'SHOOTER' | 'CHEMICAL';
export type BuildingType = 'garage' | 'lumberYard' | 'ironWorks' | 'waterStill' | 'communityKitchen' | 'barracks' | 'hospital' | 'church';
export type BuildingStatus = 'ready' | 'constructing' | 'upgrading';
export interface Position { x: number; y: number }
export type Costs = Partial<Record<ResourceKey, number>>;
export interface TimedAction { kind: 'construct' | 'upgrade' | 'core'; endsAt: number }
export interface BuildingFutureStats { woundedCapacity?: number[]; healingSpeed?: number[]; trainingSpeed?: number[] }
export interface Building { id: string; type: BuildingType; level: number; position: Position; status: BuildingStatus; timer?: TimedAction }
export interface ConstructionSlot { id: string; position: Position }
export interface CoreCarState { level: 1 | 2 | 3; timer?: TimedAction }
export interface Resources { wood: number; iron: number; water: number; food: number; diamond: number }
export interface HeroBuff { id: string; label: string; value: number; unit: 'percent' }
export interface HeroVisual { icon: string; accent: string; description: string }
export interface Hero { id: string; name: string; class: TroopClass; role: string; rarity: 'RARE' | 'EPIC' | 'LEGENDARY'; cardsOwned: number; cardsRequired: number; unlocked: boolean; expeditionBuffs: HeroBuff[]; cityBuffs: HeroBuff[]; level: number; visual: HeroVisual }
export interface TroopStack { class: TroopClass; amount: number }
export interface Expedition { id: string; heroId: string; troops: TroopStack[]; state: 'preparing' | 'travelling' | 'fighting' | 'gathering' | 'returning'; destinationSpotId: string }
export interface ResourceSpot { id: string; resourceType: ResourceType; level: 1|2|3|4|5|6|7|8|9|10; defenders: TroopStack[]; resourceAmount: number; coordinates: Position; occupied: boolean; expeditionId?: string }
export interface GameState { saveVersion: 2; resources: Resources; core: CoreCarState; buildings: Building[]; slots: ConstructionSlot[]; heroes: Hero[]; questIndex: number; lastProductionAt: number; lastPower: number }
