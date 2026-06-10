const STORAGE_KEY = "sanitationDaily.phase1";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const defaultState = {
  dataVersion: 2,
  activeScreen: "calendar",
  calendarYear: 2026,
  calendarMonth: 0,
  selectedDate: "2026-01-01",
  selectedLocation: "Manhattan 6",
  settings: {
    year: 2026,
    chartType: "officer",
    officerChart: "6",
    sanitationChart: "1",
    abChart: "B",
    saturdayChart: false,
    homeDistrict: "Manhattan 6",
    moneyStorage: "both",
    vacationBatches: {
      v1: "",
      v2: "",
      v3: "",
      v4: "",
      v5: "",
      extra1: "",
      extra2: ""
    }
  },
  entries: {}
};

const holidayByDate = {
  "2025-01-01": "New Year's Day",
  "2025-01-20": "Martin Luther King Jr. Day",
  "2025-02-17": "Presidents' Day",
  "2025-05-26": "Memorial Day",
  "2025-06-19": "Juneteenth",
  "2025-07-04": "Independence Day",
  "2025-09-01": "Labor Day",
  "2025-10-13": "Italian Heritage / Indigenous Peoples' Day",
  "2025-11-04": "Election Day",
  "2025-11-11": "Veterans Day",
  "2025-11-27": "Thanksgiving Day",
  "2025-12-25": "Christmas Day",
  "2026-01-01": "New Year's Day",
  "2026-01-19": "Martin Luther King Jr. Day",
  "2026-02-12": "Lincoln's Birthday",
  "2026-02-16": "Presidents Day",
  "2026-05-25": "Memorial Day",
  "2026-06-19": "Juneteenth",
  "2026-07-03": "Independence Day Observed",
  "2026-07-04": "Independence Day",
  "2026-09-07": "Labor Day",
  "2026-10-12": "Columbus Day",
  "2026-11-03": "Election Day",
  "2026-11-11": "Veterans Day",
  "2026-11-26": "Thanksgiving",
  "2026-12-25": "Christmas Day"
};

const calendarSheetChartLines = {
  "2025-01-01": "-4-10-14-20-F3-A-",
  "2025-01-02": "-5-11-15-21-25-F4-",
  "2025-01-03": "-1-6-13-16-24-F5-",
  "2025-01-04": "-2-7-12-17-22-F6-B-",
  "2025-01-06": "-7-17-22-F6-",
  "2025-01-07": "-2-8-18-F1-",
  "2025-01-08": "-3-9-13-19-F2-B-",
  "2025-01-09": "-4-10-14-20-24-F3-",
  "2025-01-10": "-5-12-15-23-25-F4-",
  "2025-01-11": "-1-6-11-16-21-F5-A-",
  "2025-01-13": "-6-16-21-F5-",
  "2025-01-14": "-1-7-17-F6-",
  "2025-01-15": "-2-8-12-18-F1-A-",
  "2025-01-16": "-3-9-13-19-23-F2-",
  "2025-01-17": "-4-11-14-22-24-F3-",
  "2025-01-18": "-5-10-15-20-25-F4-B-",
  "2025-01-20": "-5-15-20-F4-",
  "2025-01-21": "-6-16-25-F5-",
  "2025-01-22": "-1-7-11-17-F6-B-",
  "2025-01-23": "-2-8-12-18-22-F1-",
  "2025-01-24": "-3-10-13-21-23-F2-",
  "2025-01-25": "-4-9-14-19-24-F3-A-",
  "2025-01-27": "-4-14-19-F3-",
  "2025-01-28": "-5-15-24-F4-",
  "2025-01-29": "-6-10-16-25-F5-A-",
  "2025-01-30": "-1-7-11-17-21-F6-",
  "2025-01-31": "-2-9-12-20-22-F1-",
  "2025-02-01": "-3-8-13-18-23-F2-B-",
  "2025-02-03": "-3-13-18-F2-",
  "2025-02-04": "-4-14-23-F3-",
  "2025-02-05": "-5-9-15-24-F4-B-",
  "2025-02-06": "-6-10-16-20-25-F5-",
  "2025-02-07": "-1-8-11-19-21-F6-",
  "2025-02-08": "-2-7-12-17-22-F1-A-",
  "2025-02-10": "-2-12-17-F1-",
  "2025-02-11": "-3-13-22-F2-",
  "2025-02-12": "-4-8-14-23-F3-A-",
  "2025-02-13": "-5-9-15-19-24-F4-",
  "2025-02-14": "-7-10-18-20-25-F5-",
  "2025-02-15": "-1-6-11-16-21-F6-B-"
};

const sanitationChartWeekMatrix = {
  1: [5, 15, 20],
  2: [6, 16, 25],
  3: [1, 7, 11, 17],
  4: [2, 8, 12, 18, 22],
  5: [3, 10, 13, 21, 23],
  6: [4, 9, 14, 19, 24]
};

const officerChartWeekMatrix = {
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 1
};

const paperCalendarBaseMonday = Date.UTC(2026, 0, 5);
const dayInMilliseconds = 24 * 60 * 60 * 1000;

function buildPaperCalendarFields(year) {
  const fields = {};
  const start = new Date(Date.UTC(year, 0, 1));
  const end = new Date(Date.UTC(year, 11, 31));
  for (let time = start.getTime(); time <= end.getTime(); time += dayInMilliseconds) {
    const date = new Date(time);
    const day = date.getUTCDay();
    if (day === 0) continue;
    const weekOffset = paperWeekOffset(date);
    const key = date.toISOString().slice(0, 10);
    const entry = {
      officer: String(wrapCalendarNumber(officerChartWeekMatrix[day] - weekOffset, 6)),
      sanitation: sanitationChartWeekMatrix[day]
        .map((chart) => wrapCalendarNumber(chart - weekOffset, 25))
        .sort((a, b) => a - b)
        .join("-")
    };
    if (day === 3 || day === 6) {
      const isOddWeek = Math.abs(weekOffset % 2) === 1;
      entry.ab = day === 3
        ? (isOddWeek ? "A" : "B")
        : (isOddWeek ? "B" : "A");
    }
    if (day === 1) {
      const vacationBatch = 2 + weekOffset;
      if (vacationBatch >= 2 && vacationBatch <= 52) {
        entry.vacation = `V${vacationBatch}`;
      }
    }
    fields[key] = entry;
  }
  return fields;
}

function paperWeekOffset(date) {
  const day = date.getUTCDay();
  const mondayDelta = day === 0 ? -6 : 1 - day;
  const monday = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + mondayDelta);
  return Math.round((monday - paperCalendarBaseMonday) / (7 * dayInMilliseconds));
}

function wrapCalendarNumber(value, max) {
  return ((value - 1) % max + max) % max + 1;
}

const scannedCalendarFieldChecks = {
  "2026-01-01": { officer: "6", sanitation: "3-9-13-19-23" },
  "2026-01-02": { officer: "1", sanitation: "4-11-14-22-24" },
  "2026-01-03": { officer: "2", sanitation: "5-10-15-20-25", ab: "B" },
  "2026-01-05": { officer: "2", sanitation: "5-15-20", vacation: "V2" },
  "2026-01-06": { officer: "3", sanitation: "6-16-25" },
  "2026-01-07": { officer: "4", sanitation: "1-7-11-17", ab: "B" },
  "2026-01-08": { officer: "5", sanitation: "2-8-12-18-22" },
  "2026-01-09": { officer: "6", sanitation: "3-10-13-21-23" },
  "2026-01-10": { officer: "1", sanitation: "4-9-14-19-24", ab: "A" },
  "2026-01-12": { officer: "1", sanitation: "4-14-19", vacation: "V3" },
  "2026-01-13": { officer: "2", sanitation: "5-15-24" },
  "2026-01-14": { officer: "3", sanitation: "6-10-16-25", ab: "A" },
  "2026-01-15": { officer: "4", sanitation: "1-7-11-17-21" },
  "2026-01-16": { officer: "5", sanitation: "2-9-12-20-22" },
  "2026-01-17": { officer: "6", sanitation: "3-8-13-18-23", ab: "B" },
  "2026-01-19": { officer: "6", sanitation: "3-13-18", vacation: "V4" },
  "2026-01-20": { officer: "1", sanitation: "4-14-23" },
  "2026-01-21": { officer: "2", sanitation: "5-9-15-24", ab: "B" },
  "2026-01-22": { officer: "3", sanitation: "6-10-16-20-25" },
  "2026-01-23": { officer: "4", sanitation: "1-8-11-19-21" },
  "2026-01-24": { officer: "5", sanitation: "2-7-12-17-22", ab: "A" },
  "2026-01-26": { officer: "5", sanitation: "2-12-17", vacation: "V5" },
  "2026-01-27": { officer: "6", sanitation: "3-13-22" },
  "2026-01-28": { officer: "1", sanitation: "4-8-14-23", ab: "A" },
  "2026-01-29": { officer: "2", sanitation: "5-9-15-19-24" },
  "2026-01-30": { officer: "3", sanitation: "7-10-18-20-25" },
  "2026-01-31": { officer: "4", sanitation: "1-6-11-16-21", ab: "B" },
  "2026-02-02": { officer: "4", sanitation: "1-11-16", vacation: "V6" },
  "2026-02-03": { officer: "5", sanitation: "2-12-21" },
  "2026-02-04": { officer: "6", sanitation: "3-7-13-22", ab: "B" },
  "2026-02-05": { officer: "1", sanitation: "4-8-14-18-23" },
  "2026-02-06": { officer: "2", sanitation: "6-9-17-19-24" },
  "2026-02-07": { officer: "3", sanitation: "5-10-15-20-25", ab: "A" },
  "2026-02-09": { officer: "3", sanitation: "10-15-25", vacation: "V7" },
  "2026-02-10": { officer: "4", sanitation: "1-11-20" },
  "2026-02-11": { officer: "5", sanitation: "2-6-12-21", ab: "A" },
  "2026-02-12": { officer: "6", sanitation: "3-7-13-17-22" },
  "2026-02-13": { officer: "1", sanitation: "5-8-16-18-23" },
  "2026-02-14": { officer: "2", sanitation: "4-9-14-19-24", ab: "B" },
  "2026-02-16": { officer: "2", sanitation: "9-14-24", vacation: "V8" },
  "2026-02-17": { officer: "3", sanitation: "10-19-25" },
  "2026-02-18": { officer: "4", sanitation: "1-5-11-20", ab: "B" },
  "2026-02-19": { officer: "5", sanitation: "2-6-12-16-21" },
  "2026-02-20": { officer: "6", sanitation: "4-7-15-17-22" },
  "2026-02-21": { officer: "1", sanitation: "3-8-13-18-23", ab: "A" },
  "2026-02-23": { officer: "1", sanitation: "8-13-23", vacation: "V9" },
  "2026-02-24": { officer: "2", sanitation: "9-18-24" },
  "2026-02-25": { officer: "3", sanitation: "4-10-19-25", ab: "A" },
  "2026-02-26": { officer: "4", sanitation: "1-5-11-15-20" },
  "2026-02-27": { officer: "5", sanitation: "3-6-14-16-21" },
  "2026-02-28": { officer: "6", sanitation: "2-7-12-17-22", ab: "B" },
  "2026-03-02": { officer: "6", sanitation: "7-12-22", vacation: "V10" },
  "2026-03-03": { officer: "1", sanitation: "8-17-23" },
  "2026-03-04": { officer: "2", sanitation: "3-9-18-24", ab: "B" },
  "2026-03-05": { officer: "3", sanitation: "4-10-14-19-25" },
  "2026-03-06": { officer: "4", sanitation: "2-5-13-15-20" },
  "2026-03-07": { officer: "5", sanitation: "1-6-11-16-21", ab: "A" },
  "2026-03-09": { officer: "5", sanitation: "6-11-21", vacation: "V11" },
  "2026-03-10": { officer: "6", sanitation: "7-16-22" },
  "2026-03-11": { officer: "1", sanitation: "2-8-17-23", ab: "A" },
  "2026-03-12": { officer: "2", sanitation: "3-9-13-18-24" },
  "2026-03-13": { officer: "3", sanitation: "1-4-12-14-19" },
  "2026-03-14": { officer: "4", sanitation: "5-10-15-20-25", ab: "B" },
  "2026-03-16": { officer: "4", sanitation: "5-10-20", vacation: "V12" },
  "2026-03-17": { officer: "5", sanitation: "6-15-21" },
  "2026-03-18": { officer: "6", sanitation: "1-7-16-22", ab: "B" },
  "2026-03-19": { officer: "1", sanitation: "2-8-12-17-23" },
  "2026-03-20": { officer: "2", sanitation: "3-11-13-18-25" },
  "2026-03-21": { officer: "3", sanitation: "4-9-14-19-24", ab: "A" },
  "2026-03-23": { officer: "3", sanitation: "4-9-19", vacation: "V13" },
  "2026-03-24": { officer: "4", sanitation: "5-14-20" },
  "2026-03-25": { officer: "5", sanitation: "6-15-21-25", ab: "A" },
  "2026-03-26": { officer: "6", sanitation: "1-7-11-16-22" },
  "2026-03-27": { officer: "1", sanitation: "2-10-12-17-24" },
  "2026-03-28": { officer: "2", sanitation: "3-8-13-18-23", ab: "B" },
  "2026-03-30": { officer: "2", sanitation: "3-8-18", vacation: "V14" },
  "2026-03-31": { officer: "3", sanitation: "4-13-19" },
  "2026-04-01": { officer: "4", sanitation: "5-14-20-24", ab: "B" },
  "2026-04-02": { officer: "5", sanitation: "6-10-15-21-25" },
  "2026-04-03": { officer: "6", sanitation: "1-9-11-16-23" },
  "2026-04-04": { officer: "1", sanitation: "2-7-12-17-22", ab: "A" },
  "2026-04-06": { officer: "1", sanitation: "2-7-17", vacation: "V15" },
  "2026-04-07": { officer: "2", sanitation: "3-12-18" },
  "2026-04-08": { officer: "3", sanitation: "4-13-19-23", ab: "A" },
  "2026-04-09": { officer: "4", sanitation: "5-9-14-20-24" },
  "2026-04-10": { officer: "5", sanitation: "8-10-15-22-25" },
  "2026-04-11": { officer: "6", sanitation: "1-6-11-16-21", ab: "B" },
  "2026-04-13": { officer: "6", sanitation: "1-6-16", vacation: "V16" },
  "2026-04-14": { officer: "1", sanitation: "2-11-17" },
  "2026-04-15": { officer: "2", sanitation: "3-12-18-22", ab: "B" },
  "2026-04-16": { officer: "3", sanitation: "4-8-13-19-23" },
  "2026-04-17": { officer: "4", sanitation: "7-9-14-21-24" },
  "2026-04-18": { officer: "5", sanitation: "5-10-15-20-25", ab: "A" },
  "2026-04-20": { officer: "5", sanitation: "5-15-25", vacation: "V17" },
  "2026-04-21": { officer: "6", sanitation: "1-10-16" },
  "2026-04-22": { officer: "1", sanitation: "2-11-17-21", ab: "A" },
  "2026-04-23": { officer: "2", sanitation: "3-7-12-18-22" },
  "2026-04-24": { officer: "3", sanitation: "6-8-13-20-23" },
  "2026-04-25": { officer: "4", sanitation: "4-9-14-19-24", ab: "B" },
  "2026-04-27": { officer: "4", sanitation: "4-14-24", vacation: "V18" },
  "2026-04-28": { officer: "5", sanitation: "9-15-25" },
  "2026-04-29": { officer: "6", sanitation: "1-10-16-20", ab: "B" },
  "2026-04-30": { officer: "1", sanitation: "2-6-11-17-21" }
};

