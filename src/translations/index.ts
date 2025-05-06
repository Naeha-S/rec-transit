
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define the type for our translation dictionaries
export interface TranslationDictionary {
  home: string;
  allBuses: string;
  schedule: string;
  map: string;
  routeMap: string;
  buses: string;
  feedback: string;
  busLayout: string;
  otherBuses: string;
  examTimings: string;
  notifications: string;
  noNewNotifications: string;
  markAllAsRead: string;
  viewAllNotifications: string;
  settings: string;
  helpSupport: string;
  recTransitSystem: string;
  collegeRoute: string;
  searchByRouteOriginDestination: string;
  searchForYourBoardingPoint: string;
  loading: string;
  noServiceOnSunday: string;
  collegeClosedOnSundays: string;
  pickDate: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  status: string;
  busDetails: string;
  stops: string;
  arrivalTime: string;
  departureTime: string;
  travelTime: string;
  back: string;
  busRoutes: string;
  announcements: string;
  recentNotifications: string;
  quickStats: string;
  totalBuses: string;
  dailyStudents: string;
  totalStops: string;
  dailyTrips: string;
  seeAllRoutes: string;
  viewDetails: string;
  today: string;
  [key: string]: string; // Allow additional keys
}

export const translations: Record<string, TranslationDictionary> = {
  en: {
    home: "Home",
    allBuses: "All Buses",
    schedule: "Schedule",
    map: "Map",
    routeMap: "Route Map",
    buses: "Buses",
    feedback: "Feedback",
    busLayout: "Bus Layout",
    otherBuses: "Other Buses",
    examTimings: "Exam Timings",
    notifications: "Notifications",
    noNewNotifications: "No new notifications",
    markAllAsRead: "Mark all as read",
    viewAllNotifications: "View all notifications",
    settings: "Settings",
    helpSupport: "Help & Support",
    recTransitSystem: "REC Transit System",
    collegeRoute: "College Route",
    searchByRouteOriginDestination: "Search by route, origin or destination",
    searchForYourBoardingPoint: "Search for your boarding point",
    loading: "Loading",
    noServiceOnSunday: "No Service on Sunday",
    collegeClosedOnSundays: "College is closed on Sundays",
    pickDate: "Pick a date",
    origin: "Origin",
    destination: "Destination",
    departure: "Departure",
    arrival: "Arrival",
    status: "Status",
    busDetails: "Bus Details",
    stops: "Stops",
    arrivalTime: "Arrival Time",
    departureTime: "Departure Time",
    travelTime: "Travel Time",
    back: "Back",
    busRoutes: "Bus Routes",
    announcements: "Announcements",
    recentNotifications: "Recent Notifications",
    quickStats: "Quick Stats",
    totalBuses: "Total Buses",
    dailyStudents: "Daily Students",
    totalStops: "Total Stops",
    dailyTrips: "Daily Trips",
    seeAllRoutes: "See all routes",
    viewDetails: "View details",
    today: "Today",
  },
  ta: {
    home: "முகப்பு",
    allBuses: "அனைத்து பேருந்துகள்",
    schedule: "அட்டவணை",
    map: "வரைபடம்",
    routeMap: "பாதை வரைபடம்",
    buses: "பேருந்துகள்",
    feedback: "கருத்து",
    busLayout: "பேருந்து அமைப்பு",
    otherBuses: "பிற பேருந்துகள்",
    examTimings: "தேர்வு நேரங்கள்",
    notifications: "அறிவிப்புகள்",
    noNewNotifications: "புதிய அறிவிப்புகள் இல்லை",
    markAllAsRead: "அனைத்தையும் படித்ததாக குறி",
    viewAllNotifications: "அனைத்து அறிவிப்புகளையும் காண்க",
    settings: "அமைப்புகள்",
    helpSupport: "உதவி & ஆதரவு",
    recTransitSystem: "REC போக்குவரத்து அமைப்பு",
    collegeRoute: "கல்லூரி பாதை",
    searchByRouteOriginDestination: "பாதை, தொடக்கம் அல்லது முடிவு மூலம் தேட",
    searchForYourBoardingPoint: "உங்கள் ஏற்றும் இடத்தைத் தேடுங்கள்",
    loading: "ஏற்றுகிறது",
    noServiceOnSunday: "ஞாயிற்றுக்கிழமை சேவை இல்லை",
    collegeClosedOnSundays: "ஞாயிற்றுக்கிழமைகளில் கல்லூரி மூடப்பட்டுள்ளது",
    pickDate: "தேதியைத் தேர்ந்தெடுக்கவும்",
    origin: "தொடக்கம்",
    destination: "முடிவு",
    departure: "புறப்பாடு",
    arrival: "வருகை",
    status: "நிலை",
    busDetails: "பேருந்து விவரங்கள்",
    stops: "நிறுத்தங்கள்",
    arrivalTime: "வருகை நேரம்",
    departureTime: "புறப்பாடு நேரம்",
    travelTime: "பயண நேரம்",
    back: "பின்",
    busRoutes: "பேருந்து பாதைகள்",
    announcements: "அறிவிப்புகள்",
    recentNotifications: "சமீபத்திய அறிவிப்புகள்",
    quickStats: "விரைவு புள்ளிவிவரங்கள்",
    totalBuses: "மொத்த பேருந்துகள்",
    dailyStudents: "தினசரி மாணவர்கள்",
    totalStops: "மொத்த நிறுத்தங்கள்",
    dailyTrips: "தினசரி பயணங்கள்",
    seeAllRoutes: "அனைத்து பாதைகளையும் காண்க",
    viewDetails: "விவரங்களைக் காண்க",
    today: "இன்று",
  },
  hi: {
    home: "होम",
    allBuses: "सभी बसें",
    schedule: "शेड्यूल",
    map: "नक्शा",
    routeMap: "मार्ग नक्शा",
    buses: "बसें",
    feedback: "प्रतिक्रिया",
    busLayout: "बस लेआउट",
    otherBuses: "अन्य बसें",
    examTimings: "परीक्षा टाइमिंग",
    notifications: "सूचनाएं",
    noNewNotifications: "कोई नई सूचना नहीं",
    markAllAsRead: "सभी को पढ़ा हुआ मार्क करें",
    viewAllNotifications: "सभी सूचनाएं देखें",
    settings: "सेटिंग्स",
    helpSupport: "सहायता और समर्थन",
    recTransitSystem: "REC परिवहन प्रणाली",
    collegeRoute: "कॉलेज मार्ग",
    searchByRouteOriginDestination: "मार्ग, मूल या गंतव्य द्वारा खोजें",
    searchForYourBoardingPoint: "अपने चढ़ने के स्थान के लिए खोजें",
    loading: "लोड हो रहा है",
    noServiceOnSunday: "रविवार को कोई सेवा नहीं",
    collegeClosedOnSundays: "रविवार को कॉलेज बंद रहता है",
    pickDate: "तारीख चुनें",
    origin: "मूल",
    destination: "गंतव्य",
    departure: "प्रस्थान",
    arrival: "आगमन",
    status: "स्थिति",
    busDetails: "बस विवरण",
    stops: "स्टॉप",
    arrivalTime: "आगमन समय",
    departureTime: "प्रस्थान समय",
    travelTime: "यात्रा समय",
    back: "वापस",
    busRoutes: "बस मार्ग",
    announcements: "घोषणाएं",
    recentNotifications: "हाल की सूचनाएं",
    quickStats: "त्वरित आंकड़े",
    totalBuses: "कुल बसें",
    dailyStudents: "दैनिक छात्र",
    totalStops: "कुल स्टॉप",
    dailyTrips: "दैनिक यात्राएं",
    seeAllRoutes: "सभी मार्ग देखें",
    viewDetails: "विवरण देखें",
    today: "आज",
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translations.en },
      ta: { translation: translations.ta },
      hi: { translation: translations.hi }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
