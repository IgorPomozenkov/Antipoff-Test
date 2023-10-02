/* eslint-disable no-console */

export function checkField(value: string) {
  const reg = value.match(/^\s+$/);
  //console.log(reg);
  if (!!reg) return true;
}

export function checkFieldName(value: string) {
  const reg1 = value.match(/^\s+$/);
  const reg2 = value.match(/^[A-Za-zА-Яа-яЁё\-_ s]+$/);
  if (!!reg1 || !reg2) return true;
}

export function checkFieldEmail(value: string) {
  const reg1 = value.match(/^\s+$/);
  const reg2 = value.match(/^(.{1,})@(.{1,}).([A-z]{2,8})$/);
  if (!!reg1 || !reg2) return true;
}

export function checkFieldPassw(value: string) {
  const reg1 = value.match(/^\s+$/);
  const reg2 = value.match(/^[^а-яёА-ЯЁ S]+$/);
  if (!!reg1 || !reg2) return true;
}
