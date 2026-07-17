import { useQuery } from "@tanstack/react-query";
import { fetchMenuItemsClient } from "@/lib/menu-web";
import { isFirebaseClientConfigured } from "@/lib/firebase-web";
import type { MenuItem } from "@/data/menu";

export const menuQueryKey = ["menuItems"] as const;

export function useMenuItems(options?: { availableOnly?: boolean }) {
  const availableOnly = options?.availableOnly ?? true;

  return useQuery<MenuItem[]>({
    queryKey: [...menuQueryKey, { availableOnly }],
    queryFn: () => fetchMenuItemsClient({ availableOnly }),
    enabled: isFirebaseClientConfigured(),
    staleTime: 60_000,
  });
}
