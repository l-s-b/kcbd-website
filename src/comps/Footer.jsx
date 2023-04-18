import React from 'react';
import data from '../data/variables.json';
import kLogo from '../assets/kLogo.jpeg';
import { FacebookRounded as FB, Instagram as IG, LocationOn as Pin } from '@mui/icons-material';
import RemSpacer from './RemSpacer';
import TabLink from './TabLink';

export default function Footer() {

  const icons = [<FB />, <IG />, <Pin />];
  const links = [data.contact.fb, data.contact.ig, data.contact.pin]

  function DesktopFooter() {
    return (
      <div id="desktopFooter" className="flex flexCh row evenly centerX centerY centerXY">
        <div className="col centerX hw10 fw fw2">
          <b>{data.footer.col1.title}</b>
          <p>{data.footer.col1.content}</p>
        </div>
        <img className="centerXY m1y hw10" id="footerImg" src={kLogo} alt={data.logoAlt} />
        <div className="col hw10 centerX fw">
          {data.footer.col3.content.map((item, index) => (
            <TabLink to={links[index]} className="row m025">
              {icons[index]}
              <RemSpacer />
              <span>{item}</span>
            </TabLink>
          ))}
        </div>
      </div>
    )
  }

  function MobileFooter() {
    return (
      <div id="mobileFooter" className="flex flexCh col centerY">
        <img className="centerXY m1y hw10" id="footerImg" src={kLogo} alt={data.logoAlt} />
        <div className="flex row wrap evenly w75">
          <div className="col centerX m1 hw10 fw">
            <b>{data.footer.col1.title}</b>
            <p>{data.footer.col1.content}</p>
          </div>
          <div className="col centerX m1 hw10 fw">
            {data.footer.col3.content.map((item, index) => (
              <TabLink to={links[index]} className="row m025">
                {icons[index]}
                <RemSpacer />
                <span>{item}</span>
              </TabLink>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="vw100 bg1 flex col centerX rel z30">
        <DesktopFooter />
        <MobileFooter />
      </div>
      <div className="fixed bottom vw100 h25 z10 bg1" />
    </>
  )
}
