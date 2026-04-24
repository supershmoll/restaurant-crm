type StatCardProps<T extends string = string> = {
  title: string;
  value: number;
  onView?: (value: T) => void;
  viewValue?: T;
  actionLabel?: string;
};

function StatCard<T extends string = string>({
  title,
  value,
  onView,
  viewValue,
  actionLabel = "View",
}: StatCardProps<T>) {
  function handleView() {
    if (!onView || viewValue === undefined) return;
    onView(viewValue);
  }

  return (
    <div className="w-full rounded-2xl bg-[#F6F6F6] px-6 py-5">
      <p className="font-inter text-sm font-bold leading-none tracking-normal text-black/40">
        {title}
      </p>

      <div className="mt-3 flex items-center gap-4">
        <p className="font-poppins text-[40px] font-semibold leading-none tracking-normal text-black">
          {value}
        </p>

        <div className="h-px flex-1 bg-black/25" />

        <button
          type="button"
          onClick={handleView}
          disabled={!onView || viewValue === undefined}
          className="rounded-xl bg-white px-5 py-2 font-inter text-sm font-medium leading-none text-black shadow-sm ring-1 ring-black/5 transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

export default StatCard;