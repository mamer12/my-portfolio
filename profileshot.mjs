import { chromium } from "playwright";
const OUT = process.argv[2];
const b = await chromium.launch({ args:["--use-gl=swiftshader","--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport:{width:1440,height:900}, deviceScaleFactor:2 });
p.on("pageerror", e => console.log("PAGEERROR:", e.message));
await p.goto("http://localhost:3111", { waitUntil:"networkidle" });
await p.waitForTimeout(3500);

const info = await p.evaluate(() => {
  const s = document.getElementById("profile");
  const r = s.getBoundingClientRect();
  return { top: Math.round(r.top + window.scrollY), height: Math.round(r.height) };
});
console.log("profile top:", info.top, "height:", info.height);

// sample across the whole profile section
for (let i = 0; i <= 8; i++) {
  const y = info.top + Math.round((info.height - 900) * (i / 8));
  await p.evaluate(t => window.scrollTo({top:t, behavior:"instant"}), y);
  await p.waitForTimeout(650);
  await p.screenshot({ path: `${OUT}/p-${String(i).padStart(2,"0")}.png` });
}
await b.close();
console.log("done");
