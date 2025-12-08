import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function StatCard({ title, description }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          <h1 className="text-2xl">{title}</h1>
        </CardTitle>

        <CardDescription>
          <p>{description}</p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
