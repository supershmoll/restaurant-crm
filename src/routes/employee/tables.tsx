import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/employee/tables')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/tables"!</div>;
}
