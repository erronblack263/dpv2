"use client";

import { useEffect, useState } from "react";
import { LoaderCircle, Wifi, WifiOff, X } from "lucide-react";

type NetworkState = "online" | "poor" | "offline" | "restored";

type Connection = {
  effectiveType?: string;
  downlink?: number;
  addEventListener?: (type: string, listener: EventListener) => void;
  removeEventListener?: (type: string, listener: EventListener) => void;
};

function getNetworkState(): NetworkState {
  if (!navigator.onLine) return "offline";

  const connection = (navigator as Navigator & { connection?: Connection })
    .connection;
  const isSlowType =
    connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g";
  const isLowBandwidth =
    typeof connection?.downlink === "number" && connection.downlink < 1.5;

  return isSlowType || isLowBandwidth ? "poor" : "online";
}

export function NetworkStatus() {
  const [networkState, setNetworkState] = useState<NetworkState>("online");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkReachability = async () => {
      if (!navigator.onLine) {
        setNetworkState("offline");
        return;
      }

      try {
        const response = await fetch(`${window.location.origin}/?network-check=${Date.now()}`, {
          method: "HEAD",
          cache: "no-store",
        });
        if (!response.ok) setNetworkState("offline");
      } catch {
        setNetworkState("offline");
      }
    };
    const updateNetworkState = () => {
      setDismissed(false);
      setNetworkState(getNetworkState());
    };
    const handleOnline = () => {
      setDismissed(false);
      setNetworkState("restored");
    };
    const handleOffline = () => {
      setDismissed(false);
      setNetworkState("offline");
    };
    const connection = (navigator as Navigator & { connection?: Connection })
      .connection;

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    connection?.addEventListener?.("change", updateNetworkState);
    updateNetworkState();
    const reachabilityTimer = window.setInterval(checkReachability, 15000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      connection?.removeEventListener?.("change", updateNetworkState);
      window.clearInterval(reachabilityTimer);
    };
  }, []);

  useEffect(() => {
    if (networkState !== "restored") return;
    const timeout = window.setTimeout(() => setNetworkState("online"), 3500);
    return () => window.clearTimeout(timeout);
  }, [networkState]);

  if (dismissed || networkState === "online") return null;

  const isOffline = networkState === "offline";
  const isRestored = networkState === "restored";
  const icon = isOffline ? (
    <WifiOff className="size-4" />
  ) : isRestored ? (
    <Wifi className="size-4" />
  ) : (
    <LoaderCircle className="size-4 animate-spin" />
  );
  const message = isOffline
    ? "Network unavailable. Reconnecting..."
    : isRestored
      ? "Connection restored."
      : "Poor network connection. Some features may be unavailable.";
  const colorClass = isOffline
    ? "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300"
    : isRestored
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
      : "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[150] flex justify-center px-4">
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-auto inline-flex max-w-xl items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold shadow-lg backdrop-blur-xl animate-in fade-in slide-in-from-top-2 ${colorClass}`}
      >
        {icon}
        <span>{message}</span>
        {!isRestored && (
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="ml-1 rounded-full p-0.5 opacity-70 transition-opacity hover:opacity-100"
            aria-label="Dismiss network status"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
