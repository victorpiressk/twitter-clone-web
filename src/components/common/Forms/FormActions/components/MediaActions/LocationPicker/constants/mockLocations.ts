export type Location = {
  id: string
  name: string
  coordinates: {
    lat: number
    lng: number
  }
}

export const MOCK_LOCATIONS: Location[] = [
  {
    id: '1',
    name: 'São Paulo, SP, Brasil',
    coordinates: { lat: -23.5505, lng: -46.6333 }
  },
  {
    id: '2',
    name: 'Rio de Janeiro, RJ, Brasil',
    coordinates: { lat: -22.9068, lng: -43.1729 }
  },
  {
    id: '3',
    name: 'Natal, RN, Brasil',
    coordinates: { lat: -5.7945, lng: -35.211 }
  },
  {
    id: '4',
    name: 'Brasília, DF, Brasil',
    coordinates: { lat: -15.8267, lng: -47.9218 }
  },
  {
    id: '5',
    name: 'Salvador, BA, Brasil',
    coordinates: { lat: -12.9714, lng: -38.5014 }
  },
  {
    id: '6',
    name: 'Fortaleza, CE, Brasil',
    coordinates: { lat: -3.7172, lng: -38.5433 }
  },
  {
    id: '7',
    name: 'Belo Horizonte, MG, Brasil',
    coordinates: { lat: -19.9167, lng: -43.9345 }
  },
  {
    id: '8',
    name: 'Manaus, AM, Brasil',
    coordinates: { lat: -3.119, lng: -60.0217 }
  },
  {
    id: '9',
    name: 'Curitiba, PR, Brasil',
    coordinates: { lat: -25.4284, lng: -49.2733 }
  },
  {
    id: '10',
    name: 'Recife, PE, Brasil',
    coordinates: { lat: -8.0476, lng: -34.877 }
  }
]
