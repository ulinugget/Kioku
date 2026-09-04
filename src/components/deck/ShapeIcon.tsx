import { SHAPE_PATHS } from '../../shapes';

interface ShapeIconProps {
  shape: string;
  color?: string;
  className?: string;
}

export function ShapeIcon({ shape, color = '#000000', className }: ShapeIconProps) {
  const d = SHAPE_PATHS[shape];
  if (!d) return null;

  return (
    <svg
      width="256"
      height="256"
      viewBox="0 0 256 256"
      fill="none"
      role="img"
      className={className}
    >
      <path d={d} fill={color} />
    </svg>
  );
}
