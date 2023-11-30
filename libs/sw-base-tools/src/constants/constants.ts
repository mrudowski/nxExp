import {RouteId} from '../types/types.ts';

export const ROUTES: Record<RouteId, RouteId> = {
  characters: 'characters',
  planets: 'planets',
  vehicles: 'vehicles',
} as const;
