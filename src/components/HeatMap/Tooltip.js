import styles from './tooltip.module.css';

const Tooltip = ({ interactionData, width, height }) => {
  if (!interactionData) {
    return null;
  }

  const { xPos, yPos, value, winning, losing } = interactionData;
  return (
    // Wrapper div: a rect on top of the viz area
    <div
      style={{
        width,
        height,
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
      }}
    >
      {/* The actual box with dark background */}
      <div
        className={styles.tooltip}
        style={{
          position: 'absolute',
          left: xPos,
          top: yPos,
        }}
      >
        <TooltipRow label="winning" value={winning} />
        <TooltipRow label="losing" value={losing} />
        <TooltipRow label="value" value={String(value)} />
      </div>
    </div>
  );
};
const TooltipRow = ({ label, value }) => {
  return (
    <div>
      <b>{label}</b>
      <span>: </span>
      <span>{value}</span>
    </div>
  );
};

export default Tooltip;
