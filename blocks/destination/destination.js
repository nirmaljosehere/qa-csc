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

  const destinationDiv = document.createElement('div');
  //cityDiv.id = `city-${arrivalID.textContent}`;
  //block.querySelector('div:last-of-type').replaceWith(cityDiv);

  fetch(`${aem}/graphql/execute.json/qatar-airways/get-arrival-departure-details;arrivalSlug=${arrivalSlug};departureSlug=${departureSlug};`)  
    .then(response => response.json())
    .then(response => {
      const { arrivingInList, flyingFromList } = response.data;
      const arriving = arrivingInList.items[0];
      const flying = flyingFromList.items[0];
      console.log('arriving>>>>>>>>'+arriving);
      console.log('flying>>>>>>>>'+flying);
      //const imageURL = `${aem}${arriving.mainImage._dynamicUrl}`;

      const createSection = (className, content) => `
        <div class='${className}'>
          ${Object.entries(content).map(([key, value]) => `
            <div class='${className}-${key}'>${value.html || value}</div>
          `).join('')}
        </div>
      `;

      destinationDiv.innerHTML = `
        ${createSection('destination-flyingfrom', {
          title: `<h3>${arriving.cityTitle}</h3>`,
          description: arriving.description.html,
          tourist: arriving.touristAttractions.html,
          travel: arriving.travelConsiderations.html,
          activities: arriving.activities.html
        })}
        ${createSection('destination-arriving', {
          title: flying.cityTitle,
          description: flying.description.html,
          ...flying.airportDetails
        })}
      `;
      //cityDiv.innerHTML = `<div class="nirmaljose">Test div</div>`;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

}





