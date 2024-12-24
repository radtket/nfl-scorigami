import { useState } from 'react';
import Renderer from './Renderer';
import Tooltip from './Tooltip';

const Heatmap = ({ width, height, data }) => {
  const [hoveredCell, setHoveredCell] = useState(null);
  return (
    <div style={{ position: 'relative' }}>
      <Renderer
        data={data}
        height={height}
        setHoveredCell={setHoveredCell}
        width={width}
      />
      <Tooltip height={height} interactionData={hoveredCell} width={width} />
    </div>
  );
};

export default Heatmap;
