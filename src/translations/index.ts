
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
    
    // Help & Support
    about: 'About This Project',
    aboutProjectDescription: 'REC Transport System is a comprehensive platform designed to help students and staff track college buses in real-time, view schedules, and plan their commutes efficiently.',
    version: 'Version',
    author: 'Author',
    frequentlyAskedQuestions: 'Frequently Asked Questions',
    contactUs: 'Contact Us',
    email: 'Email',
    phone: 'Phone',
    helpdesk: 'Helpdesk',
    helpdeskTiming: 'Mon-Fri, 9:00 AM - 5:00 PM',
    
    // FAQs
    faq1: 'How do I track a specific bus?',
    faq1Answer: 'You can track a specific bus by going to the Route Map page and searching for the bus number or route. The map will show you the real-time location of the bus.',
    faq2: 'What do I do if my bus is delayed?',
    faq2Answer: 'If your bus is delayed, you can check the notifications section for any announcements. You can also contact the helpdesk for assistance.',
    faq3: 'How accurate is the real-time tracking?',
    faq3Answer: 'Our tracking system updates every 30 seconds, providing you with accurate real-time information about bus locations.',
    faq4: 'Can I receive notifications when my bus is approaching?',
    faq4Answer: 'Yes, you can set up notifications for specific buses. Go to the Settings page and enable notifications for your favorite routes.',
    faq5: 'How do I report an issue with the app?',
    faq5Answer: 'You can report issues through the Send Feedback page. Our team will review your feedback and address the issue as soon as possible.',
    
    // Admin
    adminAccess: 'Admin Access',
    adminLogin: 'Admin Login',
    adminAuthentication: 'Admin Authentication',
    adminAuthenticationDesc: 'Enter the administrator password to access the admin dashboard',
    enterPassword: 'Enter password',
    invalidPassword: 'Invalid password',
    login: 'Login',
    adminAccessGranted: 'Admin Access Granted',
    adminAccessGrantedDesc: 'You now have access to the admin dashboard',
    adminAccessDenied: 'Admin Access Denied',
    adminAccessDeniedDesc: 'The password you entered is incorrect',
    
    // Admin Dashboard
    adminDashboard: 'Admin Dashboard',
    overview: 'Overview',
    manageBuses: 'Manage Buses',
    upload: 'Upload',
    websiteTraffic: 'Website Traffic',
    last7Days: 'Last 7 days',
    visits: 'visits',
    recentActivity: 'Recent Activity',
    latestSystemActivities: 'Latest system activities',
    editBusInformation: 'Edit bus information',
    busNumber: 'Bus Number',
    busRoute: 'Bus Route',
    busStopName: 'Bus Stop Name',
    timing: 'Timing',
    location: 'Location',
    actions: 'Actions',
    edit: 'Edit',
    cancel: 'Cancel',
    saveChanges: 'Save Changes',
    loading: 'Loading',
    activeUsers: 'Active Users',
    totalRoutes: 'Total Routes',
    busStops: 'Bus Stops',
    
    // Upload
    uploadBusData: 'Upload Bus Data',
    bulkUpdateBusInformation: 'Bulk update bus information',
    dragAndDropFiles: 'Drag and drop files here',
    supportedFormats: 'Supported formats',
    browseFiles: 'Browse Files',
    instructions: 'Instructions',
    uploadInstructions1: 'File must be in CSV or Excel format',
    uploadInstructions2: 'First row must contain column headers',
    uploadInstructions3: 'Required columns: Bus Number, Bus Route, Bus Stop Name, Timing, Location',
    uploadInstructions4: 'Maximum file size: 10MB',
    fileUploaded: 'File Uploaded',
    processingFile: 'Processing your file...',
    uploadComplete: 'Upload Complete',
    dataUpdatedSuccessfully: 'Bus data has been updated successfully',
    errorProcessingFile: 'Error Processing File',
    
    // Error messages
    unauthorizedAccess: 'Unauthorized Access',
    adminOnlyPage: 'This page is only accessible to administrators',
    errorFetchingData: 'Error Fetching Data',
    errorUpdatingData: 'Error Updating Data',
    updateSuccessful: 'Update Successful',
    busDataUpdated: 'Bus data has been updated successfully',
    loggedOut: 'Logged Out',
    adminSessionEnded: 'Your admin session has ended',
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
    
    // Help & Support
    about: 'இந்த திட்டத்தைப் பற்றி',
    aboutProjectDescription: 'REC போக்குவரத்து அமைப்பு என்பது மாணவர்கள் மற்றும் ஊழியர்கள் கல்லூரி பேருந்துகளை நேரலையில் கண்காணிக்க, அட்டவணைகளைப் பார்க்க மற்றும் தங்கள் பயணங்களை திறமையாக திட்டமிட உதவும் ஒரு விரிவான தளமாகும்.',
    version: 'பதிப்பு',
    author: 'ஆசிரியர்',
    frequentlyAskedQuestions: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    contactUs: 'எங்களை தொடர்பு கொள்ள',
    email: 'மின்னஞ்சல்',
    phone: 'தொலைபேசி',
    helpdesk: 'உதவி மையம்',
    helpdeskTiming: 'திங்கள்-வெள்ளி, காலை 9:00 - மாலை 5:00',
    
    // FAQs
    faq1: 'ஒரு குறிப்பிட்ட பேருந்தை எவ்வாறு கண்காணிப்பது?',
    faq1Answer: 'வழித்தட வரைபடம் பக்கத்திற்குச் சென்று பேருந்து எண் அல்லது வழித்தடத்தைத் தேடுவதன் மூலம் ஒரு குறிப்பிட்ட பேருந்தைக் கண்காணிக்கலாம். வரைபடம் பேருந்தின் நேரடி இருப்பிடத்தைக் காட்டும்.',
    faq2: 'எனது பேருந்து தாமதமாகினால் நான் என்ன செய்வது?',
    faq2Answer: 'உங்கள் பேருந்து தாமதமாகினால், ஏதேனும் அறிவிப்புகளுக்கு அறிவிப்புகள் பிரிவைச் சரிபார்க்கலாம். உதவிக்கு உதவி மையத்தையும் தொடர்பு கொள்ளலாம்.',
    faq3: 'நேரடி கண்காணிப்பு எவ்வளவு துல்லியமானது?',
    faq3Answer: 'எங்கள் கண்காணிப்பு அமைப்பு ஒவ்வொரு 30 வினாடிகளுக்கும் புதுப்பிக்கப்படுகிறது, பேருந்து இருப்பிடங்கள் பற்றிய துல்லியமான நேரடித் தகவலை உங்களுக்கு வழங்குகிறது.',
    faq4: 'எனது பேருந்து வரும்போது அறிவிப்புகளைப் பெற முடியுமா?',
    faq4Answer: 'ஆம், குறிப்பிட்ட பேருந்துகளுக்கான அறிவிப்புகளை அமைக்கலாம். அமைப்புகள் பக்கத்திற்குச் சென்று உங்களுக்குப் பிடித்த வழிகளுக்கான அறிவிப்புகளை இயக்கவும்.',
    faq5: 'பயன்பாட்டில் ஏற்படும் சிக்கலை எவ்வாறு புகாரளிப்பது?',
    faq5Answer: 'கருத்து அனுப்ப பக்கம் மூலம் சிக்கல்களைப் புகாரளிக்கலாம். எங்கள் குழு உங்கள் கருத்துகளை மதிப்பாய்வு செய்து, சிக்கலை விரைவில் தீர்க்கும்.',
    
    // Admin
    adminAccess: 'நிர்வாக அணுகல்',
    adminLogin: 'நிர்வாகி உள்நுழைவு',
    adminAuthentication: 'நிர்வாகி அங்கீகாரம்',
    adminAuthenticationDesc: 'நிர்வாக டாஷ்போர்டை அணுக நிர்வாகி கடவுச்சொல்லை உள்ளிடவும்',
    enterPassword: 'கடவுச்சொல்லை உள்ளிடவும்',
    invalidPassword: 'தவறான கடவுச்சொல்',
    login: 'உள்நுழைக',
    adminAccessGranted: 'நிர்வாக அணுகல் வழங்கப்பட்டது',
    adminAccessGrantedDesc: 'இப்போது உங்களுக்கு நிர்வாக டாஷ்போர்டுக்கான அணுகல் உள்ளது',
    adminAccessDenied: 'நிர்வாக அணுகல் மறுக்கப்பட்டது',
    adminAccessDeniedDesc: 'நீங்கள் உள்ளிட்ட கடவுச்சொல் தவறானது',
    
    // Admin Dashboard
    adminDashboard: 'நிர்வாக டாஷ்போர்டு',
    overview: 'கண்ணோட்டம்',
    manageBuses: 'பேருந்துகளை நிர்வகிக்கவும்',
    upload: 'பதிவேற்றம்',
    websiteTraffic: 'இணையதள போக்குவரத்து',
    last7Days: 'கடந்த 7 நாட்கள்',
    visits: 'வருகைகள்',
    recentActivity: 'சமீபத்திய செயல்பாடு',
    latestSystemActivities: 'சமீபத்திய அமைப்பு செயல்பாடுகள்',
    editBusInformation: 'பேருந்து தகவலைத் திருத்தவும்',
    busNumber: 'பேருந்து எண்',
    busRoute: 'பேருந்து வழி',
    busStopName: 'பேருந்து நிறுத்தம் பெயர்',
    timing: 'நேரம்',
    location: 'இருப்பிடம்',
    actions: 'செயல்கள்',
    edit: 'திருத்து',
    cancel: 'ரத்து செய்',
    saveChanges: 'மாற்றங்களை சேமி',
    loading: 'ஏற்றுகிறது',
    activeUsers: 'செயலில் உள்ள பயனர்கள்',
    totalRoutes: 'மொத்த வழிகள்',
    busStops: 'பேருந்து நிறுத்தங்கள்',
    
    // Upload
    uploadBusData: 'பேருந்து தரவைப் பதிவேற்றவும்',
    bulkUpdateBusInformation: 'மொத்த புதுப்பிப்பு பேருந்து தகவல்',
    dragAndDropFiles: 'கோப்புகளை இங்கே இழுத்து விடவும்',
    supportedFormats: 'ஆதரிக்கப்படும் வடிவங்கள்',
    browseFiles: 'கோப்புகளை உலாவ',
    instructions: 'அறிவுறுத்தல்கள்',
    uploadInstructions1: 'கோப்பு CSV அல்லது Excel வடிவத்தில் இருக்க வேண்டும்',
    uploadInstructions2: 'முதல் வரிசை நெடுவரிசை தலைப்புகளைக் கொண்டிருக்க வேண்டும்',
    uploadInstructions3: 'தேவையான நெடுவரிசைகள்: பேருந்து எண், பேருந்து வழி, பேருந்து நிறுத்தம் பெயர், நேரம், இருப்பிடம்',
    uploadInstructions4: 'அதிகபட்ச கோப்பு அளவு: 10MB',
    fileUploaded: 'கோப்பு பதிவேற்றப்பட்டது',
    processingFile: 'உங்கள் கோப்பைச் செயலாக்குகிறது...',
    uploadComplete: 'பதிவேற்றம் முடிந்தது',
    dataUpdatedSuccessfully: 'பேருந்து தரவு வெற்றிகரமாக புதுப்பிக்கப்பட்டது',
    errorProcessingFile: 'கோப்பைச் செயலாக்குவதில் பிழை',
    
    // Error messages
    unauthorizedAccess: 'அங்கீகரிக்கப்படாத அணுகல்',
    adminOnlyPage: 'இந்தப் பக்கம் நிர்வாகிகளால் மட்டுமே அணுகக்கூடியது',
    errorFetchingData: 'தரவைப் பெறுவதில் பிழை',
    errorUpdatingData: 'தரவைப் புதுப்பிப்பதில் பிழை',
    updateSuccessful: 'புதுப்பிப்பு வெற்றிகரமாக உள்ளது',
    busDataUpdated: 'பேருந்து தரவு வெற்றிகரமாக புதுப்பிக்கப்பட்டது',
    loggedOut: 'வெளியேறியுள்ளீர்கள்',
    adminSessionEnded: 'உங்கள் நிர்வாக அமர்வு முடிந்தது',
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
    
    // Help & Support
    about: 'इस प्रोजेक्ट के बारे में',
    aboutProjectDescription: 'REC परिवहन प्रणाली एक व्यापक प्लेटफॉर्म है जो छात्रों और कर्मचारियों को वास्तविक समय में कॉलेज बसों को ट्रैक करने, शेड्यूल देखने और अपनी यात्राओं की कुशलतापूर्वक योजना बनाने में मदद करने के लिए डिज़ाइन किया गया है।',
    version: 'संस्करण',
    author: 'लेखक',
    frequentlyAskedQuestions: 'अक्सर पूछे जाने वाले प्रश्न',
    contactUs: 'संपर्क करें',
    email: 'ईमेल',
    phone: 'फोन',
    helpdesk: 'हेल्पडेस्क',
    helpdeskTiming: 'सोम-शुक्र, सुबह 9:00 - शाम 5:00',
    
    // FAQs
    faq1: 'मैं किसी विशेष बस को कैसे ट्रैक करूं?',
    faq1Answer: 'आप रूट मैप पेज पर जाकर बस नंबर या रूट खोजकर किसी विशेष बस को ट्रैक कर सकते हैं। मानचित्र आपको बस का वास्तविक समय स्थान दिखाएगा।',
    faq2: 'अगर मेरी बस में देरी हो रही है तो मुझे क्या करना चाहिए?',
    faq2Answer: 'अगर आपकी बस में देरी हो रही है, तो आप किसी भी घोषणा के लिए सूचना अनुभाग की जांच कर सकते हैं। आप सहायता के लिए हेल्पडेस्क से भी संपर्क कर सकते हैं।',
    faq3: 'रीयल-टाइम ट्रैकिंग कितनी सटीक है?',
    faq3Answer: 'हमारी ट्रैकिंग सिस्टम हर 30 सेकंड में अपडेट होती है, जिससे आपको बस स्थानों के बारे में सटीक रीयल-टाइम जानकारी मिलती है।',
    faq4: 'क्या मैं अपनी बस के पास आने पर सूचनाएं प्राप्त कर सकता हूं?',
    faq4Answer: 'हां, आप विशिष्ट बसों के लिए सूचनाएं सेट कर सकते हैं। सेटिंग्स पेज पर जाएं और अपने पसंदीदा मार्गों के लिए सूचनाएं सक्षम करें।',
    faq5: 'मैं ऐप के साथ किसी समस्या की रिपोर्ट कैसे करूं?',
    faq5Answer: 'आप प्रतिक्रिया भेजें पेज के माध्यम से समस्याओं की रिपोर्ट कर सकते हैं। हमारी टीम आपकी प्रतिक्रिया की समीक्षा करेगी और जल्द से जल्द समस्या का समाधान करेगी।',
    
    // Admin
    adminAccess: 'एडमिन एक्सेस',
    adminLogin: 'एडमिन लॉगिन',
    adminAuthentication: 'एडमिन प्रमाणीकरण',
    adminAuthenticationDesc: 'एडमिन डैशबोर्ड तक पहुंचने के लिए एडमिनिस्ट्रेटर पासवर्ड दर्ज करें',
    enterPassword: 'पासवर्ड दर्ज करें',
    invalidPassword: 'अमान्य पासवर्ड',
    login: 'लॉगिन',
    adminAccessGranted: 'एडमिन एक्सेस प्रदान किया गया',
    adminAccessGrantedDesc: 'अब आपके पास एडमिन डैशबोर्ड तक पहुंच है',
    adminAccessDenied: 'एडमिन एक्सेस अस्वीकृत',
    adminAccessDeniedDesc: 'आपके द्वारा दर्ज किया गया पासवर्ड गलत है',
    
    // Admin Dashboard
    adminDashboard: 'एडमिन डैशबोर्ड',
    overview: 'ओवरव्यू',
    manageBuses: 'बसों का प्रबंधन करें',
    upload: 'अपलोड',
    websiteTraffic: 'वेबसाइट ट्रैफिक',
    last7Days: 'पिछले 7 दिन',
    visits: 'विज़िट',
    recentActivity: 'हालिया गतिविधि',
    latestSystemActivities: 'नवीनतम सिस्टम गतिविधियां',
    editBusInformation: 'बस जानकारी संपादित करें',
    busNumber: 'बस नंबर',
    busRoute: 'बस मार्ग',
    busStopName: 'बस स्टॉप का नाम',
    timing: 'समय',
    location: 'स्थान',
    actions: 'क्रियाएँ',
    edit: 'संपादित करें',
    cancel: 'रद्द करें',
    saveChanges: 'परिवर्तन सहेजें',
    loading: 'लोड हो रहा है',
    activeUsers: 'सक्रिय उपयोगकर्ता',
    totalRoutes: 'कुल मार्ग',
    busStops: 'बस स्टॉप',
    
    // Upload
    uploadBusData: 'बस डेटा अपलोड करें',
    bulkUpdateBusInformation: 'बल्क अपडेट बस जानकारी',
    dragAndDropFiles: 'फ़ाइलों को यहां खींचें और छोड़ें',
    supportedFormats: 'समर्थित प्रारूप',
    browseFiles: 'फ़ाइलें ब्राउज़ करें',
    instructions: 'निर्देश',
    uploadInstructions1: 'फ़ाइल CSV या Excel प्रारूप में होनी चाहिए',
    uploadInstructions2: 'पहली पंक्ति में कॉलम हेडर होने चाहिए',
    uploadInstructions3: 'आवश्यक कॉलम: बस नंबर, बस मार्ग, बस स्टॉप का नाम, समय, स्थान',
    uploadInstructions4: 'अधिकतम फ़ाइल आकार: 10MB',
    fileUploaded: 'फ़ाइल अपलोड की गई',
    processingFile: 'आपकी फ़ाइल प्रोसेस हो रही है...',
    uploadComplete: 'अपलोड पूर्ण',
    dataUpdatedSuccessfully: 'बस डेटा सफलतापूर्वक अपडेट किया गया है',
    errorProcessingFile: 'फ़ाइल प्रोसेसिंग में त्रुटि',
    
    // Error messages
    unauthorizedAccess: 'अनधिकृत पहुंच',
    adminOnlyPage: 'यह पृष्ठ केवल प्रशासकों के लिए सुलभ है',
    errorFetchingData: 'डेटा प्राप्त करने में त्रुटि',
    errorUpdatingData: 'डेटा अपडेट करने में त्रुटि',
    updateSuccessful: 'अपडेट सफल',
    busDataUpdated: 'बस डेटा सफलतापूर्वक अपडेट किया गया है',
    loggedOut: 'लॉग आउट',
    adminSessionEnded: 'आपका एडमिन सेशन समाप्त हो गया है',
  }
};

export default translations;
