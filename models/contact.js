const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

// Схема того що ми зберігаємо в базі
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
}
  // Дата створення і дата оновлення
  , { versionKey: false, timestamps: true }
);

// Обробка помилки з невірним записом status
contactSchema.post("save", handleMongooseError);

// Схема того що нам приходить з POST або PUT
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required()
});

// Схема обробки PATCH запиту
const updatePatchSchema = Joi.object({
  favorite: Joi.boolean().required()
});
// Створюємо модель (Клас який працює з колекцією)
const Contact = model("contact", contactSchema);

module.exports = {
  Contact, addSchema,
  updatePatchSchema
};