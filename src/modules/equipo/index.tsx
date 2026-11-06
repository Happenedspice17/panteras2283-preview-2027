import { useAuth } from '../../lib/auth'
import { useRows } from '../../lib/db'
import type { Profile } from '../../lib/types'
import { Page, Loading } from '../../components/ui'
import { Perfiles } from './Perfiles'
import { RolesCompetencia } from './RolesCompetencia'

export default function Equipo() {
  const { isCoach, isStaff } = useAuth()
  const perfiles = useRows<Profile>('profiles', { order: 'full_name' })

  if (perfiles.loading) return <Page title="Equipo y roles"><Loading /></Page>

  return (
    <Page title="Equipo y roles">
      {perfiles.error && <div className="alert alert-bad">{perfiles.error}</div>}
      <Perfiles perfiles={perfiles.rows} isCoach={isCoach} update={perfiles.update} />
      <RolesCompetencia perfiles={perfiles.rows} isStaff={isStaff} />
    </Page>
  )
}