const paperCalendarFields = buildPaperCalendarFields(2026);

const vacationWeekStarts = {
  "2025-01-06": "V2",
  "2025-01-13": "V3",
  "2025-01-20": "V4",
  "2025-01-27": "V5",
  "2025-02-03": "V6"
};

const sampleCalendarNotes = {
  "2025-01-01": ["White 8", "Birthday"],
  "2025-01-06": ["Three Kings Day"],
  "2025-01-16": ["$"],
  "2025-01-28": ["Asian Lunar New Year's Eve"],
  "2025-01-29": ["Asian Lunar New Year"],
  "2025-01-30": ["Birthday"],
  "2026-01-03": ["Jade Society Board Meeting"],
  "2026-01-06": ["Three Kings Day Celebration", "ACE General Meeting"],
  "2026-01-07": ["African American Society General Meeting"],
  "2026-01-08": ["S.C.R. Suspended"],
  "2026-01-13": ["S.C.R. Suspended", "Columbia Association Board Meeting"],
  "2026-01-15": ["Emerald Society General Meeting"],
  "2026-01-21": ["UWSA Meeting"],
  "2026-01-26": ["S.C.R. Suspended", "ACE Board Meeting"],
  "2026-01-29": ["Columbia Association General Meeting"],
  "2026-02-04": ["African American Society General Meeting"],
  "2026-02-07": ["Jade Society General Meeting"],
  "2026-02-10": ["Columbia Association Board Meeting"],
  "2026-02-11": ["Lincoln's Birthday"],
  "2026-02-12": ["Lincoln's Birthday"],
  "2026-02-16": ["Presidents Day", "Lunar New Year Eve"],
  "2026-02-17": ["Lunar New Year"],
  "2026-02-18": ["Ash Wednesday", "UWSA Meeting", "Losar Tibetan New Year"],
  "2026-02-19": ["S.C.R. Suspended", "Emerald Society General Meeting"],
  "2026-02-23": ["S.C.R. Suspended"],
  "2026-02-24": ["S.C.R. Suspended"],
  "2026-02-25": ["S.C.R. Suspended"],
  "2026-02-26": ["Columbia Association General Meeting"],
  "2026-02-28": ["Jade Society Lunar New Year Luncheon"],
  "2026-03-03": ["Purim"],
  "2026-03-04": ["African American Society General Meeting"],
  "2026-03-07": ["Jade Society Board Meeting"],
  "2026-03-08": ["Daylight Saving Time Begins 0200"],
  "2026-03-10": ["S.C.R. Suspended", "Columbia Association Board Meeting"],
  "2026-03-11": ["Emerald Society General Meeting"],
  "2026-03-17": ["Saint Patrick's Day"],
  "2026-03-18": ["UWSA Meeting", "Muslim Society Meeting"],
  "2026-03-20": ["IDUL-FITR"],
  "2026-03-21": ["IDUL-FITR"],
  "2026-03-26": ["Columbia Association General Meeting"],
  "2026-03-27": ["S.C.R. Suspended"],
  "2026-03-28": ["S.C.R. Suspended"],
  "2026-03-29": ["Night Plow Ends"],
  "2026-04-01": ["African American Society General Meeting"],
  "2026-04-02": ["Passover 1st Day", "Holy Thursday"],
  "2026-04-03": ["Passover 2nd Day", "Good Friday"],
  "2026-04-04": ["Jade Society General Meeting"],
  "2026-04-05": ["Easter"],
  "2026-04-07": ["ACE General Meeting"],
  "2026-04-08": ["Passover 7th Day"],
  "2026-04-09": ["S.C.R. Suspended", "Holy Thursday (Orthodox)", "Passover 8th Day", "Holy Name Society General Meeting"],
  "2026-04-10": ["S.C.R. Suspended", "Good Friday (Orthodox)"],
  "2026-04-12": ["Easter Orthodox"],
  "2026-04-14": ["Hispanic Society Meeting", "Columbia Association Board Meeting"],
  "2026-04-15": ["S.C.R. Suspended", "UWSA Meeting"],
  "2026-04-16": ["S.C.R. Suspended", "Hebrew Spiritual Society Meeting", "Emerald Society General Meeting"],
  "2026-04-17": ["S.C.R. Suspended"],
  "2026-04-18": ["African American Society Spring Dance"],
  "2026-04-27": ["ACE Board Meeting"],
  "2026-04-28": ["Sanitation Officers Association 17th Annual Golf Outing"],
  "2026-04-30": ["Columbia Association General Meeting"],
  "2026-05-01": ["ACE Annual Meeting"],
  "2026-05-02": ["Jade Society Board Meeting"],
  "2026-05-05": ["Holy Name Society 34th Annual Golf Outing"],
  "2026-05-06": ["African American Society General Meeting"],
  "2026-05-12": ["Annual Chief's Association Dinner", "Hispanic Society Meeting", "Columbia Association Board Meeting"],
  "2026-05-14": ["Solemnity of the Ascension"],
  "2026-05-20": ["UWSA Meeting"],
  "2026-05-21": ["S.C.R. Suspended", "Emerald Society BBQ"],
  "2026-05-22": ["S.C.R. Suspended", "Shavuot"],
  "2026-05-23": ["S.C.R. Suspended", "Shavuot"],
  "2026-05-25": ["S.C.R. Suspended"],
  "2026-05-27": ["S.C.R. Suspended", "IDUL-ADHA"],
  "2026-05-28": ["S.C.R. Suspended", "IDUL-ADHA", "Hebrew Spiritual Society Meeting", "Columbia Association General Meeting"],
  "2026-06-03": ["African American Society General Meeting"],
  "2026-06-06": ["Jade Society General Meeting"],
  "2026-06-07": ["Line Officers Begin Summer Uniform"],
  "2026-06-09": ["Hispanic Society Meeting", "Columbia Association Board Meeting"],
  "2026-06-12": ["Columbia Association Golf Outing"],
  "2026-06-14": ["Puerto Rican Day Parade"],
  "2026-06-17": ["UWSA Meeting", "Muslim Society Meeting"],
  "2026-06-18": ["Emerald Society Cigar Night"],
  "2026-06-19": ["S.C.R. Suspended"],
  "2026-06-25": ["Columbia Association Italian Feast"],
  "2026-06-28": ["NYC Pride March"],
  "2026-07-03": ["S.C.R. Suspended"],
  "2026-07-04": ["S.C.R. Suspended"],
  "2026-07-07": ["ACE General Meeting"],
  "2026-07-19": ["African American Society BBQ"],
  "2026-07-23": ["S.C.R. Suspended", "TISHA B'AV"],
  "2026-07-27": ["ACE Board Meeting"],
  "2026-08-01": ["Jade Society General Meeting"],
  "2026-08-15": ["S.C.R. Suspended", "Feast of the Assumption"],
  "2026-09-02": ["African American Society General Meeting"],
  "2026-09-05": ["Jade Society Board Meeting"],
  "2026-09-07": ["S.C.R. Suspended"],
  "2026-09-08": ["Columbia Association Board Meeting"],
  "2026-09-10": ["Emerald Society General Meeting"],
  "2026-09-11": ["Patriot Day"],
  "2026-09-12": ["S.C.R. Suspended", "Rosh Hashanah"],
  "2026-09-13": ["Rosh Hashanah"],
  "2026-09-14": ["Hispanic Society Meeting"],
  "2026-09-16": ["UWSA Meeting", "Muslim Society Meeting"],
  "2026-09-17": ["Emerald Society Golf Outing"],
  "2026-09-20": ["African American Day Parade"],
  "2026-09-21": ["S.C.R. Suspended", "Yom Kippur"],
  "2026-09-24": ["Columbia Association General Meeting"],
  "2026-09-26": ["S.C.R. Suspended", "Succoth"],
  "2026-09-27": ["Succoth", "Line Officers Winter Uniform Begins"],
  "2026-10-03": ["S.C.R. Suspended", "Shemini Atzereth", "Jade Society General Meeting"],
  "2026-10-04": ["Simchas Torah"],
  "2026-10-06": ["ACE General Meeting", "Columbia Association Board Meeting"],
  "2026-10-07": ["African American Society General Meeting"],
  "2026-10-08": ["Holy Name Society Annual Cigar Night"],
  "2026-10-11": ["Columbia Association Wreath Laying"],
  "2026-10-12": ["S.C.R. Suspended", "Columbus Day Parade"],
  "2026-10-13": ["Hispanic Society Meeting"],
  "2026-10-15": ["Hebrew Spiritual Society Meeting", "Emerald Society General Meeting"],
  "2026-10-21": ["UWSA Meeting"],
  "2026-10-23": ["Columbia Association 80th Annual Dinner Dance"],
  "2026-10-26": ["ACE Board Meeting"],
  "2026-11-01": ["All Saints' Day", "Daylight Saving Time Ends"],
  "2026-11-02": ["Holy Name Society 93rd Annual Memorial Mass", "Columbia Association Cigar Night"],
  "2026-11-03": ["S.C.R. Suspended"],
  "2026-11-06": ["ACE Karaoke Night"],
  "2026-11-07": ["Jade Society Board Meeting"],
  "2026-11-08": ["Diwali"],
  "2026-11-11": ["S.C.R. Suspended"],
  "2026-11-17": ["Hispanic Society Meeting"],
  "2026-11-18": ["UWSA Meeting", "African American Society General Meeting"],
  "2026-11-19": ["Emerald Society General Meeting", "Hebrew Spiritual Society Meeting"],
  "2026-11-21": ["African American Society 81st Annual Dinner Dance"],
  "2026-11-24": ["Columbia Association Board and General Meeting"],
  "2026-11-26": ["S.C.R. Suspended"],
  "2026-11-29": ["Night Plow Begins"],
  "2026-12-02": ["African American Society General Meeting"],
  "2026-12-03": ["Holy Name Society General Meeting"],
  "2026-12-04": ["Hanukkah Begins"],
  "2026-12-05": ["Jade Society General Meeting"],
  "2026-12-08": ["S.C.R. Suspended", "Immaculate Conception"],
  "2026-12-16": ["UWSA Meeting", "Muslim Society Meeting"],
  "2026-12-25": ["S.C.R. Suspended"],
  "2026-12-26": ["Kwanzaa Begins"]
};

