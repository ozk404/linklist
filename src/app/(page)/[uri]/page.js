import {Page} from "@/models/Page";
import {User} from "@/models/User";
import {Event} from "@/models/Event";
import '../../globals.css'

import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram, faLinkedin, faTelegram,
  faTiktok,
  faWhatsapp,
  faYoutube,
  faForumbee,
} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope, faLink, faLocationDot, faMobile, faPhone} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import {btoa} from "next/dist/compiled/@edge-runtime/primitives";
import Image from "next/image";
import Link from "next/link";
import {redirect} from "next/navigation";

export const buttonsIcons = {
  email: faEnvelope,
  mobile: faPhone,
  instagram: faInstagram,
  facebook: faFacebook,
  discord: faDiscord,
  tiktok: faTiktok,
  youtube: faYoutube,
  whatsapp: faWhatsapp,
  github: faGithub,
  telegram: faTelegram,
  toplink: faForumbee,
  linkedin: faLinkedin,
};

function buttonLink(key, value) {
  if (key === 'mobile') {
    return 'tel:'+value;
  }
  if (key === 'email') {
    return 'mailto:'+value;
  }
  return value;
}

export default async function UserPage({params}) {
  const uri = params.uri;
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({uri});
  if (!page) {
    return redirect('/');
  }

  const user = await User.findOne({email:page.owner});



  await Event.create({uri:uri, page:uri, type:'view'});
  return (
    <div className="bg-blue-950 text-white min-h-screen">
      <div
        className="h-36 bg-gray-400 bg-cover bg-center"
        style={
          page.bgType === 'color'
            ? {backgroundColor:page.bgColor}
            : {backgroundImage:`url(${page.bgImage})`}
        }
      >
      </div>
      <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
        <Image
          className="square2 rounded-full w-full h-full object-cover"
          src={user.image}
          alt="avatar"
          width={256} height={256}
        />
      </div>
      <h2 className="text-4xl text-center mb-6">{page.displayName}</h2>
      <h3 className="mb-6 text-center  flex gap-2 justify-center items-center text-white/70">
        <span className="text-xl">
          {page.position},<br/> <span className="text-lg"> {page.hub}, {page.location}</span>
        </span>
      </h3>


      <div className="flex gap-2 justify-center mt-4 pb-4">
        {Object.keys(page.buttons).map(buttonKey => (
          <Link key={buttonKey} href={buttonLink(buttonKey, page.buttons[buttonKey])}
                className="zoom-mas rounded-full bg-white text-blue-950 p-2 flex items-center justify-center">
            <FontAwesomeIcon className="w-5 h-5" icon={buttonsIcons[buttonKey]} />
          </Link>
        ))}
      </div>
      <div className="max-w-sm mx-auto px-4 text-center my-2 mb-6 mt-6">
        <p>{page.bio}</p>
      </div>
      <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6 p-4 px-8">
        {page.links.map(link => (
          <Link
            key={link.url}
            target="_blank"
            ping={process.env.URL+'api/click?url='+ btoa(link.url)+'&page='+page.uri}
            className="square rounded bg-indigo-800 p-2 block flex"
            href={link.url}>
            <div className=" shadow relative rounded -left-4 overflow-hidden w-16">
              <div className="w-16  h-16 bg-blue-700 aspect-square relative flex items-center justify-center aspect-square">
                {link.icon && (
                  <Image
                    className="w-full h-full object-cover"
                    src={link.icon}
                    alt={'icon'} width={128} height={128} />
                )}
                {!link.icon && (
                  <FontAwesomeIcon icon={faLink} className="w-8 h-8" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-center shrink grow-0 overflow-hidden">
              <div>
                <h3>{link.title}</h3>
                <p className="text-white/50 h-6 overflow-hidden">{link.subtitle}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
    </div>


  );
}

