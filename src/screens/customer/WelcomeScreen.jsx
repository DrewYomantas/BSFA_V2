import { useNavigate } from 'react-router-dom'
import { useSession } from '../../state/SessionContext.jsx'
import AtmosphereProvider from './hearth/AtmosphereProvider.jsx'
import { AppModeProvider } from './hearth/AppModeContext.jsx'
import WelcomeV5 from './hearth/WelcomeV5.jsx'

export default function WelcomeScreen() {
  const navigate = useNavigate()
  const { session, setMode } = useSession()

  function begin() {
    setMode('customer')
    navigate('/build')
  }

  return (
    <AppModeProvider>
      <AtmosphereProvider>
        <WelcomeV5
          customer={session.customer}
          project={session.project}
          guide={session.guide}
          onBegin={begin}/>
      </AtmosphereProvider>
    </AppModeProvider>
  )
}
