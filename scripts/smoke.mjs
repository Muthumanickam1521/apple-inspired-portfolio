// Smoke test for a running server: `npm run smoke` (after `npm run build && npm start`).
// Usage: node scripts/smoke.mjs [baseUrl]
const base = (process.argv[2] ?? process.env.SMOKE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const checks = [
  { path: "/", status: 200, contains: "<h1" },
  { path: "/blog", status: 200, contains: "<html" },
  { path: "/resume.pdf", status: 200, type: "application/pdf" },
  { path: "/this-page-does-not-exist", status: 404 },
];

let failed = 0;
for (const check of checks) {
  try {
    const res = await fetch(base + check.path, { redirect: "follow", signal: AbortSignal.timeout(20_000) });
    const body = check.contains ? await res.text() : "";
    const problems = [];
    if (res.status !== check.status) problems.push(`status ${res.status}, expected ${check.status}`);
    if (check.contains && !body.includes(check.contains)) problems.push(`body missing "${check.contains}"`);
    if (check.type && !(res.headers.get("content-type") ?? "").includes(check.type)) problems.push(`content-type ${res.headers.get("content-type")}`);
    console.log(`${problems.length ? "FAIL" : "ok  "} ${check.path}${problems.length ? ` - ${problems.join("; ")}` : ""}`);
    failed += problems.length ? 1 : 0;
  } catch (error) {
    console.log(`FAIL ${check.path} - ${error.message}`);
    failed += 1;
  }
}
process.exit(failed ? 1 : 0);
