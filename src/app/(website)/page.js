import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import HeroForm from "@/components/forms/HeroForm";
import {getServerSession} from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <section className="pt-5">
      <Image className="h-auto max-w-lg mx-auto" src="/images/shapersjalapa.png" width={256} height={256} alt={'GSCJALAPA'} />

      <h1 className="mt-6 font-bold text-center">

<span className="text-lg ">Bienvenido a</span><br></br><span className="text-4xl ">Global Shapers Jalapa <span className="text-blue-700"> Network</span></span>
</h1>
        <div class="mt-10 container mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow ">
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">¡Scanear un contacto!</h5>
        </a>
        <p className="mb-6 font-normal text-gray-700 ">Escanéa una tarjeta oficial de Global Shapers Network para crear conexiones inmediatas y duraderas</p>
       
        <a href="/scan" className="w-full h-10 px-2 inline-flex items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          ¡Escanéa un nuevo contacto!
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </a>
      </div>
    </div>


    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow">

      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Iniciar Sesión</h5>
        </a>
        <p className="mb-6 font-normal text-gray-700">Si ya eres miembro, inicia sesión para editar toda tu información así como los enlaces que compartes.</p>
        <a href="/login" className="w-full h-10 px-2 inline-flex items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          ¡Inicia sesión ahora!
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</div>

      </section>
    </main>
  )
}
