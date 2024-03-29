'use client';

import { useCallback, useState } from 'react';
import { ContactForm } from './types';
import { toast } from 'react-toastify';
import HttpStatusCode from '@/common/http/statusCode';
import { fetchResend } from '@/services/resend';
import { StatusMsgToast } from './statusMsg';


type FormStatus = 'loading' | 'success' | 'error' | 'idle';

const Contact = () => {
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatus('loading');
      const formData = new FormData(e.currentTarget);
      const formValues: ContactForm = {
        email: formData.get('email').toString(),
        name: formData.get('name').toString(),
        message: formData.get('message').toString(),
      };

      try {
        const response = await fetchResend(formValues);

        if (response.status === HttpStatusCode.OK) {
          setStatus('success');

          toast.success(StatusMsgToast.SUCCESS);

          return;
        }
        setStatus('error');

        toast.error(StatusMsgToast.ERROR);
      } catch (error) {
        setStatus('error');

        toast.error(StatusMsgToast.ERROR);
      }
    },
    [],
  );
  return (
    <section id="contact" className="overflow-hidden py-8 md:py-10 lg:py-14">
      <div className="container" id="formulario">
        <div className="-mx-4 flex flex-wrap">
          <div className="lg:w-12/12 xl:w-12/12 w-full px-4">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-primary/[3%] px-8 py-11 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                ¿Tienes una consulta? Contáctanos
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Déjanos tus datos y nosotros resolveremos tu consulta.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Nombre
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="Ingresa tu nombre"
                        className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="Ingresa tu email"
                        className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Mensaje
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        placeholder="Ingresa tu mensaje"
                        className="w-full resize-none rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button
                      disabled={status === 'loading'}
                      className="w-60 rounded-md bg-primary py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                    >
                      {status === 'loading' ? 'Enviando' : 'Enviar'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
