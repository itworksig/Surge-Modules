const defaults = {
  title: "Process Watch",
  icon: "chart.bar",
  color: "#5E5CE6",
  limit: "6",
};

function parseArgs(input) {
  return String(input || "")
    .split("&")
    .filter(Boolean)
    .reduce((result, pair) => {
      const index = pair.indexOf("=");
      if (index === -1) return result;
      const key = decodeURIComponent(pair.slice(0, index)).toLowerCase();
      const value = decodeURIComponent(pair.slice(index + 1));
      if (value) result[key] = value;
      return result;
    }, {});
}

const args = { ...defaults, ...parseArgs(typeof $argument === "string" ? $argument : "") };

function finish(title, lines) {
  $done({
    title,
    content: lines.filter(Boolean).join("\n"),
    icon: args.icon,
    "icon-color": args.color,
  });
}

function api(method, path, body) {
  return new Promise((resolve, reject) => {
    try {
      $httpAPI(method, path, body || {}, (result) => resolve(result || {}));
    } catch (error) {
      reject(error);
    }
  });
}

function asArray(payload) {
  if (Array.isArray(payload)) return payload;

  if (!payload || typeof payload !== "object") return [];

  return (
    payload.requests ||
    payload.connections ||
    payload.active ||
    payload.recent ||
    payload.data ||
    payload.result ||
    []
  );
}

function pickProcessName(item) {
  if (!item || typeof item !== "object") return "Unknown";

  const candidates = [
    item.process,
    item.processName,
    item.process_name,
    item.sourceProcess,
    item.sourceProcessName,
    item.clientProcess,
    item.application,
    item.app,
    item.bundleIdentifier,
    item.bundleID,
    item.metadata && item.metadata.process,
    item.metadata && item.metadata.processName,
    item.metadata && item.metadata.sourceProcessName,
  ];

  const found = candidates.find((value) => typeof value === "string" && value.trim());
  if (!found) return "Unknown";

  return found.split("/").pop().trim() || "Unknown";
}

function pickPolicy(item) {
  if (!item || typeof item !== "object") return "";

  const candidates = [
    item.policy,
    item.policyName,
    item.policy_name,
    item.rule,
    item.ruleName,
    item.rule_name,
    item.metadata && item.metadata.policy,
    item.metadata && item.metadata.rule,
  ];

  return candidates.find((value) => typeof value === "string" && value.trim()) || "";
}

function countByProcess(items) {
  const map = new Map();

  for (const item of items) {
    const process = pickProcessName(item);
    const policy = pickPolicy(item);
    const current = map.get(process) || { process, count: 0, policies: new Map() };

    current.count += 1;
    if (policy) current.policies.set(policy, (current.policies.get(policy) || 0) + 1);

    map.set(process, current);
  }

  return [...map.values()].sort((a, b) => b.count - a.count);
}

function formatTop(entries, limit) {
  return entries.slice(0, limit).map((entry) => {
    const policy = [...entry.policies.entries()].sort((a, b) => b[1] - a[1])[0];
    const suffix = policy ? ` · ${policy[0]}` : "";
    return `${entry.process}: ${entry.count}${suffix}`;
  });
}

(async () => {
  const limit = Math.max(1, Math.min(12, Number.parseInt(args.limit, 10) || 6));

  let active = [];
  let recent = [];

  try {
    active = asArray(await api("GET", "/v1/requests/active"));
  } catch (error) {
    console.log(`Failed to read active requests: ${error}`);
  }

  try {
    recent = asArray(await api("GET", "/v1/requests/recent"));
  } catch (error) {
    console.log(`Failed to read recent requests: ${error}`);
  }

  const activeTop = countByProcess(active);
  const recentTop = countByProcess(recent);
  const lines = [
    `Active: ${active.length}`,
    `Recent: ${recent.length}`,
    "",
    "Active Top",
    ...(activeTop.length ? formatTop(activeTop, limit) : ["No active requests"]),
    "",
    "Recent Top",
    ...(recentTop.length ? formatTop(recentTop, limit) : ["No recent requests"]),
    "",
    "Note: Surge panels cannot read macOS ps directly.",
  ];

  finish(args.title, lines);
})();
