import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";

export default async function LoginPage() {

  const session = await getServerSession(authOptions);
  if (session) {
    return redirect('/account');
  }



  return (
    <div>
      <div className="p-4 max-w-2lg px-2 mx-auto">
      <Image className="h-auto max-w-lg mx-auto" src="/images/shapersjalapa.png" width={256} height={256} alt={'GSCJALAPA'} />
    <br></br>
        <h1 className="font-bold text-center">

          <span className="text-lg ">Inicia Sesión en</span><br></br><span className="text-4xl ">Global Shapers Jalapa <span className="text-blue-700"> Network</span></span>
        </h1>
        <br></br>
        <p className="text-center mt-6 mb-6 text-gray-500">
        Empieza a crear tu perfil en cuestión de segundos. Inicia sesión o crea una cuenta fácilmente usando tu cuenta de Google y comienza a centralizar todos tus enlaces en un solo lugar. 
        
        <br/><br/>Con un solo clic, estarás listo para conectar, compartir y hacer que tu presencia en línea brille. ¡Tu viaje hacia grandes conexiones comienza aquí!        </p>
        <br></br>
        <LoginWithGoogle />
      </div>
    </div>
  );
}