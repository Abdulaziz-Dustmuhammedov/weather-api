//

const apiKey = "77595974f86e45e58e2191614252901";
const city = "Tashkent";
const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=bulk`;

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

const windColors = {
  0: "#E0F7FA",
  20: "#B2EBF2",
  40: "#4DD0E1",
  60: "#0288D1",
  61: "#01579B"
};

function getWindKey(wind) {
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

    bulk.forEach(({ query: { location, current } }) => {
      countriesJSON[iataCodes[location.country]] = {
        fillKey: getWindKey(current.wind_kph)
      };
    });

    console.log(countriesJSON);

    var map = new Datamap({
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
      data: countriesJSON
    });
  })
  .catch((error) => console.error("Xatolik:", error));
