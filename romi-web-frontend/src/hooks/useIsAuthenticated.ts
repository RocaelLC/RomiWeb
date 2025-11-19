"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";

export function useIsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Solo corre en el cliente
    const token = getToken();
    setIsAuthenticated(!!token);
    setChecked(true);
  }, []);

  return { isAuthenticated, checked };
}
