'use client';

import { savePageButtons } from "@/actions/pageActions";
import SubmitButton from "@/components/buttons/SubmitButton";
import SectionBox from "@/components/layout/SectionBox";
import { ReactSortable } from "react-sortablejs";
import {
  faDiscord,
  faFacebook,
  faGithub, faInstagram, faInstagramSquare, faTelegram,
  faTiktok,
  faWhatsapp,
  faForumbee,
  faYoutube,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGripLines, faMobile, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import toast from "react-hot-toast";

export const allButtons = [
  { key: 'email', 'label': 'Correo Electrónico', icon: faEnvelope, placeholder: 'test@example.com' },
  { key: 'whatsapp', 'label': 'Teléfono', icon: faWhatsapp },
  { key: 'linkedin', 'label': 'LinkedIn', icon: faLinkedin },
  { key: 'toplink', 'label': 'TopLink', icon: faForumbee },

  { key: 'instagram', 'label': 'instagram', icon: faInstagram, placeholder: 'https://facebook.com/profile/...' },
  { key: 'facebook', 'label': 'facebook', icon: faFacebook },
  { key: 'youtube', 'label': 'youtube', icon: faYoutube },


];

function removeEmptyValues(formData) {
  const newFormData = new FormData();

  // Convertir FormData a un objeto temporal para manipularlo
  const tempObject = {};
  formData.forEach((value, key) => {
    if (value.trim()) {  // Solo añadir si el valor no está vacío o solo tiene espacios
      tempObject[key] = value;
    }
  });

  // Volver a añadir los valores no vacíos al nuevo FormData
  Object.keys(tempObject).forEach(key => {
    newFormData.append(key, tempObject[key]);
  });

  return newFormData;
}

function upperFirst(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}
export default function PageButtonsForm({ user, page }) {
  // Asegúrate de que page.buttons siempre sea un objeto, incluso si está vacío
  const pageButtons = page.buttons || {};

  const pageSavedButtonsKeys = Object.keys(pageButtons);
  const pageSavedButtonsInfo = pageSavedButtonsKeys
    .map(k => allButtons.find(b => b.key === k))
    .filter(button => button !== undefined); // Filtra valores undefined

  const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);

  function addButtonToProfile(button) {
    setActiveButtons(prevButtons => {
      return [...prevButtons, button];
    });
  }

  async function saveButtons(formData) {
    const filteredFormData = removeEmptyValues(formData);
    await savePageButtons(filteredFormData);
    toast.success('Settings saved!');
  }

  function removeButton({ key: keyToRemove }) {
    setActiveButtons(prevButtons => {
      return prevButtons
        .filter(button => button.key !== keyToRemove);
    });
  }

  const availableButtons = allButtons.filter(b1 => !activeButtons.find(b2 => b1.key === b2.key));

  return (
    <SectionBox>
      <form onSubmit={e => {
        e.preventDefault();
        // Recolecta los datos del formulario
        const formData = new FormData(e.target);
        saveButtons(formData);
      }}>
        <h2 className="text-2xl font-bold mb-4">Botones de Redes Sociales</h2>
        <p className="text-md mb-4" activeButtons>
          En esta sección tienes la oportunidad de mostrar tus perfiles y enlaces en diferentes plataformas sociales de manera accesible y visible. Esta sección es clave para conectar con tu audiencia, seguidores y colegas, facilitando que encuentren y se conecten contigo en tus redes sociales favoritas.
          <br /> <br />Simplemente añade los enlaces correspondientes, personaliza la apariencia de los botones y guarda los cambios. Así, tu audiencia podrá seguir tus actualizaciones, interactuar contigo y descubrir más sobre ti de manera rápida y sencilla.
        </p>
        {activeButtons.length > 0 && <hr />}
        <ReactSortable
          handle=".handle"
          list={activeButtons}
          setList={setActiveButtons}>
          {activeButtons.map(b => (
            <div key={b.key} className="mb-4 md:flex items-center">
              <div className="w-56 flex h-full text-gray-700 p-2 gap-2 items-center ">
                <FontAwesomeIcon
                  icon={faGripLines}
                  className="cursor-pointer text-gray-400 handle p-2" />
                <FontAwesomeIcon icon={b.icon} />
                <span>{upperFirst(b.label)}:</span>
              </div>
              <div className="grow flex">
                <input
                  placeholder={b.placeholder}
                  name={b.key}
                  defaultValue={pageButtons[b.key] || ''} // Asegúrate de que tenga un valor por defecto
                  type="text" style={{ marginBottom: '0' }} />
                <button
                  onClick={() => removeButton(b)}
                  type="button"
                  className="py-2 px-4 bg-gray-300 cursor-pointer ">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </ReactSortable>
        <div className="flex flex-wrap gap-2 mt-4 border-y py-4 text-center">
          {availableButtons.map(b => (
            <button
              key={b.key}
              type="button"
              onClick={() => addButtonToProfile(b)}
              className="flex items-center gap-2 p-2 m-1 bg-gray-200 rounded shadow">
              <FontAwesomeIcon icon={b.icon} />
              <span className="">
                {upperFirst(b.label)}
              </span>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          ))}
        </div>
        <div className="mx-auto bt-8 ">
          {activeButtons.length < 7 && <br />}
          <SubmitButton>
            <FontAwesomeIcon icon={faSave} />
            <span className="mx-2">Guardar botones </span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}