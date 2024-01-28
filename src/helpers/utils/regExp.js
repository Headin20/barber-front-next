export const ONLY_NUMBER = /\D/g;
export const WITHOUT_DOT = /(\..*?)\..*/g;
export const onInputOnlyNumber = event => event.target.value = event.target.value.replace(ONLY_NUMBER, '').replace(WITHOUT_DOT, '$1')