const functionOptions = [
  "Absent", "Admin. Officer", "ATV", "AWOL", "Baskets", "BIT", "Blockade", "Blocking",
  "Broom Dump", "Bulk", "Bulk+1 Dump", "Bulk Officer", "CFC", "Chart", "Cleaning",
  "Cleaning Officer", "Clerk", "Clinic", "Collection", "Collection+1 Dump",
  "Collection+2 Dumps", "Container Officer", "Court", "Covid Cleaning", "Covid Sick",
  "Crosswalks", "Defensive Driving Course", "DIF", "E-Waste", "Emergency",
  "Executive Officer", "Export Officer", "EZPACK", "EZPACK Recycling", "Field Officer",
  "Firearm Range", "FEL", "Floater", "FMLA", "Garage Foreman", "Graduation",
  "GU/Gasman", "Half to Half", "Half to Half+1 Dump", "Half to Half+2 Dumps",
  "Half to MLP", "Half to MLP+1 Dump", "Half to MLP+2 Dumps", "Half to Relays",
  "Half to Relays+1 Dump", "Half to Relays+2 Dumps", "Handbroom", "Hauling",
  "Haulster", "Highway Cleaning", "Highway Supervisor", "Homeless Cleaning",
  "Holder", "Honor Guard", "Household Refuse", "Household Refuse+1 Dump",
  "Household Refuse+2 Dumps", "Household Refuse and Organics",
  "Household Refuse and Organics+1 Dump", "Household Refuse and Organics+2 Dumps",
  "Impound", "Instructor", "Jury Duty", "Lidding", "Litigation", "Litter", "LODI",
  "LWOPX", "MDA", "Mech. Broom", "Military XWP", "Military XWOP", "MPG",
  "MPG+1 Dump", "MPG+2 Dumps", "MLP", "NDS", "Organics", "Organics+1 Dump",
  "Other", "Paper", "Paper+1 Dump", "Paper+2 Dumps", "Parade", "Parks",
  "Parks Supervisor", "Patrol", "PCI", "Pests", "Plow", "Porter", "Quarantined",
  "Quarter Truck", "Quarter Truck+1 Dump", "Quarter Truck+2 Dumps", "Recycling",
  "Recycling+1 Dump", "Recycling+2 Dumps", "Relays", "Roll On/Roll Off",
  "Salt Receiving", "Scale House", "Scattering", "School Truck", "Sector Officer",
  "Security", "Short Dump", "Sick (First Day)", "Sick", "Sick Chart", "Skid Steer",
  "Snow", "Snow Battalion", "Snow Dumping", "Special Function", "Spreader",
  "Storm Debris", "Summons Officer", "Superintendent", "Super-sucker (BBM)",
  "Supervisor", "Super's Clerk/DSOA", "Surveillance", "Suspended", "Tamper",
  "Three-Quarter Truck", "Three-Quarter Truck+1 Dump", "Three-Quarter Truck+2 Dumps",
  "Tipping Floor", "TNT", "TNT Supervisor", "Transport", "Training", "Trials",
  "Tree Truck", "Truck", "Truck+1 Dump", "Truck+2 Dumps", "Vacation", "Wrecker",
  "XWOP", "XWP"
];

const paidFunctionHints = new Set(functionOptions.filter((name) => {
  return /Collection|Dump|Truck|Refuse|Recycling|Organics|Paper|MPG|Half|Bulk|EZPACK|Roll On|School Truck/.test(name);
}));

const expandedFunctionHints = new Set(functionOptions.filter((name) => {
  return /Collection|Half to|Household Refuse|MPG|Organics|Paper|Quarter Truck|Recycling|Three-Quarter Truck/.test(name);
}));

const truckOptions = [
  ["0", "No Truck"],
  ["1", "Eighth Truck"],
  ["2", "Quarter Truck"],
  ["3", "3 Hours Truck"],
  ["4", "Half Truck"],
  ["5", "5 Hours Truck"],
  ["6", "Three Quarter Truck"],
  ["7", "7 Hours Truck"],
  ["8", "Full Truck"]
];

const dumpOptions = ["No Partner", "No Dump", "I Dumped", "Partner Dumped", "We Dumped"];

