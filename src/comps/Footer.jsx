import React from 'react';
import data from '../data/variables.json';
import kLogo from '../assets/kLogo.jpeg';
import { FacebookRounded as FB, Instagram as IG, LocationOn as Pin } from '@mui/icons-material';
import RemSpacer from './RemSpacer';
import TabLink from './TabLink';

export default function Footer() {

  const icons = [<FB />, <IG />, <Pin />];
  const links = [data.contact.fb, data.contact.ig, data.contact.pin]
  const parsedAbout = <div className="flex col">
    {data.footer.col1.content.map((x,i) => <span key={i}>{x}</span>)}
  </div>;

  function DesktopFooter() {
    return (
      <div id="_desktopFooter" className="flex flexCh row centerY evenly">
        <div className="col centerX hw10 _fw _fw2">
          <b>{data.footer.col1.title}</b>
          {parsedAbout}
        </div>
        <img className="m1y hw10" id="footerImg" src={kLogo} alt={data.logoAlt} />
        <div className="col hw10 centerX _fw">
          {data.footer.col3.content.map((item, index) => (
            <TabLink key={index} to={links[index]} className="row m025">
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
      <div id="_mobileFooter" className="flex flexCh col centerY">
        <img className="centerXY m1y hw10" id="footerImg" src={kLogo} alt={data.logoAlt} />
        <div className="flex row wrap evenly w75">
          <div className="col centerX m1 hw10 _fw _fw2">
            <b>{data.footer.col1.title}</b>
            {parsedAbout}
          </div>
          <div className="col centerX m1 hw10 _fw">
            {data.footer.col3.content.map((item, index) => (
              <TabLink to={links[index]} key={index} className="row m025">
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
    <footer>
      <div className="vw100 bg1 flex col centerX rel z30">
        <DesktopFooter />
        <MobileFooter />
        <i className="p2x p1y abs bottom r">
          Site by&nbsp;
          <TabLink
            to={"https://www.linkedin.com/in/lsb100"}
            className="color2-txt"
          >
            <b>l-s-b</b>
          </TabLink>
        </i>
      </div>
      <div className="fixed bottom vw100 h25 z10 bg1" />
    </footer>
  )
}
