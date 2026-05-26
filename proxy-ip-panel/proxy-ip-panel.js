const defaults = {
  title: "Proxy IP",
  policy: "♻️ 手动切换",
  icon: "network",
  color: "#34C759",
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

function requestJson(url, policy, callback) {
  $httpClient.get(
    {
      url,
      policy,
      headers: {
        "User-Agent": "Surge Proxy IP Panel/1.0",
        Accept: "application/json",
        "X-Surge-Policy": policy,
      },
    },
    (error, response, data) => {
      if (error) {
        callback(error);
        return;
      }

      const status = response && response.status;
      if (status && (status < 200 || status >= 300)) {
        callback(new Error(`HTTP ${status}`));
        return;
      }

      try {
        callback(null, JSON.parse(data));
      } catch (parseError) {
        callback(parseError);
      }
    },
  );
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
  const timezone = payload.timezone && (payload.timezone.id || payload.timezone);

  return { ip, country, region, city, asn, org, timezone };
}

function render(info) {
  const location = [info.country, info.region, info.city].filter(Boolean).join(" / ");
  const asn = info.asn ? `AS${String(info.asn).replace(/^AS/i, "")}` : "";

  finish(args.title, [
    `Policy: ${args.policy}`,
    info.ip ? `IP: ${info.ip}` : "IP: unknown",
    location ? `Location: ${location}` : "",
    [asn, info.org].filter(Boolean).join("  "),
    info.timezone ? `Timezone: ${info.timezone}` : "",
    "",
    "Forced through Surge policy, bypassing rule match.",
  ]);
}

const endpoints = [
  "https://api.ip.sb/geoip",
  "https://ipwho.is/",
];

function run(index) {
  if (index >= endpoints.length) {
    finish(`${args.title} Failed`, [
      `Policy: ${args.policy}`,
      "Unable to fetch proxy egress IP.",
      "Check that the policy/group name exists and the selected node is reachable.",
    ]);
    return;
  }

  requestJson(endpoints[index], args.policy, (error, payload) => {
    if (error) {
      console.log(`Proxy IP Panel endpoint failed: ${endpoints[index]} ${error}`);
      run(index + 1);
      return;
    }

    const info = normalize(payload);
    if (!info.ip) {
      run(index + 1);
      return;
    }

    render(info);
  });
}

run(0);
