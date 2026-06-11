import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Clock, ChevronRight } from 'lucide-react';
import walkingCatGif from './assets/gifs/walking-cat.gif';
import cuteCatGif from './assets/gifs/cute-cat.gif';
import sadCat1Gif from './assets/gifs/sad-cat-1.gif';
import sadCat2Gif from './assets/gifs/sad-cat-2.gif';
import sadCat3Gif from './assets/gifs/sad-cat-3.gif';
import happyCatGif from './assets/gifs/happy-cat.gif';
import heartsCatGif from './assets/gifs/hearts-cat.gif';
import envelopeGif from './assets/gifs/envelope.gif';

// ============================================================================
// CONFIGURATION
// GIFs are bundled locally so they work on GitHub Pages (external hosts block hotlinking)
// ============================================================================
const IMAGES = {
  walkingCat: walkingCatGif,
  cuteCat: cuteCatGif,
  sadCat1: sadCat1Gif,
  sadCat2: sadCat2Gif,
  sadCat3: sadCat3Gif,
  happyCat: happyCatGif,
  heartsCat: heartsCatGif,
  envelope: envelopeGif,
};

// Random messages for food selection
const FOOD_MESSAGES = [
  "nice choice babe 😋",
  "u got it princess 👑",
  "i knew ur gonna choose this one 🥰",
  "nvr tried this one, excited! 🤩",
  "ooooh my fav ❤️"
];

// Food options
const FOOD_OPTIONS = [
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'sushi', name: 'Sushi', icon: '🍣' },
  { id: 'burger', name: 'Burger', icon: '🍔' },
  { id: 'pasta', name: 'Pasta', icon: '🍝' },
  { id: 'ramen', name: 'Ramen', icon: '🍜' },
  { id: 'mexican', name: 'Mexican', icon: '🌮' },
];

