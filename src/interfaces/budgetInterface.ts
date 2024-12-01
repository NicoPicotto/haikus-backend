export default interface BudgetBody {
   title: string;
   client: string;
   project: string;
   items: string[];
   amount: number;
   date: Date;
}
