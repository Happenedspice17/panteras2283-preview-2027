import { useState } from 'react'
import { Page, Empty, Button } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import Kickoff from './Kickoff'
import Objetivos from './Objetivos'
import Cronograma from './Cronograma'

const TABS = [['kickoff', 'Kickoff'], ['objetivos', 'Objetivos'], ['cronograma', 'Cronograma']] as const

export default function Temporada() {
  const { season } = useAuth()
  const [tab, setTab] = useState<(typeof TABS)[number][0]>('kickoff')
  if (!season) return <Page title="Arranque y objetivos"><Empty>No hay temporada activa. Un coach debe crear la temporada.</Empty></Page>
  return (
    <Page title="Arranque y objetivos" actions={TABS.map(([k, l]) => <Button key={k} variant={tab === k ? 'primary' : 'ghost'} onClick={() => setTab(k)}>{l}</Button>)}>
      {tab === 'kickoff' && <Kickoff />}
      {tab === 'objetivos' && <Objetivos />}
      {tab === 'cronograma' && <Cronograma />}
    </Page>
  )
}
