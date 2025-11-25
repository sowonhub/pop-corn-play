import { Link } from "react-router-dom";

export default function AuthActionPrompt({ message, linkText, to }) {
  return (
    <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
      {message}{" "}
      <Link
        to={to}
        className="font-medium text-neutral-900 hover:text-neutral-800 dark:text-white dark:hover:text-neutral-200"
      >
        {linkText}
      </Link>
    </p>
  );
}
