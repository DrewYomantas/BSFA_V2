import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import CustomerHearthBuild3D from '../../src/components/build3d/CustomerHearthBuild3D.jsx'
import StoneShopPacketBuilder from '../../src/components/stoneShop/StoneShopPacketBuilder.jsx'

describe('customer 3D hearth build proof slice', () => {
  it('renders the basic 3D hearth scene without internal panels', () => {
    render(<CustomerHearthBuild3D renderCanvas={false} />)

    expect(screen.getByLabelText('3D hearth build proof slice')).toBeInTheDocument()
    expect(screen.getByTestId('hearth-3d-scene')).toHaveAttribute('data-shape', 'basic')
    expect(screen.getByText('A visual planning aid for scale and proportion. Your Benson Stone guide will confirm final measurements with you.')).toBeInTheDocument()
    expect(screen.queryByText(/pricing|quote|shop|BisTrack|fabrication|CAD|approval|readiness|internal/i)).not.toBeInTheDocument()
  })

  it('updates dimensions from drag-friendly controls', () => {
    render(<CustomerHearthBuild3D renderCanvas={false} />)

    fireEvent.change(screen.getByLabelText('3D hearth width'), { target: { value: '96' } })
    fireEvent.change(screen.getByLabelText('3D hearth depth'), { target: { value: '24' } })
    fireEvent.change(screen.getByLabelText('3D hearth thickness'), { target: { value: '4' } })

    expect(screen.getByText('96" x 24" x 4"')).toBeInTheDocument()
    expect(screen.getByText('Width 96"')).toBeInTheDocument()
    expect(screen.getByText('Depth 24"')).toBeInTheDocument()
    expect(screen.getByText('Thickness 4"')).toBeInTheDocument()
  })

  it('changes the 3D hearth shape state from customer-safe front shape controls', () => {
    render(<CustomerHearthBuild3D renderCanvas={false} />)

    fireEvent.click(screen.getByRole('button', { name: 'Clipped corners' }))
    expect(screen.getByTestId('hearth-3d-scene')).toHaveAttribute('data-shape', 'clipped_corners')

    fireEvent.click(screen.getByRole('button', { name: 'Angle cuts' }))
    expect(screen.getByTestId('hearth-3d-scene')).toHaveAttribute('data-shape', 'angle_cuts')

    fireEvent.click(screen.getByRole('button', { name: 'Radius front' }))
    expect(screen.getByTestId('hearth-3d-scene')).toHaveAttribute('data-shape', 'radius_front')
  })

  it('offers the customer-safe seated camera preset', () => {
    render(<CustomerHearthBuild3D renderCanvas={false} />)

    fireEvent.click(screen.getByRole('button', { name: 'Seated' }))

    expect(screen.getByRole('button', { name: 'Seated' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByLabelText('3D hearth dimensions')).toHaveClass('build3d-dimensions--seated')
  })

  it('keeps the backstage stone shop packet route intact', () => {
    render(<StoneShopPacketBuilder />)

    expect(screen.getByRole('heading', { name: 'Stone + Shop Packet' })).toBeInTheDocument()
    expect(screen.getByLabelText('Interactive hearth visual builder')).toBeInTheDocument()
  })
})
