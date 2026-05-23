const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    paragraphs: {
      type: [String],
      default: [],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: 'At least one paragraph is required.',
      },
    },
    preview: { type: String, default: '', trim: true },
    imageUrl: { type: String, default: '', trim: true },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true },
);

articleSchema.pre('save', function (next) {
  if (!this.preview && Array.isArray(this.paragraphs) && this.paragraphs.length > 0) {
    this.preview = String(this.paragraphs[0]).slice(0, 240);
  }
  next();
});

module.exports =
  mongoose.models.Article || mongoose.model('Article', articleSchema);
