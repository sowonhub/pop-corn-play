import { Button, Input } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function SignupForm({
  email,
  password,
  passwordConfirm,
  agree,
  error,
  loading,
  canSubmit,
  onEmailChange,
  onPasswordChange,
  onPasswordConfirmChange,
  onAgreeChange,
  onSubmit,
  className,
}) {
  return (
    <form onSubmit={onSubmit} className={cn("space-y-6", className)}>
      <div className="space-y-4">
        <Input
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={onEmailChange}
          placeholder="이메일"
          disabled={loading}
          className="block w-full"
        />
        <Input
          type="password"
          name="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={onPasswordChange}
          placeholder="비밀번호 (8자 이상)"
          disabled={loading}
          className="block w-full"
        />
        <Input
          type="password"
          name="passwordConfirm"
          autoComplete="new-password"
          required
          value={passwordConfirm}
          onChange={onPasswordConfirmChange}
          placeholder="비밀번호 확인"
          disabled={loading}
          className="block w-full"
        />
      </div>

      <div className="flex items-center">
        <input
          id="agree-checkbox"
          type="checkbox"
          checked={agree}
          onChange={onAgreeChange}
          className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800"
        />
        <label
          htmlFor="agree-checkbox"
          className="ml-2 block text-sm text-neutral-900 dark:text-neutral-300"
        >
          이용약관 및 개인정보 처리에 동의합니다.
        </label>
      </div>

      {error && (
        <div
          role="alert"
          aria-live="polite"
          className="text-center text-sm font-medium whitespace-pre-line text-red-500"
        >
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={!canSubmit}
        className="flex w-full justify-center rounded-md bg-neutral-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
      >
        {loading ? "가입 중…" : "회원가입"}
      </Button>
    </form>
  );
}
