import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// We dynamically import the data since it's an ES Module
import { hotels, packages } from '../src/data/hotels.js';

async function seedData() {
  console.log('Seeding Supabase Database...');

  // 1. Insert Hotels and capture their new IDs to link Rooms
  for (const hotel of hotels) {
    const { id: oldId, rooms, ...hotelData } = hotel;
    
    // Insert Hotel
    const { data: newHotel, error: hotelError } = await supabase
      .from('hotels')
      .insert({
        name: hotelData.name,
        type: hotelData.type,
        location: hotelData.location,
        price: hotelData.price,
        tatkalPrice: hotelData.tatkalPrice,
        availability: hotelData.availability,
        totalRooms: hotelData.totalRooms,
        rating: hotelData.rating,
        image: hotelData.image,
        amenities: hotelData.amenities
      })
      .select()
      .single();

    if (hotelError) {
      console.error(`Error inserting hotel ${hotelData.name}:`, hotelError.message);
      continue;
    }

    console.log(`Inserted hotel: ${newHotel.name}`);

    // Insert Rooms for this Hotel
    if (rooms && rooms.length > 0) {
      const roomsData = rooms.map(room => ({
        hotel_id: newHotel.id,
        type: room.type,
        price: room.price,
        capacity: room.capacity
      }));

      const { error: roomError } = await supabase
        .from('rooms')
        .insert(roomsData);

      if (roomError) {
        console.error(`Error inserting rooms for ${newHotel.name}:`, roomError.message);
      } else {
        console.log(`  Inserted ${rooms.length} rooms for ${newHotel.name}`);
      }
    }
  }

  // 2. Insert Packages
  for (const pkg of packages) {
    const { id: oldId, ...pkgData } = pkg;
    
    const { error: pkgError } = await supabase
      .from('packages')
      .insert(pkgData);
      
    if (pkgError) {
      console.error(`Error inserting package ${pkgData.title}:`, pkgError.message);
    } else {
      console.log(`Inserted package: ${pkgData.title}`);
    }
  }

  console.log('Seeding complete! You can now use Supabase for data fetching.');
}

seedData().catch(console.error);
