"use client";
import React from "react";

function MainComponent() {
  const [copied, setCopied] = useState(false);
  const [media, setMedia] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const contractAddress = "0x1234...5678";
  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    async function fetchMedia() {
      try {
        const response = await fetch("/api/get-admin-media", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch media");
        }
        const data = await response.json();
        setMedia(data.media);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching media:", error);
        setIsLoading(false);
      }
    }
    fetchMedia();
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
          <div className="flex items-center">
            <img
              src="https://ucarecdn.com/8d72dcd1-90b7-44a0-8dc9-7b0ba528e663/-/format/auto/"
              alt="POKEMONBALL logo"
              className="w-12 h-12 mr-2 hover:rotate-12 transition-transform duration-300"
            />
            <div className="text-lg md:text-2xl font-bold text-[#FF0000]">
              POKEMONBALL
            </div>
          </div>
          <div className="space-x-4">
            <a
              href="/about"
              className="text-[#FF0000] hover:text-[#FF3333] transition-colors duration-300"
            >
              About
            </a>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        <section
          className={`container mx-auto px-4 py-20 text-center transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          } rounded-3xl shadow-lg mx-4 my-8 relative overflow-hidden`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{
              backgroundImage:
                "url('https://ucarecdn.com/fded5b84-574c-46d2-8591-fdaa7bdc8809/-/format/auto/')",
            }}
          />
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#FF0000] mb-4">
              POKEMONBALL
            </h1>
            <p className="text-2xl text-gray-700 mb-8">
              The ultimate meme cryptocurrency for Pokémon fans and crypto
              enthusiasts alike! Where nostalgia meets blockchain technology.
            </p>
            <img
              src="https://ucarecdn.com/8d72dcd1-90b7-44a0-8dc9-7b0ba528e663/-/format/auto/"
              alt="POKEMONBALL mascot"
              className="w-48 h-48 mx-auto my-16 hover:rotate-12 transition-transform duration-300"
            />
            <button className="bg-[#FF0000] text-white px-8 py-3 rounded-md hover:bg-[#FF3333] transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-pulse mb-8">
              Get POKEMONBALL
            </button>
            <div className="flex flex-col items-center space-y-6 mb-8">
              <div className="flex justify-center space-x-8">
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
              <img
                src="https://ucarecdn.com/21cc34b1-0145-4390-bca6-8e8455343e78/-/format/auto/"
                alt="Telegram QR Code"
                className="w-48 aspect-square object-contain"
              />
            </div>
          </div>
        </section>
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 transform hover:scale-105 transition-transform duration-300">
              <p className="text-gray-700 mb-2">Contract Address</p>
              <div className="flex justify-center items-center space-x-2">
                <code className="bg-gray-100 px-4 py-2 rounded">
                  {contractAddress}
                </code>
                <button
                  onClick={handleCopy}
                  className="text-[#FF0000] transition-transform duration-300 hover:scale-110"
                >
                  <i className={`fas ${copied ? "fa-check" : "fa-copy"}`}></i>
                </button>
              </div>
            </div>
            <div className="text-center">
              <button className="bg-[#FF0000] text-white px-8 py-3 rounded-md hover:bg-[#FF3333] transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Get POKEMONBALL
              </button>
            </div>
          </div>
        </section>
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Why Choose POKEMONBALL?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl text-[#FF0000] mb-4">🎮</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Limited Supply
                </h3>
                <p className="text-gray-600">
                  Just like rare Pokémon, POKEMONBALL is scarce and valuable,
                  making it a unique digital asset in the crypto world.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl text-[#FF0000] mb-4">👥</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Community-Driven
                </h3>
                <p className="text-gray-600">
                  Decisions are made by trainers, for trainers. Your voice
                  matters in shaping the future of POKEMONBALL.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl text-[#FF0000] mb-4">💰</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Staking Rewards
                </h3>
                <p className="text-gray-600">
                  Earn POKEMONBALL by staking your coins – because every trainer
                  deserves a reward!
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl text-[#FF0000] mb-4">🖼️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  NFT Integration
                </h3>
                <p className="text-gray-600">
                  Collect and trade exclusive Pokémon-themed NFTs in our
                  upcoming marketplace.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl text-[#FF0000] mb-4">🌍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Charity Initiatives
                </h3>
                <p className="text-gray-600">
                  A portion of transaction fees supports wildlife conservation,
                  because we care about real-world Pokémon too!
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl text-[#FF0000] mb-4">🚀</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Growing Ecosystem
                </h3>
                <p className="text-gray-600">
                  Join a vibrant, meme-loving community where nostalgia meets
                  cutting-edge blockchain technology.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">
              Join the POKEMONBALL Revolution
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Whether you're a seasoned crypto investor or a Pokémon fan looking
              to dive into the world of digital assets, POKEMONBALL is your
              chance to join a vibrant, meme-loving community. The Future of
              Crypto is in Your Hands! 🚀🔴
            </p>
            <button className="bg-[#FF0000] text-white px-8 py-3 rounded-md hover:bg-[#FF3333] transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Start Your Journey
            </button>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Available On
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-center justify-center hover:border-[#FF0000] transition-colors">
                <img
                  src="https://ucarecdn.com/f086cd73-fa4c-4ef9-a788-471f7a3035ff/-/format/auto/"
                  alt="PancakeSwap Logo"
                  className="h-12 mb-3 rounded-lg"
                />
                <span className="text-xl font-bold text-gray-800 mb-2">
                  PancakeSwap
                </span>
                <span className="text-[#FF0000] font-bold text-sm">
                  Soon !!!
                </span>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-center justify-center hover:border-[#FF0000] transition-colors">
                <img
                  src="https://ucarecdn.com/05b65499-2f3f-4403-a975-9ba9f342ec7d/-/format/auto/"
                  alt="KuCoin Logo"
                  className="h-12 mb-3 rounded-lg"
                />
                <span className="text-xl font-bold text-gray-800 mb-2">
                  KuCoin
                </span>
                <span className="text-[#FF0000] font-bold text-sm">
                  Soon !!!
                </span>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-center justify-center hover:border-[#FF0000] transition-colors">
                <img
                  src="https://ucarecdn.com/90e9c04e-2d15-42f1-b68e-f1ebd80bcc59/-/format/auto/"
                  alt="CoinGecko Logo"
                  className="h-12 mb-3 rounded-lg"
                />
                <span className="text-xl font-bold text-gray-800 mb-2">
                  CoinGecko
                </span>
                <span className="text-[#FF0000] font-bold text-sm">
                  Soon !!!
                </span>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-center justify-center hover:border-[#FF0000] transition-colors">
                <img
                  src="https://ucarecdn.com/e9463237-0071-4f83-88c0-76644c0df554/-/format/auto/"
                  alt="Bybit Logo"
                  className="h-12 mb-3 rounded-lg"
                />
                <span className="text-xl font-bold text-gray-800 mb-2">
                  Bybit
                </span>
                <span className="text-[#FF0000] font-bold text-sm">
                  Soon !!!
                </span>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-center justify-center hover:border-[#FF0000] transition-colors">
                <img
                  src="https://ucarecdn.com/41d325f0-20e6-48a6-89ed-624269ef0497/-/format/auto/"
                  alt="Crypto.com Logo"
                  className="h-12 mb-3 rounded-lg"
                />
                <span className="text-xl font-bold text-gray-800 mb-2">
                  Crypto.com
                </span>
                <span className="text-[#FF0000] font-bold text-sm">
                  Soon !!!
                </span>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-center justify-center hover:border-[#FF0000] transition-colors">
                <img
                  src="https://ucarecdn.com/9813e34d-d0c3-43a8-bd8e-22aca99afcda/-/format/auto/"
                  alt="Binance Logo"
                  className="h-12 mb-3 rounded-lg"
                />
                <span className="text-xl font-bold text-gray-800 mb-2">
                  Binance
                </span>
                <span className="text-[#FF0000] font-bold text-sm">
                  Soon !!!
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Stage Development Plan
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {[
                  {
                    stage: "Stage 1",
                    title: "Huge and Strong Community",
                    icon: "👥",
                  },
                  {
                    stage: "Stage 2",
                    title: "Token Development and Utility",
                    icon: "⚡",
                  },
                  {
                    stage: "Stage 3",
                    title: "Initial Exchange Listings",
                    icon: "📈",
                  },
                  {
                    stage: "Stage 4",
                    title: "Strategic Partnerships",
                    icon: "🤝",
                  },
                  {
                    stage: "Stage 5",
                    title: "New Big Listings and Partnerships",
                    icon: "🌟",
                  },
                  {
                    stage: "Stage 6",
                    title: "Pokémon Ball NFTs and Games",
                    icon: "🎮",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-[#FF0000] rounded-full flex items-center justify-center text-white text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm text-[#FF0000] font-semibold">
                        {item.stage}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex-grow flex justify-end">
                      {index < 5 && (
                        <div className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center">
                          <i className="fas fa-arrow-down text-white transform rotate-45"></i>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Media Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                <div className="col-span-full flex justify-center items-center h-48">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF0000]"></div>
                </div>
              ) : (
                media?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
                    style={{
                      animation: "fadeIn 0.5s ease-out",
                    }}
                  >
                    <div className="overflow-hidden rounded-lg">
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-500 hover:scale-110"
                        />
                      ) : (
                        <video
                          src={item.url}
                          controls
                          className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-500 hover:scale-110"
                        />
                      )}
                    </div>
                    {item.title && (
                      <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-[#FF0000] transition-colors duration-300">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
        <section className="bg-[#FF0000] text-white py-20">
          <div className="container mx-auto px-4 text-center animate-[float_4s_ease-in-out_infinite]">
            <h2 className="text-4xl font-bold mb-8">Join Our Community</h2>
            <p className="text-xl mb-8">
              Be part of the POKEMONBALL revolution
            </p>
            <div className="flex flex-col items-center space-y-6">
              <img
                src="https://ucarecdn.com/21cc34b1-0145-4390-bca6-8e8455343e78/-/format/auto/"
                alt="Telegram QR Code"
                className="w-48 aspect-square object-contain mb-4"
              />
              <a
                href="https://t.me/POKEMONBALLTOKEN"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-4xl hover:text-[#FF3333] cursor-pointer transition-all duration-300 hover:scale-125"
              >
                <i className="fab fa-telegram"></i>
                <span className="text-xl">@POKEMONBALLTOKEN</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

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

        @keyframes pulse-arrow {
          0%, 100% {
            transform: rotate(45deg) scale(1);
          }
          50% {
            transform: rotate(45deg) scale(1.2);
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

        .fa-arrow-down {
          animation: pulse-arrow 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;