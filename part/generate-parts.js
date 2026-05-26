const fs = require("fs");
const path = require("path");

const partDir = __dirname;
const rootDir = path.resolve(partDir, "..");
const dataPath = path.join(partDir, "parts-data.json");
const shouldWrite = process.argv.includes("--write");

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const site = data.site;
const parts = data.parts;
const buildDate = site.lastmod || new Date().toISOString().slice(0, 10);

const brandCategories = [
  ["ADI", "Analog, RF & Converters"],
  ["TI", "Power, MCU & Interface"],
  ["Xilinx", "FPGA & Adaptive SoC"],
  ["Micron", "DRAM, NAND & Flash"],
  ["NXP", "Auto MCU & Interface"],
  ["Altera", "FPGA & CPLD"],
  ["Samsung", "Memory & eMMC"],
  ["SanDisk / WD", "iNAND & eMMC"],
  ["Kioxia / Toshiba", "NAND & eMMC"],
  ["Nanya", "DRAM Memory"],
  ["CXMT", "DDR Memory"],
  ["ST", "MCU, MEMS & Power"],
  ["Infineon", "Auto Power & Security ICs"],
  ["onsemi", "Power, Sensing & ESD"],
  ["Nexperia", "ESD, Logic & Discretes"],
  ["Winbond", "NOR/NAND Flash"],
  ["Microchip", "MCU, EEPROM & Mixed Signal"],
  ["Broadcom", "RF, Ethernet & Connectivity"],
  ["Marvell", "Ethernet & Storage ICs"],
  ["Renesas", "MCU, Power & Interface"],
  ["SK hynix", "DRAM & NAND Memory"],
  ["Intel", "Processors, Chipsets & Wireless"],
  ["AMD", "Ryzen CPU & Embedded Compute"],
  ["Nuvoton", "Embedded Controller & MCU"],
  ["ITE Tech", "Embedded Controller & IO ICs"],
  ["Realtek", "Audio, Ethernet & Connectivity"],
  ["MPS", "Power Modules & ICs"],
  ["BIWIN", "NAND & Storage"],
  ["FORESEE", "eMMC & Storage"],
  ["Murata", "Passives & RF Modules"],
  ["Vishay", "Passives & Power"],
  ["Toshiba", "Opto, Power & Drivers"],
  ["Diodes", "Diodes, Logic & Power"],
  ["FTDI", "USB Bridge ICs"],
  ["TE Connectivity", "Connectors & Interconnect"],
  ["Coilcraft", "Power Inductors"],
  ["KEMET", "Capacitors & Filters"],
  ["MACOM", "RF & Microwave"],
  ["Panasonic", "Capacitors & Components"],
  ["SG Micro", "Analog & Power ICs"],
  ["u-blox", "GNSS & Wireless"],
  ["Macronix", "NOR/NAND Flash"],
  ["Nvidia", "GPU & AI Compute"]
];

const brandDisplayNames = {
  ADI: "Analog Devices",
  TI: "Texas Instruments",
  ST: "STMicroelectronics",
  NXP: "NXP Semiconductors",
  SK: "SK hynix",
  "SK Hynix": "SK hynix",
  Maxim: "Maxim Integrated",
  MPS: "Monolithic Power Systems",
  Diodes: "Diodes Incorporated",
  "SG Micro": "SG Micro",
  Marvell: "Marvell Technology",
  Murata: "Murata Manufacturing",
  Vishay: "Vishay Intertechnology",
  Microchip: "Microchip Technology",
  Infineon: "Infineon Technologies",
  Samsung: "Samsung Electronics",
  "SanDisk / WD": "SanDisk / Western Digital",
  "Kioxia / Toshiba": "Kioxia / Toshiba",
  Nanya: "Nanya Technology",
  CXMT: "CXMT",
  Micron: "Micron Technology",
  Winbond: "Winbond Electronics",
  Xilinx: "AMD Xilinx",
  Altera: "Altera",
  Broadcom: "Broadcom",
  Renesas: "Renesas Electronics",
  Toshiba: "Toshiba",
  FTDI: "FTDI",
  Intel: "Intel",
  Nuvoton: "Nuvoton",
  "ITE Tech": "ITE Tech",
  Realtek: "Realtek",
  AMD: "AMD",
  KEMET: "KEMET",
  MACOM: "MACOM",
  Panasonic: "Panasonic",
  "TE Connectivity": "TE Connectivity",
  "u-blox": "u-blox",
  BIWIN: "BIWIN Storage",
  FORESEE: "FORESEE",
  Nvidia: "NVIDIA"
};

const brandQuickIndexLabels = {
  ADI: "Analog, RF, Converters, Isolation, DSP & Power Management",
  TI: "Power Management, MCU, Interface, Motor Driver & Analog ICs",
  Xilinx: "FPGA, Adaptive SoC, Zynq, Artix, Kintex & Spartan Devices",
  Micron: "DRAM, LPDDR, NAND, NOR Flash, eMMC & Industrial Memory",
  NXP: "Automotive MCU, i.MX Processor, CAN/LIN, I2C & Secure Interface",
  Altera: "Cyclone, MAX, Arria FPGA, CPLD & Configuration Memory",
  Samsung: "DDR, LPDDR, eMMC, NAND Flash & Mobile Memory Components",
  "SanDisk / WD": "iNAND, eMMC, NAND Flash & Embedded Storage Components",
  "Kioxia / Toshiba": "NAND Flash, eMMC, UFS & Embedded Storage Components",
  Nanya: "DDR3, DDR4, DDR3L & Industrial DRAM Components",
  CXMT: "DDR4 DRAM, Memory ICs & Production Memory Supply",
  ST: "STM32 MCU, MEMS Sensors, Power, Interface & Automotive ICs",
  Infineon: "Automotive Power, MOSFET, DrMOS, IGBT, Security & Sensor ICs",
  onsemi: "Power Management, MOSFET, ESD, Image Sensor & Automotive ICs",
  Nexperia: "ESD Protection, Logic, MOSFET, Diode & Discrete Components",
  Winbond: "Serial NOR Flash, NAND Flash & Specialty Memory ICs",
  Microchip: "MCU, EEPROM, Interface, Analog & Embedded Control ICs",
  Broadcom: "RF, Ethernet, Optical, Connectivity & Communication ICs",
  Marvell: "Ethernet PHY, Switch, Storage, Networking & Interface ICs",
  Renesas: "MCU, Power Management, Interface, Timing & Automotive ICs",
  "SK hynix": "DRAM, LPDDR, NAND Flash & High-Density Memory Components",
  Intel: "Processors, Chipsets, Wireless Modules & Embedded Platform Components",
  AMD: "Ryzen Mobile CPU, Embedded Compute & Platform Components",
  Nuvoton: "Keyboard Controller, Embedded Controller & MCU Components",
  "ITE Tech": "Embedded Controller, IO Controller & HDMI Bridge ICs",
  Realtek: "Audio Codec, Ethernet, Connectivity & PC Platform ICs",
  MPS: "Power Modules, DC/DC Regulators, Drivers & Power Management ICs",
  BIWIN: "NAND Flash, Storage ICs, eMMC & SSD Supply Components",
  FORESEE: "eMMC Storage, NAND Flash & Embedded Memory Components",
  Murata: "Passives, RF Modules, Sensors, Filters & Connectivity Components",
  Vishay: "Passives, Diodes, MOSFET, Optoelectronics & Power Components",
  Toshiba: "Optocouplers, Power Devices, Logic, Drivers & Discrete ICs",
  Diodes: "Diodes, Rectifiers, Logic, Power Management & Discrete ICs",
  FTDI: "USB Bridge, Interface, UART, FIFO & Connectivity ICs",
  "TE Connectivity": "Connectors, Relays, Sensors & Interconnect Components",
  Coilcraft: "Power Inductors, RF Inductors, Magnetics & Filter Components",
  KEMET: "Capacitors, EMI Filters, Magnetics & Passive Components",
  MACOM: "RF, Microwave, Switches, Amplifiers & Signal Components",
  Panasonic: "Capacitors, Relays, Sensors & Industrial Components",
  "SG Micro": "Analog, Power Management, Signal Chain & Interface ICs",
  "u-blox": "GNSS, Cellular, Bluetooth, Wi-Fi & Wireless Modules",
  Macronix: "NOR Flash, NAND Flash & Embedded Memory Components",
  Nvidia: "GPU, AI Compute, Embedded Modules & High-Performance ICs"
};

