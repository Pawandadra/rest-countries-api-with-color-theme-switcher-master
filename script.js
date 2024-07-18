document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const countriesList = document.getElementById('countriesList');

    async function fetchCountries() {
        try {
            const response = await fetch('data.json');
            const countries = await response.json();
            displayCountries(countries);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    }

    function displayCountries(countries) {
        countriesList.innerHTML = '';
        countries.forEach(country => {
            const population = country.population ? country.population.toLocaleString() : 'N/A';
            const area = country.area ? country.area.toLocaleString() : 'N/A';
            const languages = country.languages ? country.languages.map(lang => lang.name).join(', ') : 'N/A';
            const currencies = country.currencies ? country.currencies.map(curr => curr.name).join(', ') : 'N/A';
            const timezones = country.timezones ? country.timezones.join(', ') : 'N/A';
            const borders = country.borders ? country.borders.join(', ') : 'N/A';

            const countryElement = document.createElement('div');
            countryElement.classList.add('country');
            countryElement.innerHTML = `
                <img src="${country.flags?.png || ''}" alt="Flag of ${country.name}" class="flag">
                <div id="countryInfoPreview">
                    <h2>${country.name}</h2>
                    <p><span class="bold">Population:</span> ${population}</p>
                    <p><span class="bold">Region:</span> ${country.region || 'N/A'}</p>
                    <p><span class="bold">Capital:</span> ${country.capital || 'N/A'}</p>
                    <!-- <p><span class="bold">Subregion:</span> ${country.subregion || 'N/A'}</p>
                    <p><span class="bold>Area:</strong> ${area} km²</p>
                    <p><span class="bold">Languages:</span> ${languages}</p>
                    <p><span class="bold">Currencies:</span> ${currencies}</p>
                    <p><span class="bold">Timezones:</span> ${timezones}</p>
                    <p><span class="bold">Borders:</span> ${borders}</p> -->
                </div>
            `;
            countriesList.appendChild(countryElement);
        });

        // Add event listener after countries are displayed
        searchInput.addEventListener('input', function() {
            const searchValue = searchInput.value.toLowerCase();
            const countryElements = document.querySelectorAll('.country');
            countryElements.forEach(countryElement => {
                const countryName = countryElement.querySelector('h2').textContent.toLowerCase();
                if (countryName.includes(searchValue)) {
                    countryElement.style.display = 'block';
                } else {
                    countryElement.style.display = 'none';
                }
            });
        });
    }

    fetchCountries();
});
