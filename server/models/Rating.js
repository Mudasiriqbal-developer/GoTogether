const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  reviewee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  ride: {
    type: mongoose.Schema.ObjectId,
    ref: 'Ride',
    required: true
  },
  booking: {
    type: mongoose.Schema.ObjectId,
    ref: 'Booking',
    required: true
  },
  stars: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5']
  },
  comment: {
    type: String,
    maxlength: [500, 'Comment can not be more than 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent user from submitting more than one rating per ride for the same person
ratingSchema.index({ reviewer: 1, reviewee: 1, ride: 1 }, { unique: true });

// Static method to get avg rating and save
ratingSchema.statics.getAverageRating = async function (userId) {
  const obj = await this.aggregate([
    {
      $match: { reviewee: userId }
    },
    {
      $group: {
        _id: '$reviewee',
        avgRating: { $avg: '$stars' },
        totalRatings: { $sum: 1 }
      }
    }
  ]);

  try {
    await this.model('User').findByIdAndUpdate(userId, {
      avgRating: obj[0] ? obj[0].avgRating : 0,
      totalRatings: obj[0] ? obj[0].totalRatings : 0
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
ratingSchema.post('save', function () {
  this.constructor.getAverageRating(this.reviewee);
});

// Call getAverageRating before remove
ratingSchema.pre('deleteOne', { document: true, query: false }, function () {
  this.constructor.getAverageRating(this.reviewee);
});

module.exports = mongoose.model('Rating', ratingSchema);
