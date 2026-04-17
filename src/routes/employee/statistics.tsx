import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/employee/statistics')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/statistics"!</div>
}