"use client";
import React from "react";

function MainComponent() {
  const [copied, setCopied] = useState(false);
  const [media, setMedia] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const contractAddress = "0xDbC1BaCfF6C9039A8Fc9C3D75D2EA904adEe6347";
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
      <CurrencySnow />
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 py-2 md:py-4 flex justify-between items-center">
          <a href="/" className="flex items-center">
            <img
              src="https://ucarecdn.com/8d72dcd1-90b7-44a0-8dc9-7b0ba528e663/-/format/auto/"
              alt="POKEMONBALL logo"
              className="w-8 h-8 md:w-12 md:h-12 mr-2 hover:rotate-12 transition-transform duration-300"
            />
            <span className="text-lg md:text-2xl font-bold text-[#FF0000]">
              POKEMONBALL
            </span>
          </a>
          <div className="space-x-4">
            <a
              href="/"
              className="text-sm md:text-base text-[#FF0000] hover:text-[#FF3333] transition-colors duration-300"
            >
              Home
            </a>
          </div>
        </div>
      </nav>
      <main className="pt-20">
        <section className="pt-16 md:pt-24 bg-white">
          <div className="container mx-auto px-4 py-12 md:py-20 text-center">
            <img
              src="https://ucarecdn.com/8d72dcd1-90b7-44a0-8dc9-7b0ba528e663/-/format/auto/"
              alt="POKEMONBALL"
              className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8 animate-bounce"
            />
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-[#FF0000] mb-4 md:mb-6">
              POKEMONBALL
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 md:mb-12">
              Join the most exciting crypto gaming revolution
            </p>
          </div>
        </section>
        <section className="bg-gray-100 py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#FF0000] mb-6 md:mb-8">
              Contract Address
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
              <span className="text-sm md:text-base text-gray-600 break-all">
                {contractAddress}
              </span>
              <button
                onClick={handleCopy}
                className="text-[#FF0000] hover:text-[#FF3333] transition-all duration-300 p-2"
              >
                {copied ? (
                  <svg viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 448 512" className="w-4 h-4 fill-current">
                    <path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16h140.1l67.9 67.9V320c0 8.8-7.2 16-16 16zm-192 48h192c35.3 0 64-28.7 64-64V115.9L371.9 32H192c-35.3 0-64 28.7-64 64v224c0 35.3 28.7 64 64 64z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </section>
        <section className="bg-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="relative max-w-3xl mx-auto">
              <video
                className="w-full rounded-xl md:rounded-2xl shadow-xl"
                autoPlay
                loop
                playsInline
                muted={isMuted}
                src="https://raw.githubusercontent.com/AbdElMalek-L/Pokemonball-site/master/Pokemonball.mp4"
              >
                Your browser does not support the video tag.
              </video>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300"
              >
                {isMuted ? (
                  <svg viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                    <path d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.64 45.64c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 576 512" className="w-4 h-4 fill-current">
                    <path d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Available On
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-center justify-center hover:border-[#FF0000] transition-colors relative overflow-hidden shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <img
                  src="https://ucarecdn.com/f086cd73-fa4c-4ef9-a788-471f7a3035ff/-/format/auto/"
                  alt="PancakeSwap Logo"
                  className="h-12 mb-3 rounded-lg"
                />
                <span className="text-xl font-bold text-gray-800 mb-2">
                  PancakeSwap
                </span>
                <span className="text-green-500 font-bold text-sm mb-2">
                  Available Now!
                </span>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-600 break-all text-center">
                    {contractAddress}
                  </div>
                  <button
                    onClick={handleCopy}
                    className="text-green-500 hover:text-green-600 transition-colors duration-300"
                  >
                    <i className={`fas ${copied ? "fa-check" : "fa-copy"}`}></i>
                  </button>
                </div>
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
        <section className="bg-[#FF0000] text-white py-20">
          <div className="container mx-auto px-4 text-center">
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

              <div className="flex justify-center gap-8">
                <a
                  href="https://t.me/POKEMONBALLTOKEN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center"
                >
                  <div className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">
                    <svg viewBox="0 0 496 512" className="w-8 h-8 fill-current">
                      <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z" />
                    </svg>
                  </div>
                  <span className="text-sm">Telegram</span>
                </a>

                <a
                  href="https://twitter.com/POKEMONBALLTOKEN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center"
                >
                  <div className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">
                    <svg viewBox="0 0 512 512" className="w-8 h-8 fill-current">
                      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                    </svg>
                  </div>
                  <span className="text-sm">Twitter</span>
                </a>

                <a
                  href="https://discord.gg/POKEMONBALLTOKEN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center"
                >
                  <div className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">
                    <svg viewBox="0 0 640 512" className="w-8 h-8 fill-current">
                      <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
                    </svg>
                  </div>
                  <span className="text-sm">Discord</span>
                </a>
              </div>
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
          font-size: 16px;
          @media (min-width: 768px) {
            font-size: 24px;
          }
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