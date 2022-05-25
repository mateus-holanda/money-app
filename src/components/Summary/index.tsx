import { useTransactions } from '../../hooks/useTransactions';
import incomeImg from '../../assets/income.svg';
import expenseImg from '../../assets/expense.svg';
import totalImg from '../../assets/total.svg';

import { Container } from './styles';

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((accumulator, transaciton) => {
    if (transaciton.type === 'deposit') {
      accumulator.deposits += transaciton.amount;
      accumulator.total += transaciton.amount;
    } else {
      accumulator.withdraws += transaciton.amount;
      accumulator.total -= transaciton.amount;
    }

    return accumulator;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0
  });

  return (
    <Container>
      <div>
        <header>
          <p>Incomes</p>
          <img src={incomeImg} alt="Incomes" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.deposits)}
        </strong>
      </div>

      <div>
        <header>
          <p>Expenses</p>
          <img src={expenseImg} alt="Expenses" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(- summary.withdraws)}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total Balance</p>
          <img src={totalImg} alt="Total Balance" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)}  
        </strong>
      </div>
    </Container>
  );
}