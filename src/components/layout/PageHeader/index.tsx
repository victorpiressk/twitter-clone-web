import { Twitter } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useScrollDirection from '../../../hooks/useScrollDirection'
import { useAppSelector } from '../../../store/hooks'
import { selectCurrentUser } from '../../../store/slices/auth/authSlice'
import Avatar from '../../common/Avatar'
import BackButton from '../../common/BackButton'
import SearchBar from '../../common/SearchBar'
import Tabs from '../../common/Tabs'
import * as S from './styles'
import type { PageHeaderProps } from './types'

const MAIN_VARIANTS = ['home', 'explore', 'notifications', 'messages']

const DETAIL_TITLES: Record<string, string> = {
  connect: 'Seguir',
  'post-detail': 'Post',
  settings: 'Configurações'
}

const PageHeader = ({
  variant,
  title,
  subtitle,
  onAvatarClick,
  onBack,
  tabs,
  activeTab,
  onTabChange,
  isSearchFocused,
  searchQuery,
  onSearchFocus,
  onSearch,
  backButtonMobileOnly = false
}: PageHeaderProps) => {
  const navigate = useNavigate()
  const user = useAppSelector(selectCurrentUser)
  const hidden = useScrollDirection()

  const isMain = MAIN_VARIANTS.includes(variant)
  const resolvedTitle = title ?? DETAIL_TITLES[variant] ?? ''
  const hasTabs =
    tabs && tabs.length > 0 && activeTab !== undefined && !!onTabChange

  return (
    <S.HeaderContainer $hidden={hidden}>
      <S.HeaderRow
        $mainVariant={variant === 'home' || variant === 'notifications'}
      >
        {isMain ? (
          <S.AvatarButton
            onClick={onAvatarClick}
            $hidden={
              variant === 'explore' && (isSearchFocused || !!searchQuery)
            }
          >
            <Avatar
              src={user?.avatar || null}
              alt={user?.username || ''}
              size="small"
            />
          </S.AvatarButton>
        ) : (
          <S.BackButtonWrapper $mobileOnly={backButtonMobileOnly}>
            <BackButton onClick={onBack} />
          </S.BackButtonWrapper>
        )}

        {variant === 'home' && (
          <S.LogoCenter>
            <Twitter
              size={28}
              strokeWidth={2}
              onClick={() => navigate('/home')}
              style={{ cursor: 'pointer' }}
            />
          </S.LogoCenter>
        )}

        {variant === 'explore' && (
          <S.SearchBarWrapperInline>
            {(isSearchFocused || searchQuery) && (
              <BackButton onClick={onBack} />
            )}
            <SearchBar
              variant="large"
              onFocus={onSearchFocus}
              value={searchQuery}
              onSearch={onSearch}
            />
          </S.SearchBarWrapperInline>
        )}

        {variant !== 'home' && variant !== 'explore' && (
          <>
            <S.DesktopTitle>
              <S.HeaderTitle>{resolvedTitle}</S.HeaderTitle>
              {subtitle && <S.HeaderSubtitle>{subtitle}</S.HeaderSubtitle>}
            </S.DesktopTitle>
            {!isMain && (
              <S.MobileTitle>
                <S.HeaderTitle>{resolvedTitle}</S.HeaderTitle>
                {subtitle && <S.HeaderSubtitle>{subtitle}</S.HeaderSubtitle>}
              </S.MobileTitle>
            )}
          </>
        )}

        {isMain && <S.MobileRightPlaceholder />}
      </S.HeaderRow>

      {hasTabs && (
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
          scrollable={variant === 'explore'}
        />
      )}
    </S.HeaderContainer>
  )
}

export default PageHeader
