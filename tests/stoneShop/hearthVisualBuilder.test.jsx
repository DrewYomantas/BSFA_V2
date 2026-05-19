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
    expect(screen.getAllByText('Width').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Depth').length).toBeGreaterThan(0)
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

    expect(screen.getAllByText('96"').length).toBeGreaterThan(0)
    expect(screen.getAllByText('16"').length).toBeGreaterThan(0)
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
    expect(screen.getAllByText('Radius depth').length).toBeGreaterThan(0)
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

  it('guides from width to depth after the width is entered', () => {
    render(<StoneShopPacketBuilder />)

    expect(screen.getAllByText('Start with overall width.').length).toBeGreaterThan(0)

    fireEvent.change(screen.getByLabelText('Width inches'), { target: { value: '96' } })

    expect(screen.getAllByText('Now enter hearth depth.').length).toBeGreaterThan(0)
    expect(screen.getByLabelText('Depth inches')).toHaveClass('ring-2')
  })

  it('uses common dimension and thickness presets without blocking custom values', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.click(screen.getByRole('button', { name: 'Set width 72 inches' }))
    fireEvent.click(screen.getByRole('button', { name: 'Set depth 20 inches' }))
    fireEvent.click(screen.getByRole('button', { name: 'Set thickness 3 inches' }))

    expect(screen.getByLabelText('Width inches')).toHaveValue(72)
    expect(screen.getByLabelText('Depth inches')).toHaveValue(20)
    expect(screen.getByText('72 x 20 / 144')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Set thickness 3 inches' })).toHaveAttribute('aria-pressed', 'true')

    fireEvent.change(screen.getByLabelText('Width inches'), { target: { value: '73' } })
    expect(screen.getByLabelText('Width inches')).toHaveValue(73)
  })

  it('shows drag affordance and live snap context while dragging', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.change(screen.getByLabelText('Snap increment'), { target: { value: '6' } })
    const widthHandle = screen.getAllByRole('slider', { name: 'Drag width' })[1]

    expect(widthHandle).toHaveAttribute('title', 'Drag to resize width')

    fireEvent.pointerDown(widthHandle, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(window, { clientX: 60, clientY: 0 })

    expect(screen.getAllByText('114"').length).toBeGreaterThan(0)
    expect(screen.getByText('Snap 6"')).toBeInTheDocument()

    fireEvent.pointerUp(window, { clientX: 60, clientY: 0 })
  })

  it('clicking a dimension label focuses exact entry for that dimension', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.click(screen.getByRole('button', { name: 'Edit depth' }))

    expect(screen.getByLabelText('Exact depth')).toHaveFocus()
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

  it('dragging a width handle updates and snaps the internal width', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.change(screen.getByLabelText('Snap increment'), { target: { value: '6' } })
    const widthHandle = screen.getAllByRole('slider', { name: 'Drag width' })[1]

    fireEvent.pointerDown(widthHandle, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(window, { clientX: 60, clientY: 0 })
    expect(screen.getByLabelText('Width inches')).toHaveValue(114)
    fireEvent.pointerUp(window, { clientX: 60, clientY: 0 })

    expect(screen.getByText('114"')).toBeInTheDocument()
    expect(screen.getByLabelText('Width inches')).toHaveValue(114)
  })

  it('can toggle width dragging to freeform without snapping', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.change(screen.getByLabelText('Snap increment'), { target: { value: '6' } })
    fireEvent.click(screen.getByLabelText('Snap to points'))
    const widthHandle = screen.getAllByRole('slider', { name: 'Drag width' })[1]

    fireEvent.pointerDown(widthHandle, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(window, { clientX: 50, clientY: 0 })
    fireEvent.pointerUp(window, { clientX: 50, clientY: 0 })

    const widthValue = Number(screen.getByLabelText('Width inches').value)
    expect(widthValue).toBeGreaterThan(96)
    expect(widthValue % 6).not.toBe(0)
  })

  it('exact input respects freeform mode when snap is off', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.change(screen.getByLabelText('Snap increment'), { target: { value: '6' } })
    fireEvent.click(screen.getByLabelText('Snap to points'))
    fireEvent.click(screen.getByRole('button', { name: 'Edit width' }))
    fireEvent.change(screen.getByLabelText('Exact width'), { target: { value: '97' } })
    fireEvent.click(screen.getByRole('button', { name: 'Set' }))

    expect(screen.getByLabelText('Width inches')).toHaveValue(97)
  })

  it('dragging a depth handle updates with the selected snap', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.change(screen.getByLabelText('Snap increment'), { target: { value: '1' } })
    const depthHandle = screen.getAllByRole('slider', { name: 'Drag depth' })[1]

    fireEvent.pointerDown(depthHandle, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(window, { clientX: 0, clientY: 36 })
    fireEvent.pointerUp(window, { clientX: 0, clientY: 36 })

    expect(screen.getByLabelText('Depth inches').value).not.toBe('')
  })

  it('unit display changes labels without changing stored dimension values', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.click(screen.getByRole('button', { name: 'Edit width' }))
    fireEvent.change(screen.getByLabelText('Width inches'), { target: { value: '96' } })
    fireEvent.click(screen.getByRole('button', { name: 'Edit depth' }))
    fireEvent.change(screen.getByLabelText('Depth inches'), { target: { value: '16' } })

    fireEvent.change(screen.getByLabelText('Units'), { target: { value: 'feet_inches' } })
    expect(screen.getByText('8\' 0"')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Units'), { target: { value: 'centimeters' } })
    expect(screen.getByText('243.8 cm')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Units'), { target: { value: 'millimeters' } })
    expect(screen.getByText('2438 mm')).toBeInTheDocument()
    expect(screen.getByText('96 x 16 / 144')).toBeInTheDocument()
  })

  it('exact metric input converts to internal inches for estimate math', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.change(screen.getByLabelText('Units'), { target: { value: 'centimeters' } })
    fireEvent.click(screen.getByRole('button', { name: 'Edit width' }))
    fireEvent.change(screen.getByLabelText('Exact width'), { target: { value: '243.84' } })
    fireEvent.click(screen.getByRole('button', { name: 'Set' }))
    fireEvent.click(screen.getByRole('button', { name: 'Edit depth' }))
    fireEvent.change(screen.getByLabelText('Exact depth'), { target: { value: '40.64' } })
    fireEvent.click(screen.getByRole('button', { name: 'Set' }))

    expect(screen.getByText('96 x 16 / 144')).toBeInTheDocument()
  })

  it('snap applies to clipped corner width drag', () => {
    const packet = createStoneShopPacket({ packetType: 'hearth_clipped_corners' })
    render(<StoneShopPacketBuilder />)

    fireEvent.click(screen.getByRole('button', { name: 'Clipped corners' }))
    fireEvent.change(screen.getByLabelText('Snap increment'), { target: { value: '6' } })
    const widthHandle = screen.getAllByRole('slider', { name: 'Drag width' })[1]

    fireEvent.pointerDown(widthHandle, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(window, { clientX: 60, clientY: 0 })
    fireEvent.pointerUp(window, { clientX: 60, clientY: 0 })

    const value = Number(screen.getByLabelText('Width inches').value)
    expect(value % 6).toBe(0)
  })

  it('snap applies to angle cut width drag', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.click(screen.getByRole('button', { name: 'Angle cuts' }))
    fireEvent.change(screen.getByLabelText('Snap increment'), { target: { value: '6' } })
    const widthHandle = screen.getAllByRole('slider', { name: 'Drag width' })[1]

    fireEvent.pointerDown(widthHandle, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(window, { clientX: 60, clientY: 0 })
    fireEvent.pointerUp(window, { clientX: 60, clientY: 0 })

    const value = Number(screen.getByLabelText('Width inches').value)
    expect(value % 6).toBe(0)
  })

  it('snap applies to radius front width drag', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.click(screen.getByRole('button', { name: 'Radius front' }))
    fireEvent.change(screen.getByLabelText('Snap increment'), { target: { value: '6' } })
    const widthHandle = screen.getAllByRole('slider', { name: 'Drag width' })[1]

    fireEvent.pointerDown(widthHandle, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(window, { clientX: 60, clientY: 0 })
    fireEvent.pointerUp(window, { clientX: 60, clientY: 0 })

    const value = Number(screen.getByLabelText('Width inches').value)
    expect(value % 6).toBe(0)
  })

  it('snap applies to radius front radius-depth drag', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.click(screen.getByRole('button', { name: 'Edit width' }))
    fireEvent.change(screen.getByLabelText('Width inches'), { target: { value: '96' } })
    fireEvent.click(screen.getByRole('button', { name: 'Edit depth' }))
    fireEvent.change(screen.getByLabelText('Depth inches'), { target: { value: '18' } })
    fireEvent.click(screen.getByRole('button', { name: 'Radius front' }))
    fireEvent.change(screen.getByLabelText('Snap increment'), { target: { value: '1' } })

    const radiusHandle = screen.getAllByRole('slider', { name: 'Drag front-edge' })[1]

    fireEvent.pointerDown(radiusHandle, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(window, { clientX: 0, clientY: 20 })
    fireEvent.pointerUp(window, { clientX: 0, clientY: 20 })

    expect(screen.getByLabelText('Radius depth inches').value).not.toBe('')
  })

  it('freeform mode bypasses snap on clipped corners width drag', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.click(screen.getByRole('button', { name: 'Clipped corners' }))
    fireEvent.change(screen.getByLabelText('Snap increment'), { target: { value: '6' } })
    fireEvent.click(screen.getByLabelText('Snap to points'))
    const widthHandle = screen.getAllByRole('slider', { name: 'Drag width' })[1]

    fireEvent.pointerDown(widthHandle, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(window, { clientX: 50, clientY: 0 })
    fireEvent.pointerUp(window, { clientX: 50, clientY: 0 })

    const value = Number(screen.getByLabelText('Width inches').value)
    expect(value).toBeGreaterThan(96)
    expect(value % 6).not.toBe(0)
  })

  it('freeform mode bypasses snap on angle cut width drag', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.click(screen.getByRole('button', { name: 'Angle cuts' }))
    fireEvent.change(screen.getByLabelText('Snap increment'), { target: { value: '6' } })
    fireEvent.click(screen.getByLabelText('Snap to points'))
    const widthHandle = screen.getAllByRole('slider', { name: 'Drag width' })[1]

    fireEvent.pointerDown(widthHandle, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(window, { clientX: 50, clientY: 0 })
    fireEvent.pointerUp(window, { clientX: 50, clientY: 0 })

    const value = Number(screen.getByLabelText('Width inches').value)
    expect(value).toBeGreaterThan(96)
    expect(value % 6).not.toBe(0)
  })

  it('freeform mode bypasses snap on radius front width drag', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.click(screen.getByRole('button', { name: 'Radius front' }))
    fireEvent.change(screen.getByLabelText('Snap increment'), { target: { value: '6' } })
    fireEvent.click(screen.getByLabelText('Snap to points'))
    const widthHandle = screen.getAllByRole('slider', { name: 'Drag width' })[1]

    fireEvent.pointerDown(widthHandle, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(window, { clientX: 50, clientY: 0 })
    fireEvent.pointerUp(window, { clientX: 50, clientY: 0 })

    const value = Number(screen.getByLabelText('Width inches').value)
    expect(value).toBeGreaterThan(96)
    expect(value % 6).not.toBe(0)
  })

  it('changing hearth shape does not reset snap mode', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.change(screen.getByLabelText('Snap increment'), { target: { value: '6' } })
    fireEvent.click(screen.getByLabelText('Snap to points'))
    expect(screen.getByLabelText('Snap to points')).not.toBeChecked()

    fireEvent.click(screen.getByRole('button', { name: 'Clipped corners' }))
    expect(screen.getByLabelText('Snap to points')).not.toBeChecked()

    fireEvent.click(screen.getByRole('button', { name: 'Radius front' }))
    expect(screen.getByLabelText('Snap to points')).not.toBeChecked()
  })

  it('estimate updates after snapped drag on clipped corners', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.click(screen.getByRole('button', { name: 'Edit width' }))
    fireEvent.change(screen.getByLabelText('Width inches'), { target: { value: '96' } })
    fireEvent.click(screen.getByRole('button', { name: 'Edit depth' }))
    fireEvent.change(screen.getByLabelText('Depth inches'), { target: { value: '18' } })
    fireEvent.click(screen.getByRole('button', { name: 'Clipped corners' }))
    fireEvent.change(screen.getByLabelText('Snap increment'), { target: { value: '6' } })

    const widthHandle = screen.getAllByRole('slider', { name: 'Drag width' })[1]
    fireEvent.pointerDown(widthHandle, { clientX: 0, clientY: 0 })
    fireEvent.pointerMove(window, { clientX: 60, clientY: 0 })
    fireEvent.pointerUp(window, { clientX: 60, clientY: 0 })

    const width = Number(screen.getByLabelText('Width inches').value)
    expect(width).toBeGreaterThan(96)
    expect(width % 6).toBe(0)

    const mathPanel = screen.getByText('Liam-style math').closest('div').parentElement
    expect(within(mathPanel).getByText(`${width} x 18 / 144`)).toBeInTheDocument()
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
