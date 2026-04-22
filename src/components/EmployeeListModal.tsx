import { useEffect, useId, useRef } from "react";
import type { Employee } from "@/features/employees/useEmployeesQuery";

type EmployeeListModalProps = {
  open: boolean;
  title: string;
  employees: Employee[];
  onClose: () => void;
};

export default function EmployeeListModal({ open, title, employees, onClose }: EmployeeListModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const onPointerDown = (e: MouseEvent) => {
      const panel = panelRef.current;
      if (!panel) return;
      if (e.target instanceof Node && panel.contains(e.target)) return;
      onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

      <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="w-full max-w-3xl rounded-2xl bg-white shadow-xl ring-1 ring-black/10"
        >
          <div className="flex items-center justify-between gap-4 border-b border-black/10 px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <h2 id={titleId} className="truncate text-base font-semibold text-text sm:text-lg">
                {title}
              </h2>
              <p className="text-sm text-text/60">{employees.length} employees</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-xl bg-[#F6F6F6] text-text ring-1 ring-black/5 transition hover:bg-[#F0F0F0] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="max-h-[70vh] overflow-auto p-4 sm:p-6">
            <div className="overflow-x-auto rounded-2xl ring-1 ring-black/5">
              <table className="min-w-[640px] w-full border-collapse bg-white text-left">
                <thead className="sticky top-0 bg-white">
                  <tr className="text-xs font-semibold uppercase tracking-wide text-text/50">
                    <th className="px-4 py-3">Employee</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-10 text-center text-sm text-text/60">
                        No employees found.
                      </td>
                    </tr>
                  ) : (
                    employees.map((e) => (
                      <tr key={e.id} className="border-t border-black/5">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={e.image}
                              alt={`${e.firstName} ${e.lastName}`}
                              className="h-10 w-10 rounded-full object-cover bg-gray-100 ring-1 ring-black/10"
                            />
                            <div className="min-w-0">
                              <div className="truncate text-sm font-medium text-text">
                                {e.firstName} {e.lastName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-text/80">{(e.role ?? "—").toString()}</td>
                        <td className="px-4 py-3 text-sm text-text/80">{e.email}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