const locations = [
  {
    borough: "Manhattan",
    name: "Manhattan Boro",
    alias: "Manhattan Boro",
    precinct: "19",
    phone: "212-360-3520",
    address: "427 East 87th Street, New York, NY 10128",
    neighborhoods: ""
  },
  {
    borough: "Manhattan",
    name: "Manhattan 1",
    alias: "Manhattan West 1",
    precinct: "1",
    phone: "212-277-4101",
    address: "353 Spring Street, New York, NY",
    neighborhoods: "Battery Park City, Civic Center, South Street Seaport, Tribeca, Wall Street, World Trade Center"
  },
  {
    borough: "Manhattan",
    name: "Manhattan 2",
    alias: "Manhattan West 2",
    precinct: "",
    phone: "212-886-5367",
    address: "353 Spring Street, New York, NY",
    crossStreets: "West & Washington Sts",
    neighborhoods: ""
  },
  {
    borough: "Manhattan",
    name: "Manhattan 3",
    alias: "Manhattan East 3",
    precinct: "5, 7, 9",
    phone: "212-277-4203",
    address: "South Street Pier 36, New York, NY 10002",
    neighborhoods: "Chinatown, East Village, Lower East Side, NoHo, Two Bridges"
  },
  {
    borough: "Manhattan",
    name: "Manhattan 3A",
    alias: "Manhattan East 3A",
    precinct: "18",
    phone: "646-746-6760",
    address: "786 12th Ave, New York, NY 10019",
    neighborhoods: ""
  },
  {
    borough: "Manhattan",
    name: "Manhattan 4",
    alias: "Manhattan West 4",
    precinct: "10",
    phone: "212-277-4104",
    address: "650 West 57th Street, New York, NY 10019",
    neighborhoods: "Chelsea, Clinton, Hudson Yards"
  },
  {
    borough: "Manhattan",
    name: "Manhattan 5",
    alias: "Manhattan East 5",
    precinct: "10",
    phone: "212-277-4105",
    address: "353 Spring Street, New York, NY",
    neighborhoods: "Flatiron, Gramercy Park, Herald Square, Midtown, Midtown South, Murray Hill, Times Square, Union Square"
  },
  {
    borough: "Manhattan",
    name: "Manhattan 6",
    alias: "Manhattan East 6",
    precinct: "17",
    phone: "212-277-4206",
    address: "Pier 36, South Street, New York, New York 10002",
    neighborhoods: "Beekman Place, Gramercy Park, Murray Hill, Peter Cooper Village, Stuyvesant Town, Sutton Place, Tudor City, Turtle Bay"
  },
  {
    borough: "Manhattan",
    name: "Manhattan 7",
    alias: "Manhattan West 7",
    precinct: "20",
    phone: "212-277-4107",
    address: "650 West 57th Street, New York, NY 10019",
    neighborhoods: "Lincoln Square, Manhattan Valley, Upper West Side"
  },
  {
    borough: "Manhattan",
    name: "Manhattan 8",
    alias: "Manhattan East 8",
    precinct: "19",
    phone: "212-277-4208",
    address: "4036 9th Ave, New York, NY 10034",
    neighborhoods: "Carnegie Hill, Lenox Hill, Roosevelt Island, Upper East Side, Yorkville"
  },
  {
    borough: "Manhattan",
    name: "Manhattan 8A",
    alias: "Manhattan East 8A",
    precinct: "40",
    phone: "646-885-0994",
    address: "720 East 132 Street, Bronx, NY 10454",
    neighborhoods: ""
  },
  {
    borough: "Manhattan",
    name: "Manhattan 9",
    alias: "Manhattan West 9",
    precinct: "26",
    phone: "212-277-4209",
    address: "125 East 149th Street, Bronx, NY 10451",
    neighborhoods: "Hamilton Heights, Manhattanville, Morningside Heights, West Harlem"
  },
  {
    borough: "Manhattan",
    name: "Manhattan 10",
    alias: "Manhattan East 10",
    precinct: "28",
    phone: "212-277-4210",
    address: "110 East 131st Street, New York, NY 10037",
    neighborhoods: "Central Harlem"
  },
  {
    borough: "Manhattan",
    name: "Manhattan 11 (New Location)",
    alias: "Manhattan East 11",
    precinct: "25",
    phone: "212-277-4111",
    address: "2495 2nd Avenue, New York, NY 10035",
    neighborhoods: "East Harlem, Harlem"
  },
  {
    borough: "Manhattan",
    name: "Manhattan 11A (Old M11 Location)",
    alias: "Manhattan East 11A",
    precinct: "25",
    phone: "646-746-6770",
    address: "343 East 99th Street, New York, NY 10029",
    neighborhoods: "East Harlem, Harlem"
  },
  {
    borough: "Manhattan",
    name: "Manhattan 12",
    alias: "Manhattan West 12",
    precinct: "33, 34",
    phone: "212-277-4212",
    address: "301 West 215th Street, New York, NY 10034",
    neighborhoods: "Inwood, Washington Heights"
  },
  {
    borough: "Bronx",
    name: "Bronx Boro",
    alias: "Bronx Boro",
    precinct: "48",
    phone: "347-565-2033",
    address: "800 East 176th Street, Bronx, NY 10460",
    neighborhoods: "",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx 1",
    alias: "Bronx West 1",
    precinct: "40",
    phone: "212-277-4221",
    address: "680 East 132nd Street, Bronx, NY 10454",
    neighborhoods: "Melrose, Mott Haven, Port Morris",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx 2",
    alias: "Bronx West 2",
    precinct: "41",
    phone: "212-277-4222",
    address: "650 Casanova Street, Bronx, NY 10474",
    neighborhoods: "Hunts Point, Longwood",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx 3",
    alias: "Bronx West 3",
    precinct: "42",
    phone: "212-277-4223",
    address: "680 East 132nd Street, Bronx, NY 10454",
    neighborhoods: "Claremont, Crotona Park East, Melrose, Morrisania",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx 3A",
    alias: "Bronx West 3A",
    precinct: "48",
    phone: "347-535-8740",
    address: "720 East 132nd Street, Bronx, NY 10454",
    neighborhoods: "",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx 4",
    alias: "Bronx West 4",
    precinct: "44",
    phone: "212-277-4224",
    address: "720 East 132nd Street, Bronx, NY 10454",
    neighborhoods: "Concourse, Concourse Village, East Concourse, Highbridge, Mount Eden, West Concourse",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx 5",
    alias: "Bronx West 5",
    precinct: "46",
    phone: "212-277-4225",
    address: "1331 Cromwell Ave, Bronx, NY 10452",
    neighborhoods: "Fordham, Morris Heights, Mount Hope, University Heights",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx 6",
    alias: "Bronx East 6",
    precinct: "48",
    phone: "347-565-2049",
    address: "800 East 176th Street, Bronx, NY 10460",
    neighborhoods: "Bathgate, Belmont, Bronx Park South, East Tremont, West Farms",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx 6A",
    alias: "Bronx East 6A",
    precinct: "48",
    phone: "347-535-8750",
    address: "1787 West Farms Rd, Bronx, NY 10460",
    neighborhoods: "",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx 7",
    alias: "Bronx West 7",
    precinct: "52",
    phone: "212-277-4227",
    address: "2383 Blackrock Ave, Bronx, NY 10462",
    neighborhoods: "Bedford Park, Fordham, Kingsbridge Heights, Norwood, University Heights",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx 7/8A",
    alias: "Bronx West 7",
    precinct: "52",
    phone: "347-535-8760",
    address: "310 West 215th Street, New York, NY 10034",
    neighborhoods: "Bedford Park, Fordham, Kingsbridge Heights, Norwood, University Heights",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx 8",
    alias: "Bronx West 8",
    precinct: "50",
    phone: "212-277-4128",
    address: "800 East 176th Street, Bronx, NY 10460",
    neighborhoods: "Fieldston, Kingsbridge, Marble Hill (MN), North Riverdale, Riverdale, Spuyten Duyvil",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx 9",
    alias: "Bronx East 9",
    precinct: "43",
    phone: "212-277-4229",
    address: "850 Zerega Ave, Bronx, NY 10473",
    neighborhoods: "Bronx River, Castle Hill, Clason Point, Harding Park, Parkchester, Soundview, Soundview-Bruckner, Unionport",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx 10",
    alias: "Bronx East 10",
    precinct: "45",
    phone: "212-277-4230",
    address: "850 Zerega Ave, Bronx, NY 10473",
    neighborhoods: "City Island, Co-op City, Country Club, Edgewater Park, Pelham Bay, Schuylerville, Throgs Neck, Westchester Square",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx 11",
    alias: "Bronx East 11",
    precinct: "49",
    phone: "212-277-4231",
    address: "850 Zerega Ave, Bronx, NY 10473",
    neighborhoods: "Bronxdale, Indian Village, Allerton, Morris Park, Pelham Gardens, Pelham Parkway, Van Nest",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx 12",
    alias: "Bronx East 12",
    precinct: "47",
    phone: "212-277-4232",
    address: "1635 East 233rd Street, Bronx, NY 10475",
    neighborhoods: "Baychester, Eastchester, Edenwald, Olinville, Wakefield, Williamsbridge, Woodlawn",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx CTU",
    alias: "Bronx East",
    precinct: "41",
    phone: "718-328-3838",
    address: "1381 Randall Ave, Bronx, NY 10474",
    neighborhoods: "",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx Lots",
    alias: "Bronx East",
    precinct: "48",
    phone: "347-565-2065",
    address: "2 Farragut Street, Bronx, NY 10474",
    neighborhoods: "",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Bronx",
    name: "Bronx Squad (San Cop)",
    alias: "Bronx East",
    precinct: "",
    phone: "",
    address: "1635 East 233rd Street, Bronx, NY 10475",
    neighborhoods: "",
    sourceTag: "LOC-BRONX-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn North Boro",
    alias: "Brooklyn North Boro",
    precinct: "90/94",
    phone: "718-571-6425",
    address: "161 Varick Street, Brooklyn, NY 11237",
    neighborhoods: "",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn South Boro",
    alias: "Brooklyn South Boro",
    precinct: "62",
    phone: "718-714-2760",
    address: "1824 Shore Parkway, Brooklyn, NY 11214",
    neighborhoods: "",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 1",
    alias: "Brooklyn North 1",
    precinct: "90/94",
    phone: "718-571-6405",
    address: "161 Varick Avenue, Brooklyn, NY 11237",
    neighborhoods: "East Williamsburg, Greenpoint, Northside, Southside, Williamsburg",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 2",
    alias: "Brooklyn North 2",
    precinct: "88",
    phone: "212-277-4242",
    address: "465 Hamilton Ave, Brooklyn, NY 11232",
    neighborhoods: "Boerum Hill, Brooklyn Heights, Clinton Hill, Downtown Brooklyn, DUMBO, Fort Greene, Fulton Ferry, Navy Yard, Vinegar Hill",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 3",
    alias: "Brooklyn North 3",
    precinct: "81",
    phone: "718-685-7044",
    address: "559 Park Ave, Brooklyn, NY 11205",
    neighborhoods: "Bedford-Stuyvesant, Stuyvesant Heights, Tompkins Park North",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 4",
    alias: "Brooklyn North 4",
    precinct: "83",
    phone: "718-571-6415",
    address: "161 Varick Avenue, Brooklyn, NY 11237",
    neighborhoods: "Bushwick",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 5",
    alias: "Brooklyn North 5",
    precinct: "75",
    phone: "212-277-4245",
    address: "606 Milford Street, Brooklyn, NY 11208",
    neighborhoods: "Broadway Junction, City Line, Cypress Hills, East New York, Highland Park, New Lots, Spring Creek, Starrett City",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 6",
    alias: "Brooklyn South West 6",
    precinct: "78",
    phone: "212-277-4246",
    address: "127 2nd Ave, Brooklyn, NY 11215",
    neighborhoods: "Carroll Gardens, Cobble Hill, Columbia St, Gowanus, Park Slope, Red Hook",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 6A",
    alias: "Brooklyn South West 6A",
    precinct: "76",
    phone: "718-685-7490",
    address: "93 Van Brunt Street, Brooklyn, NY 11231",
    neighborhoods: "",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 7",
    alias: "Brooklyn South West 7",
    precinct: "72",
    phone: "212-277-4247",
    address: "5100 1st Ave, Brooklyn, NY 11232",
    neighborhoods: "Sunset Park, Windsor Terrace",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 8",
    alias: "Brooklyn North 8",
    precinct: "77",
    phone: "212-277-4248",
    address: "1755 Pacific Street, Brooklyn, NY 11213",
    neighborhoods: "Crown Heights, Prospect Heights, Weeksville",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 9",
    alias: "Brooklyn South East 9",
    precinct: "71",
    phone: "212-277-4249",
    address: "690 New York Ave, Brooklyn, NY 11225",
    neighborhoods: "Crown Heights South, Prospect Lefferts Gardens, Wingate",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 10",
    alias: "Brooklyn South West 10",
    precinct: "68",
    phone: "212-277-4250",
    address: "5100 1st Ave, Brooklyn, NY 11232",
    neighborhoods: "Bay Ridge, Dyker Heights, Fort Hamilton",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 11",
    alias: "Brooklyn South West 11",
    precinct: "62",
    phone: "718-714-2708",
    address: "1824 Shore Parkway, Brooklyn, NY 11214",
    neighborhoods: "Bath Beach, Bensonhurst, Gravesend, Mapleton",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 12",
    alias: "Brooklyn South West 12",
    precinct: "66",
    phone: "212-277-4252",
    address: "5602 19th Ave, Brooklyn, NY 11204",
    neighborhoods: "Borough Park, Kensington, Ocean Parkway",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 13",
    alias: "Brooklyn South East 13",
    precinct: "60",
    phone: "212-277-4253",
    address: "2012 Neptune Ave, Brooklyn, NY 11224",
    neighborhoods: "Brighton Beach, Coney Island, Gravesend, Homecrest, Sea Gate, West Brighton",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 14",
    alias: "Brooklyn South East 14",
    precinct: "70",
    phone: "212-277-4254",
    address: "1397 Ralph Ave, Brooklyn, NY 11236",
    neighborhoods: "Ditmas Park, Flatbush, Manhattan Terrace, Midwood, Ocean Parkway, Prospect Park South",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 15 - 49 St",
    alias: "Brooklyn South East 15 - 49 St",
    precinct: "61",
    phone: "718-685-7480",
    address: "1750 East 49th Street, Brooklyn, NY 11234",
    neighborhoods: "Gerritsen Beach, Gravesend, Homecrest, Kings Highway, Manhattan Beach, Plumb Beach, Sheepshead Bay",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 16",
    alias: "Brooklyn South East 16",
    precinct: "73",
    phone: "212-277-4256",
    address: "922 Georgia Ave, Brooklyn, NY 11207",
    neighborhoods: "Broadway Junction, Brownsville, Ocean Hill",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 17",
    alias: "Brooklyn South East 17",
    precinct: "67",
    phone: "646-885-0831",
    address: "10502 Ave D, Brooklyn, NY 11236",
    neighborhoods: "East Flatbush, Farragut, Flatbush, Northeast Flatbush, Remsen Village, Rugby, Erasmus",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn 18",
    alias: "Brooklyn South East 18",
    precinct: "69",
    phone: "212-277-4258",
    address: "10501 Foster Ave, Brooklyn, NY 11236",
    neighborhoods: "Bergen Beach, Canarsie, Flatlands, Georgetown, Marine Park, Mill Basin, Mill Island, Paerdegat Basin",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn Lots",
    alias: "Brooklyn North",
    precinct: "75",
    phone: "718-235-8412",
    address: "803 Forbell Street, Brooklyn, NY 11208",
    neighborhoods: "",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Brooklyn Squad HQ (San Cop)",
    alias: "Brooklyn South",
    precinct: "",
    phone: "718-714-2781",
    address: "1824 Shore Parkway, Brooklyn, NY 11214",
    neighborhoods: "",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Floyd Bennett Field",
    alias: "Brooklyn South",
    precinct: "",
    phone: "718-758-7977",
    address: "50 Aviation Rd, Brooklyn, NY 11234",
    neighborhoods: "",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "MTS Hamilton Ave.",
    alias: "Brooklyn South West",
    precinct: "88",
    phone: "718-840-5900",
    address: "500 Hamilton Avenue, Brooklyn, NY 11232",
    neighborhoods: "",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Brooklyn",
    name: "Nicholas Cioffe Boro Shop",
    alias: "Brooklyn South East",
    precinct: "67",
    phone: "718-649-8256",
    address: "106-01 Ave D, Brooklyn, NY 11236",
    neighborhoods: "",
    sourceTag: "LOC-BROOKLYN-DETAILS"
  },
  {
    borough: "Queens",
    name: "Queens 1",
    alias: "Queens West 1",
    garage: "Q W Garage 01",
    precinct: "",
    phone: "718-307-0431",
    address: "34-28 21st St, Queens, NY",
    crossStreets: "34th & 35th Aves",
    neighborhoods: ""
  },
  {
    borough: "Queens",
    name: "Queens 2",
    alias: "Queens West 2",
    garage: "Q W Garage 02",
    precinct: "",
    phone: "718-334-9070",
    address: "52-35 58th St, Queens, NY",
    crossStreets: "53rd Ave & 58th St",
    neighborhoods: ""
  },
  {
    borough: "Queens",
    name: "Queens 3",
    alias: "Queens West 3",
    garage: "Q W Garage 03",
    precinct: "",
    phone: "718-334-9058",
    address: "52-35 58th St, Queens, NY",
    crossStreets: "53rd Ave & 58th St",
    neighborhoods: "Alternate phone: 718-334-9074"
  },
  {
    borough: "Queens",
    name: "Queens 4",
    alias: "Queens West 4",
    garage: "Q W Garage 04",
    precinct: "",
    phone: "718-334-9061",
    address: "52-35 58th St, Queens, NY",
    crossStreets: "53rd Ave & 58th St",
    neighborhoods: "Alternate phone: 718-334-9077"
  },
  {
    borough: "Queens",
    name: "Queens 5",
    alias: "Queens West 5",
    garage: "Q W Garage 05",
    precinct: "",
    phone: "718-307-0511",
    address: "48-01 58th Rd, Queens, NY",
    crossStreets: "47th & 48th Sts",
    neighborhoods: "Alternate phone: 718-307-0512"
  },
  {
    borough: "Queens",
    name: "Queens 6",
    alias: "Queens West 6",
    garage: "Q W Garage 06",
    precinct: "",
    phone: "718-334-9419",
    address: "58-73 53rd Ave, Queens, NY",
    crossStreets: "53rd Ave & 58th St",
    neighborhoods: "Alternate phone: 718-334-9420"
  },
  {
    borough: "Queens",
    name: "Queens 7",
    alias: "Queens East 7",
    garage: "Q E Garage 07",
    precinct: "",
    phone: "718-746-2440",
    address: "120-15 31st Ave, Queens, NY",
    crossStreets: "College Point Blvd & 122nd St",
    neighborhoods: "Alternate phone: 718-746-2445"
  },
  {
    borough: "Queens",
    name: "Queens 8",
    alias: "Queens East 8",
    garage: "Q E Garage 08",
    precinct: "",
    phone: "718-307-0651",
    address: "130-23 150th Ave, Queens, NY",
    crossStreets: "130th & 131st Sts",
    neighborhoods: ""
  },
  {
    borough: "Queens",
    name: "Queens 9",
    alias: "Queens West 9",
    garage: "Q W Garage 09",
    precinct: "",
    phone: "718-307-0554",
    address: "132-05 Atlantic Ave, Queens, NY",
    crossStreets: "Van Wyck Expy & 132nd St",
    neighborhoods: ""
  },
  {
    borough: "Queens",
    name: "Queens 10",
    alias: "Queens East 10",
    garage: "Q E Garage 10",
    precinct: "",
    phone: "718-307-0671",
    address: "130-23 150th Ave, Queens, NY",
    crossStreets: "130th & 131st Sts",
    neighborhoods: ""
  },
  {
    borough: "Queens",
    name: "Queens 11",
    alias: "Queens East 11",
    garage: "Q E Garage 11",
    precinct: "",
    phone: "718-307-0691",
    address: "75-05 Winchester Blvd, Queens, NY",
    crossStreets: "Grand Central Pkwy & Winchester Blvd",
    neighborhoods: "Alternate phone: 212-277-4281"
  },
  {
    borough: "Queens",
    name: "Queens 12",
    alias: "Queens East 12",
    garage: "Q E Garage 12",
    precinct: "",
    phone: "718-307-0711",
    address: "130-23 150th Ave, Queens, NY",
    crossStreets: "130th & 131st Sts",
    neighborhoods: "Alternate phone: 212-277-4282"
  },
  {
    borough: "Queens",
    name: "Queens 13A",
    alias: "Queens East 13A",
    garage: "Q E Garage 13A",
    precinct: "",
    phone: "718-525-7810",
    address: "153-67 146th Ave, Queens, NY",
    crossStreets: "153rd Ln & 153rd Ct",
    neighborhoods: "Phone follows Queens East 13 contact list until confirmed. Alternate phone: 212-277-4283"
  },
  {
    borough: "Queens",
    name: "Queens 14",
    alias: "Queens East 14",
    garage: "Q E Garage 14",
    precinct: "",
    phone: "718-734-3711",
    address: "51-10 Almeda Ave, Queens, NY",
    crossStreets: "Almeda Ave & Barbados Dr",
    neighborhoods: "Alternate phone: 718-734-3707"
  },
  {
    borough: "Staten Island",
    name: "Staten Island 1",
    alias: "Staten Island 1",
    garage: "SI Garage 01",
    precinct: "",
    phone: "718-370-5496",
    address: "539 Jersey St, Staten Island, NY",
    crossStreets: "Victory Blvd & Brook St",
    neighborhoods: "Alternate phone: 718-370-5411"
  },
  {
    borough: "Staten Island",
    name: "Staten Island 2",
    alias: "Staten Island 2",
    garage: "SI Garage 02",
    precinct: "",
    phone: "718-370-5409",
    address: "2500 Richmond Ave, Staten Island, NY",
    crossStreets: "Opposite Staten Island Mall",
    neighborhoods: "Alternate phone: 718-370-5412"
  },
  {
    borough: "Staten Island",
    name: "Staten Island 3",
    alias: "Staten Island 3",
    garage: "SI Garage 03",
    precinct: "",
    phone: "718-370-5480",
    address: "1000 West Service Rd, Staten Island, NY",
    crossStreets: "Arthur Kill Rd & West Shore Pkwy (Route 440)",
    neighborhoods: "Alternate phone: 718-370-5482"
  }
];

