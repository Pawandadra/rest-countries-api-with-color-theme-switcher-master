document.addEventListener('DOMContentLoaded', async function() {
    const countryDetails = document.getElementById('countryDetails');

    async function fetchCountries() {
        try {
            const response = await fetch('assets/data.json');
            return await response.json();
        } catch (error) {
            console.error('Error fetching countries:', error);
            return [];
        }
    }

    function createCountryLookup(countries) {
        const lookup = {};
        countries.forEach(country => {
            lookup[country.alpha3Code] = country.name;
        });
        return lookup;
    }

    function displayCountryDetails(country, countryLookup) {
        const population = country.population ? country.population.toLocaleString() : 'N/A';
        const currencies = country.currencies ? country.currencies.map(curr => curr.name).join(', ') : 'N/A';
        const languages = country.languages ? country.languages.map(lang => lang.name).join(', ') : 'N/A';
        const topLevelDomain = country.topLevelDomain ? country.topLevelDomain.join(', ') : 'N/A';

        countryDetails.innerHTML = `
            <img src="${country.flags?.png || ''}" alt="Flag of ${country.name}" class="flag">
            <div id="detailsContainer">
                <h1>${country.name}</h1>
                <div id="allDetails">
                    <p class="info"><span class="bold">Native Name:</span> ${country.nativeName || 'N/A'}</p>
                    <p class="info"><span class="bold">Population:</span> ${population}</p>
                    <p class="info"><span class="bold">Region:</span> ${country.region || 'N/A'}</p>
                    <p class="info"><span class="bold">Sub Region:</span> ${country.subregion || 'N/A'}</p>
                    <p class="info"><span class="bold">Capital:</span> ${country.capital || 'N/A'}</p>
                    <p class="info"><span class="bold">Top Level Domain:</span> ${topLevelDomain}</p>
                    <p class="info"><span class="bold">Currencies:</span> ${currencies}</p>
                    <p class="info"><span class="bold">Languages:</span> ${languages}</p>
                </div>
                <p id="borders"><span class="bold">Border Countries:</span></p>
            </div>
        `;

        const bordersContainer = document.getElementById('borders');
        if (country.borders && country.borders.length > 0) {
            country.borders.forEach(code => {
                const borderCountryName = countryLookup[code] || code;
                const button = document.createElement('button');
                button.type = 'button';
                button.textContent = borderCountryName;
                button.setAttribute('data-code', code);
                button.addEventListener('click', function() {
                    const countryName = encodeURIComponent(borderCountryName.toLowerCase());
                    window.location.href = `/${countryName}`;
                });
                bordersContainer.appendChild(button);
            });
        } else {
            bordersContainer.innerHTML += '<span> N/A</span>';
        }
    }

    const countries = await fetchCountries();
    const countryLookup = createCountryLookup(countries);
    const countryName = decodeURIComponent(window.location.pathname.split('/').pop());
    const country = countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());

    if (country) {
        displayCountryDetails(country, countryLookup);
    } else {
        countryDetails.innerHTML = '<p>Country not found.</p>';
    }
});
