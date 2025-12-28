/* =============================================
   MOBIX Presentation - Slides Data
   17 Slides Content
   ============================================= */

const slidesData = [
    // Slide 1: What is MOBIX?
    {
        id: 1,
        title: "What is MOBIX?",
        type: "title-slide",
        content: {
            subtitle: "AI-Powered Travel Planning Platform",
            mainText: "MOBIX is an AI-powered travel companion that creates personalized travel itineraries through intelligent chat interactions.",
            features: [
                {
                    icon: "🤖",
                    title: "AI Assistant",
                    desc: "Intelligent chat-based planning"
                },
                {
                    icon: "📍",
                    title: "Destinations",
                    desc: "Discover perfect places"
                },
                {
                    icon: "✈️",
                    title: "Travel Cards",
                    desc: "Organized trip details"
                }
            ],
            tagline: "Your personal AI travel companion"
        }
    },

    // Slide 2: The Problem MOBIX Solves
    {
        id: 2,
        title: "The Problem MOBIX Solves",
        type: "problem-slide",
        content: {
            problems: [
                {
                    icon: "⏱️",
                    title: "Time-Consuming Planning",
                    desc: "Hours spent researching destinations, accommodations, and activities across multiple websites"
                },
                {
                    icon: "🌐",
                    title: "Information Overload",
                    desc: "Too many options, reviews, and conflicting recommendations make decisions difficult"
                },
                {
                    icon: "🎯",
                    title: "Lack of Personalization",
                    desc: "Generic travel packages that don't match individual preferences and travel styles"
                },
                {
                    icon: "📱",
                    title: "Fragmented Experience",
                    desc: "Booking flights, hotels, and activities through different platforms without coordination"
                }
            ],
            conclusion: "Traditional travel planning is broken. MOBIX fixes it."
        }
    },

    // Slide 3: The MOBIX Solution
    {
        id: 3,
        title: "The MOBIX Solution",
        type: "solution-slide",
        content: {
            mainMessage: "One conversation. Complete travel plan.",
            solutions: [
                {
                    icon: "💬",
                    title: "Conversational AI",
                    desc: "Natural language interactions to understand your travel desires"
                },
                {
                    icon: "🧠",
                    title: "Smart Recommendations",
                    desc: "AI learns your preferences and suggests perfect matches"
                },
                {
                    icon: "📋",
                    title: "Travel Cards",
                    desc: "Organized, shareable itineraries in beautiful card format"
                },
                {
                    icon: "🔗",
                    title: "All-in-One Platform",
                    desc: "Everything from inspiration to booking in one place"
                }
            ]
        }
    },

    // Slide 4: How MOBIX Works
    {
        id: 4,
        title: "How MOBIX Works",
        type: "flow-slide",
        content: {
            subtitle: "Simple 4-Step Process",
            steps: [
                {
                    number: "1",
                    icon: "💭",
                    title: "Chat",
                    desc: "Tell MOBIX about your dream trip"
                },
                {
                    number: "2",
                    icon: "🤖",
                    title: "AI Process",
                    desc: "AI analyzes preferences & finds best options"
                },
                {
                    number: "3",
                    icon: "🗂️",
                    title: "Get Cards",
                    desc: "Receive organized Travel Cards"
                },
                {
                    number: "4",
                    icon: "✈️",
                    title: "Travel",
                    desc: "Book directly & enjoy your trip"
                }
            ]
        }
    },

    // Slide 5: AI Chatbot Logic
    {
        id: 5,
        title: "AI Chatbot Logic",
        type: "modes-slide",
        content: {
            intro: "Three intelligent modes for every travel need:",
            modes: [
                {
                    icon: "💡",
                    title: "Inspire Mode",
                    color: "cyan",
                    desc: "Not sure where to go? Let AI suggest destinations based on your interests, budget, and travel style.",
                    example: "\"I want a beach vacation under €1000\""
                },
                {
                    icon: "🗺️",
                    title: "Plan Mode",
                    color: "teal",
                    desc: "Have a destination? AI creates detailed day-by-day itineraries with activities, restaurants, and hidden gems.",
                    example: "\"Plan 5 days in Barcelona\""
                },
                {
                    icon: "🎫",
                    title: "Book Mode",
                    color: "primary",
                    desc: "Ready to go? Connect directly to booking partners for flights, hotels, and experiences.",
                    example: "\"Book my Italian adventure\""
                }
            ]
        }
    },

    // Slide 6: Travel Cards & Travel Notes
    {
        id: 6,
        title: "Travel Cards & Travel Notes",
        type: "cards-slide",
        content: {
            travelCards: {
                title: "Travel Cards",
                icon: "🗂️",
                desc: "Beautiful, organized destination summaries",
                features: [
                    "Destination highlights",
                    "Best time to visit",
                    "Budget estimates",
                    "Top experiences",
                    "Local tips"
                ]
            },
            travelNotes: {
                title: "Travel Notes",
                icon: "📝",
                desc: "Detailed personal travel journals",
                features: [
                    "Day-by-day itinerary",
                    "Personal recommendations",
                    "Photo memories",
                    "Expense tracking",
                    "Shareable format"
                ]
            },
            highlight: "Save, share, and revisit your adventures"
        }
    },

    // Slide 7: Social Discovery
    {
        id: 7,
        title: "Social Discovery",
        type: "social-slide",
        content: {
            badge: "Future Vision",
            mainTitle: "Travel Meets Social",
            features: [
                {
                    icon: "👥",
                    title: "Community Feed",
                    desc: "Discover trips from travelers with similar interests"
                },
                {
                    icon: "⭐",
                    title: "Creator Profiles",
                    desc: "Follow travel experts and influencers"
                },
                {
                    icon: "🔄",
                    title: "Share & Inspire",
                    desc: "Post your Travel Cards for others to use"
                },
                {
                    icon: "💬",
                    title: "Travel Chat",
                    desc: "Connect with fellow travelers"
                }
            ],
            quote: "\"Discover your next adventure through the experiences of others\""
        }
    },

    // Slide 8: Personalization & Learning
    {
        id: 8,
        title: "Personalization & Learning",
        type: "personalization-slide",
        content: {
            mainMessage: "AI That Knows You",
            features: [
                {
                    icon: "🎯",
                    title: "Preference Learning",
                    desc: "Every interaction teaches the AI your travel style"
                },
                {
                    icon: "📊",
                    title: "Smart Recommendations",
                    desc: "Better suggestions over time based on your history"
                },
                {
                    icon: "🏷️",
                    title: "Interest Tags",
                    desc: "Adventure, culture, food, relaxation — AI remembers"
                },
                {
                    icon: "💰",
                    title: "Budget Awareness",
                    desc: "Recommendations that match your spending comfort"
                }
            ],
            stats: [
                { value: "95%", label: "Match Accuracy" },
                { value: "3x", label: "Faster Planning" },
                { value: "40%", label: "Cost Savings" }
            ]
        }
    },

    // Slide 9: User Levels & Engagement
    {
        id: 9,
        title: "User Levels & Engagement",
        type: "levels-slide",
        content: {
            intro: "Gamified experience that rewards exploration",
            levels: [
                {
                    level: 1,
                    name: "Explorer",
                    icon: "🌱",
                    xp: "0-500 XP",
                    perks: ["Basic AI features", "5 Travel Cards/month"]
                },
                {
                    level: 2,
                    name: "Adventurer",
                    icon: "🏔️",
                    xp: "500-2000 XP",
                    perks: ["Priority support", "15 Travel Cards/month", "Early access"]
                },
                {
                    level: 3,
                    name: "Voyager",
                    icon: "🌍",
                    xp: "2000-5000 XP",
                    perks: ["Exclusive deals", "Unlimited Cards", "Creator tools"]
                },
                {
                    level: 4,
                    name: "Legend",
                    icon: "👑",
                    xp: "5000+ XP",
                    perks: ["VIP experiences", "Revenue sharing", "Beta features"]
                }
            ],
            earnXP: ["Complete trips", "Share Cards", "Write reviews", "Refer friends"]
        }
    },

    // Slide 10: Business Model Overview
    {
        id: 10,
        title: "Business Model Overview",
        type: "business-slide",
        content: {
            subtitle: "Multiple Revenue Streams",
            models: [
                {
                    icon: "💳",
                    title: "Subscriptions",
                    desc: "Premium tiers for power travelers",
                    revenue: "40%"
                },
                {
                    icon: "🎨",
                    title: "Creator Marketplace",
                    desc: "Commission on Travel Card sales",
                    revenue: "25%"
                },
                {
                    icon: "🏢",
                    title: "B2B Partnerships",
                    desc: "API & white-label solutions",
                    revenue: "20%"
                },
                {
                    icon: "🔗",
                    title: "Affiliate Revenue",
                    desc: "Booking partner commissions",
                    revenue: "15%"
                }
            ]
        }
    },

    // Slide 11: Subscription Model
    {
        id: 11,
        title: "Subscription Model",
        type: "pricing-slide",
        content: {
            tiers: [
                {
                    name: "Free",
                    price: "€0",
                    period: "forever",
                    icon: "🆓",
                    features: [
                        "5 AI conversations/month",
                        "3 Travel Cards",
                        "Basic recommendations",
                        "Community access"
                    ],
                    highlighted: false
                },
                {
                    name: "Explorer",
                    price: "€9.99",
                    period: "/month",
                    icon: "🚀",
                    features: [
                        "Unlimited AI conversations",
                        "25 Travel Cards",
                        "Advanced personalization",
                        "Priority support",
                        "Early access features"
                    ],
                    highlighted: true
                },
                {
                    name: "Pro",
                    price: "€19.99",
                    period: "/month",
                    icon: "⭐",
                    features: [
                        "Everything in Explorer",
                        "Unlimited Travel Cards",
                        "Creator marketplace access",
                        "Revenue sharing",
                        "API access",
                        "White-label options"
                    ],
                    highlighted: false
                }
            ]
        }
    },

    // Slide 12: Creator Marketplace
    {
        id: 12,
        title: "Creator Marketplace",
        type: "marketplace-slide",
        content: {
            headline: "Turn Travel Experience Into Income",
            forCreators: {
                title: "For Creators",
                icon: "✨",
                benefits: [
                    "Sell your Travel Cards",
                    "Build your following",
                    "Earn 70% commission",
                    "Exclusive creator tools"
                ]
            },
            forTravelers: {
                title: "For Travelers",
                icon: "🎒",
                benefits: [
                    "Access expert itineraries",
                    "One-click trip adoption",
                    "Verified recommendations",
                    "Save hours of planning"
                ]
            },
            stats: [
                { value: "€5-50", label: "Card Price Range" },
                { value: "70%", label: "Creator Commission" },
                { value: "1M+", label: "Potential Creators" }
            ]
        }
    },

    // Slide 13: B2B Revenue
    {
        id: 13,
        title: "B2B Revenue",
        type: "b2b-slide",
        content: {
            subtitle: "Enterprise Solutions",
            solutions: [
                {
                    icon: "🏨",
                    title: "Hotels & Resorts",
                    desc: "Integrate AI concierge into guest apps"
                },
                {
                    icon: "✈️",
                    title: "Airlines",
                    desc: "In-flight destination planning experience"
                },
                {
                    icon: "🏦",
                    title: "Banks & Cards",
                    desc: "Travel perks for premium cardholders"
                },
                {
                    icon: "🌐",
                    title: "OTAs",
                    desc: "AI-powered travel recommendation API"
                }
            ],
            pricing: [
                { tier: "API Access", price: "€500/month" },
                { tier: "White Label", price: "€2,000/month" },
                { tier: "Enterprise", price: "Custom" }
            ]
        }
    },

    // Slide 14: Revenue Potential
    {
        id: 14,
        title: "Revenue Potential",
        type: "revenue-slide",
        content: {
            headline: "Projected Annual Revenue",
            totalRevenue: "€16M",
            year: "Year 3",
            breakdown: [
                {
                    source: "Subscriptions",
                    amount: "€6.4M",
                    percentage: 40,
                    details: "200K paying users @ €32/year avg"
                },
                {
                    source: "Creator Marketplace",
                    amount: "€4M",
                    percentage: 25,
                    details: "30% commission on €13.3M GMV"
                },
                {
                    source: "B2B Solutions",
                    amount: "€3.2M",
                    percentage: 20,
                    details: "50 enterprise clients @ €64K/year"
                },
                {
                    source: "Affiliate Revenue",
                    amount: "€2.4M",
                    percentage: 15,
                    details: "€80M booking value @ 3% commission"
                }
            ]
        }
    },

    // Slide 15: Competitive Advantage
    {
        id: 15,
        title: "Competitive Advantage",
        type: "advantage-slide",
        content: {
            intro: "Why MOBIX Wins",
            advantages: [
                {
                    icon: "🧠",
                    title: "True AI Understanding",
                    desc: "Not just search — actual comprehension of travel desires",
                    vsOthers: "Others: Keyword matching"
                },
                {
                    icon: "🎯",
                    title: "Hyper-Personalization",
                    desc: "Learning system that improves with every interaction",
                    vsOthers: "Others: Static recommendations"
                },
                {
                    icon: "📱",
                    title: "All-in-One Platform",
                    desc: "Inspire → Plan → Book in one seamless experience",
                    vsOthers: "Others: Fragmented tools"
                },
                {
                    icon: "👥",
                    title: "Social Layer",
                    desc: "Community-driven discovery and sharing",
                    vsOthers: "Others: Isolated experience"
                }
            ],
            competitors: ["TripAdvisor", "Booking.com", "Google Travel", "Expedia"]
        }
    },

    // Slide 16: Vision
    {
        id: 16,
        title: "Our Vision",
        type: "vision-slide",
        content: {
            quote: "\"To make extraordinary travel experiences accessible to everyone through the power of AI.\"",
            milestones: [
                {
                    year: "2024",
                    title: "The Idea",
                    desc: "Concept born from personal travel frustrations"
                },
                {
                    year: "2025",
                    title: "First Demo",
                    desc: "Working prototype developed independently"
                },
                {
                    year: "2026",
                    title: "Full Version",
                    desc: "Complete platform with all features"
                },
                {
                    year: "2027",
                    title: "Expand",
                    desc: "Global reach & market leadership"
                }
            ],
            mission: "Democratizing travel planning through artificial intelligence"
        }
    },

    // Slide 17: Final Slide
    {
        id: 17,
        title: "Thank You",
        type: "final-slide",
        content: {
            headline: "Any Questions?",
            tagline: "MOBIX — Your AI Travel Companion",
            cta: "Let's Connect",
            presenter: {
                name: "Leon Kreso",
                university: "University of Rijeka",
                faculty: "FTHM"
            },
            contact: {
                email: "leonkreso784@gmail.com",
                github: "github.com/leonkreso784-bit"
            },
            demo: "mobix-travel-demo.vercel.app"
        }
    }
];

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = slidesData;
}
