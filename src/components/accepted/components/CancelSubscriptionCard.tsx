import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CancelSubscriptionCardProps {
  onCancelClick: () => void;
}

export default function CancelSubscriptionCard({
  onCancelClick,
}: CancelSubscriptionCardProps) {
  return (
    <Card className="mt-8 border-destructive/20">
      <CardHeader>
        <CardTitle className="text-destructive">Cancel Subscription</CardTitle>
        <CardDescription>
          Permanently delete your account and all associated data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="destructive" onClick={onCancelClick}>
          Cancel My Subscription
        </Button>
      </CardContent>
    </Card>
  );
}
