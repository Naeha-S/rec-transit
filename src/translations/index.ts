import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export type TranslationDictionary = {
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
  error: string;
  findYourBus: string;
  trackBuses: string;
  checkBusSchedule: string;
  interactiveMap: string;
  searchNearbyStops: string;
  specialSchedules: string;
  // Holiday strings
  holidayMode: string;
  declareHoliday: string;
  holidayDate: string;
  holidayReason: string;
  enterReasonForHoliday: string;
  holidayAnnouncement: string;
  holidayDeclared: string;
  holidayAnnouncedToUsers: string;
  noServiceOn: string;
  holidayCancelled: string;
  normalServiceResumed: string;
  busesDisabledDueToHoliday: string;
  examBusesDisabledDueToHoliday: string;
  holidayActive: string;
  manageHoliday: string;
  holidayInformation: string;
  date: string;
  reason: string;
  cancelHoliday: string;
  holidayEffects: string;
  whatHappensWhenHolidayDeclared: string;
  // Welcome toast
  "Welcome to REC Transit System": string;
  welcomeToast: string;
  welcomeToastDesc: string;
  // Feedback strings
  feedbackSubmitted: string;
  thanksForFeedback: string;
  errorSendingFeedback: string;
  sendFeedback: string;
  reportIssuesOrSuggest: string;
  name: string;
  yourName: string;
  email: string;
  yourEmail: string;
  busNumber: string;
  exampleBusNumber: string;
  feedbackType: string;
  selectType: string;
  reportIssue: string;
  suggestion: string;
  complaint: string;
  praise: string;
  message: string;
  describeFeedback: string;
  submitting: string;
  submitFeedback: string;
  // Admin panel strings
  sendNewNotifications: string;
  notificationTitle: string;
  notificationMessage: string;
  sendNotification: string;
  notificationAdded: string;
  notificationAddedDesc: string;
  announcementAdded: string;
  announcementAddedDesc: string;
  announcementDeleted: string;
  information: string;
  delay: string;
  alert: string;
  type: string;
  fillAllFields: string;
  specialBusSchedulesDuringExams: string;
  examPeriodNotice: string;
  examBusScheduleInfo: string;
  keyLocations: string;
  [key: string]: string;
};

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
        searchForYourBoardingPoint: "Search for your bus or boarding point",
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
        error: "Error",
        findYourBus: "Find Your Bus",
        trackBuses: "Track Buses",
        checkBusSchedule: "Check Bus Schedule",
        interactiveMap: "Interactive Map",
        searchNearbyStops: "Search Nearby Stops",
        specialSchedules: "Special Schedules",
        // Welcome toast
        "Welcome to REC Transit System": "Welcome to REC Transit System",
        welcomeToast: "Welcome to REC Transit System",
        welcomeToastDesc: "Find bus routes, schedules and real-time updates for REC campus transportation.",
        // Holiday strings
        holidayMode: "Holiday Mode",
        declareHoliday: "Declare Holiday",
        holidayDate: "Holiday Date",
        holidayReason: "Holiday Reason",
        enterReasonForHoliday: "Enter reason for holiday",
        holidayAnnouncement: "Holiday Announcement",
        holidayDeclared: "Holiday Declared",
        holidayAnnouncedToUsers: "Holiday has been announced to all users",
        noServiceOn: "No service on",
        holidayCancelled: "Holiday Cancelled",
        normalServiceResumed: "Normal service has resumed",
        busesDisabledDueToHoliday: "Buses are disabled due to holiday",
        examBusesDisabledDueToHoliday: "Exam buses are disabled due to holiday",
        holidayActive: "Holiday Active",
        manageHoliday: "Manage Holiday",
        holidayInformation: "Holiday Information",
        date: "Date",
        reason: "Reason",
        cancelHoliday: "Cancel Holiday",
        holidayEffects: "Holiday Effects",
        whatHappensWhenHolidayDeclared: "What happens when a holiday is declared",
        // Feedback strings
        feedbackSubmitted: "Feedback Submitted",
        thanksForFeedback: "Thank you for your feedback! We'll review it soon.",
        errorSendingFeedback: "There was an error sending your feedback. Please try again.",
        sendFeedback: "Send Feedback",
        reportIssuesOrSuggest: "Report issues or suggest improvements for our transit system",
        name: "Name",
        yourName: "Your name",
        email: "Email",
        yourEmail: "your.email@example.com",
        busNumber: "Bus Number",
        exampleBusNumber: "e.g. 15A",
        feedbackType: "Feedback Type",
        selectType: "Select type",
        reportIssue: "Report an Issue",
        suggestion: "Suggestion",
        complaint: "Complaint",
        praise: "Praise",
        message: "Message",
        describeFeedback: "Please describe your feedback in detail...",
        submitting: "Submitting...",
        submitFeedback: "Submit Feedback",
        // Admin panel strings
        sendNewNotifications: "Send New Notifications",
        notificationTitle: "Notification Title",
        notificationMessage: "Notification Message",
        sendNotification: "Send Notification",
        notificationAdded: "Notification Added",
        notificationAddedDesc: "Your notification has been sent to all users",
        announcementAdded: "Announcement Added",
        announcementAddedDesc: "Your announcement has been published",
        announcementDeleted: "Announcement deleted",
        information: "Information",
        delay: "Delay",
        alert: "Alert",
        type: "Type",
        fillAllFields: "Please fill in all fields",
        specialBusSchedulesDuringExams: "Special bus schedules during examination periods",
        examPeriodNotice: "Exam Period Notice",
        examBusScheduleInfo: "These buses run only during exam periods and follow different timings from regular buses",
        keyLocations: "Key Locations"
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
        recTransitSystem: "REC போக்���ுவரத்து அமைப்பு",
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
        error: "பிழை",
        findYourBus: "உங்கள் பேருந்தைக் கண்டறியுங்கள்",
        trackBuses: "பேருந்துகளைக் கண்காணிக்கவும்",
        checkBusSchedule: "பேருந்து அட்டவணையை சரிபார்க்கவும்",
        interactiveMap: "ஊடாடும் வரைபடம்",
        searchNearbyStops: "அருகிலுள்ள நிறுத்தங்களைத் தேடுங்கள்",
        specialSchedules: "சிறப்பு அட்டவணைகள்",
        // Holiday strings
        holidayMode: "விடுமு���ை பயன்முறை",
        declareHoliday: "விடுமுறை அறிவிக்க",
        holidayDate: "விடுமுறை தேதி",
        holidayReason: "விடுமுறைக்கான காரணம்",
        enterReasonForHoliday: "விடுமுறைக்கான காரணத்தை உள்ளிடவும்",
        holidayAnnouncement: "விடுமுறை அறிவிப்பு",
        holidayDeclared: "விடுமுறை அறிவிக்கப்பட்டது",
        holidayAnnouncedToUsers: "விடுமுறை அனைத்து பயனர்களுக்கும் அறிவிக்கப்பட்டது",
        noServiceOn: "சேவை இல்லை",
        holidayCancelled: "விடுமுறை ரத்து செய்யப்பட்டது",
        normalServiceResumed: "வழக்கமான சேவை மீண்டும் தொடங்கியது",
        busesDisabledDueToHoliday: "விடுமுறை காரணமாக பேருந்துகள் முடக்கப்பட்டுள்ளன",
        examBusesDisabledDueToHoliday: "விடுமுறை காரணமாக தேர்வு பேருந்துகள் முடக்கப்பட்டுள்ளன",
        holidayActive: "விடுமுறை செயலில் உள்ளது",
        manageHoliday: "விடுமுறையை நிர்வகிக்க",
        holidayInformation: "விடுமுறை தகவல்",
        date: "தேதி",
        reason: "காரணம்",
        cancelHoliday: "விடுமுறையை ரத்து செய்க",
        holidayEffects: "விடுமுறையின் விளைவுகள்",
        whatHappensWhenHolidayDeclared: "விடுமுறை அறிவிக்கப்படும்போது என்ன நடக்கிறது",
        // New translations needed for feedback form, admin, etc.
        // We'll add basic values for now
        feedbackSubmitted: "கருத்து சமர்ப்பிக்கப்பட்டது",
        thanksForFeedback: "உங்கள் கருத்துக்கு நன்றி!",
        // Other translations would be added here
        specialBusSchedulesDuringExams: "தேர்வு காலங்களில் சிறப்பு பேருந்து அட்டவணைகள்",
        examPeriodNotice: "தேர்வு காலம் அறிவிப்பு",
        keyLocations: "முக்கிய இடங்கள்"
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
        error: "त्रुटि",
        findYourBus: "अपनी बस ढूंढें",
        trackBuses: "बसों को ट्रैक करें",
        checkBusSchedule: "बस शेड्यूल देखें",
        interactiveMap: "इंटरैक्टिव मैप",
        searchNearbyStops: "पास के स्टॉप खोजें",
        specialSchedules: "विशेष शेड्यूल",
        // Holiday strings
        holidayMode: "छुट्टी मोड",
        declareHoliday: "छुट्टी घोषित करें",
        holidayDate: "छुट्टी की तारीख",
        holidayReason: "छुट्टी का कारण",
        enterReasonForHoliday: "छुट्टी के लिए कारण दर्ज करें",
        holidayAnnouncement: "छुट्टी की घोषणा",
        holidayDeclared: "छुट्टी घोषित की गई",
        holidayAnnouncedToUsers: "छुट्टी सभी उपयोगकर्ताओं को घोषित की गई है",
        noServiceOn: "सेवा उपलब्ध नहीं है",
        holidayCancelled: "छुट्टी रद्द कर दी गई है",
        normalServiceResumed: "सामान्य सेवा फिर से शुरू हो गई है",
        busesDisabledDueToHoliday: "छुट्टी के कारण बसें अक्षम हैं",
        examBusesDisabledDueToHoliday: "छुट्टी के कारण परीक्षा बसें अक्षम हैं",
        holidayActive: "छुट्टी सक्रिय है",
        manageHoliday: "छुट्टी प्रबंधित करें",
        holidayInformation: "छुट्टी की जानकारी",
        date: "तारीख",
        reason: "कारण",
        cancelHoliday: "छुट्टी रद्द करें",
        holidayEffects: "छुट्टी के प्रभाव",
        whatHappensWhenHolidayDeclared: "जब छुट्टी घोषित की जाती है तो क्या होता है",
        // New translations needed for feedback form, admin, etc.
        // We'll add basic values for now
        feedbackSubmitted: "प्रतिक्रिया सबमिट की गई",
        thanksForFeedback: "आपकी प्रतिक्रिया के लिए धन्यवाद!",
        // Other translations would be added here
        specialBusSchedulesDuringExams: "परीक्षा अवधि के दौरान विशेष बस शेड्यूल",
        examPeriodNotice: "परीक्षा अवधि की सूचना",
        keyLocations: "प्रमुख स्थान"
    }
};

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: translations.en
        },
        ta: {
            translation: translations.ta
        },
        hi: {
            translation: translations.hi
        }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
