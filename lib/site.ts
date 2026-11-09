export const site = {
  name: "Aqua Fine Engineering", tagline: "Pure Expert", domain: "www.aquafinebd.com",
  phones: ["+880 1715-217871", "+88 01912353128"], emails: ["info@aquafinebd.com", "aquafinebd@gmail.com"],
  address: "House#39, Road#02, Section#6, West Senpara, Near SA Poribohon, Mirpur 10, Dhaka-1216, Bangladesh",
  facebook: "https://www.facebook.com/aquafinebd",
};
// Fill these in with your real charges / numbers. While a fee is 0 the website says "confirmed by phone".
export const fees = { insideDhaka: 0, outsideDhaka: 0, installation: 0 };
export const mfs = { bkash: "", nagad: "", rocket: "" }; // your merchant/personal numbers, shown at checkout when set
export const whatsapp = "8801715217871"; // WhatsApp number, international format, no + or spaces
export const slots = ["Morning (9am-12pm)", "Afternoon (12pm-4pm)", "Evening (4pm-7pm)"] as const;
export const districts = ["Bagerhat","Bandarban","Barguna","Barishal","Bhola","Bogura","Brahmanbaria","Chandpur","Chapainawabganj","Chattogram","Chuadanga","Cox's Bazar","Cumilla","Dhaka","Dinajpur","Faridpur","Feni","Gaibandha","Gazipur","Gopalganj","Habiganj","Jamalpur","Jashore","Jhalokathi","Jhenaidah","Joypurhat","Khagrachhari","Khulna","Kishoreganj","Kurigram","Kushtia","Lakshmipur","Lalmonirhat","Madaripur","Magura","Manikganj","Meherpur","Moulvibazar","Munshiganj","Mymensingh","Naogaon","Narail","Narayanganj","Narsingdi","Natore","Netrokona","Nilphamari","Noakhali","Pabna","Panchagarh","Patuakhali","Pirojpur","Rajbari","Rajshahi","Rangamati","Rangpur","Satkhira","Shariatpur","Sherpur","Sirajganj","Sunamganj","Sylhet","Tangail","Thakurgaon"] as const;
export const categories = ["Commercial Water Purifier", "Hot Cold Normal Purifier", "RO Purifier", "Accessories", "Industrial Product", "Pump & Blower", "Filtration Media & Chemicals"];
export const menuProducts = categories.slice(0, 4);
export const industrialCategories = categories.slice(4);
export const solutions = [
  { slug: "ro-water-treatment-plant", title: "RO Water Treatment Plant", summary: "A reverse osmosis drinking water treatment plant produces safe drinking water using the reverse osmosis process.",
    body: "A reverse osmosis (RO) drinking water treatment plant removes dissolved salts, heavy metals and other impurities from raw water to produce clean, safe drinking water for factories, institutions and communities.\nContact us with your daily water requirement and water source, and we will recommend a suitable plant." },
  { slug: "wastewater-treatment-plant", title: "Wastewater Treatment Plant", summary: "A wastewater reuse plant, also known as a water reclamation plant, is a facility designed to treat wastewater.",
    body: "A wastewater treatment plant cleans wastewater so it is safe to release back into the environment or reuse. Wastewater comes from homes, businesses, industries and storm water, and the goal is to remove harmful pollutants and contaminants.\nThe process usually includes:\n1. Pre-treatment: large debris such as leaves, sticks and trash is removed using screens.\n2. Primary treatment: wastewater sits in large tanks so heavy solids settle and oil and grease float to the top and are skimmed off.\n3. Secondary treatment: bacteria break down organic matter, typically in aeration tanks where oxygen is added.\n4. Tertiary treatment: additional filtration, chemical treatment or ultraviolet (UV) disinfection removes remaining harmful substances.\nTreated water can be released into rivers and lakes or reused for irrigation and industrial processes." },
  { slug: "iron-removal-plant", title: "Iron Removal Plant", summary: "Reduces high iron in groundwater so water is clear and free of rust stains and metallic taste.",
    body: "Groundwater in many areas contains high levels of iron. An iron removal plant treats the water so it is clear, without rust-coloured staining or metallic taste.\nContact us with your water test results or location and we will recommend a suitable system." },
  { slug: "packaged-stp", title: "Packaged STP", summary: "We manufacture and supply Packaged STP plants in Bangladesh.",
    body: "A packaged sewage treatment plant (STP) is a ready-made treatment system that can be installed on site. We are a manufacturer and supplier of packaged STP plants in Bangladesh.\nContact us with your daily flow and site details for a quote." },
  { slug: "rain-water-harvesting", title: "Rain Water Harvesting", summary: "Rain water harvesting, also called rain water collection technology, collects and stores rain for use.",
    body: "Rain water harvesting collects and stores rainwater so it can be used for cleaning, gardening and, with proper treatment, other uses. Contact us to plan a system for your building or site." },
];
export const taka = (n: number) => (n > 0 ? "৳" + n.toLocaleString("en-US") : "Price on request");
