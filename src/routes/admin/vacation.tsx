import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/vacation')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/vacation"!</div>
}