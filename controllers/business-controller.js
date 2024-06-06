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

  const user = await knex('users').where('id', user_id).first()
  if(!user){
    return res.status(400).send('Invalid user')
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

async function getBusiness(req, res){
  const {user_id} = req.params
  const user = await knex('users').where('id', user_id).first()
  if(!user){
    return res.status(400).send('Invalid user')
  }
  try {
    const business = await knex('business').where('user_id', user_id).first()
    res.status(201).json(business)
  } catch (error) {
    res.status(500).json("We are sorry, we can't retrieve your business at the moment:", error)
  }
}

async function getAllBusiness(req, res){
  try {
    const allBusiness = await knex('business')
    res.status(201).json(allBusiness)
  } catch (error) {
    res.status(500).json("We are sorry, we can't retrieve all business at the moment:", error)
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
  postBusiness,
  getBusiness,
  getAllBusiness
};
