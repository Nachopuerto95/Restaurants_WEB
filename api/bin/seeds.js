require('dotenv').config();
const mongoose = require('mongoose');
const { Client } = require('@googlemaps/google-maps-services-js');
const Restaurant = require('../models/restaurant.model')

const barriosMadrid = [
  { nombre: 'Chamberí', lat: 40.4344, lng: -3.7038 },
  { nombre: 'Salamanca', lat: 40.4300, lng: -3.6794 },
  { nombre: 'La Latina', lat: 40.4119, lng: -3.7089 },
  { nombre: 'Arganzuela', lat: 40.3972, lng: -3.6945 },
  { nombre: 'Tetuán', lat: 40.4590, lng: -3.6985 },
  { nombre: 'Retiro', lat: 40.4153, lng: -3.6830 },
  { nombre: 'Centro', lat: 40.4170, lng: -3.7033 },
  { nombre: 'Moncloa-Aravaca', lat: 40.4380, lng: -3.7199 },
  { nombre: 'Carabanchel', lat: 40.3832, lng: -3.7391 },
  { nombre: 'Usera', lat: 40.3820, lng: -3.7096 },
  { nombre: 'Puente de Vallecas', lat: 40.3870, lng: -3.6696 },
  { nombre: 'Ciudad Lineal', lat: 40.4459, lng: -3.6469 },
  { nombre: 'San Blas-Canillejas', lat: 40.4329, lng: -3.6256 },
  { nombre: 'Hortaleza', lat: 40.4693, lng: -3.6437 },
  { nombre: 'Villaverde', lat: 40.3504, lng: -3.7000 },
  { nombre: 'Vicálvaro', lat: 40.4076, lng: -3.6081 },
  { nombre: 'Moratalaz', lat: 40.4073, lng: -3.6578 },
  { nombre: 'Barajas', lat: 40.4724, lng: -3.5794 },
  { nombre: 'Fuencarral-El Pardo', lat: 40.4933, lng: -3.7072 },
  { nombre: 'Latina', lat: 40.3906, lng: -3.7457 },
];

const client = new Client({});


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 60000, // Aumentar el timeout a 60 segundos
  socketTimeoutMS: 60000
});


// // Conectar a MongoDB
// mongoose.connect(process.env.MONGODB_URI);

// // Definir el esquema y modelo de restaurante

// // Instanciar el cliente de Google Maps

// let allRestaurants = []; // Para almacenar todos los resultados

// // Función para guardar restaurantes en MongoDB
// async function saveRestaurants(places, barrio) {
//   for (const place of places) {

//     try {
//       await Restaurant.create(place);
//       console.log(`Restaurante guardado en ${barrio}: ${place.name}`);
//     } catch (error) {
//       if (error.code === 11000) {
//         console.log(`Restaurante duplicado en ${barrio}: ${place.name}, no se guardó.`);
//       } else {
//         console.error('Error al guardar restaurante:', error);
//       }
//     }
//   }
// }

// // Función para obtener restaurantes en un barrio utilizando placesNearby
// async function fetchRestaurants(barrio, location, pageToken = '', totalFetched = 0, maxResults = 60) {
//   try {
//     const response = await client.placesNearby({
//       params: {
//         location: location, // Coordenadas del barrio
//         radius: 1000, // Radio de búsqueda (en metros)
//         type: 'restaurant', // Buscar restaurantes
//         key: process.env.GOOGLE_MAPS_API_KEY,
//         pagetoken: pageToken, // Token de la siguiente página
//       },
//     });

//     const places = response.data.results;
//     allRestaurants = allRestaurants.concat(places);
//     await saveRestaurants(places, barrio);

//     totalFetched += places.length;

//     // Si aún no se ha alcanzado el límite de resultados deseados y hay más páginas, continuar
//     if (response.data.next_page_token && totalFetched < maxResults) {
//       console.log(`Cargando más resultados de ${barrio}... Total actual: ${totalFetched}`);
//       setTimeout(() => {
//         fetchRestaurants(barrio, location, response.data.next_page_token, totalFetched, maxResults);
//       }, 2000); // Espera de 2 segundos antes de solicitar más resultados
//     } else {
//       console.log(`Se han guardado ${totalFetched} restaurantes en ${barrio}.`);
//     }
//   } catch (error) {
//     console.error(`Error al obtener los restaurantes en ${barrio}:`, error);
//   }
// }

// // Ejecutar búsquedas en todos los barrios
// (async function() {
//   for (const barrio of barriosMadrid) {
//     const location = { lat: barrio.lat, lng: barrio.lng };
//     await fetchRestaurants(barrio.nombre, location);
//   }

//   mongoose.connection.close(); // Cerrar la conexión a MongoDB cuando se completen todas las búsquedas
// })();





