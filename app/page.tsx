'use client';
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/data"
import { useState } from "react";
import { MdOutlineReadMore } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
export default function Home() {
  const [messages, setMessages] = useState([{ text: "Hello! How can I assist you today?", sender: 'bot' }]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);

      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.reply, sender: 'bot' }]);
      setInput('');
    }
  };
  return (

    <main >
      <div className="bg-amber-950 h-12 text-white flex justify-center items-center text-2xl font-medium">
        Flipcard
      </div>
      <section className="lg:px-20 md:px-10 px-5 ">
        <div className="mx-auto flex justify-center object-center px-4 py-10 sm:py-24 lg:max-w-7xl">
          <div className="flex justify-center object-center flex-col">
            <h2 className="text-4xl font-semibold tracking-tight text-blue-950 sm:text-5xl lg:text-6xl">
              Services
            </h2>
            <div className="grid gap-5 pt-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
              {SERVICES.map((service, indx) => (
                <Link href={service.url} key={indx} className="group flex justify-center [perspective:1000px] ">
                  <div className="relative lg:h-[400px] lg:w-64 md:h-[365px] md:64 sm:h-[365px] sm:w-60 h-[450px] w-[300px] rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* {Front Face } */}
                    <div className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden]">
                      {service.imageSrc && (
                        <Image
                          className="object-cover cursor-pointer object-left h-full w-full rounded-xl"
                          src={service.imageSrc}
                          alt={service.heading}
                          width={250}
                          height={250}
                        />
                      )}
                    </div>
                    <div className="absolute rounded-xl inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-blue/70"></div>
                    <div className="absolute inset-0 translate-y-[78%] px-8 text-center">
                      <p className="font-dmserif text-xl font-bold text-white">{service.heading}</p>
                    </div>
                    {/* { Back Face } */}
                    <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-5 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <div className="flex min-h-full flex-col items-center justify-center">
                        <h2 className="text-xl font-bold mb-4">{service.heading}</h2>
                        <p className="text-lg text-pretty text-center mb-4">
                          {service.description}
                        </p>
                        <div className="inline-flex">
                          <button className=" bg-yellow-800 hover:bg-yellow-700 text-white font-bold py-1 px-4 w-auto rounded-full inline-flex items-center">
                            <span>Read More</span>
                            <MdOutlineReadMore className="h-6 w-6 ml-2" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
