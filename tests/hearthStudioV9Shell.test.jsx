import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../src/App.jsx'
import HearthStudioV9Shell, { scanHearthStudioV9ShellCopy } from '../src/screens/hearth-studio-v9/HearthStudioV9Shell.jsx'

describe('Hearth Studio V9 visual shell', () => {
  it('renders the customer-facing seated-start shell with safe preview language', () => {
    render(<HearthStudioV9Shell />)

    expect(screen.getByLabelText('Hearth Studio V9 customer preview')).toBeInTheDocument()
    expect(screen.getByText('Begin seated. Walk the showroom with purpose.')).toBeInTheDocument()
    expect(screen.getByText('No final selections yet.')).toBeInTheDocument()
    expect(screen.getByText(/Concept visualization only. Final fireplace, venting, dimensions, hearth, mantel, stone, and installation details/)).toBeInTheDocument()
  })

  it('keeps banned internal terms out of the shell copy', () => {
    render(<HearthStudioV9Shell />)

    expect(scanHearthStudioV9ShellCopy(screen.getByLabelText('Hearth Studio V9 customer preview').textContent)).toEqual([])
  })

  it('mounts at the preview route without replacing existing routes', () => {
    render(
      <MemoryRouter initialEntries={['/hearth-studio-v9']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByLabelText('Hearth Studio V9 customer preview')).toBeInTheDocument()
  })

  it('keeps the internal visual asset library route available', () => {
    render(
      <MemoryRouter initialEntries={['/hearth-visual-assets']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByLabelText('Hearth visual asset library')).toBeInTheDocument()
    expect(screen.getByText('Internal prototype - visual asset library only')).toBeInTheDocument()
  })

  it('does not expose needs-review asset records in the customer shell', () => {
    render(<HearthStudioV9Shell />)

    const text = screen.getByLabelText('Hearth Studio V9 customer preview').textContent
    expect(text).not.toContain('Eldorado Cliffstone')
    expect(text).not.toContain('stage_v1b_existing_material_image_inventory')
    expect(text).not.toContain('needs_review')
    expect(text).not.toContain('BrochureGuide_Lopi')
  })
})
