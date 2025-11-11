export default function EmptyState({ message = "표시할 내용이 없어요." }) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 text-center text-neutral-300">
      {message}
    </div>
  );
}

