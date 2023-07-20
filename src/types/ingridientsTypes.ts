export interface IIngridientFromDB {
  _id: string;
  ttl: string;
}

export interface IIngridientForLocalStorage {
  id: string;
  idInput: string;
  amount: string;
  unit: string;
  ttl: string;
}
