const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },  // Added phone number
  city: { type: String, required: true },         // Added city
  password: { type: String, required: true },
  pincode: { type: Number, required: true },  
  role: { type: String, enum: ['user', 'manager'], default: 'user' },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password matching method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
