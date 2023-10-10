import {ReactComponent as BodygraphPersonalitySVG} from '../assets/bodygraph-personality.svg';
import React from 'react';

function BodygraphPersonality(props) {

  React.useEffect(() => {
    if (!props.activation) { return };
    document.querySelector('#Personality #Sun').innerHTML = `${props.activation.Sun.g}.${props.activation.Sun.l}`;
    document.querySelector('#Personality #Earth').innerHTML = `${props.activation.Earth.g}.${props.activation.Earth.l}`;
    document.querySelector('#Personality #Moon').innerHTML = `${props.activation.Moon.g}.${props.activation.Moon.l}`;
    document.querySelector('#Personality #NorthNode').innerHTML = `${props.activation.NorthNode.g}.${props.activation.NorthNode.l}`;
    document.querySelector('#Personality #SouthNode').innerHTML = `${props.activation.SouthNode.g}.${props.activation.SouthNode.l}`;
    document.querySelector('#Personality #Mercury').innerHTML = `${props.activation.Mercury.g}.${props.activation.Mercury.l}`;
    document.querySelector('#Personality #Venus').innerHTML = `${props.activation.Venus.g}.${props.activation.Venus.l}`;
    document.querySelector('#Personality #Mars').innerHTML = `${props.activation.Mars.g}.${props.activation.Mars.l}`;
    document.querySelector('#Personality #Jupiter').innerHTML = `${props.activation.Jupiter.g}.${props.activation.Jupiter.l}`;
    document.querySelector('#Personality #Saturn').innerHTML = `${props.activation.Saturn.g}.${props.activation.Saturn.l}`;
    document.querySelector('#Personality #Uranus').innerHTML = `${props.activation.Uranus.g}.${props.activation.Uranus.l}`;
    document.querySelector('#Personality #Neptune').innerHTML = `${props.activation.Neptune.g}.${props.activation.Neptune.l}`;
    document.querySelector('#Personality #Pluto').innerHTML = `${props.activation.Pluto.g}.${props.activation.Pluto.l}`;
  }, [props.activation]); // End useEffect for one-time run


  return (
    <div>
        <BodygraphPersonalitySVG 
                  style={{height: 'auto'}}
          />
  </div>
  );
}

export default BodygraphPersonality;