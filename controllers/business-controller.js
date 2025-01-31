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

  // console.log('Received business data:', req.body);

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  // Check all required fields
  if (
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
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Reset the sequence before inserting
    await db.raw('SELECT setval(\'business_id_seq\', (SELECT MAX(id) FROM business))');
    
    // First check if user exists
    const user = await db('users').where('id', user_id).first();
    if (!user) {
      return res.status(400).json({ error: 'Invalid user' });
    }

    // Check if user already has a business
    const existingBusiness = await db('business').where('user_id', user_id).first();
    if (existingBusiness) {
      return res.status(400).json({ error: 'User already has a registered business' });
    }

    // Validate email and phone
    if (!emailIsValid(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validatePhoneNumber(phone)) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Create business with specific fields only
    const businessData = {
      user_id,
      shop_name,
      category,
      email,
      phone,
      address: JSON.stringify(address), // Convert address object to JSON string
      about,
      website_url,
      ig_url,
      fb_url,
      x_url,
      li_url,
      consent: consent === 'on' ? true : false
    };

    // Insert and get the ID as a number
    const result = await db('business')
      .insert(businessData)
      .returning('id');
    
    const businessId = result[0].id; // Access the id property of the first returned object
    
    // Fetch the newly created business
    const newBusiness = await db('business')
      .where('id', businessId)
      .first();
    
    res.status(201).json(newBusiness);
  } catch (error) {
    console.error('Error creating business:', error);
    res.status(500).json({
      error: "We are sorry, we can't post your business at the moment",
      details: error.message
    });
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
