import type { SetResponse } from '@/types/single-set.interface.ts'

export interface CreateBigSetRequest {
  description: string;
  created: Date;
  numberOfSets: number;
}

export interface BigSetResponse {
  id: number;
  description: string;
  created: Date;
  finished?: Date;
}

export interface BigSetCreateResponse {
  bigSet: BigSetResponse
  sets: SetResponse[]
}
