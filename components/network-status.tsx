"use client";

import { useEffect, useRef, useState } from "react";
import { LoaderCircle, Wifi, WifiOff, X } from "lucide-react";

type NetworkState = "online" | "poor" | "offline" | "restored";

type Connection = {
  effectiveType?: string;
  downlink?: number;
  addEventListener?: (type: string, listener: EventListener) => void;
  removeEventListener?: (type: string, listener: EventListener) => void;
};

const HEARTBEAT_INTERVAL_MS = 10000;
const HEARTBEAT_TIMEOUT_MS = 4500;

function getNetworkState(): NetworkState {
  if (!navigator.onLine) return "offline";

  const connection = (navigator as Navigator & { connection?: Connection })
    .connection;
  const isSlowType =
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g";
  const isLowBandwidth =
    typeof connection?.downlink === "number" && connection.downlink < 1.5;

  return isSlowType || isLowBandwidth ? "poor" : "online";
}

export function NetworkStatus() {
  const [networkState, setNetworkState] = useState<NetworkState>("online");
  const [dismissed, setDismissed] = useState(false);
  const retryCheckRef = useRef<(() => void | Promise<void>) | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    let heartbeatInFlight = false;

    const setReachability = (reachable: boolean) => {
      setDismissed(false);
      setNetworkState((currentState) => {
        if (
          reachable &&
          (currentState === "offline" || currentState === "poor")
        ) {
          return "restored";
        }
        if (!reachable) return "offline";
        return getNetworkState();
      });
    };

    const checkReachability = async () => {
      if (heartbeatInFlight) return;
      heartbeatInFlight = true;

      const controller = new AbortController();
      const timeout = window.setTimeout(
        () => controller.abort(),
        HEARTBEAT_TIMEOUT_MS,
      );

      try {
        await fetch("https://www.gstatic.com/generate_204", {
          method: "GET",
          mode: "no-cors",
          cache: "no-store",
          signal: controller.signal,
        });
        setReachability(true);
      } catch {
        setReachability(false);
      } finally {
        window.clearTimeout(timeout);
        heartbeatInFlight = false;
      }
    };
    retryCheckRef.current = checkReachability;

    const updateNetworkState = () => {
      setDismissed(false);
      if (!navigator.onLine) {
        setNetworkState("offline");
        return;
      }
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
    checkReachability();
    const reachabilityTimer = window.setInterval(
      checkReachability,
      HEARTBEAT_INTERVAL_MS,
    );

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      connection?.removeEventListener?.("change", updateNetworkState);
      window.clearInterval(reachabilityTimer);
      retryCheckRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (networkState !== "restored") return;
    const timeout = window.setTimeout(() => setNetworkState("online"), 3500);
    return () => window.clearTimeout(timeout);
  }, [networkState]);

  if (process.env.NODE_ENV !== "production") return null;

  if (dismissed || networkState === "online") return null;

  const isOffline = networkState === "offline";
  const isRestored = networkState === "restored";
  let icon = <LoaderCircle className="size-4 animate-spin" />;
  let message = "Poor network connection. Some features may be unavailable.";
  let colorClass =
    "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300";

  if (isOffline) {
    icon = <WifiOff className="size-4" />;
    message = "You're offline. Reconnecting automatically...";
    colorClass =
      "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300";
  }

  if (isRestored) {
    icon = <Wifi className="size-4" />;
    message = "Connection restored.";
    colorClass =
      "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
  }

  return (
    <div className="pointer-events-none fixed left-1/2 top-1/2 z-[150] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2">
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-auto flex w-full items-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold shadow-lg backdrop-blur-xl animate-in fade-in zoom-in-95 ${colorClass}`}
      >
        {icon}
        <span className="min-w-0 flex-1">{message}</span>
        {isOffline && (
          <button
            type="button"
            onClick={() => retryCheckRef.current?.()}
            className="shrink-0 rounded-md bg-foreground px-3 py-1.5 text-[11px] font-bold text-background transition-opacity hover:opacity-80"
          >
            Retry
          </button>
        )}
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
