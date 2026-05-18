import { useNavigate } from 'react-router-dom'
import { useSession } from '../../state/SessionContext.jsx'
import AtmosphereProvider from './hearth/AtmosphereProvider.jsx'
import { AppModeProvider } from './hearth/AppModeContext.jsx'
import BuildV5 from './hearth/BuildV5.jsx'

export default function BuildScreen() {
  const navigate = useNavigate()
  const { session, setBuildField } = useSession()

  return (
    <AppModeProvider>
      <AtmosphereProvider>
        <BuildV5
          build={session.build}
          customer={session.customer}
          project={session.project}
          guide={session.guide}
          onSelect={setBuildField}
          onContinue={() => navigate('/summary')}/>
      </AtmosphereProvider>
    </AppModeProvider>
  )
}
