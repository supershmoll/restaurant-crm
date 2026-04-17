import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/shift')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/shift"!</div>
}