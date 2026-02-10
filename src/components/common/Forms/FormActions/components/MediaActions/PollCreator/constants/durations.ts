export type PollDuration = {
  label: string
  hours: number
}

export const POLL_DURATIONS: PollDuration[] = [
  { label: '1 dia', hours: 24 },
  { label: '3 dias', hours: 72 },
  { label: '7 dias', hours: 168 }
]
