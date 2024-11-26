document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const countriesList = document.getElementById('countriesList');
    const filterHeading = document.getElementById('filterHeading');
    const customOptions = document.querySelector('.customOptions');
    const customOptionsItems = document.querySelectorAll('.custom-option');
    let countriesData = [];

    async function fetchCountries() {
        try {
            const response = await fetch('assets/data.json');
            const countries = await response.json();
            countriesData = countries;
            displayCountries(countries);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    }

    function displayCountries(countries) {
        countriesList.innerHTML = '';

        countries.forEach(country => {
            const population = country.population ? country.population.toLocaleString() : 'N/A';

            const countryElement = document.createElement('div');
            countryElement.classList.add('country');
            countryElement.innerHTML = `
                <img src="${country.flags?.png || ''}" alt="Flag of ${country.name}" class="flag">
                <div id="countryInfoPreview">
                    <h2>${country.name}</h2>
                    <p><span class="bold">Population:</span> ${population}</p>
                    <p><span class="bold">Region:</span> ${country.region || 'N/A'}</p>
                    <p><span class="bold">Capital:</span> ${country.capital || 'N/A'}</p>
                </div>
            `;
            countryElement.addEventListener('click', () => {
                const url = `${window.location.origin}/${encodeURIComponent(country.name.toLowerCase())}`;
                window.open(url, '_top');
            });
            countriesList.appendChild(countryElement);
        });

        // Add event listener after countries are displayed
        searchInput.addEventListener('input', function() {
            const searchValue = searchInput.value.toLowerCase();
            const countryElements = document.querySelectorAll('.country');
            let hasMatch = false;

            countryElements.forEach(countryElement => {
                const countryName = countryElement.querySelector('h2').textContent.toLowerCase();
                if(countryName.includes(searchValue)){
                    countryElement.style.display = 'block'
                    hasMatch = true;
                } else {
                    countryElement.style.display = 'none';
                }
            });

            const existingError = document.querySelector('.search-error');
            
            if (existingError){
                existingError.remove();
            }

            if (!hasMatch && searchValue) {
                const searchError = document.createElement('div');
                searchError.classList.add('search-error');
                searchError.innerHTML =`
                    <h3><span style="font-weight: 600">${searchInput.value}<span> didn't match any country name</h3>
                    <p style="font-size: 14px; color: hsl(0, 0%, 52%);">Please try with different keywords<p>
                `;
                searchInput.parentElement.parentElement.parentElement.appendChild(searchError);
            }

            document.addEventListener("click", function(event) {
                const filterBox = document.getElementById("filter");
                const countryCards = document.getElementsByClassName("country");

                const isInCountryCard = Array.from(countryCards).some(card => card.contains(event.target));

                if (filterBox.contains(event.target) || isInCountryCard) {
                    searchInput.value = "";
                }
            });
        });

        opneDropDown();

        function filterCountries(region) {
            const filteredCountries = countriesData.filter(country => country.region === region || region === 'All');
            displayCountries(filteredCountries);
        }
    
        function opneDropDown() {
            filterHeading.addEventListener('click', () => {
            customOptions.style.display = customOptions.style.display === 'none' ? 'flex' : 'none';
            });
        }

        customOptionsItems.forEach(item => {
            item.addEventListener('click', () => {
                const region = item.getAttribute('data-value');
                filterHeading.innerHTML = `${region === 'All' ? 'Filter by Region' : region} <ion-icon name="chevron-down-outline"></ion-icon>`;
                customOptions.style.display = 'none';
                filterCountries(region);
                opneDropDown()
            });
        });
    }
    fetchCountries();
});