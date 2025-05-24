import type { ITextInputProps } from '../shared.interface';

export default function TextInput({
  ref,
  ...props
}: ITextInputProps & {
  ref?: React.RefObject<HTMLInputElement | null>;
}) {
  return <input ref={ref} autoComplete="false" {...props} />;
}
