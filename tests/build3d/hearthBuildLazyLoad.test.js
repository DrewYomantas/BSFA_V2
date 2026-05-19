import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('3D hearth build code splitting', () => {
  it('lazy-loads the customer 3D build mode from the customer build screen', () => {
    const source = readFileSync('src/screens/customer/hearth/BuildV5.jsx', 'utf8')

    expect(source).toContain("lazy(() => import('../../../components/build3d/CustomerHearthBuild3D.jsx'))")
    expect(source).not.toContain("import CustomerHearthBuild3D from '../../../components/build3d/CustomerHearthBuild3D.jsx'")
    expect(source).toContain('<Suspense fallback={<HearthBuildLoading />}>')
  })
})