function brandDisplayName(brand) {
  return brandDisplayNames[brand] || brand;
}

function brandQuickIndexLabel(brand, fallback) {
  return brandQuickIndexLabels[brand] || fallback;
}

function normalizeToken(value) {
  return String(value || "").trim().toLowerCase();
}

function validateData() {
  const errors = [];
  const warnings = [];
  const slugs = new Map();
  const partNumbers = new Map();

  if (!site || !site.baseUrl || !site.companyName || !site.email) {
    errors.push("site.baseUrl, site.companyName and site.email are required.");
  }

  if (!Array.isArray(parts) || parts.length === 0) {
    errors.push("parts-data.json must contain at least one part in the parts array.");
  }

  const partList = Array.isArray(parts) ? parts : [];

  partList.forEach((part, index) => {
    const label = part.partNumber || `parts[${index}]`;
    const requiredFields = ["partNumber", "slug", "brand", "manufacturer", "brandGroup", "category", "productType"];

    requiredFields.forEach(field => {
      if (!part[field]) errors.push(`${label}: missing required field "${field}".`);
    });

    if (part.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(part.slug)) {
      errors.push(`${label}: slug should use lowercase letters, numbers and hyphens only.`);
    }

    const slugKey = normalizeToken(part.slug);
    if (slugKey) {
      if (slugs.has(slugKey)) errors.push(`${label}: duplicate slug "${part.slug}" also used by ${slugs.get(slugKey)}.`);
      slugs.set(slugKey, label);
    }

    const partKey = normalizeToken(part.partNumber);
    if (partKey) {
      if (partNumbers.has(partKey)) errors.push(`${label}: duplicate partNumber also used by ${partNumbers.get(partKey)}.`);
      partNumbers.set(partKey, label);
    }

    if (!part.specs || part.specs.length < 3) {
      warnings.push(`${label}: add at least 3 specs for stronger product-page uniqueness.`);
    }

    if (!part.marketStatus || !part.supplyRisk || !part.valueAngle) {
      warnings.push(`${label}: marketStatus, supplyRisk and valueAngle help differentiate SEO intent.`);
    }
  });

  partList.forEach(part => {
    (part.relatedPartNumbers || []).forEach(relatedPartNumber => {
      if (!partNumbers.has(normalizeToken(relatedPartNumber))) {
        warnings.push(`${part.partNumber}: relatedPartNumbers references missing part "${relatedPartNumber}".`);
      }
    });
  });

  warnings.forEach(message => console.warn(`Warning: ${message}`));

  if (errors.length) {
    errors.forEach(message => console.error(`Error: ${message}`));
    process.exit(1);
  }
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function text(value) {
  return esc(value).replace(/\n/g, " ");
}

function absUrl(pathname) {
  return `${String(site.baseUrl).replace(/\/$/, "")}${pathname}`;
}

function partUrl(part) {
  return absUrl(`/part/${part.slug}.html`);
}

function mailto(part) {
  const subject = encodeURIComponent(`RFQ Inquiry for ${part.brand.toUpperCase()} ${part.partNumber} - LimChip`);
  const body = encodeURIComponent(
    `Dear LimChip Team,\n\nI am interested in the spot stock for ${part.partNumber}.\n\nMy Required Qty: \nTarget Date Code: \nCompany Name: \nContact Person: \n\nBest Regards,`
  );
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

function isGenericPackage(value) {
  return String(value || "").trim().toLowerCase() === "manufacturer package suffix";
}

function normalizedPackage(part) {
  const value = String(part.package || "").trim();
  if (!value || isGenericPackage(value)) return "RFQ-confirmed package/case";
  return value;
}

function packageClause(part) {
  const value = normalizedPackage(part);
  return value === "RFQ-confirmed package/case" ? "" : ` in ${value}`;
}

function specValue(row) {
  if (/package|case/i.test(row.name || "") && isGenericPackage(row.value)) {
    return "Exact package by RFQ";
  }
  return row.value;
}

function isInventorySpecRow(row) {
  const name = String(row.name || "").trim().toLowerCase();
  return name === "date code" || name === "listed quantity" || name === "stock quantity" || name === "stock status";
}

function cleanedSpecRows(part) {
  return (part.specs || []).filter(row => !isInventorySpecRow(row));
}

function isGenericSpecRow(row) {
  const name = String(row.name || "").trim().toLowerCase();
  const value = String(row.value || "").trim();
  if (isGenericPackage(value)) return true;
  return ["manufacturer", "product type", "series", "package / case", "package", "brand"].includes(name);
}

function hasDetailedSpecs(part) {
  return cleanedSpecRows(part).filter(row => !isGenericSpecRow(row)).length >= 3;
}

function partTypeText(part) {
  return [part.productType, part.category].filter(Boolean).join(" ").toLowerCase();
}

function hasAny(value, words) {
  return words.some(word => value.includes(word));
}

function hashString(value) {
  return String(value || "").split("").reduce((hash, char) => ((hash * 31) + char.charCodeAt(0)) >>> 0, 7);
}

function pickVariant(part, options, salt = "") {
  return options[(hashString(`${part.partNumber}|${salt}`) % options.length)];
}

function stockNumber(part) {
  return Number(String(part.stockQty || "").replace(/[^0-9]/g, "")) || 0;
}

function stockTier(part) {
  const qty = stockNumber(part);
  if (!qty) return "RFQ-confirmed availability";
  if (qty < 500) return "controlled engineering or repair quantity";
  if (qty < 2000) return "small-lot spot stock";
  if (qty < 10000) return "project-level spot stock";
  return "production-oriented spot stock";
}

function cleanProductType(part) {
  return part.productType || part.category || "electronic component";
}

function partFamilySignal(part) {
  const pn = String(part.partNumber || "").toUpperCase();
  const type = partTypeText(part);

  if (/^STM32H7/.test(pn)) return "high-performance STM32H7 embedded platforms";
  if (/^STM32F1/.test(pn)) return "mature STM32F1 control boards and repair builds";
  if (/^STM32F4/.test(pn)) return "STM32F4 industrial and signal-processing control boards";
  if (/^STM8/.test(pn)) return "cost-sensitive 8-bit embedded control designs";
  if (/^(LIS|LSM)/.test(pn)) return "motion, MEMS sensing and compact sensor modules";

  if (/^TJA/.test(pn) || /^TCAN/.test(pn)) return "automotive CAN and in-vehicle network interfaces";
  if (/^SN65HVD/.test(pn) || /RS-?485|CAN/i.test(part.category || "")) return "industrial communication transceiver boards";
  if (/^(PCA|PCF|P82B)/.test(pn)) return "I2C, GPIO expansion and board-management interfaces";
  if (/^(SE050|PN5|PN7|CLRC)/.test(pn)) return "secure element, NFC and identification interface designs";
  if (/^MIMXRT/.test(pn)) return "NXP i.MX RT crossover MCU platforms";
  if (/^MIMX8|^MCIMX|^LS10/.test(pn)) return "NXP embedded processor and edge-computing platforms";
  if (/^LPC/.test(pn)) return "LPC microcontroller platforms with long-lifecycle firmware";
  if (/^FS32K|^S32K/.test(pn)) return "automotive S32K MCU platforms and body-control modules";
  if (/^KW|^K32W|^JN/.test(pn)) return "wireless MCU and connected-device platforms";

  if (/^TPSM|^TLVM|^LTM/.test(pn)) return "compact power-module rails with qualified layout constraints";
  if (/^TPS54|^TPS56|^TPS62|^TPS82|^TPS84|^LT86|^LM25|^LM50|^LM51/.test(pn)) return "buck-converter and switching regulator rail sourcing";
  if (/^TPS7|^LT17|^LT19|^LT30|^ADM715|^ADP122/.test(pn)) return "LDO, reference rail and low-noise power sourcing";
  if (/^TPS512|^TPS533|^TPS65|^BQ|^LTC681/.test(pn)) return "power sequencing, battery or system power-management boards";
  if (/^(L7805|LM317|LM358|LM324|LM293|LM393|TL431|REF)/.test(pn)) return "linear, reference and general-purpose analog BOM replenishment";
  if (/^TPS|^LT|^LMZ|^LM[0-9]/.test(pn)) return "board-level power rail and regulator sourcing";
  if (/^DRV/.test(pn)) return "motor-drive, power-stage and control hardware";
  if (/^BQ/.test(pn) || /^LTC681/.test(pn)) return "battery-management and monitoring systems";
  if (/^INA|^OPA|^OP|^REF|^TLV|^AD82|^AD84|^AD86|^ADA/.test(pn)) return "precision analog measurement and reference circuits";
  if (/^TPA/.test(pn)) return "audio amplifier and embedded speaker-drive boards";

  if (/^ADUM|^ADM/.test(pn)) return "isolation, interface and industrial communication designs";
  if (/^AD76|^AD92|^AD96|^AD99|^ADC|^AD7/.test(pn)) return "data-converter and precision acquisition signal chains";
  if (/^ADXL|^ADXRS/.test(pn)) return "inertial sensing and motion-control assemblies";
  if (/^HMC|^ADL|^ADRF|^ADMV/.test(pn)) return "RF, microwave or high-speed signal-chain boards";
  if (/^ADSP/.test(pn)) return "DSP and audio or industrial processing platforms";
  if (/^AD2S/.test(pn)) return "resolver, motor-control and position-sensing signal chains";
  if (/^AD9|^ADV|^ADCLK/.test(pn)) return "video, timing or high-speed converter signal chains";
  if (/^DS3231|^DS18/.test(pn)) return "timing, temperature and board-monitoring assemblies";

  if (/^MT41|^MT40|^MT47|^K4|^H5A/.test(pn)) return "DDR, LPDDR and industrial memory platforms";
  if (/^MT25|^W25Q|^W25R/.test(pn)) return "NOR flash boot and firmware storage designs";
  if (/^MT29|^W25N|^W29N/.test(pn)) return "NAND flash and embedded storage sourcing";
  if (/^MTFC|^KLM|^KLm/i.test(pn)) return "eMMC and managed NAND storage builds";

  if (/^XC7Z|^XA7Z/.test(pn)) return "Zynq SoC FPGA production and repair demand";
  if (/^XC7A|^XA7A/.test(pn)) return "Artix-7 FPGA boards with package-qualified layouts";
  if (/^XC7K/.test(pn)) return "Kintex-7 FPGA systems where package and speed grade matter";
  if (/^(AGFB|AGED)/.test(pn)) return "Agilex FPGA programs with exact package and grade requirements";
  if (/^10AX/.test(pn)) return "Arria 10 FPGA systems with speed-grade and package constraints";
  if (/^10CL/.test(pn)) return "Cyclone 10 LP FPGA boards and legacy program support";
  if (/^10M/.test(pn)) return "MAX 10 FPGA and CPLD control-logic platforms";
  if (/^5CE/.test(pn)) return "Cyclone V E FPGA boards with qualified package layouts";
  if (/^5CG/.test(pn)) return "Cyclone V GX FPGA designs with transceiver-side qualification";
  if (/^EP4CE/.test(pn)) return "Cyclone IV FPGA boards with package-qualified layouts";
  if (/^EP3C|^EP2C/.test(pn)) return "Cyclone FPGA maintenance and legacy production demand";
  if (/^5M|^EPM/.test(pn)) return "MAX CPLD control logic and long-lifecycle board support";
  if (/^EP/.test(pn)) return "Altera FPGA boards with legacy qualification";

  if (/^PESD|^ESD|^SZESD|^PRTR|^PCMF|^CM1624|^SXNUP/.test(pn)) return "ESD, EMI and interface-protection BOM positions";
  if (/^CAT811|^NCP12|^NCP45/.test(pn)) return "supervisor, protection and power-control BOM positions";
  if (/^PMEG|^BAT|^BAS|^BZX|^SBAV|^1N|^NRVB/.test(pn)) return "diode, rectifier and zener replacement sourcing";
  if (/^BC|^BSS|^BUK|^PBSS|^PSMN|^NTMFS|^NVR|^FDG|^IRLML|^IRF|^BSC|^BSZ|^IPL/.test(pn)) return "transistor and MOSFET production replenishment";
  if (/^74|^SN74|^MC74|^TXS|^TCA/.test(pn)) return "logic, level-shifting and digital interface BOM support";
  if (/^TLP|^ISO|^ADUM/.test(pn)) return "isolation and optocoupler interface sourcing";
  if (/^BTS|^TDA|^DRV|^IRPS/.test(pn)) return "automotive, motor-drive and power-stage sourcing";
  if (/^GRM|^T491|^EEE|^CRCW|^XFL|^RNF/.test(pn)) return "passive component replenishment for released BOMs";
  if (/^KLM|^K4|^KM|^MT|^W25|^H5/.test(pn)) return "memory, flash and storage component sourcing";

  if (hasAny(type, ["power", "pmic", "regulator"])) return "power-management BOM continuity";
  if (hasAny(type, ["memory", "dram", "flash", "storage"])) return "memory and storage supply continuity";
  if (hasAny(type, ["mcu", "processor"])) return "embedded control and processor sourcing";
  if (hasAny(type, ["interface", "transceiver"])) return "communication and interface board sourcing";
  if (hasAny(type, ["analog", "rf", "converter"])) return "analog, RF or converter signal-chain sourcing";
  return "qualified electronic component sourcing";
}

function verificationFocus(part) {
  const type = partTypeText(part);
  if (hasAny(type, ["memory", "dram", "lpddr", "flash", "nand", "nor", "storage"])) return "density, speed suffix, temperature grade and batch consistency";
  if (hasAny(type, ["fpga", "cpld", "programmable logic"])) return "speed grade, package code, logic family and lifecycle status";
  if (hasAny(type, ["mcu", "processor", "dsp"])) return "memory option, package, firmware compatibility and lifecycle status";
  if (hasAny(type, ["power", "pmic", "regulator", "driver"])) return "voltage/current rating, thermal limits, package and protection behavior";
  if (hasAny(type, ["interface", "transceiver", "isolation"])) return "interface standard, isolation/protection level, package and operating grade";
  if (hasAny(type, ["analog", "rf", "converter", "amplifier"])) return "package, accuracy or RF performance, supply range and approved source";
  return "exact suffix, package, lifecycle status and traceable supply";
}

function generatedIntro(part) {
  const role = partFamilySignal(part);
  const packageText = normalizedPackage(part);
  const stock = part.stockQty ? `${part.stockQty} pcs` : "RFQ-based quantity";
  const dc = part.dateCode ? `${part.dateCode} date-code visibility` : "date-code confirmation";
  const productType = cleanProductType(part);
  const focus = verificationFocus(part);
  const openers = [
    `${part.partNumber} is a ${part.manufacturer} ${productType} listed by LimChip for ${role}.`,
    `For buyers maintaining ${role}, ${part.partNumber} is handled as an exact-suffix ${part.manufacturer} RFQ item.`,
    `LimChip lists ${part.partNumber} for sourcing teams that need ${role} without changing the approved BOM.`,
    `${part.partNumber} supports ${role}; LimChip focuses this listing on exact suffix, availability and shipment confirmation.`
  ];
  const details = [
    `Current listing data shows ${stock} with ${dc}, so buyers can confirm live allocation before order release.`,
    `Procurement checks normally cover ${focus}, plus ${packageText} and traceable supply.`,
    `This is a ${stockTier(part)} item where package/case, batch condition and lead time should be confirmed by RFQ.`,
    `The useful buying signal is not only stock quantity, but whether ${focus} match the production requirement.`
  ];
  return `${pickVariant(part, openers, "intro-open")} ${pickVariant(part, details, "intro-detail")}`;
}

function isGenericCustomIntro(value) {
  const intro = String(value || "");
  return /listed by LimChip for exact-suffix(?: [a-z /-]+)? sourcing/i.test(intro)
    && /production, repair and long-lifecycle/i.test(intro);
}

function introForPart(part) {
  if (part.customIntro && !isGenericCustomIntro(part.customIntro)) return part.customIntro;
  return generatedIntro(part);
}

function specsBlock(part, copy) {
  const rows = cleanedSpecRows(part);
  const detailed = hasDetailedSpecs(part);
  const heading = detailed ? copy.specsTitle : "Part Identification & RFQ Checkpoints";
  const renderedRows = detailed
    ? rows
    : [
        { name: "Exact Part Number", value: part.partNumber },
        { name: "Manufacturer", value: part.manufacturer },
        { name: "Product Category", value: cleanProductType(part) },
        { name: "Sourcing Focus", value: partFamilySignal(part) },
        { name: "BOM / RFQ Checks", value: verificationFocus(part) },
        { name: "Package / Case", value: isGenericPackage(part.package) ? "Confirm against buyer BOM" : normalizedPackage(part) }
      ];

  return {
    heading,
    rowsHtml: renderedRows
      .filter(row => row.value)
      .map(row => `            <tr><td><strong>${text(row.name)}</strong></td><td>${text(specValue(row))}</td></tr>`)
      .join("\n")
  };
}

function isGenericFeature(item, part) {
  const value = String(item || "");
  return /exact suffix sourcing support/i.test(value)
    || /spot stock visibility/i.test(value)
    || /suitable for production, repair/i.test(value)
    || value.trim() === part.partNumber;
}

function hasDetailedFeatures(part) {
  return (part.features || []).filter(item => !isGenericFeature(item, part)).length >= 2;
}

function generatedSourcingBullets(part) {
  const role = partFamilySignal(part);
  const focus = verificationFocus(part);
  const qty = part.stockQty ? `${part.stockQty} pcs listed` : "RFQ-based stock";
  const packageText = isGenericPackage(part.package)
    ? "package/case"
    : /^Package code/i.test(normalizedPackage(part))
      ? normalizedPackage(part).replace(/^Package/, "package")
      : `${normalizedPackage(part)} package`;
  const availabilityLines = [
    `${qty} as ${stockTier(part)} for ${role}.`,
    `Listed quantity is positioned for ${role}, with live allocation confirmed before quotation.`,
    `Suitable RFQ demand includes ${role}, especially when the approved BOM cannot be changed.`,
    `Current stock signal supports buyers checking availability for ${role}.`
  ];
  const packageLines = [
    `Confirm ${packageText}, reel, tray or tube condition when quoting.`,
    `Packing format, suffix marking and ${packageText} should be checked before shipment.`,
    `Buyers should match ${packageText}, label condition and lot consistency against the BOM.`,
    `Shipment review should include packing method, batch condition and ${packageText}.`
  ];
  const reviewLines = [
    `RFQ review should cover ${focus}.`,
    `Procurement confirmation should focus on ${focus} before order release.`,
    `Engineering or purchasing teams normally verify ${focus} for this line item.`,
    `Approval-sensitive orders should confirm ${focus} together with traceable supply.`
  ];
  const bullets = [
    pickVariant(part, availabilityLines, "feature-stock"),
    pickVariant(part, packageLines, "feature-package"),
    pickVariant(part, reviewLines, "feature-review")
  ];
  if (part.applications && part.applications.length) {
    bullets.push(`Typical use context: ${part.applications.join(", ")}.`);
  }
  if (part.valueAngle) bullets.push(part.valueAngle);
  return bullets;
}

function featuresBlock(part, copy) {
  if (hasDetailedFeatures(part)) {
    return {
      heading: copy.featureTitle,
      rowsHtml: (part.features || [])
        .filter(item => !isGenericFeature(item, part))
        .map(item => `            <li>${text(item)}</li>`)
        .join("\n")
    };
  }

  return {
    heading: "Sourcing Notes & Applications",
    rowsHtml: generatedSourcingBullets(part)
      .map(item => `            <li>${text(item)}</li>`)
      .join("\n")
  };
}

function sourcingNarrative(part, profile) {
  const role = partFamilySignal(part);
  const focus = verificationFocus(part);
  const stock = part.stockQty ? `${part.stockQty} pcs` : "RFQ-based stock";
  const stockTone = stockTier(part);
  const first = [
    `${part.partNumber} demand is usually tied to ${role}, where casual substitution can create validation or schedule risk.`,
    `Buyers normally source ${part.partNumber} when an existing BOM requires the same manufacturer suffix for ${role}.`,
    `${part.partNumber} is best treated as a sourcing-specific line item, not a generic replacement, because ${focus} can affect approval.`
  ];
  const second = [
    `${stock} is listed as ${stockTone}; LimChip should confirm live allocation, batch condition and lead time before purchase.`,
    `The practical RFQ check is whether ${focus}, date code and package/case align with the buyer's board or repair demand.`,
    `For overseas buyers, the important confirmation points are stock reality, traceability, packing condition and shipment window.`
  ];
  const fallback = part.valueAngle || profile.angle;
  return `${pickVariant(part, first, "why-first")} ${pickVariant(part, second, "why-second")} ${fallback}`;
}

function procurementProfile(part) {
  const type = partTypeText(part);
  const packageText = normalizedPackage(part);
  const seriesText = part.series ? `${part.series} series` : "the qualified series";
  const dateCodeText = part.dateCode || "RFQ-confirmed date code";

  if (hasAny(type, ["cpld", "fpga", "programmable logic", "soc fpga", "zynq", "artix", "kintex", "spartan", "cyclone", "arria", "max 10", "max ii", "max v"])) {
    return {
      specsTitle: "Programmable Logic Specifications",
      featureTitle: "FPGA / CPLD Features & Applications",
      whyTitle: `Why Procurement Teams Source ${part.partNumber}`,
      checklistTitle: "Programmable Logic Sourcing Checklist",
      intent: "hard-to-find FPGA and CPLD sourcing",
      introFocus: `${part.partNumber} is normally checked by exact speed grade, package, logic family, I/O count, date code and lifecycle status before purchasing.`,
      angle: `${part.partNumber} sourcing is often driven by qualified board reuse, replacement demand and long-lifecycle industrial support. Confirm the exact suffix, ${packageText}, ${seriesText}, date code and traceable supply before releasing a purchase order.`,
      checklist: [
        `Confirm exact suffix, speed grade and ${packageText}.`,
        "Check lifecycle status, replacement demand and approved vendor list requirements.",
        `Verify quantity, batch consistency and ${dateCodeText} before shipment.`
      ],
      faqFocus: "logic family, speed grade, package, I/O count and lifecycle availability"
    };
  }

  if (hasAny(type, ["dram", "lpddr", "ddr", "sdram", "memory ic", "memory component"])) {
    return {
      specsTitle: "Memory Specifications",
      featureTitle: "Memory Features & Applications",
      whyTitle: `Why Buyers Source ${part.partNumber}`,
      checklistTitle: "Memory IC Sourcing Checklist",
      intent: "memory IC spot stock and long-term supply",
      introFocus: `${part.partNumber} should be matched by density, speed suffix, package, temperature grade, date code and approved memory vendor requirements.`,
      angle: `${part.partNumber} sourcing is usually suffix-sensitive because DDR, LPDDR and industrial memory devices are tied to firmware qualification, PCB layout and long-term platform support.`,
      checklist: [
        "Confirm density, speed grade, temperature option and exact suffix.",
        `Match ${packageText} and approved Micron, Samsung or memory vendor source requirements when applicable.`,
        `Check batch consistency, quantity and ${dateCodeText} for production builds.`
      ],
      faqFocus: "memory density, speed suffix, package, temperature grade and batch traceability"
    };
  }

  if (hasAny(type, ["emmc", "flash", "nand", "nor", "storage"])) {
    return {
      specsTitle: "Storage Specifications",
      featureTitle: "Storage Features & Applications",
      whyTitle: `Why Teams Source ${part.partNumber}`,
      checklistTitle: "Flash / Storage Sourcing Checklist",
      intent: "flash memory and storage IC sourcing",
      introFocus: `${part.partNumber} should be reviewed by density, interface, package, firmware qualification, lifecycle status and date-code requirements.`,
      angle: `${part.partNumber} is often used in boot, firmware or embedded storage designs where an exact suffix helps avoid validation risk and unexpected software changes.`,
      checklist: [
        "Confirm density, interface, voltage and package suffix.",
        "Check firmware qualification, lifecycle status and replacement constraints.",
        `Verify reel, tray or tube format together with ${dateCodeText}.`
      ],
      faqFocus: "density, interface, package, firmware qualification and lifecycle status"
    };
  }

  if (hasAny(type, ["power", "pmic", "regulator", "mosfet", "igbt", "driver", "drmos", "high-side", "dc/dc", "dcdc"])) {
    return {
      specsTitle: "Power IC Specifications",
      featureTitle: "Power Features & Applications",
      whyTitle: `Why Procurement Teams Source ${part.partNumber}`,
      checklistTitle: "Power Component Sourcing Checklist",
      intent: "power management and automotive power sourcing",
      introFocus: `${part.partNumber} should be reviewed by voltage range, current rating, package, thermal behavior, protection features and qualified board usage.`,
      angle: `${part.partNumber} demand is often linked to compact power rails, automotive modules, industrial controls or repair builds where exact package and electrical limits matter.`,
      checklist: [
        "Confirm voltage, current, thermal rating and protection features against the original BOM.",
        `Match ${packageText}, reel format and automotive or industrial grade requirements when needed.`,
        `Confirm live allocation, quantity and ${dateCodeText} before order release.`
      ],
      faqFocus: "voltage range, current rating, package, protection features and date code"
    };
  }

  if (hasAny(type, ["mcu", "microcontroller", "processor", "crossover", "embedded", "arm cortex", "stm32", "imx", "dsp", "sharc"])) {
    return {
      specsTitle: "MCU / Processor Specifications",
      featureTitle: "Embedded Processor Features & Applications",
      whyTitle: `Why Embedded Teams Source ${part.partNumber}`,
      checklistTitle: "MCU / Processor Sourcing Checklist",
      intent: "MCU and embedded processor supply",
      introFocus: `${part.partNumber} should be sourced by exact suffix, package, memory option, temperature grade, boot or firmware compatibility and lifecycle status.`,
      angle: `${part.partNumber} is usually qualified inside firmware-controlled embedded platforms, so buyers should avoid casual substitutions unless the board, software and package are confirmed.`,
      checklist: [
        "Confirm exact suffix, package, memory option and temperature grade.",
        "Check firmware, boot mode, peripheral compatibility and lifecycle status.",
        `Verify quantity, traceability and ${dateCodeText} for production or repair demand.`
      ],
      faqFocus: "exact suffix, package, memory option, firmware compatibility and lifecycle status"
    };
  }

  if (hasAny(type, ["interface", "transceiver", "can", "lin", "ethernet", "isolation", "isolator", "i2c", "gpio", "usb", "rs-485", "rs485", "level"])) {
    return {
      specsTitle: "Interface IC Specifications",
      featureTitle: "Interface Features & Applications",
      whyTitle: `Why Buyers Source ${part.partNumber}`,
      checklistTitle: "Interface IC Sourcing Checklist",
      intent: "interface, isolation and automotive network sourcing",
      introFocus: `${part.partNumber} should be checked by interface standard, package, isolation or protection requirements, temperature grade and exact suffix.`,
      angle: `${part.partNumber} is often tied to communication reliability in automotive, industrial or embedded systems where suffix-level matching protects compliance and board qualification.`,
      checklist: [
        "Confirm interface standard, isolation or protection requirements and operating grade.",
        `Match exact suffix, ${packageText} and reel or tube format.`,
        `Check live stock, batch consistency and ${dateCodeText} before shipment.`
      ],
      faqFocus: "interface standard, package, isolation, temperature grade and exact suffix"
    };
  }

  if (hasAny(type, ["analog", "operational amplifier", "amplifier", "op amp", "adc", "dac", "converter", "data converter", "voltage reference", "analog switch", "comparator", "signal chain"])) {
    return {
      specsTitle: "Analog / Signal Chain Specifications",
      featureTitle: "Analog Features & Applications",
      whyTitle: `Why Engineers Source ${part.partNumber}`,
      checklistTitle: "Analog IC Sourcing Checklist",
      intent: "precision analog and signal chain sourcing",
      introFocus: `${part.partNumber} should be reviewed by package, precision grade, noise or accuracy requirements, supply range and approved manufacturer source.`,
      angle: `${part.partNumber} buyers often need exact analog performance and package matching because low-noise, precision or converter circuits can be sensitive to substitution.`,
      checklist: [
        "Confirm package, grade, supply range and key precision parameters.",
        "Review approved source, reel format and suffix requirements for the BOM.",
        `Check stock quantity, traceability and ${dateCodeText} before shipment.`
      ],
      faqFocus: "package, grade, precision parameters, supply range and approved source"
    };
  }

  if (hasAny(type, ["rf", "microwave", "clock", "timing", "pll", "wireless"])) {
    return {
      specsTitle: "RF / Timing Specifications",
      featureTitle: "RF Features & Applications",
      whyTitle: `Why RF Teams Source ${part.partNumber}`,
      checklistTitle: "RF Component Sourcing Checklist",
      intent: "RF, microwave and timing component sourcing",
      introFocus: `${part.partNumber} should be checked by frequency range, package, performance grade, suffix and qualified RF signal-chain requirements.`,
      angle: `${part.partNumber} is often used in RF, microwave, clocking or communication designs where package and performance tolerance can be difficult to replace quickly.`,
      checklist: [
        "Confirm frequency, package, grade and signal-chain requirements.",
        "Check exact suffix, lifecycle status and approved source constraints.",
        `Verify live stock, batch and ${dateCodeText} before order release.`
      ],
      faqFocus: "frequency range, package, RF performance, suffix and lifecycle status"
    };
  }

  if (hasAny(type, ["sensor", "mems", "accelerometer", "motion", "magnetic", "pressure"])) {
    return {
      specsTitle: "Sensor Specifications",
      featureTitle: "Sensor Features & Applications",
      whyTitle: `Why Buyers Source ${part.partNumber}`,
      checklistTitle: "Sensor IC Sourcing Checklist",
      intent: "sensor IC stock and replacement sourcing",
      introFocus: `${part.partNumber} should be checked by sensing function, package, interface, temperature grade, calibration needs and exact suffix.`,
      angle: `${part.partNumber} is usually tied to board layout and firmware behavior, so exact sensor suffix and package matching helps reduce validation risk.`,
      checklist: [
        "Confirm sensing axis or function, interface and package.",
        "Check temperature grade, calibration requirements and suffix.",
        `Verify stock quantity, traceability and ${dateCodeText} before shipment.`
      ],
      faqFocus: "sensing function, interface, package, temperature grade and exact suffix"
    };
  }

  if (hasAny(type, ["esd", "diode", "transistor", "discrete", "zener", "logic", "passive", "capacitor", "inductor", "connector", "relay"])) {
    return {
      specsTitle: "Component Specifications",
      featureTitle: "Component Features & Applications",
      whyTitle: `Why Procurement Teams Source ${part.partNumber}`,
      checklistTitle: "Component Sourcing Checklist",
      intent: "discrete, logic and passive component sourcing",
      introFocus: `${part.partNumber} should be checked by exact suffix, package, rating, tolerance or protection requirement and production packaging.`,
      angle: `${part.partNumber} is often purchased for BOM continuity, repair demand or production replenishment where package, rating and manufacturer source still matter.`,
      checklist: [
        "Confirm exact suffix, electrical rating and package.",
        "Check tolerance, protection level or logic family where applicable.",
        `Verify packaging, batch consistency and ${dateCodeText} before shipment.`
      ],
      faqFocus: "exact suffix, rating, package, tolerance and production packaging"
    };
  }

  return {
    specsTitle: "Technical Specifications",
    featureTitle: "Key Features & Applications",
    whyTitle: `Why Engineers Choose ${part.partNumber}`,
    checklistTitle: "Procurement Checklist",
    intent: "electronic component sourcing",
    introFocus: `${part.partNumber} should be reviewed by exact manufacturer suffix, package, electrical characteristics, application fit and available stock.`,
    angle: `${part.partNumber} sourcing should be checked against the original BOM, qualified package, lifecycle status and current market availability before order release.`,
    checklist: [
      "Confirm exact manufacturer suffix and package.",
      "Check application fit, lifecycle status and available stock.",
      `Verify quantity, traceability and ${dateCodeText} by RFQ.`
    ],
    faqFocus: "exact suffix, package, electrical characteristics and current stock"
  };
}

function categoryCopy(part) {
  return procurementProfile(part);
}

function defaultFaq(part) {
  const profile = procurementProfile(part);
  return [
    {
      question: `Is ${part.partNumber} available from LimChip?`,
      answer: `LimChip can confirm current availability, price, quantity, date code and lead time for ${part.partNumber} by RFQ.`
    },
    {
      question: `What should buyers check before ordering ${part.partNumber}?`,
      answer: `Buyers should check ${profile.faqFocus} for ${part.partNumber}, together with live stock and traceable supply.`
    },
    {
      question: `How do I request a quote for ${part.partNumber}?`,
      answer: `Use the RFQ button and include required quantity, target date code, company name and contact details.`
    }
  ];
}

function relatedParts(part) {
  const selected = [];
  const explicit = part.relatedPartNumbers || [];

  explicit.forEach(partNumber => {
    const match = parts.find(item => item.partNumber === partNumber);
    if (match && match.partNumber !== part.partNumber && !selected.includes(match)) {
      selected.push(match);
    }
  });

  const candidateGroups = [
    item => item.brandGroup === part.brandGroup && item.series === part.series,
    item => item.brandGroup === part.brandGroup,
    item => item.productType === part.productType,
    item => item.category === part.category
  ];

  candidateGroups.forEach(matchGroup => {
    parts
      .filter(item => item.partNumber !== part.partNumber)
      .filter(matchGroup)
      .forEach(item => {
        if (selected.length < 4 && !selected.includes(item)) {
          selected.push(item);
        }
      });
  });

  return selected.slice(0, 4);
}

function pageHeader(title, description, canonical, jsonLd) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${text(title)}</title>
    <meta name="description" content="${text(description)}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${canonical}">
    <meta property="og:title" content="${text(title)}">
    <meta property="og:description" content="${text(description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonical}">
    <meta property="og:site_name" content="${text(site.companyName)}">
    <meta property="og:image" content="${absUrl("/resources/logopreview.png")}">
    <meta name="twitter:card" content="summary">
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="part-style.css?v=20260525-placeholder1">
    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 4)}
    </script>
