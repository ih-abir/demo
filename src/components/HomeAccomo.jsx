import React from "react";
import PlaybtnIcon from '/images/playbtn.svg';

const GqlQuery = `{
    homepage{
	    data{
	      	id
	      	attributes{
		        Accomodation_title
		        Accomodation_button_text
		        Accomodation_cards {
                    data{
                        id
                        attributes{
                            Title
                            Hero_image{
                            	data{
                            		id
					                attributes{
					                	caption
					                    url
					                    alternativeText
					                }
                            	}
                            }
                        }
                    }
                }

		    }
		}
	}
}`;



const url = `${import.meta.env.Assets_URL}`;

const response = await fetch(`${import.meta.env.DB_URL}`,
	{
	    method:'POST',
	    headers: {
	    	'Content-Type':'application/json',
	    	'Authorization': `Bearer ${import.meta.env.ACCESS_TOKEN}`
	    },
	    body: JSON.stringify({
	      query: GqlQuery,
	    })
	});

const data = await response.json();
const parseData = data.data.homepage.data.attributes;
const accomo_card = data.data.homepage.data.attributes.Accomodation_cards;

const HomeAccomo = () => {

	return(
		<div className="wrapper overflow-x-hidden mx-auto AccommoSec">
	    	<div className="px-8 text-center mx-auto capitalize AccommoTag">{parseData.Accomodation_title}</div>
		    <div className="grid sm:grid-cols-2 md:grid-cols-3 justify-items-center px-2 mt-16 mx-auto AccommoCard-Container">

			    {accomo_card.data.slice(0, 6).map(({ attributes }) => (
					<div className="AccommoCard" key={attributes.id} role="listitem" aria-label={attributes.Title}>
						<div className="relative overflow-hidden AccommoImgContainer">
							<img className="w-full h-full object-cover z-10" src={url + attributes.Hero_image.data.attributes.url} alt={url + attributes.Hero_image.data.attributes.alternativeText} />
							<div className="px-2 py-5 absolute right-0 rounded z-20 capitalize AccommoCardTxt">{attributes.Title}</div>
						</div>
					</div>
				))}
				
		    </div>
		    <div className="flex justify-center pt-1">
		    	<a href="/accomodation" className="inline-flex items-center justify-center py-2 px-3.5 mt-9 lg:mt-14 font-medium bg-downy border-radius100">{parseData.Accomodation_button_text}
					<img className="h-3.5 ml-1.5" src={PlaybtnIcon} alt="playbutton-icon" />
				</a>
		    </div>
		</div>
	)
}

export default HomeAccomo;