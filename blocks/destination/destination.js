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


  const arrivalSlug = block.querySelector('div:nth-child(1)').textContent.trim();
  const departureSlug = block.querySelector('div:nth-child(2)').textContent.trim();  

  const destinationID = document.createElement('div');
  destinationID.id = 'destination'+'-'+arrivalSlug+'-'+departureSlug;
  block.querySelector('div:nth-child(1)').replaceWith(destinationID);
  // const cityDiv = document.createElement('div');
  // cityDiv.id = `city-${arrivalID.textContent}`;
  // block.querySelector('div:last-of-type').replaceWith(cityDiv);

  fetch(`${aem}/graphql/execute.json/qatar-airways/get-arrival-departure-details;arrivalSlug=${arrivalSlug};departureSlug=${departureSlug};`)  
    .then(response => response.json())
    .then(response => {
      console.log(response.data);
      //cityDiv.innerHTML = `<div class="nirmaljose">Test div</div>`;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

}





