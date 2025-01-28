/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const businessData = require('../data/business.json');

exports.seed = async function(knex) {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

  await knex('business').del()
  await knex('business').insert([
    {
      "id": 1,
      "user_id": 1,
      "shop_name": "Calgary Fresh Market",
      "category": "groceries",
      "address": {"id": "dXJuOm1ieGFkcjo3NTRiN2ViZS1lZjFhLTRmMzEtYTY5Zi04NGIxNjBjYjY4Mzk", "type": "Feature", "geometry": {"type": "Point", "coordinates": [-114.0716275, 51.0548497]}, "properties": {"name": "Princes Island SW Pk", "context": {"place": {"name": "Calgary", "mapbox_id": "dXJuOm1ieHBsYzpwV2du", "wikidata_id": "Q36312", "translations": {"en": {"name": "Calgary", "language": "en"}}}, "region": {"name": "Alberta", "mapbox_id": "dXJuOm1ieHBsYzpoQ2M", "region_code": "AB", "wikidata_id": "Q1951", "translations": {"en": {"name": "Alberta", "language": "en"}}, "region_code_full": "CA-AB"}, "street": {"name": "Prince's Island Bridge", "mapbox_id": "dXJuOm1ieGFkcjo3NTRiN2ViZS1lZjFhLTRmMzEtYTY5Zi04NGIxNjBjYjY4Mzk"}, "country": {"name": "Canada", "mapbox_id": "dXJuOm1ieHBsYzpJaWM", "wikidata_id": "Q16", "country_code": "CA", "translations": {"en": {"name": "Canada", "language": "en"}}, "country_code_alpha_3": "CAN"}, "postcode": {"name": "T2P 0R1", "mapbox_id": "postcode.8912596773529958"}, "neighborhood": {"name": "Eau Claire", "mapbox_id": "dXJuOm1ieHBsYzpkZ3du", "wikidata_id": "Q5331424", "translations": {"en": {"name": "Eau Claire", "language": "en"}}}}, "mapbox_id": "dXJuOm1ieGFkcjo3NTRiN2ViZS1lZjFhLTRmMzEtYTY5Zi04NGIxNjBjYjY4Mzk", "coordinates": {"latitude": 51.0548497, "longitude": -114.0716275}, "feature_type": "street", "full_address": "Prince's Island Bridge, Calgary, Alberta T2P 0R1, Canada", "name_preferred": "Prince's Island Bridge", "place_formatted": "Calgary, Alberta T2P 0R1, Canada"}},
      "email": "info@calgaryfreshmarket.ca",
      "phone": "+1 403 123 4567",
      "about": "A local grocery store providing fresh produce and organic options.",
      "website_url": "http://www.calgaryfreshmarket.ca",
      "ig_url": "http://instagram.com/calgaryfreshmarket",
      "fb_url": "http://facebook.com/calgaryfreshmarket",
      "x_url": "http://twitter.com/calgaryfreshmarket",
      "li_url": "http://linkedin.com/company/calgaryfreshmarket",
      "consent": 0,
      "created_at": now,
      "updated_at": now
    },
    {
      "id": 2,
      "user_id": 2,
      "shop_name": "Taste of Calgary",
      "category": "restaurant",
      "address": {"id": "dXJuOm1ieGFkcjoyZGU5NjU0Ni1kNDJkLTQyZTYtODY0Mi1mZjAyOTJjNDBiNTg", "type": "Feature", "geometry": {"type": "Point", "coordinates": [-114.087637, 51.039382]}, "properties": {"name": "1122 15 Avenue SW", "context": {"place": {"name": "Calgary", "mapbox_id": "dXJuOm1ieHBsYzpwV2du", "wikidata_id": "Q36312", "translations": {"en": {"name": "Calgary", "language": "en"}}}, "region": {"name": "Alberta", "mapbox_id": "dXJuOm1ieHBsYzpoQ2M", "region_code": "AB", "wikidata_id": "Q1951", "translations": {"en": {"name": "Alberta", "language": "en"}}, "region_code_full": "CA-AB"}, "street": {"name": "15 Avenue SW", "mapbox_id": "dXJuOm1ieGFkcjoyZGU5NjU0Ni1kNDJkLTQyZTYtODY0Mi1mZjAyOTJjNDBiNTg"}, "address": {"name": "1122 15 Avenue SW", "mapbox_id": "dXJuOm1ieGFkcjoyZGU5NjU0Ni1kNDJkLTQyZTYtODY0Mi1mZjAyOTJjNDBiNTg", "street_name": "15 Avenue SW", "address_number": "1122"}, "country": {"name": "Canada", "mapbox_id": "dXJuOm1ieHBsYzpJaWM", "wikidata_id": "Q16", "country_code": "CA", "translations": {"en": {"name": "Canada", "language": "en"}}, "country_code_alpha_3": "CAN"}, "locality": {"name": "Glencoe", "mapbox_id": "dXJuOm1ieHBsYzpCOTlxSnc", "wikidata_id": "Q115978306", "translations": {"en": {"name": "Glencoe", "language": "en"}}}, "postcode": {"name": "T2R 1K5", "mapbox_id": "postcode.538324673214554"}, "neighborhood": {"name": "Beltline", "mapbox_id": "dXJuOm1ieHBsYzpHd3du", "wikidata_id": "Q3889343", "translations": {"en": {"name": "Beltline", "language": "en"}}}}, "mapbox_id": "dXJuOm1ieGFkcjoyZGU5NjU0Ni1kNDJkLTQyZTYtODY0Mi1mZjAyOTJjNDBiNTg", "match_code": {"place": "unmatched", "region": "unmatched", "street": "matched", "country": "inferred", "locality": "not_applicable", "postcode": "unmatched", "confidence": "low", "address_number": "matched"}, "coordinates": {"accuracy": "point", "latitude": 51.039382, "longitude": -114.087637, "routable_points": [{"name": "default", "latitude": 51.039273, "longitude": -114.087644}]}, "feature_type": "address", "full_address": "1122 15 Avenue SW, Calgary, Alberta T2R 1K5, Canada", "name_preferred": "1122 15 Avenue SW", "place_formatted": "Calgary, Alberta T2R 1K5, Canada"}},
      "email": "contact@tasteofcalgary.ca",
      "phone": "+1 403 234 5678",
      "about": "A popular restaurant offering a wide range of local and international cuisines.",
      "website_url": "http://www.tasteofcalgary.ca",
      "ig_url": "http://instagram.com/tasteofcalgary",
      "fb_url": "http://facebook.com/tasteofcalgary",
      "x_url": "http://twitter.com/tasteofcalgary",
      "li_url": "http://linkedin.com/company/tasteofcalgary",
      "consent": 0,
      "created_at": now,
      "updated_at": now
    }
 ]);
};