declare type blingClientType = {
  name: string,
  email: string,
  phone: string,
};

declare type blingProductType = {
  code: number,
  description: string,
  unit: string,
  amount: number,
  unit_price: number
};

declare type blingProductsType = blingProductType[];

declare type total = {
  [key: string]: string
}

declare type failedOrder = {
  person: object,
  deal: object
}

declare type failedOrders = failedOrder[]