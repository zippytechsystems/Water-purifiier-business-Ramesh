import { Product, ServiceItem, SparePartItem, GalleryItem } from '../types';

export const BUSINESS_INFO = {
  brandName: "Priya's AquaFresh",
  businessName: "Lasya Water Purifier Sales & Services",
  brandNameTe: "ప్రియాస్ ఆక్వాఫ్రెష్",
  businessNameTe: "లాస్య వాటర్ ప్యూరిఫైయర్ సేల్స్ & సర్వీసెస్",
  taglineEn: "Pure Water. Healthy Life.",
  taglineTe: "స్వచ్ఛమైన నీటికి నమ్మకమైన ఎంపిక",
  subheadlineEn: "Your Trusted Partner for Water Purifier Sales, Installation, Service & Repair.",
  subheadlineTe: "వాటర్ ప్యూరిఫైయర్ సేల్స్, ఇన్స్టాలేషన్, సర్వీస్ మరియు రిపేర్లకు మీ విశ్వసనీయ భాగస్వామి.",
  supportingTextEn: "Quality Water Purifiers, Professional Service and Reliable Spare Parts – All Under One Roof.",
  supportingTextTe: "నాణ్యమైన వాటర్ ప్యూరిఫైయర్లు, నిపుణులైన సర్వీస్ మరియు నమ్మకమైన స్పేర్ పార్ట్స్ – అన్నీ ఒకే చోట.",
  phone: "9014357848",
  whatsapp: "9182857848",
  gstNumber: "36ETWPA6540J1Z7",
  addressEn: "Khilashapur Road, Village & Mandal Raghunathpally, District Jangaon, Telangana, India.",
  addressTe: "ఖిలాషాపూర్ రోడ్, గ్రామం & మండలం రఘునాథపల్లి, జిల్లా జనగామ, తెలంగాణ.",
  locationCoordinates: "17.764960183188055, 79.25625657517365",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3799.5684848802534!2d79.25625657517365!3d17.764960183188055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDQ1JzUzLjkiTiA3OcKwMTUnMzEuOCJF!5e0!3m2!1sen!2sin!4v1793628372853!5m2!1sen!2sin",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=17.764960183188055,79.25625657517365",
  workingHoursEn: "Monday to Sunday: 8:00 AM – 9:00 PM",
  workingHoursTe: "సోమవారం నుండి ఆదివారం: ఉదయం 8:00 – రాత్రి 9:00"
};

