import { Button, Input } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function LoginForm({
  email,
  password,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  className,
}) {
  return (
    <form onSubmit={onSubmit} className={cn("space-y-6", className)}>
      <div className="space-y-4">
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={onEmailChange}
          placeholder="이메일 주소"
          className="block w-full"
        />
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={onPasswordChange}
          placeholder="비밀번호"
          className="block w-full"
        />
      </div>

      {error && (
        <div className="text-center text-sm font-medium text-red-500">
          {error}
        </div>
      )}

      <div>
        <Button
          type="submit"
          disabled={loading}
          className="flex w-full justify-center rounded-md bg-neutral-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
        >
          {loading ? "로그인 중..." : "로그인"}
        </Button>
      </div>
    </form>
  );
}
