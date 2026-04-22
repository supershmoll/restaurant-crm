import { useQuery } from "@tanstack/react-query";

export type EmployeeRole = "admin" | "moderator" | "employee" | string;

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  image: string;
  role?: EmployeeRole;
};

export type EmployeesResponse = {
  users: Employee[];
  total: number;
  skip: number;
  limit: number;
};

const EMPLOYEES_LIMIT = 30;

export const employeesQueryKey = ["employees", { limit: EMPLOYEES_LIMIT }] as const;

async function fetchEmployees(): Promise<EmployeesResponse> {
  const res = await fetch(`https://dummyjson.com/users?limit=${EMPLOYEES_LIMIT}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch employees (HTTP ${res.status})`);
  }
  return res.json();
}

export function useEmployeesQuery() {
  return useQuery({
    queryKey: employeesQueryKey,
    queryFn: fetchEmployees,
  });
}