const rules = [
  {
    title: "Chart means day off",
    body: "Confirmed. Calendar and payroll statuses treat chart as a day-off category."
  },
  {
    title: "Sunday automatic chart/day off",
    body: "Confirmed as default. Sunday work remains possible and should be tracked."
  },
  {
    title: "Officer chart cycle",
    body: "Known to repeat 1 through 6. The 2026 scanned-sheet F1-F6 mapping is encoded with Sundays skipped."
  },
  {
    title: "Sanitation worker charts",
    body: "Expected range is 1 through 25. The 2026 scanned-sheet matrix is encoded and generated through December."
  },
  {
    title: "A-day/B-day chart",
    body: "The 2026 scanned sheet places A/B markers on Wednesday and Saturday chart days. Future-year seed dates should come from scans."
  },
  {
    title: "Holiday on chart or vacation",
    body: "Confirmed as 8 hours in the books. Exact bank and display behavior still open."
  },
  {
    title: "Vacation weeks",
    body: "Calendar labels V1, V2, V3 and so on. Vacation selection depends on seniority."
  }
];

const scanImportCoverage = [
  ["January", "Imported"],
  ["February", "Imported"],
  ["March", "Imported"],
  ["April", "Imported"],
  ["May", "Imported"],
  ["June", "Imported"],
  ["July", "Imported"],
  ["August", "Imported"],
  ["September", "Imported"],
  ["October", "Imported"],
  ["November", "Imported"],
  ["December", "Imported"]
];

const chartAnalysisYear = 2026;

let state = loadState();
let activeVacationSlot = "";
let activeOptionControl = "";
const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  populateStaticControls();
  bindEvents();
  applyStateToControls();
  renderAll();
});

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const next = merge(defaultState, saved || {});
    if (!saved || saved.dataVersion !== defaultState.dataVersion) {
      next.dataVersion = defaultState.dataVersion;
      next.calendarYear = 2026;
      next.calendarMonth = 0;
      next.selectedDate = "2026-01-01";
      next.settings.year = 2026;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
    return next;
  } catch (error) {
    return structuredClone(defaultState);
  }
}