</head>`;
}

function companyBlock() {
  return `    <div class="company-header">
        <div class="company-header-left">
            <a href="../index.html" class="company-logo-link" aria-label="LimChip homepage">
                <img src="../resources/logopreview.png" alt="LimChip logo" class="company-logo">
            </a>
            <div class="company-info">
                <div class="company-name">${text(site.companyName)}</div>
                <div class="company-tagline">${text(site.tagline)}</div>
            </div>
        </div>
    </div>`;
}

function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${absUrl("/")}#organization`,
    name: site.companyName,
    url: absUrl("/"),
    logo: absUrl("/resources/logopreview.png"),
    email: site.email,
    areaServed: ["Hong Kong", "Shenzhen", "Singapore", "Global"]
  };
}

function schemaAvailability(part) {
  const combined = [part.stockQty, part.stockNote, part.marketStatus, part.supplyRisk].filter(Boolean).join(" ").toLowerCase();
  if (combined.includes("discontinued") || combined.includes("obsolete") || combined.includes("eol")) {
    return "https://schema.org/LimitedAvailability";
  }
  if (part.stockQty && !String(part.stockQty).toLowerCase().includes("rfq")) {
    return "https://schema.org/InStock";
  }
  return "https://schema.org/LimitedAvailability";
}

function productJsonLd(part, faqs) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      {
        "@type": "Product",
        "@id": `${partUrl(part)}#product`,
        name: part.partNumber,
        brand: { "@type": "Brand", name: part.brand },
        manufacturer: { "@type": "Organization", name: part.manufacturer },
        category: part.category,
        description: productDescription(part),
        image: absUrl("/resources/logopreview.png"),
        url: partUrl(part),
        sku: part.partNumber,
        mpn: part.partNumber,
        offers: {
          "@type": "Offer",
          url: partUrl(part),
          availability: schemaAvailability(part),
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": `${absUrl("/")}#organization` }
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${partUrl(part)}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
          { "@type": "ListItem", position: 2, name: "Component Database", item: absUrl("/part/index.html") },
          { "@type": "ListItem", position: 3, name: part.partNumber, item: partUrl(part) }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${partUrl(part)}#faq`,
        mainEntity: faqs.map(item => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer }
        }))
      }
    ]
  };
}

