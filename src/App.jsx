import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/AppShell.jsx'
import WelcomeScreen from './screens/customer/WelcomeScreen.jsx'
import BuildScreen from './screens/customer/BuildScreen.jsx'
import SummaryScreen from './screens/customer/SummaryScreen.jsx'
import StartSessionScreen from './screens/rep/StartSessionScreen.jsx'
import SessionCloseScreen from './screens/rep/SessionCloseScreen.jsx'
import SendSummaryScreen from './screens/rep/SendSummaryScreen.jsx'
import V8SliceIndex from './screens/v8-slice/V8SliceIndex.jsx'
import CustomerRoute from './screens/v8-slice/CustomerRoute.jsx'
import RepRoute from './screens/v8-slice/RepRoute.jsx'
import GapListRoute from './screens/v8-slice/GapListRoute.jsx'
import StoneShopPacketScreen from './screens/stone-shop-packet/StoneShopPacketScreen.jsx'
import HearthStudioV9Screen from './screens/v9-hearth-studio-3d/HearthStudioV9Screen.jsx'
import HearthVisualAssetsScreen from './screens/hearth-visual-assets/HearthVisualAssetsScreen.jsx'
import HearthStudioV9Shell from './screens/hearth-studio-v9/HearthStudioV9Shell.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/build" element={<BuildScreen />} />
      <Route path="/summary" element={<SummaryScreen />} />
      <Route path="/rep/start" element={<AppShell><StartSessionScreen /></AppShell>} />
      <Route path="/rep/close" element={<AppShell><SessionCloseScreen /></AppShell>} />
      <Route path="/rep/send" element={<AppShell><SendSummaryScreen /></AppShell>} />
      <Route path="/v8-slice" element={<V8SliceIndex />} />
      <Route path="/customer/:slotId" element={<CustomerRoute />} />
      <Route path="/rep/:slotId" element={<RepRoute />} />
      <Route path="/backstage/gap-list" element={<GapListRoute />} />
      <Route path="/stone-shop-packet" element={<AppShell><StoneShopPacketScreen /></AppShell>} />
      <Route path="/v9-hearth-studio-3d" element={<HearthStudioV9Screen />} />
      <Route path="/hearth-studio-v9" element={<HearthStudioV9Shell />} />
      <Route path="/hearth-visual-assets" element={<AppShell><HearthVisualAssetsScreen /></AppShell>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
