"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import React from "react";

function MainComponent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const CurrencySnow = () => {
    const symbols = ["₿", "€", "$", "¥", "£"];
    return (
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array.from({ length: 20 })].map((_, i) => (
          <div
            key={i}
            className="currency-snow"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {symbols[Math.floor(Math.random() * symbols.length)]}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      <CurrencySnow />
      <header className="fixed w-full z-50">
        <nav className="w-screen px-4 py-4 flex justify-between items-center backdrop-blur-md bg-white/80 border-b border-white/30 shadow-lg">
          <a href="/" className="flex items-center">
            <img
              src="https://ucarecdn.com/8d72dcd1-90b7-44a0-8dc9-7b0ba528e663/-/format/auto/"
              alt="POKEMONBALL logo"
              className="w-12 h-12 mr-2 hover:rotate-12 transition-transform duration-300"
            />
            <div className="text-lg md:text-2xl font-bold text-[#FF0000]">
              POKEMONBALL
            </div>
          </a>
          <div className="space-x-4">
            <a
              href="/"
              className="text-[#FF0000] hover:text-[#FF3333] transition-colors duration-300"
            >
              Home
            </a>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        <section
          className={`container mx-auto px-4 py-20 text-center transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-4xl sm:text-6xl font-bold text-[#FF0000] mb-12">
            About POKEMONBALL
          </h1>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Vision
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              POKEMONBALL combines the nostalgia of Pokémon with the innovation
              of blockchain technology. We're creating a unique ecosystem where
              gaming passion meets digital assets, building a community-driven
              platform that rewards creativity and participation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To create a vibrant, inclusive crypto community that brings
                together Pokémon fans and blockchain enthusiasts, offering
                innovative ways to engage, earn, and grow together.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl mb-4">💫</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Our Values
              </h3>
              <p className="text-gray-600">
                Community-first approach, transparency in operations,
                sustainable growth, and continuous innovation while maintaining
                the fun and excitement of the Pokémon world.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">The Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-[#FF0000] rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl text-white">👨‍💻</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Lead Developer
                </h3>
                <p className="text-gray-600">
                  Blockchain expert with 8+ years of experience
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-[#FF0000] rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl text-white">👨‍🎨</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Creative Director
                </h3>
                <p className="text-gray-600">
                  Former gaming industry art director
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-[#FF0000] rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl text-white">👨‍💼</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Community Manager
                </h3>
                <p className="text-gray-600">
                  Experienced in growing crypto communities
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Join Our Journey
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Be part of something special. POKEMONBALL is more than just a
              token - it's a community of passionate individuals working
              together to create an exciting future in the crypto space.
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://t.me/POKEMONBALLTOKEN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl text-[#FF0000] hover:text-[#FF3333] cursor-pointer transition-all duration-300 hover:scale-125"
              >
                <i className="fab fa-telegram"></i>
              </a>
              <a
                href="https://twitter.com/POKEMONBALLTOKEN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl text-[#FF0000] hover:text-[#FF3333] cursor-pointer transition-all duration-300 hover:scale-125"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://discord.gg/POKEMONBALLTOKEN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl text-[#FF0000] hover:text-[#FF3333] cursor-pointer transition-all duration-300 hover:scale-125"
              >
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10vh) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(20px);
            opacity: 0;
          }
        }

        .currency-snow {
          position: fixed;
          color: #FF0000;
          font-size: 24px;
          user-select: none;
          z-index: 1;
          pointer-events: none;
        }

        .currency-snow:nth-child(2n) {
          animation: snowfall 8s linear infinite;
        }

        .currency-snow:nth-child(2n+1) {
          animation: snowfall 6s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;