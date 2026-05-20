import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import HearthStudioV9Screen from '../src/screens/v9-hearth-studio-3d/HearthStudioV9Screen.jsx'
import { scanV9CustomerSummaryCopy } from '../src/data/v9/hearthStudioSeed.js'

describe('V9 Hearth Studio proof screen', () => {
  it('renders the isolated 3D proof surface with customer-safe study copy', () => {
    render(<HearthStudioV9Screen renderCanvas={false} />)

    expect(screen.getByLabelText('V9 Hearth Studio 3D proof')).toBeInTheDocument()
    expect(screen.getByTestId('v9-hearth-scene')).toHaveAttribute('data-material', 'Warm Limestone Placeholder')
    expect(screen.getByText('This is a visual planning study, not a final construction drawing.')).toBeInTheDocument()
    expect(screen.queryByText('Verify field measurements before quote/fabrication.')).not.toBeInTheDocument()
    expect(scanV9CustomerSummaryCopy(screen.getByLabelText('V9 customer-safe summary').textContent)).toEqual([])
  })

  it('updates the visible dimensional study from live controls', () => {
    render(<HearthStudioV9Screen renderCanvas={false} />)

    fireEvent.change(screen.getByRole('slider', { name: 'Hearth width' }), { target: { value: '96' } })
    fireEvent.change(screen.getByRole('slider', { name: 'Hearth depth' }), { target: { value: '24' } })
    fireEvent.change(screen.getByRole('slider', { name: 'Hearth height' }), { target: { value: '6' } })
    fireEvent.change(screen.getByRole('slider', { name: 'Fireplace opening width' }), { target: { value: '48' } })
    fireEvent.change(screen.getByRole('slider', { name: 'Fireplace opening height' }), { target: { value: '36' } })
    fireEvent.change(screen.getByRole('slider', { name: 'Mantel height' }), { target: { value: '66' } })
    fireEvent.change(screen.getByRole('slider', { name: 'Stone height' }), { target: { value: '120' } })

    const summary = screen.getByLabelText('V9 customer-safe summary')
    expect(within(summary).getByText('Hearth study: 96 in wide, 24 in deep, 6 in high.')).toBeInTheDocument()
    expect(within(summary).getByText('Opening study: 48 in wide by 36 in high.')).toBeInTheDocument()
    expect(within(summary).getByText('Mantel height is shown at 66 in with stone mass rising to 120 in.')).toBeInTheDocument()
  })

  it('updates material lighting and camera scene metadata', () => {
    render(<HearthStudioV9Screen renderCanvas={false} />)

    fireEvent.click(screen.getByRole('button', { name: /Rustic Fieldstone Placeholder/ }))
    fireEvent.click(screen.getByRole('button', { name: 'Evening Firelight' }))
    fireEvent.click(screen.getByRole('button', { name: 'Side Depth' }))

    expect(screen.getByTestId('v9-hearth-scene')).toHaveAttribute('data-material', 'Rustic Fieldstone Placeholder')
    expect(screen.getByTestId('v9-hearth-scene')).toHaveAttribute('data-lighting', 'Evening Firelight')
    expect(screen.getByTestId('v9-hearth-scene')).toHaveAttribute('data-camera', 'Side Depth')
    expect(screen.getByRole('button', { name: /Rustic Fieldstone Placeholder/ })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Evening Firelight' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Side Depth' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('keeps the rep overlay off until explicitly enabled', () => {
    render(<HearthStudioV9Screen renderCanvas={false} />)

    expect(screen.queryByLabelText('V9 rep fit overlay')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Show rep overlay' }))

    expect(screen.getByLabelText('V9 rep fit overlay')).toBeInTheDocument()
    expect(screen.getByText('Dimension grid / labels')).toBeInTheDocument()
    expect(screen.getByText('Verify field measurements before quote/fabrication.')).toBeInTheDocument()
  })
})
