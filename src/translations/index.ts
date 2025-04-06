
interface TranslationDictionary {
  [key: string]: string;
}

interface Translations {
  en: TranslationDictionary;
  ta: TranslationDictionary;
  hi: TranslationDictionary;
}

const translations: Translations = {
  en: {
    // General
    home: 'Home',
    routeMap: 'Route Map',
    allBuses: 'All Buses',
    busLayout: 'Bus Layout',
    notifications: 'Notifications',
    sendFeedback: 'Send Feedback',
    settings: 'Settings',
    helpSupport: 'Help & Support',
    logout: 'Logout',
    rajalakshmi: 'Rajalakshmi',
    transportSystem: 'Transport System',
    
    // Home page
    recTransitSystem: 'REC Transit System',
    findTrackBuses: 'Find and track college buses in real-time',
    quickStats: 'Quick Stats',
    viewAllBuses: 'View All Buses',
    interactiveMap: 'Interactive Map',
    viewBusLocations: 'View bus locations and routes in real-time',
    announcements: 'Announcements',
    recentUpdates: 'Recent updates and notices',
    
    // Quick stats
    totalBuses: 'Total Buses',
    currentStatus: 'Current Status',
    firstPickup: 'First Pickup',
    boardingPoints: 'Boarding Points',
    active: 'Active',
    
    // Notifications
    specialSchedule: 'Special Schedule Next Week',
    specialScheduleDesc: 'Due to exams, buses will follow a modified schedule',
    
    // Search
    searchBoardingPoint: 'Search for boarding point...',
    
    // Toast
    welcomeToast: 'Welcome to REC Transport System',
    welcomeToastDesc: 'Track college buses in real-time and manage your commute efficiently',
  },
  
  ta: {
    // General
    home: 'முகப்பு',
    routeMap: 'வழித்தட வரைபடம்',
    allBuses: 'அனைத்து பேருந்துகள்',
    busLayout: 'பேருந்து அமைப்பு',
    notifications: 'அறிவிப்புகள்',
    sendFeedback: 'கருத்து அனுப்ப',
    settings: 'அமைப்புகள்',
    helpSupport: 'உதவி & ஆதரவு',
    logout: 'வெளியேறு',
    rajalakshmi: 'ராஜலட்சுமி',
    transportSystem: 'போக்குவரத்து அமைப்பு',
    
    // Home page
    recTransitSystem: 'REC போக்குவரத்து அமைப்பு',
    findTrackBuses: 'கல்லூரி பேருந்துகளை நேரலையில் கண்டறிந்து கண்காணிக்கவும்',
    quickStats: 'விரைவு புள்ளிவிவரங்கள்',
    viewAllBuses: 'அனைத்து பேருந்துகளையும் காண்க',
    interactiveMap: 'ஊடாடும் வரைபடம்',
    viewBusLocations: 'பேருந்து இருப்பிடங்கள் மற்றும் வழித்தடங்களை நேரலையில் காண்க',
    announcements: 'அறிவிப்புகள்',
    recentUpdates: 'சமீபத்திய புதுப்பிப்புகள் மற்றும் அறிவிப்புகள்',
    
    // Quick stats
    totalBuses: 'மொத்த பேருந்துகள்',
    currentStatus: 'தற்போதைய நிலை',
    firstPickup: 'முதல் பிக்அப்',
    boardingPoints: 'ஏறும் இடங்கள்',
    active: 'செயலில்',
    
    // Notifications
    specialSchedule: 'அடுத்த வாரம் சிறப்பு அட்டவணை',
    specialScheduleDesc: 'தேர்வுகள் காரணமாக, பேருந்துகள் மாற்றப்பட்ட அட்டவணையைப் பின்பற்றும்',
    
    // Search
    searchBoardingPoint: 'ஏறும் இடத்தைத் தேடுங்கள்...',
    
    // Toast
    welcomeToast: 'REC போக்குவரத்து அமைப்புக்கு வரவேற்கிறோம்',
    welcomeToastDesc: 'கல்லூரி பேருந்துகளை நேரலையில் கண்காணித்து உங்கள் பயணத்தை திறமையாக நிர்வகிக்கவும்',
  },
  
  hi: {
    // General
    home: 'होम',
    routeMap: 'मार्ग नक्शा',
    allBuses: 'सभी बसें',
    busLayout: 'बस लेआउट',
    notifications: 'सूचनाएं',
    sendFeedback: 'प्रतिक्रिया भेजें',
    settings: 'सेटिंग्स',
    helpSupport: 'मदद और समर्थन',
    logout: 'लॉगआउट',
    rajalakshmi: 'राजलक्ष्मी',
    transportSystem: 'परिवहन प्रणाली',
    
    // Home page
    recTransitSystem: 'REC परिवहन प्रणाली',
    findTrackBuses: 'वास्तविक समय में कॉलेज बसों का पता लगाएं और ट्रैक करें',
    quickStats: 'त्वरित आंकड़े',
    viewAllBuses: 'सभी बसें देखें',
    interactiveMap: 'इंटरैक्टिव मैप',
    viewBusLocations: 'वास्तविक समय में बस स्थान और मार्ग देखें',
    announcements: 'घोषणाएँ',
    recentUpdates: 'हाल के अपडेट और नोटिस',
    
    // Quick stats
    totalBuses: 'कुल बसें',
    currentStatus: 'वर्तमान स्थिति',
    firstPickup: 'पहला पिकअप',
    boardingPoints: 'बोर्डिंग पॉइंट्स',
    active: 'सक्रिय',
    
    // Notifications
    specialSchedule: 'अगले सप्ताह विशेष शेड्यूल',
    specialScheduleDesc: 'परीक्षाओं के कारण, बसें एक संशोधित कार्यक्रम का पालन करेंगी',
    
    // Search
    searchBoardingPoint: 'बोर्डिंग पॉइंट खोजें...',
    
    // Toast
    welcomeToast: 'REC परिवहन प्रणाली में आपका स्वागत है',
    welcomeToastDesc: 'वास्तविक समय में कॉलेज बसों को ट्रैक करें और अपनी यात्रा को कुशलतापूर्वक प्रबंधित करें',
  }
};

export default translations;
