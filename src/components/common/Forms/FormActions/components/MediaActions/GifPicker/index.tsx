import { useState } from 'react'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Grid } from '@giphy/react-components'
import BasePopover from '../../../../../Popovers/BasePopover'
import * as S from './styles'
import type { GifPickerProps } from './types'
import type { IGif } from '@giphy/js-types'

// Demo API Key
const GIPHY_API_KEY = 'Gc7131jiJuvI7IdN0HZ1D7nh0ow5BU6g'

const giphyFetch = new GiphyFetch(GIPHY_API_KEY)

const GifPickerComponent = ({
  isOpen,
  onClose,
  triggerRef,
  onGifSelect
}: GifPickerProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const fetchGifs = (offset: number) => {
    if (searchTerm.trim()) {
      return giphyFetch.search(searchTerm, { offset, limit: 10 })
    }
    return giphyFetch.trending({ offset, limit: 10 })
  }

  const handleGifClick = (gif: IGif, e: React.SyntheticEvent) => {
    e.preventDefault()
    const gifUrl = gif.images.original.url
    const gifId = gif.id.toString()
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
            key={searchTerm}
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
