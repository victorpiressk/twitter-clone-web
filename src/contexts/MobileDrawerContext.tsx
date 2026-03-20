import { createContext, useState } from 'react'

type MobileDrawerContextType = {
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

const MobileDrawerContext = createContext<MobileDrawerContextType>({
  isDrawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {}
})

export const MobileDrawerProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  return (
    <MobileDrawerContext.Provider
      value={{ isDrawerOpen, openDrawer, closeDrawer }}
    >
      {children}
    </MobileDrawerContext.Provider>
  )
}

export default MobileDrawerContext
