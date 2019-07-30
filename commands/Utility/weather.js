const got = require('got');
const countries = require('country-data').countries.all;

const makeURL = (city) => `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(city)}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
const celsius = (fahrenheit) => Math.round(((fahrenheit - 32) * 5) / 9);

const spacer = {
    name: '\u200b',
    value: '\u200b',
};

exports.run = async (bot, msg, args) => {
    if (args.length < 1) {
        throw 'S\'il vous plaît veuillez fournir une ville.';
    }

    const city = args.join(' ');
    const res = await got(makeURL(city), { json: true });

    if (!res || !res.body || !res.body.query || !res.body.query.results || !res.body.query.results.channel) {
        throw 'Échec du chargement des informations météorologiques !';
    }

    const weatherInfo = res.body.query.results.channel;
    const forecast = weatherInfo.item.forecast[0];

    const countryInfo = countries.find(country => country.name === weatherInfo.location.country);
    const countryEmoji = countryInfo ? countryInfo.emoji : ':grey_question:';

    const description = `La température actuelle dans ${weatherInfo.location.city} et de :\n${celsius(weatherInfo.item.condition.temp)}°C`;

    const embed = bot.utils.embed(`${countryEmoji} ${weatherInfo.item.title}`, description, [
        {
            name: 'Condition',
            value: weatherInfo.item.condition.text
        },
        {
            name: 'Humidité',
            value: weatherInfo.atmosphere.humidity + '%'
        },
        {
            name: ':wind_blowing_face: Vent',
            value: `*${weatherInfo.wind.speed} Klm/h* | Inclinaison: *${weatherInfo.wind.direction}°*`
        },
      
        spacer,
        spacer,
      
        {
            name: `Prévision pour aujourd'hui: *${forecast.text}*`,
            value: `La température la plus élevée: ${celsius(forecast.high)}°C\nla température la plus basse est: ${celsius(forecast.low)}°C`,
        },
        
        spacer,
        spacer,
        spacer,
        spacer,
        
      
        {
            name: ':sunrise: Lever du soleil',
            value: weatherInfo.astronomy.sunrise
        },
        {
            name: ':city_sunset: Coucher du soleil',
            value: weatherInfo.astronomy.sunset
        }
    ], { inline: true });

    msg.channel.send({ embed });
};

exports.info = {
    name: 'meteo',
    usage: 'meteo <city>',
    description: 'Affiche les informations météo pour la ville'
};
