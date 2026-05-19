import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import StoneShopPacketBuilder from '../../src/components/stoneShop/StoneShopPacketBuilder.jsx'
import StonePacketStatusPanel from '../../src/components/stoneShop/StonePacketStatusPanel.jsx'
import { PACKET_TYPES } from '../../src/data/stoneShop/stoneShopRates.js'
import { createStoneShopPacket, loadStoneShopPackets, saveCurrentStoneShopPacketId, saveStoneShopPackets } from '../../src/lib/stoneShop/stoneShopPersistence.js'
import { getMissingInfoItems } from '../../src/lib/stoneShop/stoneShopStatus.js'

beforeEach(() => {
  localStorage.clear()
})

describe('stone shop guided workflow', () => {
  it('packet type switching changes required fields and missing info', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.click(screen.getByRole('button', { name: 'Type' }))
    fireEvent.click(screen.getByRole('button', { name: /Radius Front Hearth/ }))
    fireEvent.click(screen.getByRole('button', { name: 'Dimensions' }))

    expect(screen.getByLabelText('Front radius inches')).toBeInTheDocument()
    expect(screen.getByLabelText('Radius depth inches')).toBeInTheDocument()
    expect(screen.queryByLabelText('Left clipped corner inches')).not.toBeInTheDocument()
    expect(screen.getByText('- Front radius inches')).toBeInTheDocument()
    expect(screen.getByText('Print form: Hearth with Radius Front Form')).toBeInTheDocument()
  })

  it('material selection approval does not require hearth dimensions', () => {
    const packet = createStoneShopPacket({ packetType: 'material_approval' })

    expect(getMissingInfoItems(packet).map((item) => item.label)).not.toEqual(
      expect.arrayContaining(['Width inches', 'Depth inches']),
    )
  })

  it('Liam-style math shows width x depth / 144 when dimensions exist', () => {
    const packet = createStoneShopPacket({
      dimensions: {
        ...createStoneShopPacket().dimensions,
        widthInches: 60,
        depthInches: 24,
      },
    })

    render(<StonePacketStatusPanel packet={packet} updateSection={() => {}} />)

    expect(screen.getByText('Liam-style math')).toBeInTheDocument()
    expect(screen.getByText('60 x 24 / 144')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('$48.00 / sq ft')).toBeInTheDocument()
  })

  it('estimate updates when adders change', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.click(screen.getByRole('button', { name: 'Dimensions' }))
    fireEvent.change(screen.getByLabelText('Width inches'), { target: { value: '60' } })
    fireEvent.change(screen.getByLabelText('Depth inches'), { target: { value: '24' } })
    fireEvent.click(screen.getByRole('button', { name: 'Fabrication' }))
    fireEvent.change(screen.getByLabelText('Notch (each)'), { target: { value: '2' } })

    const mathPanel = screen.getByText('Liam-style math').closest('div').parentElement
    expect(within(mathPanel).getByText('$80.00')).toBeInTheDocument()
    expect(within(mathPanel).getByText('$560.00')).toBeInTheDocument()
  })

  it('packet type switching clears irrelevant fabrication adders', () => {
    render(<StoneShopPacketBuilder />)

    fireEvent.click(screen.getByRole('button', { name: 'Type' }))
    fireEvent.click(screen.getByRole('button', { name: /Radius Front Hearth/ }))
    fireEvent.click(screen.getByRole('button', { name: 'Type' }))
    fireEvent.click(screen.getByRole('button', { name: /Angle Cut Hearth/ }))
    fireEvent.click(screen.getByRole('button', { name: 'Dimensions' }))
    fireEvent.change(screen.getByLabelText('Width inches'), { target: { value: '60' } })
    fireEvent.change(screen.getByLabelText('Depth inches'), { target: { value: '24' } })

    expect(screen.getAllByText('$560.00').length).toBeGreaterThan(0)
    expect(screen.queryByText(/Radius front edge:/)).not.toBeInTheDocument()
  })

  it('local persistence still saves and loads packets', () => {
    const packet = createStoneShopPacket({ customer: { name: 'Anna Stone', phone: '', address: '', builder: '', mason: '' } })

    saveStoneShopPackets([packet])
    saveCurrentStoneShopPacketId(packet.id)

    expect(loadStoneShopPackets()).toEqual([expect.objectContaining({
      id: packet.id,
      customer: expect.objectContaining({ name: 'Anna Stone' }),
    })])
  })

  it('renders every packet type preset in the helper picker', () => {
    render(<StoneShopPacketBuilder />)
    fireEvent.click(screen.getByRole('button', { name: 'Type' }))

    for (const type of PACKET_TYPES) {
      expect(screen.getAllByText(type.label).length).toBeGreaterThan(0)
    }
  })
})
