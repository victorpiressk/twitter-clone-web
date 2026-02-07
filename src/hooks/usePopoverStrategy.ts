import { useContext } from 'react'
import PopoverContext from '../contexts/PopoverContext'

export const usePopoverStrategy = () => useContext(PopoverContext)
