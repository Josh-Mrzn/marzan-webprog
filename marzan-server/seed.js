require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Article = require('./models/Article');

const SEED_USERS = [
  {
    firstName: 'Alicia',
    lastName: 'Reyes',
    age: '29',
    gender: 'female',
    contactNumber: '09171234567',
    email: 'alicia.reyes@marzan.dev',
    type: 'admin',
    username: 'aliciareyes',
    password: 'Alicia123!',
    address: 'Sampaloc, Manila, Metro Manila',
    isActive: true,
  },
  {
    firstName: 'Marco',
    lastName: 'Santos',
    age: '31',
    gender: 'male',
    contactNumber: '09182345678',
    email: 'marco.santos@marzan.dev',
    type: 'viewer',
    username: 'marcosantos',
    password: 'Marco123!',
    address: 'Tondo, Manila, Metro Manila',
    isActive: true,
  },
  {
    firstName: 'Bianca',
    lastName: 'Cruz',
    age: '26',
    gender: 'female',
    contactNumber: '09193456789',
    email: 'bianca.cruz@marzan.dev',
    type: 'editor',
    username: 'biancacruz',
    password: 'Bianca123!',
    address: 'Quezon City, Metro Manila',
    isActive: true,
  },
];

const SEED_ARTICLES = [
  {
    slug: 'find-your-perfect-pet',
    title: 'Find Your Perfect Pet',
    paragraphs: [
      'Discover how to choose the right dog or cat for your lifestyle.',
      'We explain breed temperament, energy levels, and the best match for your home.',
      'The right adoption choice means a happier pet and a stronger bond from day one.',
    ],
    preview: 'Discover how to choose the right dog or cat for your lifestyle.',
    status: 'active',
  },
  {
    slug: 'adoption-process-made-easy',
    title: 'Adoption Process Made Easy',
    paragraphs: [
      'Learn the steps to adopt confidently, from application to welcome day.',
      'Prepare your home, understand shelter requirements, and support your new pet’s transition.',
      'A smooth adoption journey helps rescue pets settle into a loving forever home.',
    ],
    preview: 'Learn the steps to adopt confidently, from application to welcome day.',
    status: 'active',
  },
  {
    slug: 'essential-care-tips-for-rescue-pets',
    title: 'Essential Care Tips for Rescue Pets',
    paragraphs: [
      'Get practical advice on feeding, grooming, and bonding with your new companion.',
      'Create a safe, nurturing environment to support your rescue pet’s health and happiness.',
      'Consistent care and gentle routines help build trust and lasting joy together.',
    ],
    preview: 'Get practical advice on feeding, grooming, and bonding with your new companion.',
    status: 'active',
  },
];

const seed = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    const hashedUsers = await Promise.all(
      SEED_USERS.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      })),
    );
    await User.insertMany(hashedUsers);
    console.log(`Seeded ${hashedUsers.length} users.`);

    await Article.deleteMany({});
    await Article.insertMany(SEED_ARTICLES);
    console.log(`Seeded ${SEED_ARTICLES.length} articles.`);

    await mongoose.connection.close();
    console.log('Seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error(`Seed error: ${error.message}`);
    process.exit(1);
  }
};

seed();
