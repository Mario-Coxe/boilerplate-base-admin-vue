import axios, { AxiosResponse } from 'axios'
import baseUrl from '../../proprieties'

const colorsTypeService = axios.create({
  baseURL: `${baseUrl}colors/`,
  headers: {
    'Content-Type': 'application/json',
  },
})

const getRecords = (params: PaginatedResponse) => {
  return colorsTypeService.get('', { params })
}

const create = (data: any) => {
  return colorsTypeService.post('create', data)
}

const update = (id: number, data: any) => {
  return colorsTypeService.put(`${id}`, data)
}

const remove = (id: number) => {
  return colorsTypeService.delete(`${id}`)
}

export default {
  getRecords,
  create,
  update,
  remove,
}
