import { useNavigate } from 'react-router-dom'
import { useSession } from '../../state/SessionContext.jsx'
import AtmosphereProvider from './hearth/AtmosphereProvider.jsx'
import { AppModeProvider } from './hearth/AppModeContext.jsx'
import SummaryV5 from './hearth/SummaryV5.jsx'

export default function SummaryScreen() {
  const navigate = useNavigate()
  const { session } = useSession()

  return (
    <AppModeProvider>
      <AtmosphereProvider>
        <SummaryV5
          build={session.build}
          customer={session.customer}
          project={session.project}
          guide={session.guide}
          sessionId={session.sessionId}
          onBack={() => navigate('/build')}
          onSend={() => {
            window.alert("We'll send this folio to your email after your guide confirms the address.")
          }}/>
      </AtmosphereProvider>
    </AppModeProvider>
  )
}
