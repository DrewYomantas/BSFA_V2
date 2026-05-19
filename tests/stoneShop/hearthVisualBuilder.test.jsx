import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import HearthVisualBuilder from '../../src/components/stoneShop/visual/HearthVisualBuilder.jsx'
import StoneShopPacketBuilder from '../../src/components/stoneShop/StoneShopPacketBuilder.jsx'
import StonePacketStatusPanel from '../../src/components/stoneShop/StonePacketStatusPanel.jsx'
import { createStoneShopPacket } from '../../src/lib/stoneShop/stoneShopPersistence.js'

beforeEach(() => {
  localStorage.clear()
})

describe('hearth visual builder', () => {
  it('renders basic hearth SVG with placeholder width and depth labels', () => {
    render(<HearthVisualBuilder packet={createStoneShopPacket()} activeTarget="width" onTarget={() => {}} onShapeChange={() => {}} />)

    expect(screen.getByLabelText('basic hearth technical diagram')).toBeInTheDocument()
    expect(screen.getByText('Width')).toBeInTheDocument()
    expect(screen.getByText('Depth')).toBeInTheDocument()
  })

  it('updates width and depth labels from packet state', () => {
    const packet = createStoneShopPacket({
      dimensions: {
        ...createStoneShopPacket().dimensions,
        widthInches: 96,
        depthInches: 16,
      },
    })

    render(<HearthVisualBuilder packet={packet} activeTarget="width" onTarget={() => {}} onShapeChange={() => {}} />)

    expect(screen.getByText('96"')).toBeInTheDocument()
    expect(screen.getByText('16"')).toBeInTheDocument()
  })

  it('renders clipped, angle, and radius hearth SVG variants', () => {
    const { rerender } = render(<HearthVisualBuilder packet={createStoneShopPacket({ packetType: 'hearth_clipped_corners' })} activeTarget="corner" onTarget={() => {}} onShapeChange={() => {}} />)
    expect(screen.getByLabelText('clipped corners hearth technical diagram')).toBeInTheDocument()
    expect(screen.getByText('Clip')).toBeInTheDocument()

    rerender(<HearthVisualBuilder packet={createStoneShopPacket({ packetType: 'hearth_angle_cuts' })} activeTarget="corner" onTarget={() => {}} onShapeChange={() => {}} />)
    expect(screen.getByLabelText('angle cuts hearth technical diagram')).toBeInTheDocument()
    expect(screen.getAllByText('Angle cuts').length).toBeGreaterThan(0)

    rerender(<HearthVisualBuilder packet={createStoneShopPacket({ packetType: 'hearth_radius_front' })} activeTarget="front-edge" onTarget={() => {}} onShapeChange={() => {}} />)
    expect(screen.getByLabelText('radius front hearth technical diagram')).toBeInTheDocument()
    expect(screen.getByText('Radius depth')).toBeInTheDocument()
  })

  it('clicking width, depth, front edge, and corner changes active editing target', () => {
    const targets = []
    render(<HearthVisualBuilder packet={createStoneShopPacket({ packetType: 'hearth_clipped_corners' })} activeTarget="width" onTarget={(target) => targets.push(target)} onShapeChange={() => {}} />)

    fireEvent.click(screen.getByRole('button', { name: 'Edit width' }))
    fireEvent.click(screen.getByRole('button', { name: 'Edit depth' }))
    fireEvent.click(screen.getByRole('button', { name: 'Edit front edge' }))
    fireEvent.click(screen.getByRole('button', { name: 'Edit front corners' }))

    expect(targets).toEqual(['width', 'depth', 'front-edge', 'corner'])
  })

  it('changing hearth shape changes required fields and missing info', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.click(screen.getByRole('button', { name: 'Clipped corners' }))
    expect(screen.getByLabelText('Left clipped corner inches')).toBeInTheDocument()
    expect(screen.getByText('- Left clipped corner inches')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Radius front' }))
    expect(screen.getByLabelText('Radius depth inches')).toBeInTheDocument()
    expect(screen.queryByLabelText('Left clipped corner inches')).not.toBeInTheDocument()
  })

  it('estimate updates when width and depth change through the visual workflow', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.click(screen.getByRole('button', { name: 'Edit width' }))
    fireEvent.change(screen.getByLabelText('Width inches'), { target: { value: '96' } })
    fireEvent.click(screen.getByRole('button', { name: 'Edit depth' }))
    fireEvent.change(screen.getByLabelText('Depth inches'), { target: { value: '16' } })

    const mathPanel = screen.getByText('Liam-style math').closest('div').parentElement
    expect(within(mathPanel).getByText('96 x 16 / 144')).toBeInTheDocument()
    expect(within(mathPanel).getByText('10.67')).toBeInTheDocument()
  })

  it('shaped hearths show preliminary geometry note', () => {
    const packet = createStoneShopPacket({
      packetType: 'hearth_radius_front',
      dimensions: {
        ...createStoneShopPacket().dimensions,
        widthInches: 96,
        depthInches: 16,
      },
    })

    render(<StonePacketStatusPanel packet={packet} updateSection={() => {}} />)

    expect(screen.getByText('Preliminary area uses overall width x depth. Final shaped-piece pricing should be reviewed before shop release.')).toBeInTheDocument()
  })
})