function merge(base, saved) {
  const output = structuredClone(base);
  Object.keys(saved).forEach((key) => {
    if (saved[key] && typeof saved[key] === "object" && !Array.isArray(saved[key])) {
      output[key] = merge(output[key] || {}, saved[key]);
    } else {
      output[key] = saved[key];
    }
  });
  return output;
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function cacheElements() {
  [
    "drawerToggle", "drawer", "scrim", "screenTitle", "screenSubtitle", "todayButton",
    "calendarGrid", "calendarHeading", "calendarMode", "prevMonth", "nextMonth",
    "entryDate", "entryDateLabel", "payrollForm", "entryLocation", "entryLocationButton",
    "entryLocationDisplay", "entryFunction", "entryFunctionButton", "entryFunctionDisplay",
    "entryFunctionIcons", "functionStatus", "shiftStart", "shiftStartButton",
    "shiftStartDisplay", "shiftEnd", "shiftEndButton", "shiftEndDisplay",
    "routeExtension", "truckMoney", "truckMoneyButton", "truckMoneyDisplay",
    "partner", "dumpStatus", "dumpStatusButton", "dumpStatusDisplay",
    "compGained", "compUsed", "holidayGained", "holidayUsed", "gains", "losses",
    "paidForWork", "note", "clearEntry", "boroughSelect", "locationList",
    "locationDetail", "settingYear", "chartType", "officerChart", "sanitationChart",
    "abChart", "saturdayChart", "homeDistrict", "moneyStorage", "saveSettings",
    "vacationGrid", "vacationPicker", "vacationPickerClose", "vacationOptionList",
    "optionPicker", "optionPickerTitle", "optionPickerList", "rulesList"
  ].forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function populateStaticControls() {
  fillSelect(els.entryLocation, locations.map((loc) => [loc.name, loc.name]));
  fillSelect(els.homeDistrict, locations.map((loc) => [loc.name, loc.name]));
  fillSelect(els.entryFunction, functionOptions.map((name) => [name, name]));
  fillSelect(els.truckMoney, truckOptions);
  fillSelect(els.dumpStatus, dumpOptions.map((name) => [name, name]));
  fillSelect(els.shiftStart, timeOptions());
  fillSelect(els.shiftEnd, timeOptions());
  fillSelect(els.settingYear, Array.from({ length: 15 }, (_, i) => {
    const year = 2025 + i;
    return [String(year), String(year)];
  }));
  fillSelect(els.officerChart, Array.from({ length: 6 }, (_, i) => [String(i + 1), `F${i + 1}`]));
  fillSelect(els.sanitationChart, Array.from({ length: 25 }, (_, i) => [String(i + 1), String(i + 1)]));
}

function fillSelect(select, pairs) {
  select.innerHTML = pairs.map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join("");
}

function bindEvents() {
  els.drawerToggle.addEventListener("click", openDrawer);
  els.scrim.addEventListener("click", closeDrawer);
  document.querySelectorAll("[data-screen]").forEach((button) => {
    button.addEventListener("click", () => setScreen(button.dataset.screen));
  });
  els.prevMonth.addEventListener("click", () => changeMonth(-1));
  els.nextMonth.addEventListener("click", () => changeMonth(1));
  els.todayButton.addEventListener("click", () => {
    const today = new Date();
    state.calendarYear = today.getFullYear();
    state.calendarMonth = today.getMonth();
    persist();
    renderCalendar();
  });
  els.entryDate.addEventListener("change", () => {
    state.selectedDate = els.entryDate.value;
    loadEntryIntoForm();
    if (state.activeScreen === "payroll") {
      els.screenSubtitle.textContent = formatLongDate(state.selectedDate);
    }
    persist();
  });
  els.shiftStart.addEventListener("change", () => {
    els.shiftEnd.value = addHoursToTime(els.shiftStart.value, 8);
    syncPayrollDisplays();
  });
  [
    els.entryLocation,
    els.entryFunction,
    els.shiftEnd,
    els.truckMoney,
    els.dumpStatus
  ].forEach((control) => {
    control.addEventListener("change", syncPayrollDisplays);
  });
  document.querySelectorAll("[data-picker-control]").forEach((button) => {
    button.addEventListener("click", () => openOptionPicker(button.dataset.pickerControl));
  });
  els.payrollForm.addEventListener("submit", savePayrollEntry);
  els.clearEntry.addEventListener("click", cancelPayrollEntry);
  els.boroughSelect.addEventListener("change", renderLocations);
  els.saveSettings.addEventListener("click", saveSettings);
  els.settingYear.addEventListener("change", renderSettings);
  els.vacationPickerClose.addEventListener("click", closeVacationPicker);
  els.vacationPicker.addEventListener("click", (event) => {
    if (event.target === els.vacationPicker) closeVacationPicker();
  });
  els.optionPicker.addEventListener("click", (event) => {
    if (event.target === els.optionPicker) closeOptionPicker();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!els.optionPicker.hidden) closeOptionPicker();
      if (!els.vacationPicker.hidden) closeVacationPicker();
    }
  });
}

function applyStateToControls() {
  els.entryDate.value = state.selectedDate;
  els.settingYear.value = String(state.settings.year);
  els.chartType.value = state.settings.chartType;
  els.officerChart.value = state.settings.officerChart;
  els.sanitationChart.value = state.settings.sanitationChart;
  els.abChart.value = state.settings.abChart;
  els.saturdayChart.checked = state.settings.saturdayChart;
  els.homeDistrict.value = state.settings.homeDistrict;
  els.moneyStorage.value = state.settings.moneyStorage;
}

function renderAll() {
  setScreen(state.activeScreen, { quiet: true });
  renderCalendar();
  renderLocations();
  renderSettings();
  renderRules();
  loadEntryIntoForm();
}

function setScreen(screen, options = {}) {
  state.activeScreen = screen;
  document.querySelectorAll(".screen").forEach((section) => section.classList.remove("active"));
  document.getElementById(`${screen}Screen`).classList.add("active");
  document.querySelector(".app-shell").classList.toggle("payroll-active", screen === "payroll");
  document.querySelectorAll("[data-screen]").forEach((button) => {
    button.classList.toggle("active", button.dataset.screen === screen);
  });
  const labels = {
    calendar: ["Calendar", "Charts, holidays, vacation weeks"],
    payroll: ["Payroll Entry", formatLongDate(state.selectedDate)],
    locations: ["Locations", state.settings.homeDistrict],
    settings: ["Settings", "Profile, charts, vacation"],
    rules: ["Charts / Holidays", "First rules focus"]
  };
  els.screenTitle.textContent = labels[screen][0];
  els.screenSubtitle.textContent = labels[screen][1];
  closeDrawer();
  if (screen === "rules") renderRules();
  if (!options.quiet) persist();
}

function openDrawer() {
  els.drawer.classList.add("open");
  els.scrim.classList.add("open");
}

function closeDrawer() {
  els.drawer.classList.remove("open");
  els.scrim.classList.remove("open");
}

function changeMonth(delta) {
  const date = new Date(state.calendarYear, state.calendarMonth + delta, 1);
  state.calendarYear = date.getFullYear();
  state.calendarMonth = date.getMonth();
  persist();
  renderCalendar();
}

function renderCalendar() {
  els.calendarHeading.textContent = `${monthNames[state.calendarMonth]} ${state.calendarYear}`;
  els.calendarMode.textContent = `${chartLabel()} | Sundays automatic`;
  const parts = weekdays.map((day) => `<div class="weekday">${day}</div>`);
  const first = new Date(state.calendarYear, state.calendarMonth, 1);
  const start = new Date(state.calendarYear, state.calendarMonth, 1 - first.getDay());
  for (let i = 0; i < 42; i += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    parts.push(renderDay(date));
  }
  els.calendarGrid.innerHTML = parts.join("");
  els.calendarGrid.querySelectorAll("[data-date]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedDate = button.dataset.date;
      els.entryDate.value = state.selectedDate;
      loadEntryIntoForm();
      setScreen("payroll");
    });
  });
}

function renderDay(date) {
  const key = toDateKey(date);
  const isCurrentMonth = date.getMonth() === state.calendarMonth;
  const isHoliday = Boolean(holidayByDate[key]);
  const isChart = isChartDay(date, key);
  const isAutomaticSunday = date.getDay() === 0;
  const sheet = sheetParts(date, key);
  const isVacation = Boolean(sheet.vacation);
  const entry = state.entries[key];
  const classes = ["day"];
  if (!isCurrentMonth) classes.push("muted");
  if (isHoliday) classes.push("holiday");
  if (isChart) classes.push("chart");
  if (isVacation) classes.push("vacation");
  const notes = [
    entry ? entry.functionName : "",
    holidayByDate[key],
    isChart ? "Your chart" : "",
    isAutomaticSunday ? "Auto off" : "",
    sheet.ab ? `A/B ${sheet.ab}` : "",
    ...(sampleCalendarNotes[key] || [])
  ].filter(Boolean);
  return `<div class="${classes.join(" ")}">
    <button type="button" data-date="${key}">
      <span class="date-row">
        <span class="officer-code">${escapeHtml(sheet.officer)}</span>
        <span class="date-number">${date.getDate()}</span>
        <span class="vacation-code">${escapeHtml(sheet.vacation)}</span>
      </span>
      <span class="sanitation-code">${escapeHtml(sheet.sanitation)}</span>
    </button>
    ${notes.slice(0, 4).map((note) => `<span class="tag ${entry && note === entry.functionName ? "entry" : ""}">${escapeHtml(note)}</span>`).join("")}
  </div>`;
}

function isChartDay(date, key) {
  const sheet = sheetParts(date, key);
  if (state.settings.chartType === "officer") return sheet.officer === state.settings.officerChart;
  if (state.settings.chartType === "sanitation") return hasSheetToken(sheet.sanitation, state.settings.sanitationChart);
  if (state.settings.chartType === "ab") return sheet.ab === state.settings.abChart;
  if (state.settings.chartType === "saturday") {
    return date.getDay() === 6;
  }
  return false;
}

function sheetParts(date, key) {
  if (paperCalendarFields[key]) {
    return {
      officer: paperCalendarFields[key].officer || "",
      sanitation: paperCalendarFields[key].sanitation || "",
      ab: paperCalendarFields[key].ab || "",
      vacation: paperCalendarFields[key].vacation || ""
    };
  }
  const tokens = (calendarSheetChartLines[key] || "").split("-").filter(Boolean);
  const officerToken = tokens.find((token) => /^F\d+$/.test(token)) || "";
  const abToken = tokens.find((token) => token === "A" || token === "B") || "";
  const sanitationTokens = tokens.filter((token) => /^\d+$/.test(token));
  const mondayVacation = date.getDay() === 1 ? vacationWeekStarts[key] || "" : "";
  return {
    officer: officerToken.replace("F", ""),
    sanitation: sanitationTokens.join("-"),
    ab: abToken,
    vacation: mondayVacation
  };
}

function hasSheetToken(line, token) {
  if (!line || !token) return false;
  return line.split("-").filter(Boolean).includes(String(token));
}

function chartLabel() {
  if (state.settings.chartType === "officer") return `Officer F${state.settings.officerChart}`;
  if (state.settings.chartType === "sanitation") return `Sanitation ${state.settings.sanitationChart}`;
  if (state.settings.chartType === "ab") return `${state.settings.abChart}-Day`;
  return "Saturday Chart";
}

function loadEntryIntoForm() {
  const entry = state.entries[state.selectedDate] || {};
  els.entryDate.value = state.selectedDate;
  els.entryDateLabel.textContent = formatLongDate(state.selectedDate);
  document.querySelectorAll("input[name='workStatus']").forEach((radio) => {
    radio.checked = radio.value === (entry.workStatus || "workedHoliday");
  });
  els.entryLocation.value = entry.location || state.settings.homeDistrict;
  els.entryFunction.value = entry.functionName || "Collection+1 Dump";
  els.shiftStart.value = entry.shiftStart || "2400";
  els.shiftEnd.value = entry.shiftEnd || "0800";
  els.routeExtension.checked = entry.routeExtension !== false;
  els.truckMoney.value = entry.truckMoney || "8";
  els.partner.value = entry.partner || "";
  els.dumpStatus.value = entry.dumpStatus || "We Dumped";
  els.compGained.value = entry.compGained ?? 0;
  els.compUsed.value = entry.compUsed ?? 0;
  els.holidayGained.value = entry.holidayGained ?? 0;
  els.holidayUsed.value = entry.holidayUsed ?? 0;
  els.gains.value = entry.gains ?? 0;
  els.losses.value = entry.losses ?? 0;
  els.paidForWork.checked = Boolean(entry.paidForWork);
  els.note.value = entry.note || "";
  syncPayrollDisplays();
}

