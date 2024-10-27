import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

export const useTableUrl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateUrl = useCallback(
    (newParams: Record<string, string | undefined>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });

      const search = current.toString();
      const query = search ? `?${search}` : "";

      router.push(`${pathname}${query}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return { updateUrl, searchParams };
};
