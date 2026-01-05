import axios from 'axios'
import type { GroupedSet, SingleSet } from '@/types/single-set.interface.ts'
import type { WithoutId } from '@/types/utils.ts'

export default {

  createSet: async (newSet: WithoutId<SingleSet>): Promise<SingleSet> => {
    return axios.post(`http://127.0.0.1:8000/set/create`, newSet)
      .then((res) => res.data)
  },

  getTodaySets: async (): Promise<SingleSet[]> => {
    return axios.get<SingleSet[]>(`http://127.0.0.1:8000/sets/today`)
      .then((res) => res.data)
  },

  getTodayGroupedSets: async (): Promise<GroupedSet[]> => {
    return axios.get<GroupedSet[]>(`http://127.0.0.1:8000/sets/today-grouped`)
      .then((res) => res.data);
  }


}