function savePayrollEntry(event) {
  event.preventDefault();
  const workStatus = document.querySelector("input[name='workStatus']:checked").value;
  state.selectedDate = els.entryDate.value;
  state.entries[state.selectedDate] = {
    workStatus,
    location: els.entryLocation.value,
    functionName: els.entryFunction.value,
    shiftStart: els.shiftStart.value,
    shiftEnd: els.shiftEnd.value,
    routeExtension: els.routeExtension.checked,
    truckMoney: els.truckMoney.value,
    partner: els.partner.value.trim(),
    dumpStatus: els.dumpStatus.value,
    compGained: numberValue(els.compGained.value),
    compUsed: numberValue(els.compUsed.value),
    holidayGained: numberValue(els.holidayGained.value),
    holidayUsed: numberValue(els.holidayUsed.value),
    gains: numberValue(els.gains.value),
    losses: numberValue(els.losses.value),
    paidForWork: els.paidForWork.checked,
    note: els.note.value.trim(),
    moneyStorage: "both"
  };
  persist();
  renderCalendar();
  setScreen("calendar");
}

function cancelPayrollEntry() {
  loadEntryIntoForm();
  setScreen("calendar");
}

function renderFunctionStatus() {
  const name = els.entryFunction.value;
  if (paidFunctionHints.has(name)) {
    els.functionStatus.textContent = "Paid-function candidate. Store hours and dollars when exact contract rules are set.";
  } else {
    els.functionStatus.textContent = "No paid-function rule assigned yet.";
  }
}

function syncPayrollDisplays() {
  els.entryDateLabel.textContent = formatLongDate(els.entryDate.value || state.selectedDate);
  els.entryLocationDisplay.textContent = formatLocationDisplay(els.entryLocation.value);
  els.entryFunctionDisplay.textContent = els.entryFunction.value;
  els.entryFunctionIcons.innerHTML = functionIconHtml(els.entryFunction.value);
  els.shiftStartDisplay.textContent = els.shiftStart.value;
  els.shiftEndDisplay.textContent = els.shiftEnd.value;
  els.truckMoneyDisplay.textContent = formatTruckDisplay(els.truckMoney.value);
  els.dumpStatusDisplay.textContent = els.dumpStatus.value;
  renderFunctionStatus();
}

function openOptionPicker(controlId) {
  const control = els[controlId];
  if (!control) return;
  activeOptionControl = controlId;
  els.optionPickerTitle.textContent = optionPickerTitle(controlId);
  const options = Array.from(control.options);
  els.optionPickerList.innerHTML = options.map((option) => renderOptionButton(controlId, option)).join("");
  els.optionPickerList.querySelectorAll("[data-option-value]").forEach((button) => {
    button.addEventListener("click", () => {
      applyOptionPickerValue(button.dataset.optionValue);
    });
  });
  els.optionPicker.hidden = false;
  const selected = els.optionPickerList.querySelector(".selected");
  if (selected) selected.scrollIntoView({ block: "center" });
}

function closeOptionPicker() {
  els.optionPicker.hidden = true;
  activeOptionControl = "";
}

function applyOptionPickerValue(value) {
  const control = els[activeOptionControl];
  if (!control) return;
  control.value = value;
  if (activeOptionControl === "shiftStart") {
    els.shiftEnd.value = addHoursToTime(value, 8);
  }
  syncPayrollDisplays();
  closeOptionPicker();
}

function optionPickerTitle(controlId) {
  const titles = {
    entryLocation: "Location",
    entryFunction: "Function",
    shiftStart: "Shift Start",
    shiftEnd: "Shift End",
    truckMoney: "Truck Money",
    dumpStatus: "Dump"
  };
  return titles[controlId] || "Choose option";
}

function renderOptionButton(controlId, option) {
  const selected = option.selected ? " selected" : "";
  const value = option.value;
  const label = option.textContent;
  let main = label;
  let sub = "";
  let side = "";
  let icons = "";
  if (controlId === "entryLocation") {
    const loc = locationByName(value);
    main = value;
    sub = loc ? loc.alias : "";
    side = formatLocationDisplay(value);
  }
  if (controlId === "entryFunction") {
    icons = functionIconHtml(value);
  }
  return `
    <button class="option-button${selected}" type="button" data-option-value="${escapeHtml(value)}">
      <span class="option-main">${escapeHtml(main)}${sub ? `<span class="option-sub">${escapeHtml(sub)}</span>` : ""}</span>
      ${icons ? `<span class="option-icons" aria-hidden="true">${icons}</span>` : side ? `<span class="option-side">${escapeHtml(side)}</span>` : `<span></span>`}
    </button>
  `;
}

function renderLocations() {
  const borough = els.boroughSelect.value;
  const filtered = locations.filter((loc) => loc.borough === borough);
  if (!filtered.length) {
    els.locationList.innerHTML = `<div class="rule-row"><strong>${borough}</strong><span>Dataset pending.</span></div>`;
    els.locationDetail.innerHTML = "";
    return;
  }
  const selected = filtered.find((loc) => loc.name === state.selectedLocation) || filtered[0];
  state.selectedLocation = selected.name;
  els.locationList.innerHTML = filtered.map((loc) => `<button class="location-button ${loc.name === selected.name ? "active" : ""}" data-location="${escapeHtml(loc.name)}">
      <span><strong>${escapeHtml(loc.name)}</strong><small>${escapeHtml(loc.alias)}</small></span>
      <small>${escapeHtml(loc.precinct)}</small>
    </button>`).join("");
  els.locationList.querySelectorAll("[data-location]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedLocation = button.dataset.location;
      persist();
      renderLocations();
    });
  });
  renderLocationDetail(selected);
}

