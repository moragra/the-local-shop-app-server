const db = require('../db')

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

  const user = await db('users').where('id', user_id).first()
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
    const business = await db('business').insert(req.body)
    const newBusiness = await db('business').where('id', business[0]).first()
    res.status(201).json(newBusiness)
  } catch (error) {
    res.status(500).json({error: "We are sorry, we can't post your business at the moment:"})
  }
}

async function getBusiness(req, res) {
  const {user_id} = req.params
  try {
    const user = await db('users').where('id', user_id).first()
    if(!user) {
      return res.status(400).send('Invalid user')
    }
    
    const business = await db('business').where('user_id', user_id).first()
    if(!business) {
      return res.status(404).json({error: "Business not found"})
    }
    res.status(200).json(business)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({error: "We are sorry, we can't retrieve your business at the moment"})
  }
}

async function searchBusiness(req, res){
  const { shop_name } = req.params
  try {
    const business = await db('business').where('shop_name', shop_name).first()
    if(!business){
      return res.status(400).send('Invalid business')
    } 
    res.status(201).json(business)
  } catch (error) {
    res.status(500).json({error: "We are sorry, we can't retrieve your business at the moment:"})
  } 

}

async function getAllBusiness(req, res) {
  try {
    const allBusiness = await db('business')
    res.status(200).json(allBusiness)
  } catch (error) {
    console.error('Main error:', error)
    res.status(500).json({error: "We are sorry, we can't retrieve businesses at the moment"})
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
  searchBusiness,
  getAllBusiness
};
