# Proxy IP Panel for Surge

A Surge panel that shows the egress IP of a specific policy or policy group.

Unlike many IP panels, this module forces the request through the selected Surge policy. This avoids showing your real IP when Surge is running in rule-based mode and the IP lookup request matches `DIRECT`.

## Files

- `proxy-ip-panel.sgmodule`: release module for GitHub raw hosting
- `proxy-ip-panel.js`: panel script
- `proxy-ip-panel.local.sgmodule`: local debug module served from `127.0.0.1:8766`

## Arguments
- `POLICY`: Surge policy or policy group name. It must match exactly, including emoji and spaces.
- `TITLE`: Panel title.
- `ICON`: SF Symbols icon name.
- `COLOR`: Icon color.

Example:
```
POLICY: ♻️ 手动切换
TITLE: Proxy IP
ICON: network
COLOR: #34C759
```
