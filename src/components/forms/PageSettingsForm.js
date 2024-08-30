'use client';
import { savePageSettings } from "@/actions/pageActions";
import SubmitButton from "@/components/buttons/SubmitButton";
import RadioTogglers from "@/components/formItems/radioTogglers";
import SectionBox from "@/components/layout/SectionBox";
import { upload } from "@/libs/upload";
import { faCloudArrowUp, faImage, faPalette, faSave, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";


export default function PageSettingsForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [avatar, setAvatar] = useState(user?.image);
  async function saveBaseSettings(formData) {
    const result = await savePageSettings(formData);
    if (result) {
      toast.success('¡Cambios guardados exitosamente!');
    }
  }

  async function handleCoverImageChange(ev) {
    await upload(ev, link => {
      setBgImage(link);
      // Crear formData con los datos necesarios, incluyendo la URL de la imagen
      const formData = new FormData();
      formData.append('bgImage', link); // Suponiendo que 'bgImage' es el nombre del campo esperado en el backend

      const result = savePageSettings(formData);
      toast.success('¡Cambios guardados exitosamente!');
    });
  }



  async function handleAvatarImageChange(ev) {
    await upload(ev, link => {
      setAvatar(link);
      const formData = new FormData();
      formData.append('avatar', link); // Suponiendo que 'bgImage' es el nombre del campo esperado en el backend

      const result = savePageSettings(formData);
      toast.success('¡Cambios guardados exitosamente!');
    });
  }
  return (
    <div>

      <SectionBox>
        <form action={saveBaseSettings} className=" rounded">
          <div
            className=" overflow-hidden shadow-lg rounded py-4 -m-4 min-h-[110px] flex justify-center items-center bg-cover bg-center"
            style={
              bgType === 'color'
                ? { backgroundColor: bgColor }
                : { backgroundImage: `url(${bgImage})` }
            }
          >

          </div>
          <div className="flex justify-center -mb-12">
            <div className="relative -top-8 w-[128px] h-[128px]">
              <div className=" overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
                <Image
                  className="w-full h-full object-cover"
                  src={avatar}
                  alt={'avatar'}
                  width={128} height={128} />
              </div>
              <label
                htmlFor="avatarIn"
                className="absolute bottom-0 -right-2 bg-white p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center cursor-pointer">
                <FontAwesomeIcon size={'xl'} icon={faCloudArrowUp} />
              </label>
              <input onChange={handleAvatarImageChange} id="avatarIn" type="file" className="hidden" />
              <input type="hidden" name="avatar" value={avatar} />
            </div>
          </div>
          <div className="p-0">
            <label className="input-label" htmlFor="nameIn">Nombre</label>
            <input
              type="text"
              id="nameIn"
              name="displayName"
              defaultValue={page.displayName}
              placeholder="John Doe"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
            <label className="input-label" htmlFor="hubIn">Posición</label>
            <input
              type="text"
              id="puestoIn"
              name="position"
              defaultValue={page.position}
              placeholder="Vice Curador" 
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
            <div className="flex flex-wrap -mx-3 ">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="input-label" for="grid-first-name">
                  Hub
                </label>
                <input
              type="text"
              id="hubIn"
              name="hub"
              defaultValue={page.hub}
              placeholder="Jalapa Hub"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="input-label" for="grid-last-name">
                  Ubicación
                </label>
                <input
              type="text"
              id="locationIn"
              name="location"
              defaultValue={page.location}
              placeholder="John Doe"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
              </div>
            </div>
            <label className="input-label" htmlFor="bioIn">Bio</label>
            <textarea
              name="bio"
              defaultValue={page.bio}
              id="bioIn"
              placeholder="Your bio goes here..." 
              />

                          <div className="text-center py-2">
                          <label className="input-label" htmlFor="bioIn">Tipo de Portada</label>
<br/>
<br/>
              <RadioTogglers
                defaultValue={page.bgType}
                options={[
                  { value: 'color', icon: faPalette, label: 'Color' },
                  { value: 'image', icon: faImage, label: 'Imágen' },
                ]}
                onChange={val => setBgType(val)}
              />
              {bgType === 'color' && (
                <div className="mt-6 bg-gray-200 shadow text-gray-700 p-4 mt-2">
                  <div className="flex gap-4 justify-center">
                    <span>Selecciona un color de fondo:</span>
                    <input
                      type="color"
                      name="bgColor"
                      onChange={ev => setBgColor(ev.target.value)}
                      defaultValue={page.bgColor} />
                  </div>
                </div>
              )}
              {bgType === 'image' && (
                <div className="rounded mt-6 bg-gray-200 shadow text-gray-700 p-4 mt-2">
                  <label
                    className="bg-gray-200  gap-2 cursor-pointer"
                  >
                    <input type="hidden" name="bgImage" value={bgImage} />
                    <input
                      type="file"
                      onChange={handleCoverImageChange}
                      className="hidden" />
                    <div className="gap-4 items-center ">
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        className="mx-2 text-gray-700" />
                      <span>Cambiar Imágen </span>
                    </div>
                  </label>
                </div>
              )}
            </div>
            <br/>
            <hr/>
            <div className="mx-auto pt-6 pb-2">
              <SubmitButton>
                <FontAwesomeIcon icon={faSave} />
                <span className="mx-2"> Guardar Cambios</span>
              </SubmitButton>
            </div>
          </div>
        </form>
      </SectionBox>
    </div>
  );
}