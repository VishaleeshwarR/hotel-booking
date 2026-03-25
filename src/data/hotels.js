
export const hotels = [
    {
        id: 1,
        name: "Azure Horizon Resort",
        type: "Resort",
        location: "Maldives",
        price: 450,
        tatkalPrice: 380, // Discounted for last minute to fill rooms
        availability: 12,
        totalRooms: 50,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1571896349842-6e5c48dc52e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        amenities: ["Pool", "Spa", "Beach Access", "Water Villa"],
        rooms: [
            { type: "Ocean View Suite", price: 450, capacity: 2 },
            { type: "Water Villa", price: 750, capacity: 4 },
            { type: "Garden Room", price: 300, capacity: 2 }
        ]
    },
    {
        id: 2,
        name: "Urban Heights",
        type: "Business",
        location: "New York",
        price: 220,
        tatkalPrice: 200,
        availability: 5,
        totalRooms: 120,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        amenities: ["WiFi", "Conference Room", "Gym", "Rooftop Bar"],
        rooms: [
            { type: "Standard King", price: 220, capacity: 2 },
            { type: "Executive Suite", price: 350, capacity: 2 },
            { type: "Twin Room", price: 200, capacity: 2 }
        ]
    },
    {
        id: 3,
        name: "Sapphire Grand",
        type: "Luxury",
        location: "Dubai",
        price: 800,
        tatkalPrice: 750,
        availability: 25,
        totalRooms: 200,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        amenities: ["Sky Pool", "Butler Service", "Helipad", "Gold Lounge"],
        rooms: [
            { type: "Royal Suite", price: 1500, capacity: 4 },
            { type: "Deluxe King", price: 800, capacity: 2 }
        ]
    },
    {
        id: 4,
        name: "Cozy Backpacker Hostel",
        type: "Hostel",
        location: "Berlin",
        price: 45,
        tatkalPrice: 35,
        availability: 0,
        totalRooms: 40,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        amenities: ["Shared Kitchen", "Bunk Beds", "Lounge", "Bar Crawls"],
        rooms: [
            { type: "Dorm Bed (6-person)", price: 45, capacity: 1 },
            { type: "Private Room", price: 90, capacity: 2 }
        ]
    },
    {
        id: 5,
        name: "Green Valley Retreat",
        type: "Resort",
        location: "Bali",
        price: 180,
        tatkalPrice: 150,
        availability: 3,
        totalRooms: 30,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        amenities: ["Yoga Deck", "Organic Food", "Nature Trails"],
        rooms: [
            { type: "Bamboo Hut", price: 180, capacity: 2 },
            { type: "Forest Villa", price: 250, capacity: 4 }
        ]
    },
    {
        id: 6,
        name: "Tech Hub Inn",
        type: "Business",
        location: "San Francisco",
        price: 300,
        tatkalPrice: 280,
        availability: 0,
        totalRooms: 80,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        amenities: ["High-speed Net", "Co-working space", "Nap Pods"],
        rooms: [
            { type: "Standard Room", price: 300, capacity: 2 }
        ]
    }
];

export const packages = [
    {
        id: 1,
        title: "Romantic Getaway",
        price: 1200,
        duration: "3 Days, 2 Nights",
        includes: ["Ocean View Suite", "Candlelight Dinner", "Couples Spa", "Airport Transfer"],
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Digital Nomad Week",
        price: 500,
        duration: "7 Days",
        includes: ["High-Speed WiFi", "Co-working Access", "Breakfast", "Coffee Unlimited"],
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Adventure & Thrill",
        price: 800,
        duration: "4 Days, 3 Nights",
        includes: ["Forest Villa", "Hiking Guide", "Rafting Trip", "All Meals"],
        image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];