function renderLocationDetail(loc) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`;
  els.locationDetail.innerHTML = `
    <div class="detail-title">
      <h3>${escapeHtml(loc.name)}</h3>
      <span>${escapeHtml(loc.alias)}</span>
    </div>
    ${loc.precinct ? `<div class="detail-row"><small>Police Precinct</small><strong>${escapeHtml(loc.precinct)}</strong></div>` : ""}
    ${loc.phone ? `<div class="detail-row"><small>Phone</small><strong>${escapeHtml(loc.phone)}</strong></div>` : ""}
    ${loc.address ? `<div class="detail-row"><small>Address</small><strong>${escapeHtml(loc.address)}</strong></div>` : ""}
    ${loc.crossStreets ? `<div class="detail-row"><small>Cross Streets</small><strong>${escapeHtml(loc.crossStreets)}</strong></div>` : ""}
    ${loc.neighborhoods ? `<div class="detail-row"><small>Areas</small><strong>${escapeHtml(loc.neighborhoods)}</strong></div>` : ""}
    <div class="detail-actions">
      ${loc.phone ? `<a href="tel:${escapeHtml(loc.phone)}">Call</a>` : ""}
      <a href="${mapsUrl}" target="_blank" rel="noopener">Navigate</a>
    </div>
    <div class="map-preview" aria-label="Map preview"><span class="map-pin"></span></div>
  `;
}

function renderSettings() {
  const year = selectedSettingsYear();
  const options = buildVacationBatchOptions(year);
  const optionByCode = Object.fromEntries(options.map((option) => [option.code, option]));
  const rows = Object.keys(state.settings.vacationBatches).map((key) => {
    const slot = vacationSlotMeta(key);
    const normalized = normalizeVacationBatchValue(state.settings.vacationBatches[key], options);
    if (normalized !== state.settings.vacationBatches[key]) {
      state.settings.vacationBatches[key] = normalized;
    }
    const option = optionByCode[normalized];
    return `
      <div class="vacation-batch-row">
        <button class="vacation-board-tile vacation-pick-tile ${option ? "selected" : ""}" type="button" data-vacation-slot="${escapeHtml(key)}">
          <span>${escapeHtml(slot.vacLabel)}</span>
          <strong>${escapeHtml(option ? option.code : "")}</strong>
        </button>
        <div class="vacation-board-tile vacation-week-tile">
          <span>${escapeHtml(slot.weekLabel)}</span>
          <strong>${escapeHtml(slot.weekNumber)}</strong>
        </div>
        ${renderVacationDayTiles(option)}
      </div>
    `;
  }).join("");
  els.vacationGrid.innerHTML = `
    <div class="vacation-board-heading">Vacation Batches For ${escapeHtml(year)}</div>
    ${renderVacationDayHeaders()}
    ${rows}
  `;
  els.vacationGrid.querySelectorAll("[data-vacation-slot]").forEach((button) => {
    button.addEventListener("click", () => openVacationPicker(button.dataset.vacationSlot));
  });
}

function selectedSettingsYear() {
  return Number(els.settingYear.value) || state.settings.year || state.calendarYear;
}

function vacationSlotMeta(key) {
  const slots = {
    v1: { vacLabel: "VAC 1", weekLabel: "WEEK", weekNumber: "1" },
    v2: { vacLabel: "VAC 2", weekLabel: "WEEK", weekNumber: "2" },
    v3: { vacLabel: "VAC 3", weekLabel: "WEEK", weekNumber: "3" },
    v4: { vacLabel: "VAC 4", weekLabel: "WEEK", weekNumber: "4" },
    v5: { vacLabel: "VAC 5", weekLabel: "WEEK", weekNumber: "5" },
    extra1: { vacLabel: "VAC X", weekLabel: "EXTR", weekNumber: "A" },
    extra2: { vacLabel: "VAC X", weekLabel: "EXTR", weekNumber: "B" }
  };
  return slots[key] || { vacLabel: key.toUpperCase(), weekLabel: "WEEK", weekNumber: "" };
}

function renderVacationDayTiles(option) {
  const days = option ? option.days : Array.from({ length: 6 }, () => null);
  return days.map((date) => `
    <div class="vacation-board-tile vacation-day-tile">${date ? escapeHtml(formatVacationTileDate(date)) : ""}</div>
  `).join("");
}

function renderVacationDayHeaders() {
  const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return `
    <div class="vacation-day-header-row" aria-label="Vacation weekday headers">
      <span></span>
      <span></span>
      ${labels.map((label) => `<span class="vacation-day-header">${escapeHtml(label)}</span>`).join("")}
    </div>
  `;
}

function openVacationPicker(slotKey) {
  activeVacationSlot = slotKey;
  renderVacationPicker();
  els.vacationPicker.hidden = false;
  const selected = els.vacationOptionList.querySelector(".selected");
  if (selected) {
    selected.scrollIntoView({ block: "center" });
  }
}

function closeVacationPicker() {
  els.vacationPicker.hidden = true;
  activeVacationSlot = "";
}

function renderVacationPicker() {
  const year = selectedSettingsYear();
  const options = buildVacationBatchOptions(year);
  const selected = normalizeVacationBatchValue(state.settings.vacationBatches[activeVacationSlot], options);
  els.vacationOptionList.innerHTML = options.map((option) => `
    <button class="vacation-option ${option.code === selected ? "selected" : ""}" type="button" data-vacation-option="${escapeHtml(option.code)}">
      <span class="vacation-option-code">${escapeHtml(option.code)}</span>
      <span class="vacation-option-range">${escapeHtml(option.range)}</span>
    </button>
  `).join("");
  els.vacationOptionList.querySelectorAll("[data-vacation-option]").forEach((button) => {
    button.addEventListener("click", () => {
      if (activeVacationSlot) {
        state.settings.vacationBatches[activeVacationSlot] = button.dataset.vacationOption;
        persist();
      }
      closeVacationPicker();
      renderSettings();
    });
  });
}

function buildVacationBatchOptions(year) {
  const firstMonday = firstMondayOnOrAfterJanOne(year);
  const v1Start = new Date(firstMonday.getTime() - 7 * dayInMilliseconds);
  return Array.from({ length: 52 }, (_, index) => {
    const start = new Date(v1Start.getTime() + index * 7 * dayInMilliseconds);
    const end = new Date(start.getTime() + 5 * dayInMilliseconds);
    const days = Array.from({ length: 6 }, (_, dayIndex) => new Date(start.getTime() + dayIndex * dayInMilliseconds));
    return {
      code: `V${index + 1}`,
      range: formatVacationDateRange(start, end),
      days,
      startKey: toUtcDateKey(start),
      endKey: toUtcDateKey(end)
    };
  });
}

function firstMondayOnOrAfterJanOne(year) {
  const janOne = new Date(Date.UTC(year, 0, 1));
  const day = janOne.getUTCDay();
  const delta = (8 - day) % 7;
  return new Date(Date.UTC(year, 0, 1 + delta));
}

function normalizeVacationBatchValue(value, options) {
  const text = String(value || "").trim().toUpperCase();
  if (!text) return "";
  if (options.some((option) => option.code === text)) return text;
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    const option = options.find((item) => text >= item.startKey && text <= item.endKey);
    return option ? option.code : "";
  }
  return "";
}

function formatVacationDateRange(start, end) {
  return `${formatVacationDate(start)} To ${formatVacationDate(end)}`;
}

function formatVacationDate(date) {
  const names = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  return `${names[date.getUTCMonth()]} ${date.getUTCDate()}`;
}

function formatVacationTileDate(date) {
  return `${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

function toUtcDateKey(date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function saveSettings() {
  state.settings.year = Number(els.settingYear.value);
  state.settings.chartType = els.chartType.value;
  state.settings.officerChart = els.officerChart.value;
  state.settings.sanitationChart = els.sanitationChart.value;
  state.settings.abChart = els.abChart.value;
  state.settings.saturdayChart = els.saturdayChart.checked;
  state.settings.homeDistrict = els.homeDistrict.value;
  state.settings.moneyStorage = els.moneyStorage.value;
  const vacationOptions = buildVacationBatchOptions(state.settings.year);
  Object.keys(state.settings.vacationBatches).forEach((key) => {
    state.settings.vacationBatches[key] = normalizeVacationBatchValue(state.settings.vacationBatches[key], vacationOptions);
  });
  state.calendarYear = state.settings.year;
  persist();
  renderCalendar();
  renderSettings();
  setScreen("calendar");
}

function renderChartHolidayAnalyzer() {
  const activeTarget = currentChartTarget();
  const activeResult = analyzeChartHolidayPattern(chartAnalysisYear, activeTarget.type, activeTarget.value);
  return `
    <div class="rule-row analyzer-row">
      <div class="analyzer-head">
        <strong>${chartAnalysisYear} chart holiday analyzer</strong>
        <span>${escapeHtml(activeTarget.label)}</span>
      </div>
      <div class="metric-grid">
        ${renderMetric("Chart days", activeResult.chartDays)}
        ${renderMetric("Holiday hits", activeResult.holidayHits)}
        ${renderMetric("Before holiday", activeResult.beforeHoliday)}
        ${renderMetric("After holiday", activeResult.afterHoliday)}
      </div>
      <div class="analyzer-list">
        ${activeResult.details.length ? activeResult.details.map(renderAnalyzerDetail).join("") : `<div class="analyzer-empty">No holiday-adjacent chart days found for this chart.</div>`}
      </div>
      <div class="comparison-grid">
        ${renderComparisonSection("Sanitation charts", Array.from({ length: 25 }, (_, i) => ({
          type: "sanitation",
          value: String(i + 1),
          label: `San ${i + 1}`
        })), activeTarget)}
        ${renderComparisonSection("Officer charts", Array.from({ length: 6 }, (_, i) => ({
          type: "officer",
          value: String(i + 1),
          label: `F${i + 1}`
        })), activeTarget)}
        ${renderComparisonSection("Other charts", [
          { type: "ab", value: "A", label: "A-Day" },
          { type: "ab", value: "B", label: "B-Day" },
          { type: "saturday", value: "saturday", label: "Saturday" }
        ], activeTarget)}
      </div>
    </div>
  `;
}

function currentChartTarget() {
  if (state.settings.chartType === "officer") {
    return {
      type: "officer",
      value: state.settings.officerChart,
      label: `Active from Settings: Officer F${state.settings.officerChart}`
    };
  }
  if (state.settings.chartType === "sanitation") {
    return {
      type: "sanitation",
      value: state.settings.sanitationChart,
      label: `Active from Settings: Sanitation ${state.settings.sanitationChart}`
    };
  }
  if (state.settings.chartType === "ab") {
    return {
      type: "ab",
      value: state.settings.abChart,
      label: `Active from Settings: ${state.settings.abChart}-Day`
    };
  }
  return {
    type: "saturday",
    value: "saturday",
    label: "Active from Settings: Saturday Chart"
  };
}

function analyzeChartHolidayPattern(year, chartType, chartValue) {
  const result = {
    chartDays: 0,
    holidayHits: 0,
    beforeHoliday: 0,
    afterHoliday: 0,
    details: []
  };
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    const key = toDateKey(date);
    if (!matchesChartTarget(date, key, chartType, chartValue)) continue;
    result.chartDays += 1;
    const holiday = holidayByDate[key] || "";
    const nextHoliday = holidayByDate[toDateKey(addDays(date, 1))] || "";
    const previousHoliday = holidayByDate[toDateKey(addDays(date, -1))] || "";
    if (holiday) result.holidayHits += 1;
    if (nextHoliday) result.beforeHoliday += 1;
    if (previousHoliday) result.afterHoliday += 1;
    if (holiday || nextHoliday || previousHoliday) {
      result.details.push({
        key,
        date: new Date(date),
        relation: [
          holiday ? `Holiday hit: ${holiday}` : "",
          nextHoliday ? `Before: ${nextHoliday}` : "",
          previousHoliday ? `After: ${previousHoliday}` : ""
        ].filter(Boolean).join(" | "),
        sheet: sheetParts(date, key)
      });
    }
  }
  return result;
}

function matchesChartTarget(date, key, chartType, chartValue) {
  const sheet = sheetParts(date, key);
  if (chartType === "officer") return sheet.officer === String(chartValue);
  if (chartType === "sanitation") return hasSheetToken(sheet.sanitation, chartValue);
  if (chartType === "ab") return sheet.ab === chartValue;
  if (chartType === "saturday") return date.getDay() === 6;
  return false;
}

function renderMetric(label, value) {
  return `
    <div class="metric-tile">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}

function renderAnalyzerDetail(item) {
  const sheet = item.sheet;
  const sheetText = [
    sheet.officer ? `F${sheet.officer}` : "",
    sheet.sanitation || "",
    sheet.ab ? `A/B ${sheet.ab}` : "",
    sheet.vacation || ""
  ].filter(Boolean).join(" | ");
  return `
    <div class="analyzer-detail">
      <strong>${escapeHtml(formatShortDate(item.date))}</strong>
      <span>${escapeHtml(item.relation)}</span>
      <small>${escapeHtml(sheetText)}</small>
    </div>
  `;
}

function renderComparisonSection(title, items, activeTarget) {
  return `
    <div class="comparison-section">
      <h3>${escapeHtml(title)}</h3>
      <div class="comparison-list">
        ${items.map((item) => {
          const result = analyzeChartHolidayPattern(chartAnalysisYear, item.type, item.value);
          const isActive = item.type === activeTarget.type && item.value === activeTarget.value;
          return `
            <div class="comparison-line ${isActive ? "active" : ""}">
              <strong>${escapeHtml(item.label)}</strong>
              <span>H ${result.holidayHits}</span>
              <span>Pre ${result.beforeHoliday}</span>
              <span>Post ${result.afterHoliday}</span>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatShortDate(date) {
  return `${weekdays[date.getDay()]} ${monthNames[date.getMonth()]} ${date.getDate()}`;
}

function formatLongDate(value) {
  const parts = String(value || "").split("-");
  if (parts.length !== 3) return String(value || "");
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  if (!year || !month || !day) return String(value || "");
  return `${monthNames[month - 1]} ${day}, ${year}`;
}

function locationByName(name) {
  return locations.find((loc) => loc.name === name);
}

function formatLocationDisplay(name) {
  const match = /^(Manhattan|Bronx|Brooklyn|Queens|Staten Island) ([0-9]+[A-Z]?)/.exec(name || "");
  if (!match) return name || "";
  const prefixes = {
    Manhattan: "MN",
    Bronx: "BX",
    Brooklyn: "BK",
    Queens: "QN",
    "Staten Island": "SI"
  };
  const district = match[2].replace(/^([0-9])([A-Z]?)$/, "0$1$2");
  return `${prefixes[match[1]]}${district}`;
}

function formatTruckDisplay(value) {
  return value === "0" ? "No Truck" : String(value || "");
}

function functionIconHtml(name) {
  const icons = [];
  if (expandedFunctionHints.has(name)) icons.push(`<span class="menu-icon expand"></span>`);
  if (paidFunctionHints.has(name)) icons.push(`<span class="menu-icon truck"></span>`);
  return icons.join("");
}

function renderRules() {
  const coverage = `
    <div class="rule-row coverage-row">
      <strong>2026 scanned calendar import</strong>
      <div class="coverage-grid">
        ${scanImportCoverage.map(([month, status]) => `
          <span class="coverage-pill ${status === "Imported" ? "imported" : "pending"}">
            ${escapeHtml(month)} <b>${escapeHtml(status)}</b>
          </span>
        `).join("")}
      </div>
    </div>
  `;
  const analyzer = renderChartHolidayAnalyzer();
  const ruleRows = rules.map((rule) => `
    <div class="rule-row">
      <strong>${escapeHtml(rule.title)}</strong>
      <span>${escapeHtml(rule.body)}</span>
    </div>
  `).join("");
  els.rulesList.innerHTML = coverage + analyzer + ruleRows;
}

function timeOptions() {
  const output = [];
  for (let minutes = 0; minutes < 24 * 60; minutes += 15) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const value = `${String(hours).padStart(2, "0")}${String(mins).padStart(2, "0")}`;
    output.push([value === "0000" ? "2400" : value, value === "0000" ? "2400" : value]);
  }
  return output;
}

function addHoursToTime(value, hoursToAdd) {
  const normalized = value === "2400" ? "0000" : value;
  const hours = Number(normalized.slice(0, 2));
  const minutes = Number(normalized.slice(2));
  const total = (hours * 60 + minutes + hoursToAdd * 60) % (24 * 60);
  const nextHours = Math.floor(total / 60);
  const nextMinutes = total % 60;
  const result = `${String(nextHours).padStart(2, "0")}${String(nextMinutes).padStart(2, "0")}`;
  return result === "0000" ? "2400" : result;
}

function toDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function numberValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}
