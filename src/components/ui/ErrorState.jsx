import { Button } from "@/components/ui";

export default function ErrorState({ message, onRetry, children }) {
  return (
    <div className="rounded-lg border border-red-700 bg-red-900/20 p-4 text-sm text-red-300">
      {message || "오류가 발생했습니다. 잠시 후 다시 시도해주세요."}
      {onRetry && (
        <div className="mt-3">
          <Button onClick={onRetry}>다시 시도</Button>
        </div>
      )}
      {children}
    </div>
  );
}
