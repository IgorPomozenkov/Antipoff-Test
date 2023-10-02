//
export interface PropsPasswField {
  labelId?: string;
  outlined?: boolean;
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  passwErr: boolean;
  setPasswErr?: React.Dispatch<React.SetStateAction<object>>;
  fields?: object;
  confirm?: boolean;
}
