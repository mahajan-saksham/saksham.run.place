// Saksham Mahajan Portfolio Data
export const portfolioData = {
  profile: {
    name: "Saksham Mahajan",
    title: "Senior Product Designer",
    avatar: "/images/saksham-avatar.jpg", // Your profile photo
    bio: "A designer from National Institute of Design, he demonstrates a rare ability to bridge industrial and product design with advanced digital experience creation. His work stands out for translating user insights into seamless, intuitive journeys—whether optimizing smart device interfaces or architecting enterprise platforms.",
    location: "Bengaluru, Karnataka, India",
    email: "sakshammahajan1997@gmail.com",
    phone: "7995657936",
    social: {
      linkedin: "https://www.linkedin.com/in/mahajansaksham/",
      dribbble: "https://dribbble.com/sakshammahajan",
      behance: "https://www.behance.net/saksham-mahajan",
      github: "", // Update if you have
      twitter: "" // Update if you have
    }
  },
  
  stats: {
    projects: 13, // Based on Dribbble shots
    experience: "5+ years",
    companies: 7,
    industries: 3 // FinTech, Health & Fitness, Education
  },
  
  skills: {
    design: [
      { name: "Mobile Application Design", level: 95 },
      { name: "Figma", level: 90 },
      { name: "Sketch", level: 85 },
      { name: "Adobe Creative Suite", level: 85 },
      { name: "Design Thinking", level: 90 },
      { name: "Design Systems", level: 85 },
      { name: "Process Design", level: 85 }
    ],
    research: [
      { name: "User Research", level: 85 },
      { name: "Usability Testing", level: 80 },
      { name: "Competitive Analysis", level: 85 },
      { name: "Journey Mapping", level: 90 },
      { name: "Persona Development", level: 85 }
    ],
    technical: [
      { name: "Prototyping", level: 90 },
      { name: "Wireframing", level: 95 },
      { name: "Python Basics", level: 60 },
      { name: "AppSheet", level: 70 },
      { name: "Design-Dev Handoff", level: 85 }
    ]
  },  
  experience: [
    {
      id: 1,
      company: "Yubi (formerly CredAvenue)",
      position: "Senior Product Designer",
      duration: "Oct 2022 - Present",
      location: "Bengaluru, Karnataka, India",
      description: "Leading design initiatives for financial technology platform, focusing on enterprise solutions and B2B products.",
      achievements: [
        "Owned the design and shipping of Yubi Pools, the world's first online mass securitisation platform, increasing user engagement by 30% and resulting in $1-2 million in revenue",
        "Collaborated and designed for Yubi Marketplace and Loan OS, India's first digital and universal debt marketplace",
        "Designed onboarding, client discovery, platform configuration, role management, and team management systems"
      ]
    },
    {
      id: 2,
      company: "cure.fit",
      position: "Product Designer",
      duration: "Dec 2021 - Sep 2022",
      location: "Bengaluru, Karnataka, India",
      description: "Designed health and fitness app experiences for millions of users.",
      achievements: [
        "Designed user interfaces for CultBike, CultRow and smart home fitness devices, resulting in nearly 100% user adoption with 15-20% Pro users",
        "Designed marketing, purchase, and delivery experiences for web and mobile platforms",
        "Tracked daily click-through rates, sold over 1000 SKUs, and captured online sales of over $1 million"
      ]
    },
    {
      id: 3,
      company: "Greyamp Consulting",
      position: "Design Associate",
      duration: "Apr 2021 - Dec 2021",
      location: "Bengaluru, Karnataka, India",
      description: "Worked on diverse client projects across industries.",
      achievements: [
        "Worked on designing the B2B Transformation Management Platform 'GALE'",
        "Provided design consultancy for digital transformation projects",
        "Improved user-centric designs for enterprise clients"
      ]
    },    {
      id: 4,
      company: "EyeCan - A Design Studio",
      position: "Product Designer",
      duration: "May 2020 - Apr 2021",
      location: "Remote",
      description: "Contributed to multiple design projects for startups and established businesses.",
      achievements: [
        "Organized design processes and collaborated with teams to create innovative product interactions",
        "Created information structures and user flows, enhancing product usability",
        "Developed company branding and design systems"
      ]
    },
    {
      id: 5,
      company: "MentorPupil Consultancy",
      position: "Design Internship",
      duration: "Nov 2019 - May 2020",
      location: "Vijayawada Area, India",
      description: "Worked on web-based business solution for students.",
      achievements: [
        "Designed new web-based business solution for students facing difficulties with college admissions",
        "Created user flows and wireframes for the entire platform",
        "Conducted user research with target audience"
      ]
    },
    {
      id: 6,
      company: "T.R.E.E.S. Pvt. Ltd.",
      position: "Product Design Intern",
      duration: "Apr 2019 - May 2019",
      location: "Ghaziabad Area, India",
      description: "Led design project for underground sewage system.",
      achievements: [
        "Led full project alongside engineers for underground sewage system in Delhi",
        "Tackled complex technical challenges with engineering perspective",
        "Managed production cost limitations while maintaining design quality"
      ]
    },    {
      id: 7,
      company: "Orion Creative Solutions",
      position: "Co-Founder",
      duration: "Jul 2017 - Mar 2019",
      location: "Indore Area, India",
      description: "Co-founded design, content writing and creative consultancy startup.",
      achievements: [
        "Started and managed design consultancy with two co-founders",
        "Delivered design solutions for multiple clients",
        "Handled business development and client relationships"
      ]
    }
  ],
  
  education: [
    {
      degree: "Bachelor of Design",
      field: "Industrial and Product Design",
      institution: "National Institute of Design (NID) Andhra Pradesh",
      duration: "2016 - 2020",
      location: "Vijayawada, Andhra Pradesh"
    },
    {
      degree: "High School Diploma",
      field: "Physics, Chemistry, Maths with Web Technology",
      institution: "National Public School",
      duration: "2013 - 2015",
      location: "India"
    }
  ],
  
  certifications: [
    {
      name: "Google UX Design Specialization",
      issuer: "Google",
      date: "2021"
    },
    {
      name: "Introduction to User Experience Principles and Processes",
      issuer: "University of Michigan",
      date: "2020"
    },    {
      name: "Programming for Everybody (Getting Started with Python)",
      issuer: "University of Michigan",
      date: "2019"
    },
    {
      name: "Building No-Code Apps with AppSheet: Foundations",
      issuer: "Google Cloud Skills Boost",
      date: "2024"
    }
  ],
  
  projects: [
    {
      id: 1,
      title: "Yubi Pools - Mass Securitisation Platform",
      description: "World's first online mass securitisation platform that revolutionizes debt markets. Increased user engagement by 30% and generated $1-2M in revenue.",
      category: "FinTech",
      thumbnail: "/images/yubi-pools-thumb.jpg",
      images: ["/images/yubi-pools-1.jpg", "/images/yubi-pools-2.jpg"],
      tags: ["B2B", "Enterprise", "FinTech", "Web App"],
      link: "https://dribbble.com/sakshammahajan",
      featured: true
    },
    {
      id: 2,
      title: "CultROW - Smart Fitness Experience",
      description: "Designed comprehensive workout experience for CultROW smart rowing machine, achieving nearly 100% user adoption with 15-20% converting to Pro users.",
      category: "Health & Fitness",
      thumbnail: "/images/cultrow-thumb.jpg",
      images: ["/images/cultrow-workout.jpg", "/images/cultrow-stats.jpg"],
      tags: ["Mobile", "IoT", "Fitness", "Product Design"],
      link: "https://dribbble.com/sakshammahajan",
      featured: true
    },    {
      id: 3,
      title: "CultBike - E-commerce & Product Pages",
      description: "Designed marketing, purchase, and delivery experiences that drove over $1 million in online sales with 1000+ SKUs.",
      category: "E-commerce",
      thumbnail: "/images/cultbike-thumb.jpg",
      images: ["/images/cultbike-pdp.jpg", "/images/cultbike-lp.jpg"],
      tags: ["E-commerce", "Web Design", "Marketing", "Conversion"],
      link: "https://dribbble.com/sakshammahajan",
      featured: true
    },
    {
      id: 4,
      title: "Bamboo Iron - Product Design",
      description: "Industrial design project exploring sustainable materials and innovative form factors for everyday appliances.",
      category: "Industrial Design",
      thumbnail: "/images/bamboo-iron-thumb.jpg",
      images: ["/images/bamboo-iron-1.jpg"],
      tags: ["Industrial Design", "Sustainability", "Innovation"],
      link: "https://dribbble.com/sakshammahajan"
    },
    {
      id: 5,
      title: "Checkout Flow - Web & Mobile",
      description: "Optimized checkout experience across web and mobile platforms, improving conversion rates and reducing cart abandonment.",
      category: "UX Design",
      thumbnail: "/images/checkout-thumb.jpg",
      images: ["/images/checkout-web.jpg", "/images/checkout-mobile.jpg"],
      tags: ["UX", "E-commerce", "Mobile", "Web"],
      link: "https://dribbble.com/sakshammahajan"
    },    {
      id: 6,
      title: "RAJ - Relationship Manager",
      description: "AI-powered relationship manager with smart notifications that save the day. A comprehensive solution for managing professional relationships.",
      category: "Mobile App",
      thumbnail: "/images/raj-thumb.jpg",
      images: ["/images/raj-notifications.jpg"],
      tags: ["Mobile", "AI", "Productivity", "UX Design"],
      link: "https://dribbble.com/sakshammahajan"
    },
    {
      id: 7,
      title: "BLE Connection Flow",
      description: "Designed seamless Bluetooth Low Energy connection flow for smart fitness devices, ensuring smooth user experience.",
      category: "IoT",
      thumbnail: "/images/ble-thumb.jpg",
      images: ["/images/ble-flow.jpg"],
      tags: ["IoT", "UX", "Technical Design", "Mobile"],
      link: "https://dribbble.com/sakshammahajan"
    },
    {
      id: 8,
      title: "Lock.io - Authentication Experience",
      description: "Modern login/signup experience with focus on security and user convenience. Clean, minimal design approach.",
      category: "Authentication",
      thumbnail: "/images/lockio-thumb.jpg",
      images: ["/images/lockio-login.jpg"],
      tags: ["Authentication", "Security", "UX", "Mobile"],
      link: "https://dribbble.com/sakshammahajan"
    },
    {
      id: 9,
      title: "Post Order Flow",
      description: "Comprehensive post-purchase experience design including order tracking, delivery updates, and customer support integration.",
      category: "E-commerce",
      thumbnail: "/images/post-order-thumb.jpg",
      images: ["/images/post-order-1.jpg", "/images/post-order-2.jpg"],
      tags: ["E-commerce", "Customer Experience", "Mobile", "Web"],
      link: "https://dribbble.com/sakshammahajan"
    }
  ]
};