import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import BuildScreen from '../../src/screens/customer/BuildScreen.jsx'
import { SessionProvider } from '../../src/state/SessionContext.jsx'

vi.mock('../../src/components/build3d/CustomerHearthBuild3D.jsx', () => ({
  default: ({ onOpenMaterialTray }) => (
    <section aria-label="Integrated fireplace room builder">
      <p>Build Your Fireplace / Room</p>
      <p>Room context</p>
      <button type="button" onClick={() => onOpenMaterialTray('stoneId')}>Stone: Choose</button>
    </section>
  ),
}))

describe('/build customer route integration', () => {
  it('renders the integrated fireplace room builder at /build', async () => {
    render(
      <MemoryRouter initialEntries={['/build']}>
        <SessionProvider>
          <BuildScreen />
        </SessionProvider>
      </MemoryRouter>,
    )

    expect(await screen.findByLabelText('Integrated fireplace room builder')).toBeInTheDocument()
    expect(screen.getByText('Room context')).toBeInTheDocument()
  })
})