// // Eliminar duplicados basados en el campo `place_id`
// async function removeDuplicates() {
//   try {
//     const duplicates = await Restaurant.aggregate([
//       {
//         $group: {
//           _id: "$name",
//           count: { $sum: 1 },
//           docs: { $push: "$_id" }
//         }
//       },
//       {
//         $match: {
//           count: { $gt: 1 }
//         }
//       }
//     ]);

//     // Manejo de los duplicados en lotes
//     const batchSize = 100; // Procesar en lotes de 100
//     for (let i = 0; i < duplicates.length; i += batchSize) {
//       const batch = duplicates.slice(i, i + batchSize);

//       for (let doc of batch) {
//         doc.docs.shift(); // Mantener el primer documento
//         await Restaurant.deleteMany({ _id: { $in: doc.docs } }); // Eliminar los demás
//       }

//       console.log(`Procesado lote ${i / batchSize + 1} de duplicados`);
//     }

//     console.log('Duplicados eliminados');
//   } catch (error) {
//     console.error('Error al eliminar duplicados:', error);
//   }
// }

// // Llamar a la función para eliminar duplicados
// removeDuplicates();










// async function fetchDetailsAndUpdate() {
//   try {
//     // Obtener todos los restaurantes de MongoDB con sus place_id
//     const restaurants = await Restaurant.find({}, { place_id: 1, name: 1 });

//     for (const restaurant of restaurants) {
//       const placeId = restaurant.place_id;

//       // Realizar la solicitud a la API de Google Places para obtener más detalles
//       const response = await client.placeDetails({
//         params: {
//           place_id: placeId,
//           key: process.env.GOOGLE_MAPS_API_KEY,
//           fields: ['name', 'formatted_address', 'opening_hours', 'website', 'formatted_phone_number', 'reviews']
//         }
//       });

//       const details = response.data.result;

//       // Limitar las reseñas a un máximo de 10
//       const limitedReviews = (details.reviews || []).slice(0, 10);

//       // Actualizar el documento en MongoDB con los nuevos datos obtenidos
//       await Restaurant.updateOne(
//         { place_id: placeId },
//         {
//           $set: {
//             opening_hours: details.opening_hours || null,
//             photos: details.photos || [],
//             types: details.types || [], // Esto representará el tipo de comida
//             website: details.website || null,
//             phone_number: details.formatted_phone_number || null,
//             reviews: limitedReviews // Limitar las reseñas a 10
//           }
//         }
//       );

//       console.log(`Restaurante actualizado: ${restaurant.name}`);
//     }

//     console.log('Actualización completa de todos los restaurantes');
//   } catch (error) {
//     console.error('Error al actualizar los detalles de los restaurantes:', error);
//   }
// }

// // Llamar a la función para actualizar los detalles
// fetchDetailsAndUpdate();








async function fetchCoordinatesAndUpdate() {
  try {
    // Obtener todos los restaurantes de MongoDB con sus place_id
    const restaurants = await Restaurant.find({}, { place_id: 1, name: 1 });

    for (const restaurant of restaurants) {
      const placeId = restaurant.place_id;

      // Realizar la solicitud a la API de Google Places para obtener más detalles, incluyendo las coordenadas
      const response = await client.placeDetails({
        params: {
          place_id: placeId,
          key: process.env.GOOGLE_MAPS_API_KEY,
          fields: ['geometry'] // Solicitar el campo geometry completo
        }
      });

      // Comprobar si la respuesta es válida
      if (response.data.status !== 'OK') {
        console.error(`Error de Google Places API para el place_id ${placeId}:`, response.data);
        continue;
      }

      const details = response.data.result;

      // Verificar que se ha recibido geometry.location
      if (details.geometry && details.geometry.location) {
        const { lat, lng } = details.geometry.location;

        // Imprimir las coordenadas para asegurarnos de que son correctas
        console.log(`Coordenadas para ${restaurant.name}: Latitud: ${lat}, Loncd gitud: ${lng}`);

        // Si las coordenadas son válidas, actualizamos en MongoDB
        if (lat && lng) {
          await Restaurant.updateOne(
            { place_id: placeId },
            {
              $set: {
                'location': {
                  type: 'Point',
                  coordinates: [lng, lat] // MongoDB requiere formato GeoJSON [lng, lat]
                }
              }
            }
          );
          console.log(`Restaurante actualizado con coordenadas: ${restaurant.name}`);
        } else {
          console.log(`No se pudieron obtener coordenadas válidas para: ${restaurant.name}`);
        }
      } else {
        console.log(`No se encontraron coordenadas para: ${restaurant.name}, response:`, details);
      }
    }

    console.log('Actualización completa de coordenadas de todos los restaurantes');
  } catch (error) {
    console.error('Error al actualizar las coordenadas de los restaurantes:', error.response?.data || error.message);
  }
}

// Llamar a la función para actualizar las coordenadas
fetchCoordinatesAndUpdate();