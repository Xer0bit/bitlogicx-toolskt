import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tools = [
  {
    id: 0,
    name: "Image Background Remover",
    tweek: 14,
    lweek: 45,
    count: 390,
  },
  {
    id: 1,

    name: "Text to Audio",
    tweek: 17,
    lweek: 34,
    count: 39,
  },
  {
    id: 2,

    name: "Time converter",
    tweek: 90,
    lweek: 200,
    count: 3900,
  },
  {
    id: 3,

    name: "Jpg to Png Converter",
    tweek: 4,
    lweek: 5,
    count: 90,
  },
  {
    id: 4,

    name: "Text to Image generator",
    tweek: 1,
    lweek: 4,
    count: 30,
  },
];

export default function DataTable() {
  return (
    <Table>
      <TableCaption>List of popular tools.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>This week</TableHead>
          <TableHead>Last week</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tools.map((tool) => (
          <TableRow key={tool.id}>
            <TableCell className="font-medium w-96">{tool.name}</TableCell>
            <TableCell>{tool.tweek}</TableCell>
            <TableCell>{tool.lweek}</TableCell>
            <TableCell className="text-right">{tool.count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
