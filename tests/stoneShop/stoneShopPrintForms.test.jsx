import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import BlackWhitePrintFormPreview from '../../src/components/stoneShop/BlackWhitePrintFormPreview.jsx'
import { createStoneShopPacket } from '../../src/lib/stoneShop/stoneShopPersistence.js'

describe('stone shop print forms', () => {
  it('renders a black-and-white production form with required manual blocks', () => {
    const packet = createStoneShopPacket({
      customer: {
        name: 'Anna Stone',
        phone: '555-0100',
        address: '123 Hearth Lane',
        builder: 'Benson Builder',
        mason: 'Mason Co',
      },
      dimensions: {
        widthInches: 60,
        depthInches: 24,
        heightInches: null,
        leftReturnInches: null,
        rightReturnInches: null,
        notes: 'Confirm template before cut.',
      },
    })

    const { container } = render(<BlackWhitePrintFormPreview packet={packet} />)
    const form = screen.getByLabelText('Black and white production form')

    expect(screen.getByText('BENSON STONE COMPANY')).toBeInTheDocument()
    expect(screen.getByText('STONE FABRICATION ORDER')).toBeInTheDocument()
    expect(screen.getByText('DRAFT - INTERNAL REVIEW ONLY')).toBeInTheDocument()
    expect(screen.getByText(/Selected packet: Basic Hearth/)).toBeInTheDocument()
    expect(screen.getByText('Field measure confirmed')).toBeInTheDocument()
    expect(screen.getByText('Customer approval: ______________________________')).toBeInTheDocument()
    expect(form.className).toContain('stone-print-form')
    expect(container.querySelector('img')).toBeNull()
    expect(screen.getByLabelText('basic hearth technical diagram')).toBeInTheDocument()
    expect(container.textContent).not.toContain('gradient')
    expect(container.textContent).not.toContain('margin')
  })

  it('prints the same shaped hearth SVG and model part notes', () => {
    const packet = createStoneShopPacket({
      packetType: 'hearth_radius_front',
      dimensions: {
        ...createStoneShopPacket().dimensions,
        widthInches: 96,
        depthInches: 16,
        radiusDepthInches: 6,
      },
      edgeTreatments: {
        ...createStoneShopPacket().edgeTreatments,
        front: 'Radius',
      },
      fabrication: {
        ...createStoneShopPacket().fabrication,
        partNotes: {
          frontEdge: {
            polishNote: 'Polish full front edge.',
            radiusFrontNote: 'Match approved radius template.',
          },
          surface: {
            cutoutNote: 'Template gas line cutout.',
          },
        },
      },
    })

    render(<BlackWhitePrintFormPreview packet={packet} />)

    expect(screen.getByLabelText('radius front hearth technical diagram')).toBeInTheDocument()
    expect(screen.getByText('Polish full front edge.')).toBeInTheDocument()
    expect(screen.getByText('Match approved radius template.')).toBeInTheDocument()
    expect(screen.getByText('Template gas line cutout.')).toBeInTheDocument()
  })
})
