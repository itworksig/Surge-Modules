把 `node-country-consistency-panel/node-country-consistency-panel.js` 整个替换成这个：

```js
const defaults = {
  title: "Node Country",
  group: "♻️ 手动切换",
  icon: "location",
  color: "#FFCC00",
};

const countryNames = {
  AD: "Andorra",
  AE: "United Arab Emirates",
  AF: "Afghanistan",
  AG: "Antigua and Barbuda",
  AI: "Anguilla",
  AL: "Albania",
  AM: "Armenia",
  AO: "Angola",
  AQ: "Antarctica",
  AR: "Argentina",
  AS: "American Samoa",
  AT: "Austria",
  AU: "Australia",
  AW: "Aruba",
  AX: "Aland Islands",
  AZ: "Azerbaijan",
  BA: "Bosnia and Herzegovina",
  BB: "Barbados",
  BD: "Bangladesh",
  BE: "Belgium",
  BF: "Burkina Faso",
  BG: "Bulgaria",
  BH: "Bahrain",
  BI: "Burundi",
  BJ: "Benin",
  BL: "Saint Barthelemy",
  BM: "Bermuda",
  BN: "Brunei",
  BO: "Bolivia",
  BQ: "Caribbean Netherlands",
  BR: "Brazil",
  BS: "Bahamas",
  BT: "Bhutan",
  BV: "Bouvet Island",
  BW: "Botswana",
  BY: "Belarus",
  BZ: "Belize",
  CA: "Canada",
  CC: "Cocos Islands",
  CD: "Democratic Republic of the Congo",
  CF: "Central African Republic",
  CG: "Republic of the Congo",
  CH: "Switzerland",
  CI: "Cote d'Ivoire",
  CK: "Cook Islands",
  CL: "Chile",
  CM: "Cameroon",
  CN: "China",
  CO: "Colombia",
  CR: "Costa Rica",
  CU: "Cuba",
  CV: "Cape Verde",
  CW: "Curacao",
  CX: "Christmas Island",
  CY: "Cyprus",
  CZ: "Czechia",
  DE: "Germany",
  DJ: "Djibouti",
  DK: "Denmark",
  DM: "Dominica",
  DO: "Dominican Republic",
  DZ: "Algeria",
  EC: "Ecuador",
  EE: "Estonia",
  EG: "Egypt",
  EH: "Western Sahara",
  ER: "Eritrea",
  ES: "Spain",
  ET: "Ethiopia",
  FI: "Finland",
  FJ: "Fiji",
  FK: "Falkland Islands",
  FM: "Micronesia",
  FO: "Faroe Islands",
  FR: "France",
  GA: "Gabon",
  GB: "United Kingdom",
  GD: "Grenada",
  GE: "Georgia",
  GF: "French Guiana",
  GG: "Guernsey",
  GH: "Ghana",
  GI: "Gibraltar",
  GL: "Greenland",
  GM: "Gambia",
  GN: "Guinea",
  GP: "Guadeloupe",
  GQ: "Equatorial Guinea",
  GR: "Greece",
  GS: "South Georgia and the South Sandwich Islands",
  GT: "Guatemala",
  GU: "Guam",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HK: "Hong Kong",
  HM: "Heard Island and McDonald Islands",
  HN: "Honduras",
  HR: "Croatia",
  HT: "Haiti",
  HU: "Hungary",
  ID: "Indonesia",
  IE: "Ireland",
  IL: "Israel",
  IM: "Isle of Man",
  IN: "India",
  IO: "British Indian Ocean Territory",
  IQ: "Iraq",
  IR: "Iran",
  IS: "Iceland",
  IT: "Italy",
  JE: "Jersey",
  JM: "Jamaica",
  JO: "Jordan",
  JP: "Japan",
  KE: "Kenya",
  KG: "Kyrgyzstan",
  KH: "Cambodia",
  KI: "Kiribati",
  KM: "Comoros",
  KN: "Saint Kitts and Nevis",
  KP: "North Korea",
  KR: "South Korea",
  KW: "Kuwait",
  KY: "Cayman Islands",
  KZ: "Kazakhstan",
  LA: "Laos",
  LB: "Lebanon",
  LC: "Saint Lucia",
  LI: "Liechtenstein",
  LK: "Sri Lanka",
  LR: "Liberia",
  LS: "Lesotho",
  LT: "Lithuania",
  LU: "Luxembourg",
  LV: "Latvia",
  LY: "Libya",
  MA: "Morocco",
  MC: "Monaco",
  MD: "Moldova",
  ME: "Montenegro",
  MF: "Saint Martin",
  MG: "Madagascar",
  MH: "Marshall Islands",
  MK: "North Macedonia",
  ML: "Mali",
  MM: "Myanmar",
  MN: "Mongolia",
  MO: "Macao",
  MP: "Northern Mariana Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MS: "Montserrat",
  MT: "Malta",
  MU: "Mauritius",
  MV: "Maldives",
  MW: "Malawi",
  MX: "Mexico",
  MY: "Malaysia",
  MZ: "Mozambique",
  NA: "Namibia",
  NC: "New Caledonia",
  NE: "Niger",
  NF: "Norfolk Island",
  NG: "Nigeria",
  NI: "Nicaragua",
  NL: "Netherlands",
  NO: "Norway",
  NP: "Nepal",
  NR: "Nauru",
  NU: "Niue",
  NZ: "New Zealand",
  OM: "Oman",
  PA: "Panama",
  PE: "Peru",
  PF: "French Polynesia",
  PG: "Papua New Guinea",
  PH: "Philippines",
  PK: "Pakistan",
  PL: "Poland",
  PM: "Saint Pierre and Miquelon",
  PN: "Pitcairn",
  PR: "Puerto Rico",
  PS: "Palestine",
  PT: "Portugal",
  PW: "Palau",
  PY: "Paraguay",
  QA: "Qatar",
  RE: "Reunion",
  RO: "Romania",
  RS: "Serbia",
  RU: "Russia",
  RW: "Rwanda",
  SA: "Saudi Arabia",
  SB: "Solomon Islands",
  SC: "Seychelles",
  SD: "Sudan",
  SE: "Sweden",
  SG: "Singapore",
  SH: "Saint Helena",
  SI: "Slovenia",
  SJ: "Svalbard and Jan Mayen",
  SK: "Slovakia",
  SL: "Sierra Leone",
  SM: "San Marino",
  SN: "Senegal",
  SO: "Somalia",
  SR: "Suriname",
  SS: "South Sudan",
  ST: "Sao Tome and Principe",
  SV: "El Salvador",
  SX: "Sint Maarten",
  SY: "Syria",
  SZ: "Eswatini",
  TC: "Turks and Caicos Islands",
  TD: "Chad",
  TF: "French Southern Territories",
  TG: "Togo",
  TH: "Thailand",
  TJ: "Tajikistan",
  TK: "Tokelau",
  TL: "Timor-Leste",
  TM: "Turkmenistan",
  TN: "Tunisia",
  TO: "Tonga",
  TR: "Turkey",
  TT: "Trinidad and Tobago",
  TV: "Tuvalu",
  TW: "Taiwan",
  TZ: "Tanzania",
  UA: "Ukraine",
  UG: "Uganda",
  UM: "United States Minor Outlying Islands",
  US: "United States",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VA: "Vatican City",
  VC: "Saint Vincent and the Grenadines",
  VE: "Venezuela",
  VG: "British Virgin Islands",
  VI: "United States Virgin Islands",
  VN: "Vietnam",
  VU: "Vanuatu",
  WF: "Wallis and Futuna",
  WS: "Samoa",
  YE: "Yemen",
  YT: "Mayotte",
  ZA: "South Africa",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};

const countryAliases = {
  AE: ["阿联酋", "阿聯酋", "uae", "dubai"],
  AR: ["阿根廷", "argentina", "buenos aires"],
  AT: ["奥地利", "奧地利", "austria", "vienna"],
  AU: ["澳大利亚", "澳大利亞", "澳洲", "australia", "sydney", "melbourne"],
  BE: ["比利时", "比利時", "belgium", "brussels"],
  BR: ["巴西", "brazil", "sao paulo"],
  CA: ["加拿大", "canada", "toronto", "vancouver"],
  CH: ["瑞士", "switzerland", "zurich"],
  CL: ["智利", "chile"],
  CN: ["中国", "中國", "大陆", "大陸", "china", "mainland"],
  DE: ["德国", "德國", "法兰克福", "法蘭克福", "germany", "frankfurt"],
  DK: ["丹麦", "丹麥", "denmark", "copenhagen"],
  ES: ["西班牙", "spain", "madrid"],
  FI: ["芬兰", "芬蘭", "finland", "helsinki"],
  FR: ["法国", "法國", "巴黎", "france", "paris"],
  GB: ["英国", "英國", "伦敦", "倫敦", "united kingdom", "uk", "britain", "london"],
  HK: ["香港", "港", "hong kong"],
  ID: ["印度尼西亚", "印度尼西亞", "印尼", "indonesia", "jakarta"],
  IE: ["爱尔兰", "愛爾蘭", "ireland", "dublin"],
  IL: ["以色列", "israel", "tel aviv"],
  IN: ["印度", "india", "mumbai", "delhi"],
  IT: ["意大利", "義大利", "italy", "milan", "rome"],
  JP: ["日本", "东京", "東京", "大阪", "japan", "tokyo", "osaka"],
  KR: ["韩国", "韓國", "首尔", "首爾", "korea", "south korea", "seoul"],
  MO: ["澳门", "澳門", "macao", "macau"],
  MX: ["墨西哥", "mexico"],
  MY: ["马来西亚", "馬來西亞", "malaysia", "kuala lumpur"],
  NL: ["荷兰", "荷蘭", "netherlands", "holland", "amsterdam"],
  NO: ["挪威", "norway", "oslo"],
  NZ: ["新西兰", "紐西蘭", "new zealand"],
  PH: ["菲律宾", "菲律賓", "philippines", "manila"],
  PL: ["波兰", "波蘭", "poland", "warsaw"],
  PT: ["葡萄牙", "portugal", "lisbon"],
  RU: ["俄罗斯", "俄羅斯", "russia", "moscow"],
  SE: ["瑞典", "sweden", "stockholm"],
  SG: ["新加坡", "singapore"],
  TH: ["泰国", "泰國", "thailand", "bangkok"],
  TR: ["土耳其", "turkey", "istanbul"],
  TW: ["台湾", "台灣", "台北", "taiwan", "taipei"],
  UA: ["乌克兰", "烏克蘭", "ukraine"],
  US: ["美国", "美國", "洛杉矶", "洛杉磯", "芝加哥", "纽约", "紐約", "united states", "usa", "america", "los angeles", "chicago", "new york"],
  VN: ["越南", "vietnam", "hanoi"],
  ZA: ["南非", "south africa", "johannesburg"],
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

function finish(title, lines, color = args.color) {
  $done({
    title,
    content: lines.filter(Boolean).join("\n"),
    icon: args.icon,
    "icon-color": color,
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

function requestJson(url, policy) {
  return new Promise((resolve, reject) => {
    $httpClient.get(
      {
        url,
        policy,
        headers: {
          "User-Agent": "Surge Node Country Consistency/1.2",
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

function extractSelectedPolicy(payload) {
  if (!payload || typeof payload !== "object") return "";

  return (
    payload.policy ||
    payload.now ||
    payload.current ||
    payload.selected ||
    payload.selection ||
    payload.selected_policy ||
    payload.selectedPolicy ||
    payload["selected-policy"] ||
    ""
  );
}

function flagToCode(flag) {
  const chars = [...String(flag || "")];
  if (chars.length < 2) return "";

  const code = chars.slice(0, 2).map((char) => char.codePointAt(0) - 127397);
  if (code.some((value) => value < 65 || value > 90)) return "";

  return String.fromCharCode(code[0], code[1]);
}

function codesFromFlags(text) {
  const matches = String(text || "").match(/[\u{1F1E6}-\u{1F1FF}]{2}/gu) || [];
  return matches.map(flagToCode).filter(Boolean);
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[()[\]{}]/g, " ")
    .replace(/[|｜丨_./,;:]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function expectedCodesFromName(name) {
  const text = String(name || "");
  const lower = normalizeText(text);
  const codes = codesFromFlags(text);

  for (const [code, countryName] of Object.entries(countryNames)) {
    const normalizedCountryName = normalizeText(countryName);

    if (lower.includes(normalizedCountryName)) {
      codes.push(code);
    }
  }

  for (const [code, aliases] of Object.entries(countryAliases)) {
    if (aliases.some((alias) => lower.includes(normalizeText(alias)))) {
      codes.push(code);
    }
  }

  const tokens = lower.split(/\s+/).filter(Boolean);
  for (const token of tokens) {
    if (/^[a-z]{2}$/.test(token) && countryNames[token.toUpperCase()]) {
      codes.push(token.toUpperCase());
    }
  }

  return [...new Set(codes)];
}

function normalizeCountryCode(value) {
  return String(value || "").trim().toUpperCase();
}

async function lookupGeo(policy) {
  const endpoints = ["https://api.ip.sb/geoip", "https://ipwho.is/"];

  for (const endpoint of endpoints) {
    try {
      const payload = await requestJson(endpoint, policy);
      const ip = payload.ip || payload.query;
      const country = payload.country || payload.country_name;
      const countryCode = normalizeCountryCode(payload.country_code || payload.countryCode);
      const region = payload.region || payload.regionName || payload.region_name;
      const city = payload.city;
      const asn = payload.asn || (payload.connection && payload.connection.asn);
      const org =
        payload.org ||
        payload.isp ||
        (payload.connection && (payload.connection.org || payload.connection.isp));

      if (ip) return { ip, country, countryCode, region, city, asn, org };
    } catch (error) {
      console.log(`Node country lookup failed: ${endpoint} ${error}`);
    }
  }

  return null;
}

(async () => {
  let selected = "";

  try {
    const detail = await api(
      "GET",
      `/v1/policy_groups/select?group_name=${encodeURIComponent(args.group)}`,
    );
    selected = extractSelectedPolicy(detail);
  } catch (error) {
    console.log(`Failed to read selected policy: ${error}`);
  }

  if (!selected) {
    finish(`${args.title} Failed`, [
      `Group: ${args.group}`,
      "Unable to read selected policy.",
      "Check that GROUP is a select policy group.",
    ], "#FF3B30");
    return;
  }

  const info = await lookupGeo(args.group);

  if (!info) {
    finish(`${args.title} Failed`, [
      `Group: ${args.group}`,
      `Selected: ${selected}`,
      "Unable to fetch egress IP.",
    ], "#FF3B30");
    return;
  }

  const expectedCodes = expectedCodesFromName(selected);
  const actualCode = normalizeCountryCode(info.countryCode);
  const matched = expectedCodes.length && actualCode ? expectedCodes.includes(actualCode) : null;
  const location = [info.country, info.region, info.city].filter(Boolean).join(" / ");
  const asn = info.asn ? `AS${String(info.asn).replace(/^AS/i, "")}` : "";
  const org = [asn, info.org].filter(Boolean).join(" ");
  const expectedNames = expectedCodes.map((code) => countryNames[code] || code);

  const status =
    matched === true ? "Match" :
    matched === false ? "Mismatch" :
    "No country hint";

  const color =
    matched === true ? "#34C759" :
    matched === false ? "#FF3B30" :
    "#FFCC00";

  finish(args.title, [
    `Status: ${status}`,
    `Group: ${args.group}`,
    `Selected: ${selected}`,
    `IP: ${info.ip}`,
    location ? `Actual: ${location}${actualCode ? ` (${actualCode})` : ""}` : "",
    expectedCodes.length ? `Expected: ${expectedNames.join(" / ")}` : "Expected: unknown from node name",
    org,
  ], color);
})();
```
