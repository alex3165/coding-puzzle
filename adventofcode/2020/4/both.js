const fs = require("fs");

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const content = fs.readFileSync("./data.txt", "utf-8");

const parsedContent = content
  .split("\n\n")
  .map((passport) => passport.replace(/\n/g, " "));

const validateYear = (value, min, max) => {
  const val = parseInt(value);

  if (!isNaN(val)) {
    return val >= min && val <= max;
  }

  return false;
};

const validateHeight = (value) => {
  const unit = value.slice(value.length - 2, value.length);
  const size = parseInt(value.slice(0, value.length - 2));

  if ((unit !== "cm" && unit !== "in") || isNaN(size)) {
    return false;
  }

  if (unit === "cm") {
    return size >= 150 && size <= 193;
  }

  if (unit === "in") {
    return size >= 59 && size <= 76;
  }

  return false;
};

const validateHexaColor = (value) => {
  return /^#[0-9a-f]{6}$/.test(value);
};

const validatePassport = (value) => {
  return /^\d{9}$/.test(value);
};

const validateCharColor = (value) => {
  return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value);
};

const validate = (key, value) => {
  switch (key) {
    case "byr":
      return validateYear(value, 1920, 2002);
    case "iyr":
      return validateYear(value, 2010, 2020);
    case "eyr":
      return validateYear(value, 2020, 2030);
    case "hgt":
      return validateHeight(value);
    case "hcl":
      return validateHexaColor(value);
    case "ecl":
      return validateCharColor(value);
    case "pid":
      return validatePassport(value);
  }

  return false;
};

const main = () => {
  const tables = parsedContent.map((passport) => {
    const lineFields = passport.split(" ").reduce((acc, next) => {
      const [key, value] = next.split(":");
      acc[key] = value;
      return acc;
    }, {});

    return lineFields;
  });

  const numberValids = tables.filter((table) => {
    const tableKeys = Object.keys(table);

    return requiredFields.every((r) => {
      return tableKeys.includes(r) && validate(r, table[r]);
    });
  }).length;

  console.log(numberValids);
};

main();
