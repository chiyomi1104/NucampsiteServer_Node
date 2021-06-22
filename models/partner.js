const mongoose = require('mongoose')
const Schema = mongoose.Schema

require('mongoose-currency').loadType(mongoose)

const partnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
    },
    description: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      UpdatedAt: 'updated_at',
    },
  }
)

const Partner = mongoose.model('Partner', partnerSchema)

module.exports = Partner
