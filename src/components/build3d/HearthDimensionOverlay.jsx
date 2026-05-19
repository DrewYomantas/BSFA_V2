import { formatDimensionForUnit } from '../../lib/stoneShop/unitConversion.js'

export default function HearthDimensionOverlay({ model, cameraPreset }) {
  const dimensions = model.dimensions

  return (
    <div className={`build3d-dimensions build3d-dimensions--${cameraPreset}`} aria-label="3D hearth dimensions">
      <span className="build3d-dimension build3d-dimension--width">
        Width {formatDimensionForUnit(dimensions.widthInches, 'inches', 'Width')}
      </span>
      <span className="build3d-dimension build3d-dimension--depth">
        Depth {formatDimensionForUnit(dimensions.depthInches, 'inches', 'Depth')}
      </span>
      <span className="build3d-dimension build3d-dimension--thickness">
        Thickness {formatDimensionForUnit(dimensions.thicknessInches, 'inches', 'Thickness')}
      </span>
    </div>
  )
}
