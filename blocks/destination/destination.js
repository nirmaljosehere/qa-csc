function getMetadata(name) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = [...document.querySelectorAll(`meta[${attr}="${name}"]`)]
    .map((m) => m.content)
    .join(', ');
  return meta || '';
}

//const aem = "http://localhost:4503";
const aem = "https://publish-p135360-e1341441.adobeaemcloud.com";

export default function decorate(block) {
  const arrivalID = document.createElement('div');
  arrivalID.id = 'arrival';
  arrivalID.textContent =  block.querySelector('div:nth-child(1)').textContent.trim() || getMetadata("arrival");
  block.querySelector('div:nth-child(1)').replaceWith(arrivalID);

  // const cityDiv = document.createElement('div');
  // cityDiv.id = `city-${arrivalID.textContent}`;
  // block.querySelector('div:last-of-type').replaceWith(cityDiv);
  const arrivalSlug = "london";
  const departureSlug ="doha";

  fetch(`${aem}/graphql/execute.json/qatar-airways/get-arrival-departure-details;arrivalSlug=${arrivalSlug};departureSlug=${departureSlug};`)  
  
    .then(response => response.json())
    .then(response => {
      console.log("response received>>>>>>>>>")
      console.log( response.data.arrivingInList.items[0]);
      //cityDiv.innerHTML = `<div class="nirmaljose">Test div</div>`;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

}





