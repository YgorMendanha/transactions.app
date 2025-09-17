export interface ITransaction {
  date: number;
  amount: string;
  transaction_type: TransactionType;
  currency: Currency;
  account: string;
  industry: string;
  state: string;
}

enum Currency {
  Brl = "brl",
}

enum TransactionType {
  Deposit = "deposit",
  Withdraw = "withdraw",
}
