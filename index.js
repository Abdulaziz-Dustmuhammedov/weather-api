//

// import { getWindKey, windColors } from "./wind";
// import { cloudColors, getCloudKey } from "./cloud";

const apiKey = "77595974f86e45e58e2191614252901";
const city = "Tashkent";
const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=bulk`;

export const cloudColors = {
  0: "#FFF9C4",
  10: "#FFF176",
  30: "#E0E0E0",
  60: "#9E9E9E",
  90: "#616161"
};

export function getCloudKey(cloud) {
  if (cloud >= 0 && cloud <= 10) {
    return "USUAL";
  } else if (cloud > 10 && cloud <= 30) {
    return "USUAL1";
  } else if (cloud > 30 && cloud <= 60) {
    return "NORMAL";
  } else if (cloud > 60 && cloud <= 90) {
    return "DARKCLOUD";
  }

  return "DARKCLOUD1";
}

export const windColors = {
  0: "#E0F7FA",
  20: "#B2EBF2",
  40: "#4DD0E1",
  60: "#0288D1",
  61: "#01579B"
};

export function getWindKey(wind) {
  if (wind >= 0 && wind <= 10) {
    return "SLOW";
  } else if (wind > 10 && wind <= 20) {
    return "SLOW1";
  } else if (wind > 20 && wind <= 40) {
    return "FAST";
  } else if (wind > 40 && wind <= 60) {
    return "FAST1";
  }

  return "VERYFAST";
}

const iataCodes = {
  USA: "USA",
  Canada: "CAN",
  "United Kingdom": "GBR",
  Germany: "DEU",
  France: "FRA",
  Italy: "ITA",
  Spain: "ESP",
  China: "CHN",
  Japan: "JPN",
  India: "IND",
  Australia: "AUS",
  Brazil: "BRA",
  Mexico: "MEX",
  Russia: "RUS",
  "South Korea": "KOR",
  Netherlands: "NLD",
  Switzerland: "CHE",
  Turkey: "TUR",
  "United Arab Emirates": "ARE",
  "Saudi Arabia": "SAU",
  "South Africa": "ZAF",
  Argentina: "ARG",
  Sweden: "SWE",
  Norway: "NOR",
  Denmark: "DNK",
  Finland: "FIN",
  Belgium: "BEL",
  Austria: "AUT",
  Ireland: "IRL",
  Portugal: "PRT",
  Thailand: "THA",
  Indonesia: "IDN",
  Malaysia: "MYS",
  Singapore: "SGP",
  "New Zealand": "NZL",
  Greece: "GRC",
  Poland: "POL",
  "Czech Republic": "CZE",
  Hungary: "HUN",
  Israel: "ISR",
  Vietnam: "VNM",
  Philippines: "PHL",
  Egypt: "EGY",
  Colombia: "COL",
  Chile: "CHL",
  Peru: "PER",
  "Hong Kong": "HKG",
  Taiwan: "TWN",
  Pakistan: "PAK",
  Ukraine: "UKR",
  Uzbekistan: "UZB"
};

const body = {
  locations: [
    { q: "New York", custom_id: "us-1" },
    { q: "Toronto", custom_id: "ca-1" },
    { q: "London", custom_id: "uk-1" },
    { q: "Paris", custom_id: "fr-1" },
    { q: "Berlin", custom_id: "de-1" },
    { q: "Tokyo", custom_id: "jp-1" },
    { q: "Beijing", custom_id: "cn-1" },
    { q: "Moscow", custom_id: "ru-1" },
    { q: "Sydney", custom_id: "au-1" },
    { q: "Delhi", custom_id: "in-1" },
    { q: "Sao Paulo", custom_id: "br-1" },
    { q: "Buenos Aires", custom_id: "ar-1" },
    { q: "Istanbul", custom_id: "tr-1" },
    { q: "Seoul", custom_id: "kr-1" },
    { q: "Mexico City", custom_id: "mx-1" },
    { q: "Jakarta", custom_id: "id-1" },
    { q: "Bangkok", custom_id: "th-1" },
    { q: "Cairo", custom_id: "eg-1" },
    { q: "Lagos", custom_id: "ng-1" },
    { q: "Nairobi", custom_id: "ke-1" },
    { q: "Johannesburg", custom_id: "za-1" },
    { q: "Madrid", custom_id: "es-1" },
    { q: "Rome", custom_id: "it-1" },
    { q: "Athens", custom_id: "gr-1" },
    { q: "Stockholm", custom_id: "se-1" },
    { q: "Oslo", custom_id: "no-1" },
    { q: "Helsinki", custom_id: "fi-1" },
    { q: "Warsaw", custom_id: "pl-1" },
    { q: "Lisbon", custom_id: "pt-1" },
    { q: "Kuala Lumpur", custom_id: "my-1" },
    { q: "Singapore", custom_id: "sg-1" },
    { q: "Dubai", custom_id: "ae-1" }
  ]
};

const temperatureColors = {
  "-30": "#003366",
  "-20": "#4A90E2",
  "-10": "#B3DFFD",
  0: "#E6F7FF",
  10: "#D1F2D3",
  20: "#FFFACD",
  30: "#FFCC80",
  40: "#FF7043",
  50: "#D32F2F"
};

function getFillKeyTemp(temp) {
  if (temp >= -30 && temp < -20) {
    return "LOW2";
  } else if (temp >= -20 && temp < -10) {
    return "LOW1";
  } else if (temp >= 10 && temp < 0) {
    return "LOW";
  } else if (temp === 0) {
    return "MEDIUM";
  } else if (temp > 0 && temp <= 10) {
    return "HIGH";
  } else if (temp > 10 && temp <= 20) {
    return "HIGH1";
  } else if (temp > 20 && temp <= 30) {
    return "HIGH2";
  } else if (temp > 30 && temp <= 40) {
    return "HIGH3";
  }

  return "HIGH4";
}

fetch(url, {
  method: "POST",
  body: JSON.stringify(body)
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Serverdan noto‘g‘ri javob keldi!");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const { bulk } = data;
    const countriesJSON = {};
    const countriesJSONWind = {};
    const countriesJSONCloud = {};

    bulk.forEach(({ query: { location, current } }) => {
      countriesJSON[iataCodes[location.country]] = {
        fillKey: getFillKeyTemp(current.temp_c)
        // numberOfThings: current.temp_c
      };

      countriesJSONWind[iataCodes[location.country]] = {
        fillKey: getWindKey(current.wind_kph)
      };

      countriesJSONCloud[iataCodes[location.country]] = {
        fillKey: getCloudKey(current.cloud)
      };
    });

    console.log(countriesJSON);

    new Datamap({
      element: document.getElementById("container"),
      fills: {
        HIGH: temperatureColors[10],
        HIGH1: temperatureColors[20],
        HIGH2: temperatureColors[30],
        HIGH3: temperatureColors[40],
        HIGH4: temperatureColors[50],

        LOW: temperatureColors["-10"],
        LOW1: temperatureColors["-20"],
        LOW2: temperatureColors["-30"],

        MEDIUM: temperatureColors[0],
        UNKNOWN: "rgb(0,0,0)",
        defaultFill: "#DCDCDC"
      },
      data: countriesJSON
    });

    new Datamap({
      element: document.getElementById("wind-container"),
      fills: {
        SLOW: windColors[0],
        SLOW1: windColors[20],
        FAST: windColors[40],
        FAST1: windColors[60],

        VERYFAST: windColors[61],

        UNKNOWN: "rgb(0,0,0)",
        defaultFill: "#DCDCDC"
      },
      data: countriesJSONWind
    });

    new Datamap({
      element: document.getElementById("cloud-container"),
      fills: {
        USUAL: cloudColors[0],
        USUAL1: cloudColors[10],
        NORMAL: cloudColors[30],

        DARKCLOUD: cloudColors[60],
        DARKCLOUD1: cloudColors[90],

        UNKNOWN: "rgb(0,0,0)",
        defaultFill: "#63ec6e"
      },
      data: countriesJSONCloud
    });
  })
  .catch((error) => console.error("Xatolik:", error));

// btns
const tempBtn = document.querySelector(".temp-btn");
const windBtn = document.querySelector(".wind-btn");
const cloudyBtn = document.querySelector(".cloudy-btn");

const container = document.querySelector("#container");
const windContainer = document.querySelector("#wind-container");
const cloudContainer = document.querySelector("#cloud-container");

container.classList.add("block");
container.classList.remove("hidden");

windContainer.classList.add("hidden");
cloudContainer.classList.add("hidden");

tempBtn.addEventListener("click", () => {
  container.classList.add("block");
  container.classList.remove("hidden");

  windContainer.classList.add("hidden");
  cloudContainer.classList.add("hidden");
  console.log("hello");
});

windBtn.addEventListener("click", () => {
  windContainer.classList.add("block");
  windContainer.classList.remove("hidden");

  container.classList.add("hidden");
  cloudContainer.classList.add("hidden");
});

cloudyBtn.addEventListener("click", () => {
  cloudContainer.classList.add("block");
  cloudContainer.classList.remove("hidden");

  container.classList.add("hidden");
  windContainer.classList.add("hidden");
});
