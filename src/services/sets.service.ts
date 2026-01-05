import axios from 'axios'
import type { GroupedSet, SingleSet } from '@/types/single-set.interface.ts'
import type { WithoutId } from '@/types/utils.ts'

// Use environment variable or fallback to localhost
// Set VITE_API_URL=http://192.168.1.107:8001 in .env file for network access
// Or use VITE_API_URL=http://localhost:8001 for local access
const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8001";

// Log the API URL being used (for debugging)
console.log("API Base URL:", baseUrl);

export default {

  createSet: async (newSet: WithoutId<SingleSet>): Promise<SingleSet> => {
    console.log("Creating set, URL:", `${baseUrl}/set/create`);
    return axios.post(`${baseUrl}/set/create`, newSet)
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error creating set:", error);
        throw error;
      });
  },

  getTodaySets: async (): Promise<SingleSet[]> => {
    console.log("Getting today sets, URL:", `${baseUrl}/sets/today`);
    return axios.get<SingleSet[]>(`${baseUrl}/sets/today`)
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error getting today sets:", error);
        throw error;
      });
  },

  getTodayGroupedSets: async (): Promise<GroupedSet[]> => {
    console.log("Getting today grouped sets, URL:", `${baseUrl}/sets/today-grouped`);
    return axios.get<GroupedSet[]>(`${baseUrl}/sets/today-grouped`)
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error getting today grouped sets:", error);
        throw error;
      });
  }


}
