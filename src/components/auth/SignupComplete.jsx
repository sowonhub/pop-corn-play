import { Link } from "react-router-dom";

import { Button } from "@/components/ui";
import { PATHS } from "@/router";

import AuthCard from "./AuthCard";
import AuthLayout from "./AuthLayout";
import LoginIntro from "./LoginIntro";

export default function SignupComplete() {
  return (
    <AuthLayout>
      <AuthCard>
        <div className="space-y-4">
          <LoginIntro
            title="회원가입 완료"
            description="입력하신 주소로 인증 메일을 보냈어요."
          />
          <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            메일함에서 인증을 완료하신 후 로그인해 주세요.
          </p>
        </div>

        <div>
          <Link to={PATHS.LOGIN}>
            <Button className="w-full justify-center bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100">
              로그인 페이지로 이동
            </Button>
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
