const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "parts-data.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const parts = Array.isArray(data.parts) ? data.parts : [];

function scorePart(part) {
  const checks = [
    [part.partNumber, 5],
    [part.slug, 5],
    [part.brand, 5],
    [part.manufacturer, 5],
    [part.category, 5],
    [part.productType, 5],
    [part.marketStatus, 10],
    [part.supplyRisk, 10],
    [part.valueAngle, 10],
    [part.procurementNote, 10],
    [part.customIntro && part.customIntro.length >= 120, 10],
    [Array.isArray(part.specs) && part.specs.length >= 5, 10],
    [Array.isArray(part.features) && part.features.length >= 3, 5],
    [Array.isArray(part.applications) && part.applications.length >= 3, 5],
  ];

  return checks.reduce((total, [ok, points]) => total + (ok ? points : 0), 0);
}

function issueList(part) {
  const issues = [];
  if (!part.marketStatus) issues.push("missing marketStatus");
  if (!part.supplyRisk) issues.push("missing supplyRisk");
  if (!part.valueAngle) issues.push("missing valueAngle");
  if (!part.procurementNote) issues.push("missing procurementNote");
  if (!part.customIntro || part.customIntro.length < 120) issues.push("thin customIntro");
  if (!Array.isArray(part.specs) || part.specs.length < 5) issues.push("fewer than 5 specs");
  if (!Array.isArray(part.features) || part.features.length < 3) issues.push("fewer than 3 features");
  if (!Array.isArray(part.applications) || part.applications.length < 3) issues.push("fewer than 3 applications");
  return issues;
}

const scored = parts.map(part => ({
  partNumber: part.partNumber,
  brandGroup: part.brandGroup || part.brand || "Unknown",
  score: scorePart(part),
  issues: issueList(part),
}));

const brandCounts = parts.reduce((acc, part) => {
  const brand = part.brandGroup || part.brand || "Unknown";
  acc[brand] = (acc[brand] || 0) + 1;
  return acc;
}, {});

const weakParts = scored
  .filter(item => item.score < 85 || item.issues.length)
  .sort((a, b) => a.score - b.score || a.partNumber.localeCompare(b.partNumber));

console.log(`LimChip SEO audit`);
console.log(`Parts: ${parts.length}`);
console.log(`Average score: ${Math.round(scored.reduce((sum, item) => sum + item.score, 0) / Math.max(scored.length, 1))}/100`);
console.log("");

console.log("Brand coverage:");
Object.entries(brandCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([brand, count]) => console.log(`- ${brand}: ${count}`));

console.log("");
console.log(`Parts needing content review: ${weakParts.length}`);
weakParts.slice(0, 40).forEach(item => {
  console.log(`- ${item.partNumber} (${item.brandGroup}) score ${item.score}: ${item.issues.join("; ")}`);
});

if (weakParts.length > 40) {
  console.log(`...and ${weakParts.length - 40} more.`);
}
