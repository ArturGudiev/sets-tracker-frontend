import axios from 'axios'
import type { GroupedSet, SingleSet, CreateBigSetRequest, BigSetCreateResponse } from '@/types'
import type { WithoutId } from '@/types/utils.ts'

const apiHost = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8001'

export default {
  
  createSet: async (newSet: WithoutId<SingleSet>): Promise<SingleSet> => {
    return axios.post(`${apiHost}/set/create`, newSet)
      .then((res) => res.data)
  },

  getTodaySets: async (): Promise<SingleSet[]> => {
    return axios.get<SingleSet[]>(`${apiHost}/sets/today`)
      .then((res) => res.data)
  },

  getTodayGroupedSets: async (): Promise<GroupedSet[]> => {
    return axios.get<GroupedSet[]>(`${apiHost}/sets/today-grouped`)
      .then((res) => res.data);
  },

  createBigSet: async (newBigSet: CreateBigSetRequest): Promise<BigSetCreateResponse> => {
    return axios.post<BigSetCreateResponse>(`${apiHost}/big-set/create`, newBigSet)
      .then((res) => res.data)
  },

}
