import { ChangeEvent } from 'react';

// type Target = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type Target = { target: { value: string, name: string }};
export default Target;
