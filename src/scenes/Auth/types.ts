//
export interface PropsForm {
  label?: string;
  required?: boolean;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
  mode?: string;
  setMode?: React.Dispatch<React.SetStateAction<boolean>>;
}