function productDescription(part) {
  return `${generatedIntro(part)} ${part.marketStatus || "Contact LimChip for current price and availability."}`;
}

function truncateMeta(value, maxLength = 158) {
  const normalized = String(value || "").replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  const sliced = normalized.slice(0, maxLength + 1);
  const wordBreak = sliced.lastIndexOf(" ");
  const safeCut = wordBreak > 120 ? wordBreak : maxLength;
  return `${normalized.slice(0, safeCut).replace(/[\\s,;:.|-]+$/g, "")}...`;
}

function metaDescription(part) {
  const profile = procurementProfile(part);
  const base = part.seoDescription || `${part.partNumber} stock and RFQ support for ${part.manufacturer} ${part.category}${packageClause(part)}.`;
  const stock = part.stockQty ? `${part.stockQty} pcs listed` : "confirm availability";
  return truncateMeta(`${base} ${stock}, ${part.dateCode || "date code by RFQ"}, original components, ${profile.intent} and global shipping from LimChip.`);
}

function renderPartPage(part) {
  const copy = categoryCopy(part);
  const faqs = part.faq || defaultFaq(part);
  const related = relatedParts(part);
  const title = part.seoTitle || `${part.partNumber} Stock | ${part.manufacturer} ${part.category} RFQ - LimChip`;
  const description = metaDescription(part);
  const specBlock = specsBlock(part, copy);
  const featureBlock = featuresBlock(part, copy);

  const checklistHtml = (copy.checklist || []).map(item => `            <li>${text(item)}</li>`).join("\n");
  const relatedHtml = related.map(item => `            <a href="${item.slug}.html">
                <strong>${text(item.partNumber)}</strong>
                <span>${text(item.brand)} · ${text(item.category)}</span>
            </a>`).join("\n") + `
            <a href="index.html#${text((part.brandGroup || part.brand).toLowerCase().replace(/[^a-z0-9]+/g, "-"))}">
                <strong>${text(part.brandGroup || part.brand)} Parts</strong>
                <span>Browse related parts in the LimChip component database.</span>
            </a>
            <a href="index.html">
                <strong>More ${text(part.productType || "Component")} Stock</strong>
                <span>Search the full component index or request current availability.</span>
            </a>`;
  const faqHtml = faqs.map((item, index) => `            <details${index === 0 ? " open" : ""}>
                <summary>${text(item.question)}</summary>
                <p>${text(item.answer)}</p>
            </details>`).join("\n");

  return `${pageHeader(title, description, partUrl(part), productJsonLd(part, faqs))}

<body class="part-page">
<div class="container">

${companyBlock()}

    <div class="top-bar">
        <div class="nav-links">
            <a href="../index.html">Home</a> &gt;
            <a href="index.html">Database</a> &gt;
            ${text(part.partNumber)}
        </div>
        <div class="top-bar-right">
            <div class="search-wrap">
                <input type="text" id="partSearch" placeholder="Search part number..." autocomplete="off">
                <div id="searchResults" class="search-dropdown"></div>
            </div>
            <a href="index.html" class="more-btn">More Components &rarr;</a>
        </div>
    </div>

    <h1>${text(part.partNumber)}</h1>
    <div class="brand">Brand: ${text(part.brand)}</div>

    <p class="intro">
        ${text(introForPart(part))}
    </p>

    <div class="seo-section">
        <h2>${text(specBlock.heading)}</h2>
        <table>
            <tr><th>Parameter</th><th>Value / Specification</th></tr>
${specBlock.rowsHtml}
        </table>

        <h2>${text(featureBlock.heading)}</h2>
        <ul>
${featureBlock.rowsHtml}
        </ul>

        <h2>${text(copy.whyTitle)}</h2>
        <p>${text(sourcingNarrative(part, copy))}</p>
        ${part.procurementNote ? `<p>${text(part.procurementNote)}</p>` : ""}

        <h2>${text(copy.checklistTitle)}</h2>
        <ul>
${checklistHtml}
        </ul>

        <h2>Related Parts & Sourcing Context</h2>
        <p>${text(part.marketStatus || "LimChip can help buyers confirm current market supply, date code and batch condition.")}</p>
        <div class="related-parts">
${relatedHtml}
        </div>

        <h2>Frequently Asked Questions</h2>
        <div class="faq-list">
${faqHtml}
        </div>
    </div>

    <div class="rfq-box">
        <h3>Need Price & Availability for ${text(part.partNumber)}?</h3>
        <p>${text(part.procurementNote || `LimChip can confirm current price, stock quantity, date code and shipping options for ${part.partNumber}.`)}</p>

        <table class="spot-table">
            <thead>
                <tr>
                    <th>Brand</th>
                    <th>Part Number</th>
                    <th>Qty (PCS)</th>
                    <th>D/C</th>
                    <th>Note</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${text(part.brandGroup || part.brand)}</td>
                    <td><strong>${text(part.partNumber)}</strong></td>
                    <td class="qty">${text(part.stockQty || "RFQ")}</td>
                    <td>${text(part.dateCode || "Confirm by RFQ")}</td>
                    <td>${text(part.stockNote || "Contact LimChip")}</td>
                </tr>
            </tbody>
        </table>

        <a href="${mailto(part)}" class="rfq-btn">Submit RFQ / Request Quote</a>
    </div>

</div>

${searchScript()}

</body>
</html>
`;
}

function collectionJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      {
        "@type": "CollectionPage",
        "@id": absUrl("/part/index.html#webpage"),
        url: absUrl("/part/index.html"),
        name: "IC Components & Semiconductor Technical Database",
        description: "LimChip component database for semiconductor spot stock, technical specifications and RFQ support.",
        isPartOf: { "@type": "WebSite", name: "LimChip", url: absUrl("/") }
      },
      {
        "@type": "BreadcrumbList",
        "@id": absUrl("/part/index.html#breadcrumb"),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
          { "@type": "ListItem", position: 2, name: "Products", item: absUrl("/products.html") },
          { "@type": "ListItem", position: 3, name: "Component Database", item: absUrl("/part/index.html") }
        ]
      },
      {
        "@type": "ItemList",
        "@id": absUrl("/part/index.html#parts"),
        name: "LimChip component part number index",
        itemListElement: parts.map((part, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: partUrl(part),
          name: part.partNumber
        }))
      }
    ]
  };
}

function renderIndexPage() {
  const title = "IC Components & Semiconductor Technical Database | LimChip";
  const description = "LimChip component database - spot stock and technical specifications for FPGA, CPLD, memory, storage, analog, power and semiconductor components.";
  const brandsWithParts = brandCategories.map(([brand, label]) => {
    const brandParts = parts.filter(part => part.brandGroup === brand);
    return { brand, label, brandParts };
  });
  const featuredParts = parts
    .filter(part => part.featured !== false)
    .slice(0, 24);
  const recentParts = [...parts].slice(-12).reverse();
  const brandCards = brandsWithParts.map(({ brand, label, brandParts }) => {
    const sample = brandParts.slice(0, 3);
    const displayBrand = brandDisplayName(brand);
    const sampleHtml = sample.length
      ? sample.map(part => `<a href="${part.slug}.html">${text(part.partNumber)}</a>`).join("\n                    ")
      : `<span>Updating</span>`;
    const href = brandParts.length ? `#${brandId(brand)}` : `mailto:${site.email}?subject=${encodeURIComponent(`${displayBrand} RFQ - LimChip`)}`;

    return `            <div class="brand-card">
                <a href="${href}" class="brand-card-main">
                    <strong>${text(displayBrand)}</strong>
                    <span>${text(label)}</span>
                </a>
                <small class="brand-part-links">${sampleHtml}</small>
                <i class="brand-count-line" aria-label="${brandParts.length} listed parts">${brandParts.length}</i>
            </div>`;
  }).join("\n");
  const featuredHtml = featuredParts.map(renderPartCard).join("\n");
  const recentHtml = recentParts.map(renderPartCard).join("\n");
  const compactBrandSections = brandsWithParts
    .filter(({ brandParts }) => brandParts.length)
    .map(({ brand, label, brandParts }) => {
      const displayBrand = brandDisplayName(brand);
      const quickLabel = brandQuickIndexLabel(brand, label);
      const topParts = brandParts.slice(0, 8).map(part => `        <li>
            <a href="${part.slug}.html">${text(part.partNumber)}</a>
            <span>${text(part.category)}</span>
        </li>`).join("\n");
      const moreText = brandParts.length > 8 ? `        <li class="db-more">Showing ${Math.min(8, brandParts.length)} of ${brandParts.length} listed parts. Use search for more, or send your requirement to <a href="mailto:${site.email}">${site.email}</a>.</li>` : "";

      return `    <h3 id="${brandId(brand)}" class="db-brand-name">${text(displayBrand)} <span class="brand-cat">${text(quickLabel)}</span></h3>
    <ul class="db-list db-list-compact">
${topParts}
${moreText}
    </ul>`;
    }).join("\n\n");

  return `${pageHeader(title, description, absUrl("/part/index.html"), collectionJsonLd())}

<body class="part-page">
<div class="container">

${companyBlock()}

    <div class="top-bar">
        <div class="nav-links">
            <a href="../index.html">Home</a> &gt;
            <a href="../products.html">Products</a> &gt;
            Component Database
        </div>
    </div>

    <h1 class="db-title">Component Technical Database</h1>
    <p class="db-subtitle">Search LimChip's semiconductor sourcing index by part number, manufacturer, stock focus and long-lifecycle procurement demand.</p>

    <div class="db-tools" aria-label="Component database tools">
        <div class="db-index-search">
            <label for="partIndexSearch">Search part number</label>
            <input type="search" id="partIndexSearch" placeholder="Part number, brand, or keyword..." autocomplete="off">
        </div>
        <a href="mailto:${site.email}?subject=RFQ%20Inquiry%20-%20LimChip&body=Dear%20LimChip%20Team,%0A%0APart%20Number:%20%0ARequired%20Qty:%20%0ACompany%20Name:%20%0AContact%20Person:%20%0A%0ABest%20Regards," class="more-btn">Submit RFQ &rarr;</a>
    </div>
    <p id="partIndexNoResults" class="db-no-results">No matching part numbers found. Please contact <a href="mailto:${site.email}">${site.email}</a> for current stock.</p>
    <div id="partIndexSearchResults" class="part-card-grid db-search-results" aria-live="polite"></div>

    <section class="db-entry-section">
        <h2>Browse by Manufacturer</h2>
        <div class="brand-card-grid">
${brandCards}
        </div>
    </section>

    <section class="db-entry-section">
        <h2>Featured Hard-to-Find Parts</h2>
        <div class="part-card-grid">
${featuredHtml}
        </div>
    </section>

    <section class="db-entry-section">
        <h2>Recently Added Parts</h2>
        <div class="part-card-grid">
${recentHtml}
        </div>
    </section>

    <section class="db-entry-section db-compact-index">
        <h2>Manufacturer Quick Index</h2>
        <p class="db-section-note">This page shows a compact selection for browsing. All generated part pages are included in the sitemap for search engines.</p>
${compactBrandSections}
    </section>

</div>
${indexSearchScript()}
</body>
</html>
`;
}

