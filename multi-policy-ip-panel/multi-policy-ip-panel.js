const defaults = {
  title: "Policy IPs",
  policies: "♻️ 手动切换,🧲 OpenAI,🎬 Netflix,DIRECT",
  icon: "network",
  color: "#34C759",
};

const endpoints = [
  "https://api.ip.sb/geoip",
  "https://ipwho.is/",
];

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

function normalize(payload) {
  const ip = payload.ip || payload.query;
  const country = payload.country || payload.country_name;
  const region = payload.region || payload.regionName || payload.region_name;
  const city = payload.city;
  const asn = payload.asn || (payload.connection && payload.connection.asn);
  const org =
    payload.org ||
    payload.isp ||
    (payload.connection && (payload.connection.org || payload.connection.isp));

  return { ip, country, region, city, asn, org };
}

function requestJson(url, policy) {
  return new Promise((resolve, reject) => {
    $httpClient.get(
      {
        url,
        policy,
        headers: {
          "User-Agent": "Surge Multi Policy IP Panel/1.0",
          Accept: "application/json",
          "X-Surge-Policy": policy,
        },
      },
      (error, response, data) => {
        if (error) {
          reject(error);
          return;
        }

        const status = response && response.status;
        if (status && (status < 200 || status >= 300)) {
          reject(new Error(`HTTP ${status}`));
          return;
        }

        try {
          resolve(JSON.parse(data));
        } catch (parseError) {
          reject(parseError);
        }
      },
    );
  });
}

async function lookup(policy) {
  for (const endpoint of endpoints) {
    try {
      const payload = await requestJson(endpoint, policy);
      const info = normalize(payload);
      if (info.ip) return info;
    } catch (error) {
      console.log(`Multi Policy IP lookup failed: ${policy} ${endpoint} ${error}`);
    }
  }

  return null;
}

function shortPolicyName(policy) {
  return policy.length > 18 ? `${policy.slice(0, 17)}…` : policy;
}

(async () => {
  const policies = args.policies
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!policies.length) {
    finish(`${args.title} Failed`, ["No policy configured."]);
    return;
  }

  const lines = [];

  for (const policy of policies) {
    const info = await lookup(policy);

    if (!info) {
      lines.push(`${shortPolicyName(policy)}: failed`);
      continue;
    }

    const country = [info.country, info.region, info.city].filter(Boolean).join(" / ");
    const asn = info.asn ? `AS${String(info.asn).replace(/^AS/i, "")}` : "";
    const org = [asn, info.org].filter(Boolean).join(" ");

    lines.push(`${shortPolicyName(policy)}: ${info.ip}`);
    if (country) lines.push(`  ${country}`);
    if (org) lines.push(`  ${org}`);
  }

  finish(args.title, lines);
})();
