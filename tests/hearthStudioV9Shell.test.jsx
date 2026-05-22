import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../src/App.jsx'
import HearthStudioV9Shell, { scanHearthStudioV9ShellCopy } from '../src/screens/hearth-studio-v9/HearthStudioV9Shell.jsx'
import { HEARTH_STUDIO_V9_CONTEXT_OPTIONS, HEARTH_STUDIO_V9_FIRE_EXPERIENCE_OPTIONS, HEARTH_STUDIO_V9_GOAL_OPTIONS } from '../src/lib/hearthStudioV9/hearthStudioV9Session.js'

describe('Hearth Studio V9 visual shell', () => {
  it('renders the customer-facing seated-start shell with safe preview language', () => {
    render(<HearthStudioV9Shell />)

    expect(screen.getByLabelText('Hearth Studio V9 customer preview')).toBeInTheDocument()
    expect(screen.getByText('Begin seated. Walk the showroom with purpose.')).toBeInTheDocument()
    expect(screen.getAllByText('No final selections yet.')).toHaveLength(2)
    expect(screen.getByText(/Concept visualization only. Final fireplace, venting, dimensions, hearth, mantel, stone, and installation details/)).toBeInTheDocument()
  })

  it('renders the opening seated prompt', () => {
    render(<HearthStudioV9Shell />)

    expect(screen.getByLabelText('Opening Hearth Cafe prompt')).toBeInTheDocument()
    expect(screen.getByText('What brought you in today?')).toBeInTheDocument()
    expect(screen.getByLabelText('Current setup prompt')).toBeInTheDocument()
    expect(screen.getByLabelText('Fire experience prompt')).toBeInTheDocument()
    expect(screen.getByText('Goal direction selected')).toBeInTheDocument()
    expect(screen.getAllByText('Not selected yet')).toHaveLength(3)
    expect(screen.getByText('Goal')).toBeInTheDocument()
    expect(screen.getByText('Setup')).toBeInTheDocument()
    expect(screen.getByText('Fire Feel')).toBeInTheDocument()
  })

  it('lets each opening answer card be selected', () => {
    render(<HearthStudioV9Shell />)
    const goalOptions = within(screen.getByLabelText('Opening goal options'))

    HEARTH_STUDIO_V9_GOAL_OPTIONS.forEach((option) => {
      const card = goalOptions.getByRole('button', { name: new RegExp(option.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) })

      fireEvent.click(card)

      expect(card).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent(option.shortLabel)
    })
  })

  it('updates the summary after selecting an answer', () => {
    render(<HearthStudioV9Shell />)

    fireEvent.click(screen.getByRole('button', { name: /More heat/ }))

    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('More heat')
    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('No final selections yet.')
    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('Venting and measurements')
  })

  it('activates the second context prompt after a goal is selected', () => {
    render(<HearthStudioV9Shell />)

    expect(screen.getByRole('button', { name: /Existing masonry fireplace/ })).toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: /More heat/ }))

    expect(screen.getByRole('button', { name: /Existing masonry fireplace/ })).not.toBeDisabled()
    expect(screen.getByText('What kind of fireplace situation are we working with?')).toBeInTheDocument()
  })

  it('lets each context card be selected', () => {
    render(<HearthStudioV9Shell />)

    fireEvent.click(screen.getByRole('button', { name: /More heat/ }))
    const contextOptions = within(screen.getByLabelText('Current setup options'))

    HEARTH_STUDIO_V9_CONTEXT_OPTIONS.forEach((option) => {
      const card = contextOptions.getByRole('button', { name: new RegExp(option.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) })

      fireEvent.click(card)

      expect(card).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent(option.shortLabel)
    })
  })

  it('updates the summary after selecting a context', () => {
    render(<HearthStudioV9Shell />)

    fireEvent.click(screen.getByRole('button', { name: /Less mess/ }))
    fireEvent.click(screen.getByRole('button', { name: /Factory-built fireplace/ }))

    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('Less mess')
    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('Factory-built fireplace')
    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('Current setup details')
    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('No final selections yet.')
  })

  it('activates the third fire-experience prompt after goal and setup are selected', () => {
    render(<HearthStudioV9Shell />)

    expect(screen.getByRole('button', { name: /Gas convenience/ })).toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: /More heat/ }))
    expect(screen.getByRole('button', { name: /Gas convenience/ })).toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: /Existing masonry fireplace/ }))

    expect(screen.getByRole('button', { name: /Gas convenience/ })).not.toBeDisabled()
    expect(screen.getByText('What kind of fire experience sounds right?')).toBeInTheDocument()
  })

  it('lets each fire-experience card be selected', () => {
    render(<HearthStudioV9Shell />)

    fireEvent.click(screen.getByRole('button', { name: /More heat/ }))
    fireEvent.click(screen.getByRole('button', { name: /Existing masonry fireplace/ }))
    const fireOptions = within(screen.getByLabelText('Fire experience options'))

    HEARTH_STUDIO_V9_FIRE_EXPERIENCE_OPTIONS.forEach((option) => {
      const card = fireOptions.getByRole('button', { name: new RegExp(option.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) })

      fireEvent.click(card)

      expect(card).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent(option.shortLabel)
    })
  })

  it('updates the summary after selecting fire experience', () => {
    render(<HearthStudioV9Shell />)

    fireEvent.click(screen.getByRole('button', { name: /Less mess/ }))
    fireEvent.click(screen.getByRole('button', { name: /Factory-built fireplace/ }))
    fireEvent.click(screen.getByRole('button', { name: /Gas convenience/ }))

    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('Less mess')
    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('Factory-built fireplace')
    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('Gas convenience')
    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('Preferred fire feel')
    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('No final selections yet.')
  })

  it('gives reassuring guidance when the customer is not sure about fire experience', () => {
    render(<HearthStudioV9Shell />)

    fireEvent.click(screen.getByRole('button', { name: /Better looking fireplace/ }))
    fireEvent.click(screen.getByRole('button', { name: /Existing masonry fireplace/ }))
    fireEvent.click(within(screen.getByLabelText('Fire experience options')).getByRole('button', { name: /I'm not sure yet/ }))

    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('That is normal')
    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('You do not need to know the fuel answer')
  })

  it('gives reassuring guidance when the customer is not sure about context', () => {
    render(<HearthStudioV9Shell />)

    fireEvent.click(screen.getByRole('button', { name: /Better looking fireplace/ }))
    fireEvent.click(within(screen.getByLabelText('Current setup options')).getByRole('button', { name: /I'm not sure yet/ }))

    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('Identifying the current setup is part of the visit')
    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('plain observations')
  })

  it('keeps new construction or remodel out of the goal prompt', () => {
    render(<HearthStudioV9Shell />)

    expect(within(screen.getByLabelText('Opening goal options')).queryByRole('button', { name: /New construction or remodel/ })).not.toBeInTheDocument()
    expect(within(screen.getByLabelText('Opening goal options')).getByRole('button', { name: /Easier to use/ })).toBeInTheDocument()
    expect(within(screen.getByLabelText('Current setup options')).getByRole('button', { name: /New construction or remodel/ })).toBeInTheDocument()
  })

  it('gives reassuring guidance when the customer is not sure yet', () => {
    render(<HearthStudioV9Shell />)

    fireEvent.click(within(screen.getByLabelText('Opening goal options')).getByRole('button', { name: /I'm not sure yet/ }))

    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('That is completely normal')
    expect(screen.getByLabelText('Customer-safe session summary')).toHaveTextContent('simply narrowing the type of fireplace direction')
  })

  it('keeps banned internal terms out of the shell copy', () => {
    render(<HearthStudioV9Shell />)

    expect(scanHearthStudioV9ShellCopy(screen.getByLabelText('Hearth Studio V9 customer preview').textContent)).toEqual([])
  })

  it('shows bridge diagnostics without rendering direction output', () => {
    render(<HearthStudioV9Shell />)

    expect(screen.getByLabelText('Backstage direction bridge diagnostic')).toBeInTheDocument()
    expect(screen.getByText('Backstage preview - direction bridge only')).toBeInTheDocument()
    expect(screen.getByText('Waiting for seated inputs')).toBeInTheDocument()
    expect(screen.getByText(/Still needed: Goal direction, Project setup, Fire experience/)).toBeInTheDocument()
    expect(screen.getByText(/"currentSetup": "not_sure"/)).toBeInTheDocument()

    const text = screen.getByLabelText('Hearth Studio V9 customer preview').textContent
    expect(text).not.toContain('unitId')
    expect(text).not.toContain('displayName')
    expect(text).not.toContain('Worth seeing')
    expect(text).not.toContain('internalHandoff')
  })

  it('updates bridge diagnostics after the seated inputs are complete', () => {
    render(<HearthStudioV9Shell />)

    fireEvent.click(screen.getByRole('button', { name: /More heat/ }))
    fireEvent.click(screen.getByRole('button', { name: /Existing masonry fireplace/ }))
    fireEvent.click(screen.getByRole('button', { name: /Gas convenience/ }))

    expect(screen.getByText('Ready for headless check')).toBeInTheDocument()
    expect(screen.getByText(/"currentSetup": "existing_fireplace"/)).toBeInTheDocument()
    expect(screen.getByText(/"mainGoal": "more_heat"/)).toBeInTheDocument()
    expect(screen.getByText(/"fireExperience": "gas_convenience"/)).toBeInTheDocument()
    expect(screen.queryByText(/"styleDirection"/)).not.toBeInTheDocument()
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
