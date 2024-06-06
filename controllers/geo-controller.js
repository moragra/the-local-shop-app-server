const knex = require("knex")(require("../knexfile"));

async function postGeo(req, res) {
  const {
    user_id,
    geoData
  } = req.body;

  const business = await knex('business').where('user_id', user_id).first()
  if(!business){
    return res.status(400).send('Invalid business')
  }
  
  const business_id = business.id
  const data = {business_id , geoData}
  console.log(data)
  try {
    await knex('geos').insert(data)
    res.status(201).json('Posted sucessfully')
  } catch (error) {
    res.status(500).json({error})
  }
}

async function getAllGeos(_req, res){
  try {
    const allGeos = await knex('geos')
    res.status(201).json(allGeos)
  } catch (error) {
    res.status(500).json({error})
  }
}

module.exports = {
  postGeo,
  getAllGeos
};