export const PRODUCTS_DATA: Product[] = [
  {
    id: "p1",
    nameEn: "Priya's AquaFresh Sleek RO Purifier",
    nameTe: "ప్రియాస్ ఆక్వాఫ్రెష్ స్లీక్ RO ప్యూరిఫైయర్",
    category: "water-purifiers",
    subCategory: "Domestic RO",
    descriptionEn: "Modern wall-mount domestic RO system with multi-layer filtration, active copper/alkaline infusion, and automatic shut-off.",
    descriptionTe: "మల్టీ-లేయర్ ఫిల్ట్రేషన్ మరియు అధునాతన ప్యూరిఫికేషన్ తో కూడిన ప్రీమియం వాల్-మౌంట్ RO సిస్టమ్.",
    featuresEn: [
      "Multi-stage RO + UV purification technology",
      "High capacity pure water storage tank",
      "Auto flush and auto cut-off function",
      "Food-grade durable plastic housing"
    ],
    featuresTe: [
      "మల్టీ-స్టేజ్ RO + UV ప్యూరిఫికేషన్ టెక్నాలజీ",
      "పెద్ద సామర్థ్యం గల స్టోరేజ్ ట్యాంక్",
      "ఆటో ఫ్లష్ & ఆటో కట్-ఆఫ్ సిస్టమ్",
      "ఫుడ్-గ్రేడ్ నాణ్యమైన బాడీ"
    ],
    imageUrl: "/images/products/water-purifiers/priya-aquafresh-sleek-ro.png",
    warrantyEn: "1 Year Guaranty (As per model terms)",
    warrantyTe: "1 ఇయర్ గ్యారంటీ (మోడల్ నిబంధనల ప్రకారం)",
    badge: "1 Year Guaranty",
    isFeatured: true
  },
  {
    id: "p2",
    nameEn: "Multi-Stage Domestic RO + UV Transparent Water Purifier",
    nameTe: "మల్టీ-స్టేజ్ ట్రాన్స్‌పరెంట్ RO + UV వాటర్ ప్యూరిఫైయర్",
    category: "water-purifiers",
    subCategory: "Domestic RO+UV",
    descriptionEn: "Visible filtration chamber domestic purifier featuring sediment, pre-carbon, RO membrane and post-carbon mineral cartridges.",
    descriptionTe: "ఫిల్టర్లు స్పష్టంగా కనిపించే ట్రాన్స్‌పరెంట్ బాడీతో మల్టీ-స్టేజ్ RO + UV డొమెస్టిక్ ప్యూరిఫైయర్.",
    featuresEn: [
      "Visible transparent filter candle chambers",
      "Heavy-duty booster pump included",
      "Advanced TDS adjustment control",
      "Ideal for high TDS borewell and tap water"
    ],
    featuresTe: [
      "స్పష్టంగా కనిపించే ఫిల్టర్ కాండిల్ చాంబర్స్",
      "హెవీ-డ్యూటీ బూస్టర్ పంప్",
      "అడ్వాన్స్‌డ్ TDS అడ్జస్ట్‌మెంట్ కంట్రోల్",
      "బోరు మరియు ట్యాప్ వాటర్ కు అత్యుత్తమం"
    ],
    imageUrl: "/images/products/water-purifiers/domestic-ro-transparent.png",
    warrantyEn: "1 Year Guaranty (As per model terms)",
    warrantyTe: "1 ఇయర్ గ్యారంటీ (మోడల్ నిబంధనల ప్రకారం)",
    badge: "Heavy Duty",
    isFeatured: true
  },
  {
    id: "p3",
    nameEn: "Five-Stage Heavy-Duty RO Filtration System",
    nameTe: "5-స్టేజ్ హెవీ-డ్యూటీ RO ఫిల్ట్రేషన్ సిస్టమ్",
    category: "water-purifiers",
    subCategory: "RO Filtration",
    descriptionEn: "Robust 5-stage open-frame RO purification unit engineered for high water flow, easy maintenance, and long cartridge life.",
    descriptionTe: "అత్యధిక నీటి ప్రవాహం మరియు సులభమైన మెయింటెనెన్స్ కోసం 5-స్టేజ్ ఓపెన్ ఫ్రేమ్ ప్యూరిఫికేషన్ సిస్టమ్.",
    featuresEn: [
      "3-stage pre-filtration bowls with spun cartridges",
      "High-rejection thin-film composite membrane",
      "Inline UV protection chamber",
      "Quick-service modular fittings"
    ],
    featuresTe: [
      "3-స్టేజ్ ప్రీ-ఫిల్ట్రేషన్ బౌల్స్",
      "హై-రిజెక్షన్ RO మెంబ్రేన్",
      "ఇన్‌లైన్ UV ప్రొటెక్షన్ చాంబర్",
      "సులభమైన సర్వీస్ కనెక్టర్లు"
    ],
    imageUrl: "/images/products/water-purifiers/five-stage-ro-filtration.png",
    warrantyEn: "1 Year Guaranty (As per model terms)",
    warrantyTe: "1 ఇయర్ గ్యారంటీ (మోడల్ నిబంధనల ప్రకారం)",
    badge: "Popular Choice",
    isFeatured: true
  },
  {
    id: "p4",
    nameEn: "Multi-Brand Domestic & Commercial Water Purifiers",
    nameTe: "మల్టీ-బ్రాండ్ డొమెస్టిక్ & కమర్షియల్ వాటర్ ప్యూరిఫైయర్లు",
    category: "water-purifiers",
    subCategory: "All Brands",
    descriptionEn: "Complete range of domestic and commercial water purifiers available at heavy discounts with genuine company warranty.",
    descriptionTe: "అన్ని ప్రముఖ బ్రాండ్ల వాటర్ ప్యూరిఫైయర్లు భారీ డిస్కౌంట్లతో మరియు సర్వీస్ సపోర్ట్ తో లభించును.",
    featuresEn: [
      "Aquaguard, Priya's AquaFresh, and other leading brands",
      "Domestic & Commercial capacities available",
      "Professional doorstep installation included",
      "Special festival & local seasonal discounts"
    ],
    featuresTe: [
      "ఆక్వాగార్డ్, ప్రియాస్ ఆక్వాఫ్రెష్ మరియు ఇతర ప్రముఖ బ్రాండ్లు",
      "గృహ మరియు వాణిజ్య అవసరాలకు తగిన మోడల్స్",
      "డోర్‌స్టెప్ నిపుణుల ఇన్స్టాలేషన్",
      "భారీ డిస్కౌంట్లు అందుబాటులో కలవు"
    ],
    imageUrl: "/images/products/water-purifiers/category-purifiers.png",
    warrantyEn: "1 Year Guaranty",
    warrantyTe: "1 ఇయర్ గ్యారంటీ",
    badge: "Special Discounts",
    isFeatured: true
  },
  {
    id: "p5",
    nameEn: "Domestic & Commercial Refrigerators (Fridges)",
    nameTe: "ఫ్రిడ్జ్ లు (సింగిల్ & డబుల్ డోర్)",
    category: "fridges",
    subCategory: "Home Appliances",
    descriptionEn: "Top brand single-door, double-door, and commercial refrigerators offering maximum energy efficiency and rapid cooling.",
    descriptionTe: "సింగిల్ డోర్, డబుల్ డోర్ ఫ్రిడ్జ్ లు నాణ్యమైన క్వాలిటీ మరియు వారంటీతో లభించును.",
    featuresEn: [
      "Single-door and double-door energy efficient models",
      "Fast ice making and smart inverter technology",
      "Full warranty support & local delivery",
      "Reliable after-sales service support"
    ],
    featuresTe: [
      "విద్యుత్ ఆదా చేసే అధునాతన మోడల్స్",
      "వేగవంతమైన కూలింగ్ టెక్నాలజీ",
      "కంపెనీ వారంటీ & సులభమైన డెలివరీ",
      "సేల్స్ తరువాత నమ్మకమైన సర్వీస్"
    ],
    imageUrl: "/images/products/fridges/category-fridges.png",
    badge: "Appliances"
  },
  {
    id: "p6",
    nameEn: "Top & Front Load Washing Machines",
    nameTe: "వాషింగ్ మెషిన్లు (టాప్ & ఫ్రంట్ లోడ్)",
    category: "washing-machines",
    subCategory: "Home Appliances",
    descriptionEn: "Semi-automatic and fully-automatic washing machines tailored for gentle fabric care and heavy-duty Indian wash cycles.",
    descriptionTe: "టాప్ లోడ్ మరియు ఫ్రంట్ లోడ్ వాషింగ్ మెషిన్లు సరసమైన ధరల్లో మరియు నిపుణుల సలహాలతో.",
    featuresEn: [
      "Fully automatic & semi-automatic variants",
      "Heavy load motor for rural & urban conditions",
      "Gentle drum design for longer fabric life",
      "Complete installation & demonstration"
    ],
    featuresTe: [
      "ఫుల్లీ ఆటోమేటిక్ & సెమీ ఆటోమేటిక్ వేరియంట్లు",
      "హెవీ-డ్యూటీ మోటార్ సామర్థ్యం",
      "వస్త్రాల సంరక్షణ కోసం ఆధునిక డ్రమ్",
      "ఉచిత డెమో & ఇన్స్టాలేషన్ సాయం"
    ],
    imageUrl: "/images/products/washing-machines/category-washing-machines.png",
    badge: "Home Care"
  },
  {
    id: "p7",
    nameEn: "Heavy-Duty Air Coolers (Desert & Personal)",
    nameTe: "ఎయిర్ కూలర్లు (డెసర్ట్ & పర్సనల్)",
    category: "air-coolers",
    subCategory: "Cooling Appliances",
    descriptionEn: "High-throw air coolers equipped with durable honeycomb pads, rust-proof bodies, and powerful copper motors.",
    descriptionTe: "వేసవి తీవ్రతను తట్టుకునే శక్తివంతమైన ఎయిర్ కూలర్లు మరియు కూలర్ మోటార్లు.",
    featuresEn: [
      "High airflow throw for large rooms & halls",
      "Long-lasting thick honeycomb cooling pads",
      "Inverter compatible copper motors",
      "Durable castor wheels for easy mobility"
    ],
    featuresTe: [
      "విశాలమైన గదులకు సరిపోయే భారీ గాలి ప్రవాహం",
      "మన్నికైన హనీకోంబ్ కూలింగ్ ప్యాడ్స్",
      "ఇన్వర్టర్ కు అనుకూలమైన కాపర్ మోటార్",
      "సులభంగా జరపడానికి వీలుగా చక్రాలు"
    ],
    imageUrl: "/images/products/air-coolers/category-air-coolers.png",
    badge: "Seasonal Favorite"
  },
  {
    id: "p8",
    nameEn: "Genuine AC Spare Parts & Accessories",
    nameTe: "అన్ని రకాల AC స్పేర్ పార్ట్స్",
    category: "ac-spare-parts",
    subCategory: "Spare Parts",
    descriptionEn: "Original AC compressors, copper tubes, blower fan motors, capacitors, and installation kits for all major AC brands.",
    descriptionTe: "కండెన్సర్లు, కాపర్ పైపులు, ఫ్యాన్ మోటార్లు, కంప్రెషర్లు మరియు ఒరిజినల్ AC స్పేర్ పార్ట్స్.",
    featuresEn: [
      "100% pure copper piping & fittings",
      "Original rotary & inverter compressors",
      "High-grade run & start capacitors",
      "Complete technician installation hardware"
    ],
    featuresTe: [
      "100% స్వచ్ఛమైన కాపర్ పైపులు",
      "ఒరిజినల్ కంప్రెషర్లు & ఫ్యాన్ మోటార్లు",
      "నాణ్యమైన కెపాసిటర్లు మరియు రిలేలు",
      "అన్ని రకాల AC లకు సరిపోయే స్పేర్స్"
    ],
    imageUrl: "/images/products/ac-spare-parts/category-ac-spare-parts.png",
    badge: "Genuine Spares"
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "s1",
    titleEn: "Water Purifier Installation",
    titleTe: "వాటర్ ప్యూరిఫైయర్ ఇన్స్టాలేషన్",
    category: "New Installation",
    descriptionEn: "Professional wall-mounting, plumbing integration, TDS level setting, and leak-proof commissioning for new water purifiers.",
    descriptionTe: "కొత్త వాటర్ ప్యూరిఫైయర్లకు నిపుణులైన టెక్నీషియన్ల ద్వారా సురక్షితమైన ఇన్స్టాలేషన్ మరియు TDS సెట్టింగ్.",
    iconName: "Wrench",
    estimatedTime: "45 - 60 Mins",
    highlightsEn: [
      "Precision wall-mounting & drill alignment",
      "Pressure regulation & inlet pipe connection",
      "TDS calibration to healthy drinking standards",
      "First pure water test & customer demo"
    ],
    highlightsTe: [
      "సురక్షితమైన వాల్-మౌంటింగ్",
      "వాటర్ ప్రెషర్ రెగ్యులేషన్",
      "ఆరోగ్యకరమైన TDS లెవెల్ సెట్టింగ్",
      "వాటర్ టెస్టింగ్ & డెమో"
    ]
  },
  {
    id: "s2",
    titleEn: "Water Purifier General Service",
    titleTe: "జనరల్ సర్వీస్ & చెకప్",
    category: "General Service",
    descriptionEn: "Complete inspection of purification stages, sanitization of water storage tank, filter bowl cleaning, and flow rate optimization.",
    descriptionTe: "ట్యాంక్ శుభ్రం చేయడం, ఫిల్టర్ బౌల్స్ క్లీనింగ్, వాటర్ ఫ్లో చెకింగ్ మరియు సంపూర్ణ పనితీరు తనిఖీ.",
    iconName: "CheckCircle2",
    estimatedTime: "30 - 45 Mins",
    highlightsEn: [
      "Comprehensive multi-point system health check",
      "Storage tank sanitization & disinfection",
      "Check booster pump pressure & adapter voltage",
      "TDS verification before and after service"
    ],
    highlightsTe: [
      "పూర్తి సిస్టమ్ హెల్త్ చెకప్",
      "స్టోరేజ్ ట్యాంక్ క్లీనింగ్ & శానిటైజేషన్",
      "బూస్టర్ పంప్ ప్రెషర్ చెకింగ్",
      "సర్వీస్ ముందు మరియు తరువాత TDS టెస్ట్"
    ]
  },
  {
    id: "s3",
    titleEn: "RO System Repair",
    titleTe: "RO సిస్టమ్ రిపేర్ & సమస్యల పరిష్కారం",
    category: "RO Repair",
    descriptionEn: "Expert diagnosis and repair for issues like purifier not turning on, slow water dispensing, vibration, or bad taste.",
    descriptionTe: "ప్యూరిఫైయర్ ఆన్ కాకపోవడం, నీరు రాకపోవడం లేదా మోటార్ వైబ్రేషన్ సమస్యలకు త్వరిత రిపేర్ పరిష్కారం.",
    iconName: "AlertTriangle",
    estimatedTime: "45 - 90 Mins",
    highlightsEn: [
      "Pump failure and vibration rectification",
      "SMPS power supply and circuit repair",
      "Auto-cutoff float valve repair",
      "Resolve bad taste or strange water odor"
    ],
    highlightsTe: [
      "మోటార్ సమస్యల త్వరిత పరిష్కారం",
      "పవర్ సప్లై / SMPS రిపేర్",
      "ఆటో-కట్ ఆఫ్ వాల్వ్ రీప్లేస్మెంట్",
      "నీటి రుచి మరియు వాసన సరిదిద్దడం"
    ]
  },
  {
    id: "s4",
    titleEn: "Filter Replacement",
    titleTe: "ఫిల్టర్ రీప్లేస్‌మెంట్",
    category: "Filter Replacement",
    descriptionEn: "Replacement of choked pre-sediment filters, activated carbon cartridges, and post-carbon mineralizers with certified original filters.",
    descriptionTe: "మురికి పట్టిన సెడిమెంట్ ఫిల్టర్లు, కార్బన్ ఫిల్టర్లను తొలగించి ఒరిజినల్ ఫిల్టర్లను అమర్చడం.",
    iconName: "RefreshCw",
    estimatedTime: "20 - 30 Mins",
    highlightsEn: [
      "5-micron spun polypropylene sediment filter",
      "High-grade activated carbon block for chlorine removal",
      "Post-carbon polishing filter for crisp taste",
      "Restores full water flow and pure taste"
    ],
    highlightsTe: [
      "ఒరిజినల్ సెడిమెంట్ ఫిల్టర్ రీప్లేస్మెంట్",
      "వాసన మరియు రసాయనాలను తొలగించే కార్బన్ ఫిల్టర్",
      "మంచి రుచినిచ్చే మినరల్ ఫిల్టర్",
      "వేగవంతమైన నీటి ప్రవాహం పునరుద్ధరణ"
    ]
  },
  {
    id: "s5",
    titleEn: "Membrane Replacement",
    titleTe: "RO మెంబ్రేన్ రీప్లేస్‌మెంట్",
    category: "Membrane Replacement",
    descriptionEn: "Installation of high-rejection 75/80/100 GPD RO membranes to eliminate heavy metals, fluoride, lead, and dissolved solids.",
    descriptionTe: "కరిగిన లవణాలు, ఫ్లోరైడ్ మరియు భార లోహాలను తొలగించే హై-రిజెక్షన్ RO మెంబ్రేన్ అమర్చడం.",
    iconName: "ShieldCheck",
    estimatedTime: "30 - 45 Mins",
    highlightsEn: [
      "Original Vontron / CSM / Filmtec grade membranes",
      "Drastically reduces high TDS down to healthy ranges",
      "Membrane housing descaling and sanitization",
      "Flushing of preservative fluids before consumption"
    ],
    highlightsTe: [
      "అత్యుత్తమ క్వాలిటీ ఒరిజినల్ మెంబ్రేన్లు",
      "అధిక TDS ను ఆరోగ్యకరమైన స్థాయికి తగ్గించడం",
      "మెంబ్రేన్ హౌసింగ్ క్లీనింగ్",
      "దీర్ఘకాలిక మన్నిక"
    ]
  },
  {
    id: "s6",
    titleEn: "Water Leakage Troubleshooting",
    titleTe: "వాటర్ లీకేజ్ పరిష్కారం",
    category: "Water Leakage",
    descriptionEn: "Immediate fixing of leaking pipe joints, loose elbow connectors, cracked filter bowls, and faulty solenoid shut-off valves.",
    descriptionTe: "పైపుల నుండి, జాయింట్ల నుండి నీరు లీక్ అవ్వడం లేదా బౌల్స్ పగిలిపోవడం వంటి సమస్యలకు శాశ్వత పరిష్కారం.",
    iconName: "Droplets",
    estimatedTime: "20 - 40 Mins",
    highlightsEn: [
      "Leak inspection across all high & low pressure joints",
      "Quick-connect push-fit elbow replacement",
      "Solenoid valve (SV) sealing and testing",
      "Prevention of electrical short circuit risks"
    ],
    highlightsTe: [
      "అన్ని జాయింట్ల సమగ్ర పరిశీలన",
      "నాణ్యమైన పుష్-ఫిట్ కనెక్టర్ల రీప్లేస్మెంట్",
      "వాల్వ్ లీకేజ్ నివారణ",
      "ఎలక్ట్రికల్ భద్రత తనిఖీ"
    ]
  },
  {
    id: "s7",
    titleEn: "Spare Parts Replacement",
    titleTe: "స్పేర్ పార్ట్స్ రీప్లేస్‌మెంట్",
    category: "Other Service",
    descriptionEn: "Genuine replacement parts for RO purifiers, refrigerators, coolers, and air conditioner components directly from verified stock.",
    descriptionTe: "వాటర్ ప్యూరిఫైయర్లు మరియు హోమ్ అప్లయన్సెస్ కు సరిపోయే ఒరిజినల్ స్పేర్ పార్ట్స్ అమర్చడం.",
    iconName: "Layers",
    estimatedTime: "30 - 60 Mins",
    highlightsEn: [
      "100% genuine booster pumps, SMPS, and SVs",
      "UV lamps and electronic ballasts",
      "Cooler motors, AC capacitors, and copper pipes",
      "Reliable warranty on replacement components"
    ],
    highlightsTe: [
      "100% అసలైన బూస్టర్ పంప్స్ మరియు అడాప్టర్లు",
      "UV ల్యాంప్స్ మరియు ఎలక్ట్రానిక్స్",
      "కూలర్ మోటార్లు మరియు AC స్పేర్స్",
      "స్పేర్స్ పై నాణ్యతా భరోసా"
    ]
  },
  {
    id: "s8",
    titleEn: "Annual Maintenance & Support",
    titleTe: "పీరియాడిక్ మెయింటెనెన్స్ & టెక్నికల్ సపోర్ట్",
    category: "General Service",
    descriptionEn: "Scheduled preventative care visits to keep your water purifier functioning at peak performance throughout the year.",
    descriptionTe: "ఏడాది పొడవునా మీ ప్యూరిఫైయర్ నిర్విరామంగా స్వచ్ఛమైన నీటిని అందించేందుకు పీరియాడిక్ సర్వీస్ సపోర్ట్.",
    iconName: "PhoneCall",
    estimatedTime: "Scheduled Visits",
    highlightsEn: [
      "Periodic filter cleaning and water testing",
      "Emergency breakdown visit priority",
      "Free TDS health audits for family peace of mind",
      "Direct technical helpline on call & WhatsApp"
    ],
    highlightsTe: [
      "సకాలంలో ఫిల్టర్ క్లీనింగ్ & వాటర్ టెస్టింగ్",
      "సమస్య వచ్చినప్పుడు ప్రాధాన్యత సర్వీస్",
      "ఉచిత TDS క్వాలిటీ ఆడిట్",
      "కాల్ & వాట్సాప్ ద్వారా నిరంతర సాయం"
    ]
  }
];

