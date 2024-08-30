import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import HeroForm from "@/components/forms/HeroForm";
import {getServerSession} from "next-auth";
import {Page} from "@/models/Page";
import {redirect} from "next/navigation";



export default async function HomeCreateUser() {
    
const session = await getServerSession(authOptions);
const page = await Page.findOne({owner: session?.user?.email});

  if(page){
  return redirect('/account');

  }

  return (
    <main>
      <section className="pt-32">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            ¡Estás a sólo un paso de hacer grandes conexiones!
          </h1>
          <h2 className="text-gray-500 text-xl mt-6">
          Crea tu perfil personalizado en minutos y comparte fácilmente todos tus enlaces importantes desde un solo lugar.          </h2>
          <br/>
          <br/>
          <HeroForm user={session?.user} />

        </div>
      </section>
    </main>
  )
}
