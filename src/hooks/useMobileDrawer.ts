import { useContext } from 'react'
import MobileDrawerContext from '../contexts/MobileDrawerContext'

export const useMobileDrawer = () => useContext(MobileDrawerContext)
