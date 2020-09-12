import * as express from 'express';
import * as path from 'path';
import * as hbs from 'hbs';
import * as services from './utils/services';

const app = express();

const author = {
	name: 'Akash Mondal',
	username: 'Akash98Sky',
	link: 'https://github.com/Akash98Sky',
	facebook: 'https://www.facebook.com/akash.mondal.332',
	twitter: 'https://twitter.com/Akash98Sky',
	linkedin: 'https://www.linkedin.com/in/akash-mondal-a16101173',
}

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		author
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Ask for Help',
		author
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		author
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address'
		});
	}

	const address = req.query.address as string;

	services.geolocation(address, (error, location) => {
		if (error) {
			return res.send({ error });
		}

		services.weather(location, (error, weather) => {
			if (error) {
				return res.send({ error });
			}

			const current = weather.current;

			res.send({
				address: address,
				location,
				current_weather: current,
				forecast: "It's currently " + current.temp + " degrees out. There is " + current.clouds + "% chance of rain."
			});
		})
	});
});

app.get('/help/*', (req, res) => {
	res.render('error', {
		title: 'ERROR 404',
		message: 'Help article not found',
		author
	});
});

app.get('*', (req, res) => {
	res.render('error', {
		title: 'ERROR 404',
		message: 'Page not found',
		author
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000.');
});