export default function App() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  const [step, setStep] = useState(0); // 0: Walking, 1: Proposal, 2: Yay, 3: Schedule, 4: Food, 5: Final
  const [noCount, setNoCount] = useState(0);
  const [showLetter, setShowLetter] = useState(false);
  
  // Schedule state
  const [date, setDate] = useState({ day: '', month: '', year: '' });
  const [time, setTime] = useState('');
  
  // Food state
  const [foodChoice, setFoodChoice] = useState('');
  const [foodMessage, setFoodMessage] = useState('');

  // ============================================================================
  // EFFECTS
  // ============================================================================
  // Trigger letter appearance after cat walks
  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => {
        setShowLetter(true);
      }, 3500); // 3.5 seconds for the cat to walk
      return () => clearTimeout(timer);
    }
  }, [step]);

  // ============================================================================
  // HANDLERS
  // ============================================================================
  const handleNoClick = () => {
    if (noCount < 3) {
      setNoCount(noCount + 1);
    }
  };

  const handleYesClick = () => {
    setStep(2); // Go to Yay screen
  };

  const handleFoodSelect = (foodId: string) => {
    setFoodChoice(foodId);
    // Pick a random message
    const randomMsg = FOOD_MESSAGES[Math.floor(Math.random() * FOOD_MESSAGES.length)];
    setFoodMessage(randomMsg);
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================
  
  // Determine which cat image to show on the proposal screen based on "No" count
  const getProposalCat = () => {
    if (noCount === 0) return IMAGES.cuteCat;
    if (noCount === 1) return IMAGES.sadCat1;
    if (noCount === 2) return IMAGES.sadCat2;
    return IMAGES.sadCat3;
  };

  // Determine the size of the "Yes" button based on "No" count
  const getYesButtonSize = () => {
    return 1 + (noCount * 0.5); // Grows by 50% each time "No" is clicked
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center overflow-hidden font-sans text-gray-800">
      <AnimatePresence mode="wait">
        
        {/* ============================================================================
            STEP 0: WALKING CAT & LETTER
            ============================================================================ */}
        {step === 0 && (
          <motion.div 
            key="step0"
            className="relative w-full h-screen max-w-md mx-auto bg-pink-100 flex items-center justify-center overflow-hidden"
            exit={{ opacity: 0 }}
          >
            {/* Walking Cat Animation */}
            <motion.img
              src={IMAGES.walkingCat}
              alt="Walking Cat"
              className="absolute bottom-1/4 w-32 h-32 object-contain"
              initial={{ x: '-100vw' }}
              animate={{ x: '100vw' }}
              transition={{ duration: 4, ease: "linear" }}
            />

            {/* Letter popping up after cat walks */}
            <AnimatePresence>
              {showLetter && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, y: [0, -20, 0] }}
                  transition={{ 
                    duration: 0.5, 
                    type: "spring",
                    y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                  }}
                  className="z-10 cursor-pointer"
                  onClick={() => setStep(1)}
                >
                  <div className="flex flex-col items-center gap-4">
                    <img src={IMAGES.envelope} alt="Letter" className="w-32 h-32 object-contain" />
                    <span className="text-pink-600 font-bold animate-pulse text-lg">Click me!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ============================================================================
            STEP 1: PROPOSAL (WILL YOU GO OUT WITH ME?)
            ============================================================================ */}
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 text-center"
          >
            <img 
              src={getProposalCat()} 
              alt="Cute Cat" 
              className="w-48 h-48 object-contain mb-8 rounded-lg shadow-sm"
            />
            
            <h1 className="text-3xl font-bold text-pink-500 mb-12">
              Will you go out with me? 🥺
            </h1>

            <div className="flex items-center justify-center gap-8 w-full h-32 relative">
              <motion.button
                onClick={handleYesClick}
                style={{ scale: getYesButtonSize() }}
                className="bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors z-10"
                whileHover={{ scale: getYesButtonSize() + 0.1 }}
                whileTap={{ scale: getYesButtonSize() - 0.1 }}
              >
                Yes!
              </motion.button>

              {noCount < 3 && (
                <motion.button
                  onClick={handleNoClick}
                  className="bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  No
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ============================================================================
            STEP 2: SUCCESS / YAY
            ============================================================================ */}
        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 text-center"
          >
            <img 
              src={IMAGES.happyCat} 
              alt="Happy Cat" 
              className="w-56 h-56 object-contain mb-8"
            />
            
            <h1 className="text-4xl font-extrabold text-pink-500 mb-12 animate-bounce">
              Yaaay! You said YES! 🎉
            </h1>

            <motion.button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        )}

        {/* ============================================================================
            STEP 3: PLANNING SCHEDULE (ORANGE CARD)
            ============================================================================ */}
        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto p-6"
          >
            <div className="bg-orange-400 rounded-3xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-8 text-center border-b-2 border-orange-300 pb-4">
                Planning Schedule 📅
              </h2>

              <div className="space-y-6">
                {/* Date Picker */}
                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <Calendar size={20} /> Pick a day
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="DD" 
                      maxLength={2}
                      value={date.day}
                      onChange={(e) => setDate({...date, day: e.target.value})}
                      className="w-16 p-3 rounded-xl bg-orange-300/50 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white text-center"
                    />
                    <input 
                      type="text" 
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="MM" 
                      maxLength={2}
                      value={date.month}
                      onChange={(e) => setDate({...date, month: e.target.value})}
                      className="w-16 p-3 rounded-xl bg-orange-300/50 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white text-center"
                    />
                    <input 
                      type="text" 
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="YYYY" 
                      maxLength={4}
                      value={date.year}
                      onChange={(e) => setDate({...date, year: e.target.value})}
                      className="flex-1 p-3 rounded-xl bg-orange-300/50 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white text-center"
                    />
                  </div>
                </div>

                {/* Time Picker */}
                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold mb-3 mt-6">
                    <Clock size={20} /> What time?
                  </label>
                  <input 
                    type="time" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-3 rounded-xl bg-orange-300/50 text-white focus:outline-none focus:ring-2 focus:ring-white [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <motion.button
                  onClick={() => {
                    // Only proceed if filled, but for now we can just proceed
                    if (date.day && date.month && date.year && time) {
                      setStep(4);
                    } else {
                      alert("Please pick a date and time so I know when to get you! 😉");
                    }
                  }}
                  className="flex items-center gap-2 bg-white text-orange-500 font-bold py-3 px-6 rounded-full shadow-lg transition-all hover:bg-orange-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next <ChevronRight size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ============================================================================
            STEP 4: FOOD MENU (WHITE PAGE)
            ============================================================================ */}
        {step === 4 && (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="w-full max-w-md mx-auto p-4 min-h-screen bg-white shadow-xl flex flex-col items-center pt-12"
          >
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
              What are we eating? 🍽️
            </h2>
            <p className="text-pink-500 font-medium mb-8 text-center px-4 bg-pink-50 py-2 rounded-lg">
              "Im treating baby pick what u feel" ✨
            </p>

            <div className="grid grid-cols-2 gap-4 w-full px-4 mb-8">
              {FOOD_OPTIONS.map((food) => (
                <motion.button
                  key={food.id}
                  onClick={() => handleFoodSelect(food.id)}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
                    foodChoice === food.id 
                      ? 'border-pink-500 bg-pink-50 shadow-md' 
                      : 'border-gray-100 bg-gray-50 hover:border-pink-300 hover:bg-pink-50/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-5xl mb-3">{food.icon}</span>
                  <span className="font-semibold text-gray-700">{food.name}</span>
                </motion.button>
              ))}
            </div>

            {foodMessage && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-lg font-bold text-pink-600 mb-8 text-center bg-pink-100 py-3 px-6 rounded-full"
              >
                {foodMessage}
              </motion.div>
            )}

            <AnimatePresence>
              {foodChoice && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setStep(5)}
                  className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-10 rounded-full shadow-xl transition-all mb-8"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Perfect, let's go! <ChevronRight size={20} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ============================================================================
            STEP 5: FINAL SCREEN
            ============================================================================ */}
        {step === 5 && (
          <motion.div 
            key="step5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 text-center"
          >
            <img 
              src={IMAGES.heartsCat} 
              alt="Cat with hearts" 
              className="w-64 h-64 object-contain mb-8 rounded-2xl shadow-lg"
            />
            
            <div className="bg-white p-6 rounded-3xl shadow-xl w-full border-2 border-pink-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Heart size={48} fill="currentColor" className="text-pink-500" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 z-10 relative">
                I'll come get u at <span className="text-pink-500">{time}</span> <br/>
                on <span className="text-pink-500">{date.day}/{date.month}/{date.year}</span> <br/>
                prince(ss) 👑
              </h2>
              
              <div className="mt-8 pt-6 border-t border-pink-100 text-gray-600 italic font-medium relative z-10 text-sm">
                ps: i wouldve came to get u anyway cause your mine 😊❤️
              </div>
            </div>
          </motion.div>
        )}
        
      </AnimatePresence>
    </div>
  );
}
