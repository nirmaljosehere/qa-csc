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
  console.log("block content arrival variable >>>>>>>>>"+block.querySelector('div:nth-child(1)').textContent.trim());
  console.log("block content page metadata variable >>>>>>>>>"+getMetadata("arrival"));
  arrivalID.textContent =  block.querySelector('div:nth-child(1)').textContent.trim() || getMetadata("arrival");
  block.querySelector('div:nth-child(1)').replaceWith(arrivalID);

  const cityDiv = document.createElement('div');
  cityDiv.id = `city-${arrivalID.textContent}`;
  block.querySelector('div:last-of-type').replaceWith(cityDiv);

  fetch(`${aem}/graphql/execute.json/qatar-airways/city-details-by-slug;slug=${slugID.textContent}`)
    .then(response => response.json())
    .then(response => {
      const { cityName, cityDescription, contentBlocks } = response.data.cityList.items[0];

    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

}





