"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faLeaf,
  faTree,
  faBuilding,
  faHome,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import nextConfig from "../next.config.mjs";
import FadeInOnScroll from "./components/FadeInOnScroll";
import ImageSwitcher from "./components/ImageSwitcher";
import TextSwitcher from "./components/TextSwitcher";

const BASE_PATH = nextConfig.basePath || "";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const mainImages = [
    {
      src: "billy-freeman-pX66y31DOIQ-unsplash.jpg",
      text: `自然と調和する
      建築を目指して`,
      subText: "持続可能な未来への架け橋",
    },
    {
      src: "josh-olalde-X1P1_EDNnok-unsplash.jpg",
      text: `革新的な技術と
      確かな実績`,
      subText: "100年先を見据えた確かな建設",
    },
    {
      src: "shane-mclendon-EN1tF2EG-50-unsplash.jpg",
      text: "緑と都市の共生",
      subText: "環境にやさしい次世代の建築",
    },
  ];

  const links = ["ホーム", "事業内容", "施工事例", "アクセス"];

  const services = [
    {
      icon: faBuilding,
      title: "建築事業",
      desc: "最新の技術と確かな品質で、お客様のニーズに応える建築を提供します。",
    },
    {
      icon: faTree,
      title: "環境事業",
      desc: "自然との調和を重視し、環境に配慮した持続可能な建設を実現します。",
    },
    {
      icon: faHome,
      title: "リフォーム事業",
      desc: "既存の建物に新しい価値を吹き込み、快適な空間を創造します。",
    },
  ];

  const projects = [
    {
      title: "エコオフィスビル",
      year: "2023",
      src: "austin-distel-wawEfYdpkag-unsplash.jpg",
    },
    {
      title: "緑のマンション",
      year: "2024",
      src: "luke-van-zyl-koH7IVuwRLw-unsplash.jpg",
    },
    {
      title: "環境配慮型商業施設",
      year: "2024",
      src: "lycs-architecture-U2BI3GMnSSE-unsplash.jpg",
    },
    {
      title: "次世代型住宅",
      year: "2023",
      src: "naomi-hebert-MP0bgaS_d1c-unsplash.jpg",
    },
  ];

  const platforms = [
    { name: "Twitter", icon: faTwitter },
    { name: "Facebook", icon: faFacebook },
    { name: "Instagram", icon: faInstagram },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === mainImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-noto">
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#1565c0]/80" : "bg-[#1565c0]/20"
        } backdrop-blur-sm`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-20">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={faLeaf}
                  className="fas text-2xl text-[#4caf50]"
                />
                <h1 className="text-2xl font-bold text-white">青木建設</h1>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {links.map((item, index) => (
                <button
                  key={index}
                  onClick={() =>
                    scrollToSection(item === "ホーム" ? "main" : item)
                  }
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-4 text-white transition-colors duration-300"
            >
              <FontAwesomeIcon
                icon={isMenuOpen ? faTimes : faBars}
                className="text-xl"
              />
            </button>
          </div>
        </div>

        <div
          className={`
          md:hidden fixed top-20 right-0 w-64 bg-white/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out shadow-xl rounded-l-xl
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <div className="flex flex-col py-4">
            {links.map((item, index) => (
              <button
                key={index}
                onClick={() =>
                  scrollToSection(item === "ホーム" ? "main" : item)
                }
                className="px-6 py-3 text-[#1565c0] hover:bg-[#e3f2fd] transition-colors duration-300 text-left"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section id="main" className="relative h-screen">
        <div className="absolute inset-0">
          {/* <Image
            src={`${BASE_PATH}/${mainImages[currentImageIndex].src}`}
            alt="環境に配慮した建設プロジェクト"
            width={1200} // 幅
            height={600} // 高さ
            className="w-full h-full object-cover"
          /> */}
          <ImageSwitcher />
        </div>
        <div className="relative h-full flex items-center">
          <div className="ml-8 md:ml-24 text-white max-w-2xl space-y-8">
            <TextSwitcher>
              <h2 className="text-5xl md:text-7xl font-bold leading-tight whitespace-pre-line">
                {mainImages[currentImageIndex].text}
              </h2>
            </TextSwitcher>
            <TextSwitcher>
              <p className="text-2xl md:text-3xl text-white/90">
                {mainImages[currentImageIndex].subText}
              </p>
            </TextSwitcher>
          </div>
        </div>
      </section>

      <section id="事業内容" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeInOnScroll>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1565c0] mb-16">
              事業内容
            </h2>
          </FadeInOnScroll>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <FadeInOnScroll key={index}>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#1565c0]/10">
                  <FontAwesomeIcon
                    icon={service.icon}
                    className="fas text-6xl mb-6 text-[#1565c0]"
                  />
                  <h3 className="text-black text-2xl font-bold mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="施工事例" className="py-20 px-4 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <FadeInOnScroll>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1565c0] mb-16">
              施工事例
            </h2>
          </FadeInOnScroll>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <FadeInOnScroll key={index}>
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl shadow-lg"
                >
                  <Image
                    src={`${BASE_PATH}/${project.src}`}
                    alt={project.title}
                    width={300} // 幅
                    height={200} // 高さ
                    className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-[#1565c0]/80 p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/90">{project.year}年完工</p>
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="アクセス" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeInOnScroll>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1565c0] mb-16">
              アクセス
            </h2>
          </FadeInOnScroll>
          <FadeInOnScroll>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#1565c0]/10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#1565c0]">
                    青木建設株式会社
                  </h3>
                  <div className="space-y-4 text-gray-600">
                    <p className="flex items-start space-x-2">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="fas mt-1 w-8 text-[#1565c0]"
                      />
                      <span>
                        〒441-2523
                        <br />
                        愛知県豊田市御所貝津町二貫目２２
                      </span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="fas w-8 text-[#1565c0]"
                      />
                      <span>0565-82-2561</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="fas w-8 text-[#1565c0]"
                      />
                      <span>info@aoken-test.co.jp</span>
                    </p>
                  </div>
                </div>
                <div className="h-[300px] bg-gray-100 rounded-xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1938.1886303944666!2d137.49614287522266!3d35.215640743242254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601b5452ab4b1f9b%3A0x1fcd7c509b15993!2z6Z2S5pyo5bu66Kit!5e0!3m2!1sja!2sjp!4v1731413462472!5m2!1sja!2sjp"
                    loading="lazy"
                    className="h-[100%] w-[100%] rounded-xl"
                  ></iframe>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      <footer className="bg-[#1565c0] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <FontAwesomeIcon
                  icon={faLeaf}
                  className="fas text-2xl text-[#4caf50]"
                />
                <h3 className="text-2xl font-bold">青木建設</h3>
              </div>
              <p className="text-white/80">自然と調和する建築を目指して</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">リンク</h3>
              <ul className="space-y-4">
                {links.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() =>
                        scrollToSection(item === "ホーム" ? "main" : item)
                      }
                      className="text-white/80 hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">SNS</h3>
              <div className="flex space-x-6">
                {platforms.map((platform, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-2xl hover:text-white/80 transition-colors duration-300"
                  >
                    <FontAwesomeIcon
                      icon={platform.icon}
                      className="text-2xl"
                    />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">グループ</h3>
              <ul className="space-y-8">
                <li>
                  <Link href="https://aoken-g.com/">
                    <Image
                      src={`${BASE_PATH}/logo.gif`}
                      alt="青木不動産"
                      width={300}
                      height={200}
                    ></Image>
                  </Link>
                </li>
                <li>
                  <Link href="https://mythel.jp/salonlist/aeon_miyoshi/">
                    <Image
                      src={`${BASE_PATH}/4486_logo_7e6eea8f06b5ad782d06d7fa07ac411c4ef7f65d.jpg`}
                      alt="mythel"
                      width={300}
                      height={200}
                    ></Image>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/60">
            <p>&copy; 2024 青木建設 All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(1.1);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        #main img {
          animation: fadeIn 1.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;
