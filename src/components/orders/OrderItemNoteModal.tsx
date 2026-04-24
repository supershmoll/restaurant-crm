import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

type OrderItemNoteModalProps = {
  open: boolean;
  itemName: string;
  initialNote?: string;
  onClose: () => void;
  onSave: (note: string) => void;
};

export default function OrderItemNoteModal({
  open,
  itemName,
  initialNote,
  onClose,
  onSave,
}: OrderItemNoteModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [note, setNote] = useState(initialNote ?? "");

  useEffect(() => {
    if (!open) return;
    setNote(initialNote ?? "");
  }, [initialNote, open]);

  useEffect(() => {
    if (!open) return;
    textareaRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    function handlePointerDown(event: MouseEvent) {
      const panel = panelRef.current;
      if (!panel) return;
      if (event.target instanceof Node && panel.contains(event.target)) return;
      onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handlePointerDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return function cleanupModal() {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handlePointerDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, open]);

  if (!open) return null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(note);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

      <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-item-note-title"
          className="w-full max-w-lg rounded-2xl bg-white shadow-xl ring-1 ring-black/10"
        >
          <form onSubmit={handleSubmit}>
            <div className="border-b border-black/10 px-4 py-3 sm:px-6">
              <h2 id="order-item-note-title" className="text-base font-semibold text-text sm:text-lg">
                Note for {itemName}
              </h2>
              <p className="mt-1 text-sm text-text/60">Add or update a note for this dish.</p>
            </div>

            <div className="space-y-3 p-4 sm:p-6">
              <textarea
                ref={textareaRef}
                value={note}
                onChange={handleNoteChange}
                rows={5}
                placeholder="e.g. no onions, extra spicy, serve later"
                className="w-full rounded-2xl bg-white px-4 py-3 text-sm text-text ring-1 ring-black/10 outline-none transition focus-visible:ring-2 focus-visible:ring-black/15"
              />

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={handleClear} className="h-10 rounded-xl border-black/10 px-4 text-text">
                  Clear note
                </Button>
                <Button type="button" variant="outline" onClick={onClose} className="h-10 rounded-xl border-black/10 px-4 text-text">
                  Cancel
                </Button>
                <Button type="submit" className="h-10 rounded-xl bg-dark-button px-4 text-white hover:bg-dark-button/90">
                  Save note
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  function handleNoteChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setNote(event.target.value);
  }

  function handleClear() {
    setNote("");
  }
}