function renderPartCard(part) {
  return `            <a href="${part.slug}.html" class="part-card">
                <strong>${text(part.partNumber)}</strong>
                <span>${text(part.brand)} · ${text(part.category)}</span>
                <em>${text(part.marketStatus || "Contact LimChip for current stock and sourcing support.")}</em>
            </a>`;
}

function brandId(brand) {
  return brand.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function searchScript() {
  return `<script>
(function () {
    const input = document.getElementById('partSearch');
    const dropdown = document.getElementById('searchResults');
    let parts = [];
    let loaded = false;

    if (!input || !dropdown) return;

    function localHref(item) {
        if (item.url && item.url.indexOf('/part/') === 0) return item.url.replace('/part/', '');
        return item.url || (item.slug ? item.slug + '.html' : 'index.html');
    }

    function haystack(item) {
        return [
            item.partNumber,
            item.brand,
            item.manufacturer,
            item.brandGroup,
            item.category,
            item.productType,
            item.series,
            item.package,
            item.keywords
        ].filter(Boolean).join(' ').toLowerCase();
    }

    function loadParts() {
        if (loaded) return Promise.resolve(parts);
        if (Array.isArray(window.LIMCHIP_PART_SEARCH_INDEX)) {
            parts = window.LIMCHIP_PART_SEARCH_INDEX;
            loaded = true;
            return Promise.resolve(parts);
        }
        return fetch('search-index.json')
            .then(r => r.ok ? r.json() : [])
            .then(data => {
                parts = Array.isArray(data) ? data : [];
                loaded = true;
                return parts;
            })
            .catch(() => new Promise(resolve => {
                const script = document.createElement('script');
                script.src = 'search-index.js';
                script.onload = () => resolve(Array.isArray(window.LIMCHIP_PART_SEARCH_INDEX) ? window.LIMCHIP_PART_SEARCH_INDEX : []);
                script.onerror = () => resolve([]);
                document.head.appendChild(script);
            }).then(data => {
                parts = Array.isArray(data) ? data : [];
                loaded = true;
                return parts;
            }));
    }

    function render(query) {
        const q = query.trim().toLowerCase();
        dropdown.innerHTML = '';
        if (!q) { dropdown.style.display = 'none'; return; }

        const matches = parts.filter(p => haystack(p).includes(q)).slice(0, 8);
        if (matches.length === 0) {
            dropdown.innerHTML = '<div class="search-no-result">No results found</div>';
        } else {
            matches.forEach(p => {
                const item = document.createElement('a');
                const strong = document.createElement('strong');
                const span = document.createElement('span');
                item.href = localHref(p);
                item.className = 'search-item';
                strong.textContent = p.partNumber || '';
                span.textContent = [p.brand || p.manufacturer || '', p.category || ''].filter(Boolean).join(' · ');
                item.appendChild(strong);
                if (span.textContent) item.appendChild(span);
                dropdown.appendChild(item);
            });
        }
        dropdown.style.display = 'block';
    }

    input.addEventListener('focus', function () {
        loadParts().then(() => render(input.value));
    });

    input.addEventListener('input', function () {
        loadParts().then(() => render(input.value));
    });

    document.addEventListener('click', function (e) {
        const wrap = document.querySelector('.search-wrap');
        if (wrap && !wrap.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
})();
</script>`;
}

function indexSearchScript() {
  return `<script>
(function () {
    const input = document.getElementById('partIndexSearch');
    const noResults = document.getElementById('partIndexNoResults');
    const results = document.getElementById('partIndexSearchResults');
    const sections = Array.from(document.querySelectorAll('.db-entry-section'));
    let parts = [];
    let loaded = false;

    if (!input || !noResults || !results) return;

    function localHref(item) {
        if (item.url && item.url.indexOf('/part/') === 0) return item.url.replace('/part/', '');
        return item.url || (item.slug ? item.slug + '.html' : 'index.html');
    }

    function haystack(item) {
        return [
            item.partNumber,
            item.brand,
            item.manufacturer,
            item.brandGroup,
            item.category,
            item.productType,
            item.series,
            item.package,
            item.stockQty,
            item.dateCode,
            item.keywords
        ].filter(Boolean).join(' ').toLowerCase();
    }

    function loadParts() {
        if (loaded) return Promise.resolve(parts);
        if (Array.isArray(window.LIMCHIP_PART_SEARCH_INDEX)) {
            parts = window.LIMCHIP_PART_SEARCH_INDEX;
            loaded = true;
            return Promise.resolve(parts);
        }
        return fetch('search-index.json')
            .then(r => r.ok ? r.json() : [])
            .then(data => {
                parts = Array.isArray(data) ? data : [];
                loaded = true;
                return parts;
            })
            .catch(() => new Promise(resolve => {
                const script = document.createElement('script');
                script.src = 'search-index.js';
                script.onload = () => resolve(Array.isArray(window.LIMCHIP_PART_SEARCH_INDEX) ? window.LIMCHIP_PART_SEARCH_INDEX : []);
                script.onerror = () => resolve([]);
                document.head.appendChild(script);
            }).then(data => {
                parts = Array.isArray(data) ? data : [];
                loaded = true;
                return parts;
            }));
    }

    function setDefaultView() {
        sections.forEach(section => { section.style.display = ''; });
        results.innerHTML = '';
        results.classList.remove('is-visible');
        noResults.style.display = 'none';
    }

    function renderCard(part) {
        const link = document.createElement('a');
        const title = document.createElement('strong');
        const meta = document.createElement('span');
        const status = document.createElement('em');
        link.href = localHref(part);
        link.className = 'part-card';
        title.textContent = part.partNumber || '';
        meta.textContent = [part.brand || part.manufacturer || '', part.category || '', part.package || ''].filter(Boolean).join(' · ');
        status.textContent = part.marketStatus || part.stockNote || 'Contact LimChip for current stock and sourcing support.';
        link.appendChild(title);
        link.appendChild(meta);
        link.appendChild(status);
        return link;
    }

    function renderSearch(query) {
        const q = query.trim().toLowerCase();
        if (!q) {
            setDefaultView();
            return;
        }

        const matches = parts.filter(part => haystack(part).includes(q)).slice(0, 36);
        sections.forEach(section => { section.style.display = 'none'; });
        results.innerHTML = '';
        matches.forEach(part => results.appendChild(renderCard(part)));
        results.classList.toggle('is-visible', matches.length > 0);
        noResults.style.display = matches.length ? 'none' : 'block';
    }

    input.addEventListener('focus', function () {
        loadParts().then(() => renderSearch(input.value));
    });

    input.addEventListener('input', function () {
        loadParts().then(() => renderSearch(input.value));
    });

    const initialQuery = new URLSearchParams(window.location.search).get('q');
    if (initialQuery) {
        input.value = initialQuery;
        loadParts().then(() => renderSearch(initialQuery));
    }
})();
</script>`;
}

function renderSitemap() {
  const staticUrls = [
    [absUrl("/"), "1.00", "monthly", buildDate],
    [absUrl("/products.html"), "0.90", "monthly", buildDate],
    [absUrl("/services.html"), "0.80", "monthly", buildDate],
    [absUrl("/applications.html"), "0.80", "monthly", buildDate],
    [absUrl("/about.html"), "0.60", "yearly", buildDate],
    [absUrl("/contact.html"), "0.70", "yearly", buildDate],
    [absUrl("/part/index.html"), "0.80", "weekly", buildDate]
  ];

  const urls = staticUrls
    .map(([loc, priority, changefreq, lastmod]) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
    <changefreq>${changefreq}</changefreq>
  </url>`)
    .concat(parts.map(part => `  <url>
    <loc>${partUrl(part)}</loc>
    <lastmod>${part.updatedAt || buildDate}</lastmod>
    <priority>0.70</priority>
    <changefreq>monthly</changefreq>
  </url>`));

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls.join("\n\n")}

</urlset>
`;
}

function renderSearchIndex() {
  return JSON.stringify(parts.map(part => ({
    partNumber: part.partNumber,
    slug: part.slug,
    brand: part.brand,
    manufacturer: part.manufacturer,
    brandGroup: part.brandGroup,
    category: part.category,
    productType: part.productType,
    series: part.series,
    package: part.package,
    stockQty: part.stockQty,
    dateCode: part.dateCode,
    stockNote: part.stockNote,
    marketStatus: part.marketStatus,
    supplyRisk: part.supplyRisk,
    valueAngle: part.valueAngle,
    url: `/part/${part.slug}.html`,
    keywords: [
      part.partNumber,
      part.brand,
      part.manufacturer,
      part.brandGroup,
      part.category,
      part.productType,
      part.series,
      part.package,
      part.stockQty,
      part.dateCode,
      part.marketStatus,
      part.supplyRisk,
      part.valueAngle,
      part.procurementNote,
      ...(part.applications || []),
      ...(part.features || [])
    ].filter(Boolean).join(" ")
  })), null, 2) + "\n";
}

function renderSearchIndexScript() {
  return `window.LIMCHIP_PART_SEARCH_INDEX = ${renderSearchIndex().trim()};\n`;
}

function writeFile(filePath, content) {
  if (shouldWrite) {
    fs.writeFileSync(filePath, content, "utf8");
  }
  console.log(`${shouldWrite ? "Wrote" : "Would write"} ${path.relative(rootDir, filePath)}`);
}

validateData();

writeFile(path.join(partDir, "index.html"), renderIndexPage());
parts.forEach(part => {
  writeFile(path.join(partDir, `${part.slug}.html`), renderPartPage(part));
});
writeFile(path.join(rootDir, "sitemap.xml"), renderSitemap());
writeFile(path.join(partDir, "search-index.json"), renderSearchIndex());
writeFile(path.join(partDir, "search-index.js"), renderSearchIndexScript());

if (!shouldWrite) {
  console.log("\nDry run only. Run `node part/generate-parts.js --write` to update HTML and sitemap files.");
}
