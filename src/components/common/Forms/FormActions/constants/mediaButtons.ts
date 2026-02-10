import {
  Image,
  ImagePlay,
  Smile,
  BarChart2,
  MapPin,
  Calendar
} from 'lucide-react'

export const MEDIA_BUTTONS = [
  {
    id: 'media',
    label: 'Adicionar media',
    icon: Image,
    action: 'media' as const
  },
  {
    id: 'gif',
    label: 'Adicionar GIF',
    icon: ImagePlay,
    action: 'gif' as const
  },
  {
    id: 'emoji',
    label: 'Adicionar emoji',
    icon: Smile,
    action: 'emoji' as const
  },
  {
    id: 'poll',
    label: 'Criar enquete',
    icon: BarChart2,
    action: 'poll' as const
  },
  {
    id: 'location',
    label: 'Adicionar localização',
    icon: MapPin,
    action: 'location' as const
  },
  {
    id: 'schedule',
    label: 'Agendar post',
    icon: Calendar,
    action: 'schedule' as const
  }
] as const
