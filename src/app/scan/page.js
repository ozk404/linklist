import {authOptions} from "@/app/api/auth/[...nextauth]/route";

import {getServerSession} from "next-auth";
import NFCReader from "@/components/scan/scanForm";

export default async function Scan() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <section className="pt-10 text-center">
        <div className=" mb-8">
          <h1 className="text-6xl font-bold">
          ¡Scanéame!
          </h1>
          <h2 className="text-gray-500 text-lg mt-6">
          Con la función de Scanear, puedes acercar tarjetas NFC y descubrir los perfiles de otras personas al instante, Esta herramienta te permite crear conexiones rápidas y eficaces, facilitando el networking en eventos y encuentros. 
          
          <br/><br/>Simplemente acerca tu dispositivo a una tarjeta oficial de Global Shapers Network compatible, y accede al perfil de la persona para conocer más sobre ella y conectarte al momento. ¡Es una forma moderna y conveniente de hacer networking y ampliar tu red de contactos!
          </h2>
        </div>
        <NFCReader>
          </NFCReader>
      </section>
    </main>
  )
}
