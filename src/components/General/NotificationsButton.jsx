import { Badge, Button } from "@material-tailwind/react";

export function NotificationsButton() {
  return (
    <Badge content="5" withBorder className="text-sm font-bold">
      <Button className="text-sm">Notifications</Button>
    </Badge>
  );
}
