import { useState } from 'react'
import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import type { IGif } from '@giphy/js-types'
import BasePopover from '../../../../../Popovers/BasePopover'
import type { GifPickerProps } from './types'
import * as S from './styles'

// Demo API Key (substituir por sua própria key em produção)
const GIPHY_API_KEY = 'Gc7131jiJuvI7IdN0HZ1D7nh0ow5BU6g'

const giphyFetch = new GiphyFetch(GIPHY_API_KEY)

const GifPickerComponent = ({
  isOpen,
  onClose,
  triggerRef,
  onGifSelect
}: GifPickerProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  // Função de busca (trending ou search)
  const fetchGifs = (offset: number) => {
    if (searchTerm.trim()) {
      return giphyFetch.search(searchTerm, { offset, limit: 10 })
    }
    return giphyFetch.trending({ offset, limit: 10 })
  }

  const handleGifClick = (gif: IGif, e: React.SyntheticEvent) => {
    e.preventDefault()
    const gifUrl = gif.images.original.url
    const gifId = gif.id.toString() // ✅ Converter para string
    onGifSelect(gifUrl, gifId)
    onClose()
  }

  return (
    <BasePopover
      isOpen={isOpen}
      onClose={onClose}
      position="bottom"
      triggerRef={triggerRef}
    >
      <S.GifPickerContainer>
        <S.SearchInput
          type="text"
          placeholder="Buscar GIF..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />

        <S.GifGridWrapper>
          <Grid
            key={searchTerm} // Force re-render on search change
            width={400}
            columns={2}
            fetchGifs={fetchGifs}
            onGifClick={handleGifClick}
            noLink
            hideAttribution
          />
        </S.GifGridWrapper>
      </S.GifPickerContainer>
    </BasePopover>
  )
}

export default GifPickerComponent
