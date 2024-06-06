const knex = require("knex")(require("../knexfile"));

async function postBusiness(req, res) {
  const {
    user_id,
    shop_name,
    category,
    email,
    phone,
    address,
    about,
    website_url,
    ig_url,
    fb_url,
    x_url,
    li_url,
    consent,
  } = req.body;

  if (
    !user_id,
    !shop_name ||
    !category ||
    !email ||
    !phone ||
    !address ||
    !about ||
    !website_url ||
    !ig_url ||
    !fb_url ||
    !x_url ||
    !li_url ||
    !consent
  ) {
    res.sendStatus(400);
  }

  if (email) {
    if (!emailIsValid(email)) {
      return res.sendStatus(400);
    }
  }
  if (phone) {
    if (!validatePhoneNumber(phone)) {
      return res.sendStatus(400);
    }
  }

  try {
    const business = await knex('business').insert(req.body)
    const newBusiness = await knex('business').where('id', business[0]).first()
    res.status(201).json(newBusiness)
  } catch (error) {
    res.status(500).json("We are sorry, we can't post your business at the moment:", error)
  }
}

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhoneNumber(phoneNumber) {
  return /^(\+?[0-9]{1,4}[-.\s]?\(?[0-9]{1,3}\)?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9})$/.test(
    phoneNumber
  );
}

module.exports = {
  postBusiness
};
