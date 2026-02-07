import { createContext } from 'react'

type Strategy = 'absolute' | 'fixed'

interface PopoverContextData {
  strategy: Strategy
}

const PopoverContext = createContext<PopoverContextData>({
  strategy: 'absolute' // Valor default
})

export const PopoverProvider = ({
  children,
  strategy
}: {
  children: React.ReactNode
  strategy: Strategy
}) => (
  <PopoverContext.Provider value={{ strategy }}>
    {children}
  </PopoverContext.Provider>
)

export default PopoverContext
