import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/payroll')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/payroll"!</div>
}
