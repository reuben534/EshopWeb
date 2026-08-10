import bcrypt from 'bcryptjs';

const users = [
  {
    id: 1,
    firstName: 'Reuben',
    lastName: 'Kgobe',
    email: 'admin@electrohub.dev',
    passwordHash: bcrypt.hashSync('Admin123!', 10),
    role: 'admin',
    addresses: [],
    wishlist: [],
    createdAt: new Date().toISOString()
  }
];

export default users;
