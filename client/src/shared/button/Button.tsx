import type { IButtonProps } from '../shared.interface';

export default function Button({
  id,
  label,
  className,
  disabled,
  role,
  testId,
  onClick,
}: IButtonProps) {
  return (
    <button
      data-testid={testId}
      id={id}
      className={className}
      role={role}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
