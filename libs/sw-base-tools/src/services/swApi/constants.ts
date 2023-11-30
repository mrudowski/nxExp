import {RouteId} from '../../types/types.ts';

const SW_API_BASE_URL = 'https://swapi.info/api';

export const SW_API_URLS: Record<RouteId | 'species', string> = {
  characters: `${SW_API_BASE_URL}/people`,
  planets: `${SW_API_BASE_URL}/planets`,
  species: `${SW_API_BASE_URL}/species`,
  vehicles: `${SW_API_BASE_URL}/vehicles`,
};
