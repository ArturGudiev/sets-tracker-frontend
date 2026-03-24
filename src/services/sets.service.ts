import axios from 'axios'
import type {
  GroupedSet,
  SingleSet,
  CreateBigSetRequest,
} from '@/types'
import type { WithoutId } from '@/types/utils.ts'
import type { BigSetFull, SetResponse } from '@/types/generated'

const apiHost = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8001'

export default {

  createSet: async (newSet: WithoutId<SingleSet>): Promise<SingleSet> => {
    return axios.post(`${apiHost}/sets`, newSet)
      .then((res) => res.data)
  },

  updateSet: async (setRequest: SetResponse): Promise<SetResponse> => {
    return axios.put<BigSetFull>(`${apiHost}/set/${setRequest.id}`, setRequest)
      .then((res) => res.data)
  },

  deleteSet: async (id: number): Promise<unknown> => {
    return axios.delete(`${apiHost}/sets/${id}`)
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

  createBigSet: async (newBigSet: CreateBigSetRequest): Promise<BigSetFull> => {
    return axios.post<BigSetFull>(`${apiHost}/big-sets/create`, newBigSet)
      .then((res) => res.data)
  },

  addSetToBigSet: async(bigSetId: number, description: string): Promise<BigSetFull> => {
    return axios.post<BigSetFull>(`${apiHost}/big-sets/${bigSetId}/sets`, { description })
      .then((res) => res.data);
  },

  getBigSet: async (id: number): Promise<BigSetFull> => {
    return axios.get<BigSetFull>(`${apiHost}/big-sets/${id}`)
      .then((res) => res.data)
  },

  getTodayBigSets: async (): Promise<BigSetFull[]> => {
    return axios.get<BigSetFull[]>(`${apiHost}/big-sets`, {
      params: { today: true }
    }).then((res) => res.data)
  },

}
