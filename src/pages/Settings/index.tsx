import { useState } from 'react'
import { User, Lock, Palette } from 'lucide-react'
import PageHeader from '../../components/Layout/PageHeader'
import { ContentWrapper } from '../../styles/globalStyles'
import AccountSettings from './components/AccountSettings'
import AppearanceSettings from './components/AppearanceSettings'
import PasswordSettings from './components/PasswordSettings'
import * as S from './styles'

type SettingsTab = 'account' | 'password' | 'appearance'

const SETTINGS_TABS = [
  {
    id: 'account' as SettingsTab,
    label: 'Informações da conta',
    icon: User,
    description: 'Gerencie email, telefone e username'
  },
  {
    id: 'password' as SettingsTab,
    label: 'Altere sua senha',
    icon: Lock,
    description: ''
  },
  {
    id: 'appearance' as SettingsTab,
    label: 'Aparência',
    icon: Palette,
    description: 'Personalize o tema do aplicativo'
  }
]

const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab | null>(null)

  const activeTabData = SETTINGS_TABS.find((tab) => tab.id === activeTab)

  return (
    <ContentWrapper>
      <S.SettingsContainer $hidden={!!activeTab}>
        <PageHeader variant="settings" />

        <S.NavList>
          {SETTINGS_TABS.map((tab) => {
            const Icon = tab.icon
            return (
              <S.NavItem
                key={tab.id}
                $active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <S.NavItemIcon>
                  <Icon size={20} />
                </S.NavItemIcon>
                {tab.label}
              </S.NavItem>
            )
          })}
        </S.NavList>
      </S.SettingsContainer>

      <S.ContentPanel $visible={!!activeTab}>
        {activeTabData && (
          <>
            <PageHeader
              variant="settings"
              title={activeTabData.label}
              onBack={() => setActiveTab(null)}
              backButtonMobileOnly
            />
            <S.ContentDescription>
              {activeTabData.description}
            </S.ContentDescription>

            {activeTab === 'account' && <AccountSettings />}
            {activeTab === 'password' && <PasswordSettings />}
            {activeTab === 'appearance' && <AppearanceSettings />}
          </>
        )}
      </S.ContentPanel>
    </ContentWrapper>
  )
}

export default Settings
