import { chromium } from "playwright";
const OUT = process.argv[2];
const URL = "http://localhost:3111";
const b = await chromium.launch({ args:["--use-gl=swiftshader","--enable-unsafe-swiftshader"] });
for (const vp of [{n:"d",w:1440,h:900},{n:"m",w:390,h:844}]) {
  const ctx = await b.newContext({ viewport:{width:vp.w,height:vp.h}, deviceScaleFactor:2, isMobile:vp.n==="m", hasTouch:vp.n==="m" });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil:"networkidle" });
  await p.waitForTimeout(3500);
  const h = await p.evaluate(() => document.body.scrollHeight);
  // crawl down so every in-view reveal fires
  for (let y=0; y<h; y+=350) { await p.evaluate(t=>window.scrollTo({top:t,behavior:"instant"}), y); await p.waitForTimeout(90); }
  await p.waitForTimeout(1200);
  const stops = vp.n==="d" ? [0,0.09,0.18,0.28,0.37,0.47,0.56,0.66,0.75,0.85,0.94,1] : [0,0.15,0.3,0.45,0.6,0.75,0.9,1];
  for (let i=0;i<stops.length;i++){
    await p.evaluate(t=>window.scrollTo({top:t,behavior:"instant"}), Math.round((h-vp.h)*stops[i]));
    await p.waitForTimeout(700);
    await p.screenshot({ path:`${OUT}/${vp.n}-${String(i).padStart(2,"0")}.png` });
  }
  await ctx.close();
}
await b.close();
console.log("done");