export const SPARE_PARTS_DATA: SparePartItem[] = [
  {
    id: "sp1",
    nameEn: "75/80/100 GPD RO Membrane",
    nameTe: "RO మెంబ్రేన్ (75/80/100 GPD)",
    category: "Membrane",
    compatibility: "All Domestic RO Systems",
    descriptionEn: "High rejection TFC membrane for removing dissolved salts, bacteria, heavy metals, and arsenic.",
    descriptionTe: "నీటిలోని బ్యాక్టీరియా మరియు హానికర లవణాలను తొలగించే హై-క్వాలిటీ RO మెంబ్రేన్.",
    imageUrl: "/images/brand/hero-water-purifiers.jpg",
    inStock: true
  },
  {
    id: "sp2",
    nameEn: "5-Micron Spun Sediment Pre-Filter",
    nameTe: "5-మైక్రాన్ సెడిమెంట్ ప్రీ-ఫిల్టర్",
    category: "Water Purifier Filter",
    compatibility: "Universal 10-inch Filter Bowls",
    descriptionEn: "Traps sand, silt, rust particles and visible impurities before water enters the RO machine.",
    descriptionTe: "నీటిలోని మట్టి, ఇసుక, తుప్పు రేణువులను పట్టి ఉంచే ప్రీ-ఫిల్టర్ క్యాండిల్.",
    imageUrl: "/images/brand/hero-water-purifiers.jpg",
    inStock: true
  },
  {
    id: "sp3",
    nameEn: "Activated Carbon Block Filter",
    nameTe: "యాక్టివేటెడ్ కార్బన్ బ్లాక్ ఫిల్టర్",
    category: "Water Purifier Filter",
    compatibility: "Standard RO Housings",
    descriptionEn: "Adsorbs chlorine, organic pesticides, hazardous chemicals, and eliminates foul odors.",
    descriptionTe: "రసాయనాలు, క్లోరిన్ మరియు దుర్వాసనను పూర్తిగా హరించే యాక్టివేటెడ్ కార్బన్ ఫిల్టర్.",
    imageUrl: "/images/products/water-purifiers/five-stage-ro-filtration.png",
    inStock: true
  },
  {
    id: "sp4",
    nameEn: "100 GPD RO Booster Pump",
    nameTe: "100 GPD RO బూస్టర్ పంప్",
    category: "Electrical / Pump",
    compatibility: "Domestic RO Units (24V / 36V)",
    descriptionEn: "High-pressure diaphragm pump engineered for optimal RO filtration even under low water pressure.",
    descriptionTe: "తక్కువ నీటి ప్రెషర్ ఉన్న చోట్ల కూడా సమర్థవంతంగా పనిచేసే హెవీ డ్యూటీ బూస్టర్ పంప్.",
    imageUrl: "/images/products/water-purifiers/domestic-ro-transparent.png",
    inStock: true
  },
  {
    id: "sp5",
    nameEn: "24V / 36V SMPS Power Adapter",
    nameTe: "SMPS పవర్ అడాప్టర్",
    category: "Electrical / Pump",
    compatibility: "All Domestic RO Purifiers",
    descriptionEn: "Surge-protected electronic power supply for RO pump and solenoid valves.",
    descriptionTe: "వోల్టేజ్ హెచ్చుతగ్గుల నుండి ప్యూరిఫైయర్ ను రక్షించే సేఫ్ పవర్ అడాప్టర్.",
    imageUrl: "/images/products/ac-spare-parts/category-ac-spare-parts.png",
    inStock: true
  },
  {
    id: "sp6",
    nameEn: "Air Conditioner Rotary Compressor",
    nameTe: "AC రోటరీ కంప్రెషర్",
    category: "AC & Appliance Part",
    compatibility: "Split & Window ACs",
    descriptionEn: "High efficiency original rotary and inverter compressors for major air conditioner brands.",
    descriptionTe: "అన్ని రకాల ప్రముఖ ఎయిర్ కండిషనర్లకు సరిపోయే ఒరిజినల్ కంప్రెషర్లు.",
    imageUrl: "/images/products/ac-spare-parts/category-ac-spare-parts.png",
    inStock: true
  },
  {
    id: "sp7",
    nameEn: "Air Cooler Heavy-Duty Motor",
    nameTe: "ఎయిర్ కూలర్ మోటార్",
    category: "AC & Appliance Part",
    compatibility: "Desert & Commercial Coolers",
    descriptionEn: "100% copper-wound multi-speed motor delivering high airflow and thermal overload protection.",
    descriptionTe: "100% కాపర్ వైండింగ్ తో కూడిన వేగవంతమైన ఎయిర్ కూలర్ మోటార్.",
    imageUrl: "/images/products/air-coolers/category-air-coolers.png",
    inStock: true
  },
  {
    id: "sp8",
    nameEn: "Pure Copper AC Coil Piping",
    nameTe: "ప్యూర్ కాపర్ AC పైపింగ్ కాయిల్",
    category: "AC & Appliance Part",
    compatibility: "Universal AC Installation",
    descriptionEn: "Durable, corrosion-resistant seamless copper tubes for high cooling efficiency.",
    descriptionTe: "అత్యుత్తమ కూలింగ్ మరియు మన్నికను అందించే నాణ్యమైన కాపర్ పైపులు.",
    imageUrl: "/images/gallery/frame-09-ac-spare-parts.png",
    inStock: true
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "g1",
    titleEn: "Showroom Water Purifier Showcase",
    titleTe: "షోరూమ్ లో వాటర్ ప్యూరిఫైయర్ల ప్రదర్శన",
    category: "showroom",
    imageUrl: "/images/gallery/frame-04-purifier-display.png",
    captionEn: "Extensive range of Aquaguard and Priya's AquaFresh RO models on display.",
    captionTe: "ఆక్వాగార్డ్ మరియు ప్రియాస్ ఆక్వాఫ్రెష్ మోడల్స్ అందుబాటులో ఉన్నాయి."
  },
  {
    id: "g2",
    titleEn: "Pure Water Purity Demonstration",
    titleTe: "స్వచ్ఛమైన తాగునీటి ప్రదర్శన",
    category: "purity",
    imageUrl: "/images/gallery/frame-01-host-water.png",
    captionEn: "Pure, crystal-clear drinking water for your family's health.",
    captionTe: "మీ కుటుంబ ఆరోగ్యం కోసం స్వచ్ఛమైన, పరిశుభ్రమైన నీరు."
  },
  {
    id: "g3",
    titleEn: "Crystal Water Pouring Test",
    titleTe: "స్వచ్ఛమైన నీటి ప్రవాహం",
    category: "purity",
    imageUrl: "/images/gallery/frame-11-pure-water-stream.png",
    captionEn: "Direct multi-stage purified water with balanced natural minerals.",
    captionTe: "సహజ ఖనిజ లవణాలతో కూడిన సమతుల్య తాగునీరు."
  },
  {
    id: "g4",
    titleEn: "Genuine AC Spare Parts Display",
    titleTe: "AC ఒరిజినల్ స్పేర్ పార్ట్స్ షెల్ఫ్స్",
    category: "products",
    imageUrl: "/images/gallery/frame-09-ac-spare-parts.png",
    captionEn: "Comprehensive inventory of AC compressors, copper coils, and motors in stock.",
    captionTe: "అన్ని రకాల AC స్పేర్ పార్ట్స్, కంప్రెషర్లు మరియు కాపర్ పైపులు అందుబాటులో కలవు."
  },
  {
    id: "g5",
    titleEn: "1-Year Guarantee Commitment",
    titleTe: "1 ఇయర్ గ్యారంటీ భరోసా",
    category: "showroom",
    imageUrl: "/images/gallery/frame-05-one-year-guarantee.png",
    captionEn: "1-Year Guarantee provided on qualifying water purifiers and services.",
    captionTe: "వాటర్ ప్యూరిఫైయర్లపై 1 సంవత్సరం గ్యారంటీ లభిస్తుంది."
  },
  {
    id: "g6",
    titleEn: "Customer Service & Assistance",
    titleTe: "కస్టమర్ సర్వీస్ డెస్క్",
    category: "service",
    imageUrl: "/images/gallery/frame-10-purifier-contacts.png",
    captionEn: "Dedicated service helpline: 9014357848 & 9182857848 in Raghunathpally.",
    captionTe: "రఘునాథపల్లి & జనగామ ప్రాంతాల్లో తక్షణ కస్టమర్ సర్వీస్."
  },
  {
    id: "g7",
    titleEn: "Home Appliances & Air Coolers",
    titleTe: "హోమ్ అప్లయన్సెస్ & ఎయిర్ కూలర్లు",
    category: "products",
    imageUrl: "/images/gallery/frame-07-air-coolers-appliances.png",
    captionEn: "Branded air coolers and home appliances ready for delivery.",
    captionTe: "నాణ్యమైన ఎయిర్ కూలర్లు మరియు గృహోపకరణాలు."
  },
  {
    id: "g8",
    titleEn: "Priya's AquaFresh Brand Identity",
    titleTe: "ప్రియాస్ ఆక్వాఫ్రెష్ బ్రాండ్ గుర్తింపు",
    category: "showroom",
    imageUrl: "/images/gallery/frame-14-priya-aquafresh-card.png",
    captionEn: "Khilashapur Road, Raghunathpally, Jangaon District - Trusted local choice.",
    captionTe: "ఖిలాషాపూర్ రోడ్, రఘునాథపల్లి, జిల్లా జనగామ - నమ్మకమైన ఎంపిక."
  }
];


