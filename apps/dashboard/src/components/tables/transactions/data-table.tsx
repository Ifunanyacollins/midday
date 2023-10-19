import { Avatar, AvatarImage } from "@midday/ui/avatar";
import { Icons } from "@midday/ui/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@midday/ui/table";
import { cn } from "@midday/ui/utils";
import { format } from "date-fns";

function FormattedAmount({ currency, amount }) {
  if (!currency || !amount) {
    return null;
  }

  const formattedAmount = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
  }).format(amount);

  return (
    <span className={cn(amount > 0 && "text-[#00E547]")}>
      {formattedAmount}
    </span>
  );
}

function AssignedUser({ user }) {
  return (
    <div className="flex space-x-2 w-[120px]">
      <Avatar className="h-5 w-5">
        <AvatarImage src={user?.avatar_url} alt={user?.full_name} />
      </Avatar>
      <span className="truncate">{user?.full_name.split(" ").at(0)}</span>
    </div>
  );
}

type Item = {
  id: string;
};

type ItemsProps = {
  data: Item[];
};

export function DataTableRow({ data }) {
  const fullfilled = data.attachment && data.vat;

  return (
    <TableRow className="h-[45px]">
      <TableCell className="w-[380px]">
        <span className={cn(data.amount > 0 && "text-[#00E547]")}>
          {data.name}
        </span>
      </TableCell>
      <TableCell className="w-[170px]">
        {data.date && format(new Date(data.date), "E, LLL d, y")}
      </TableCell>
      <TableCell className="w-[250px]">
        <FormattedAmount currency={data.currency} amount={data.amount} />
      </TableCell>
      <TableCell className="w-[280px]">{data.method}</TableCell>
      <TableCell className="w-[180px]">
        <AssignedUser user={data.assigned} />
      </TableCell>
      <TableCell>
        {fullfilled ? <Icons.Check /> : <Icons.AlertCircle />}
      </TableCell>
    </TableRow>
  );
}

export function DataTableHeader() {
  return (
    <TableHeader className="sticky -top-[1px] z-10 ">
      <TableRow>
        <TableHead className="w-[380px] backdrop-filter backdrop-blur-lg bg-background/80">
          To/From
        </TableHead>
        <TableHead className="w-[170px] backdrop-filter backdrop-blur-lg bg-background/80">
          Date
        </TableHead>
        <TableHead className="w-[250px] backdrop-filter backdrop-blur-lg bg-background/80">
          Amount
        </TableHead>
        <TableHead className="w-[280px] backdrop-filter backdrop-blur-lg bg-background/80">
          Method
        </TableHead>
        <TableHead className="w-[180px] backdrop-filter backdrop-blur-lg bg-background/80">
          Assigned
        </TableHead>
        <TableHead className="backdrop-filter backdrop-blur-lg bg-background/80">
          Status
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

export function DataTable({ data }: ItemsProps) {
  return (
    <Table>
      <DataTableHeader />
      <TableBody>
        {data?.map((row) => (
          <DataTableRow key={row.id} data={row} />
        ))}
      </TableBody>
    </Table>
  );
}