import React from 'react';
import { useTheme } from '../utils/themeContext';

export const AsciiPottedFlowersFooter: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // High contrast colors for Light mode (Deep dark evergreen & emeralds on cream #baaf7d)
  const lightColors = {
    // Ultra deep dark pine & forest greens (maximum contrast on #baaf7d)
    c1: 'text-[#022c15] font-bold',  // Deep forest night green
    c2: 'text-[#044421] font-bold',  // Deep evergreen pine
    c3: 'text-[#06592a] font-bold',  // Rich dark emerald
    c4: 'text-[#0a4625] font-bold',  // Deep dark moss
    flower: 'text-[#881337] font-bold', // Deep ruby rose blossom
    flowerAmber: 'text-[#78350f] font-bold', // Deep amber
    flowerViolet: 'text-[#4c1d95] font-bold', // Deep violet
    base: 'text-black font-black',   // High contrast pot/ground rim
  };

  // Dark mode retro glowing cyberpunk/terminal flower colors
  const darkColors = {
    rose: 'text-[#ff7b90]',
    amber: 'text-[#fbbf24]',
    violet: 'text-[#a78bfa]',
    sky: 'text-[#38bdf8]',
    pink: 'text-[#f472b6]',
    emerald: 'text-[#34d399]',
    yellow: 'text-[#facc15]',
    purple: 'text-[#c084fc]',
    coral: 'text-[#fb7185]',
    teal: 'text-[#67e8f9]',
    lime: 'text-[#a3e635]',
    magenta: 'text-[#e879f9]',
    stems: 'text-[#4ade80]',
    potTop: 'text-[#d97706]',
    potBody: 'text-[#92400e]',
  };

  return (
    <footer
      id="ascii-flowers-footer"
      className={`w-full transition-colors mt-16 py-6 px-2 sm:px-4 select-none overflow-hidden text-center ${
        isLight
          ? 'bg-[#baaf7d] border-t-2 border-black'
          : 'bg-black border-t border-[#093522]'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        {isLight ? (
          /* LIGHT MODE: Unicode Block Cacti with High-Contrast Dark Greens on Cream */
          <>
            {/* Mobile View: 4 Unicode Block Cacti */}
            <div className="block md:hidden w-full overflow-hidden text-center">
              <pre
                className="ascii-art text-[11px] leading-tight font-mono inline-block text-left"
                dir="ltr"
              >
                {/* Line 1 */}
                <span className={lightColors.c1}>      ▄█▄      </span>
                <span className={lightColors.flower}>       (✿)     </span>
                <span className={lightColors.c3}>       ▄█▄     </span>
                <span className={lightColors.c2}>   ▄█▄ ▄█▄ ▄█▄ </span>
                {'\n'}
                {/* Line 2 */}
                <span className={lightColors.c1}>   ▄█ █▓█ ▄█   </span>
                <span className={lightColors.c2}>      ▄███▄    </span>
                <span className={lightColors.c3}>   ▄█  █▓█     </span>
                <span className={lightColors.c2}>   █▓█ █▓█ █▓█ </span>
                {'\n'}
                {/* Line 3 */}
                <span className={lightColors.c1}>   █▓██▓██▓█   </span>
                <span className={lightColors.c2}>     ██▓█▓██   </span>
                <span className={lightColors.c3}>   █▓███▓█ ▄█  </span>
                <span className={lightColors.c2}>   █▓█ █▓█ █▓█ </span>
                {'\n'}
                {/* Line 4 */}
                <span className={lightColors.c1}>   ▀███▓███▀   </span>
                <span className={lightColors.c2}>     ██▓█▓██   </span>
                <span className={lightColors.c3}>   ▀████▓██▓█  </span>
                <span className={lightColors.c2}>   ▀█████████▀ </span>
                {'\n'}
                {/* Line 5 */}
                <span className={lightColors.c1}>      █▓█      </span>
                <span className={lightColors.c2}>      ▀███▀    </span>
                <span className={lightColors.c3}>       █▓███▀  </span>
                <span className={lightColors.c2}>       █▓█     </span>
                {'\n'}
                {/* Line 6 */}
                <span className={lightColors.c1}>      █▓█      </span>
                <span className={lightColors.c2}>       █▓█     </span>
                <span className={lightColors.c3}>       █▓█     </span>
                <span className={lightColors.c2}>       █▓█     </span>
                {'\n'}
                {/* Line 7 */}
                <span className={lightColors.base}>     ▄███▄     </span>
                <span className={lightColors.base}>      ▄███▄    </span>
                <span className={lightColors.base}>      ▄███▄    </span>
                <span className={lightColors.base}>      ▄███▄    </span>
                {'\n'}
                {/* Line 8 */}
                <span className={lightColors.base}>    ▀▀▀▀▀▀▀    </span>
                <span className={lightColors.base}>     ▀▀▀▀▀▀▀   </span>
                <span className={lightColors.base}>     ▀▀▀▀▀▀▀   </span>
                <span className={lightColors.base}>     ▀▀▀▀▀▀▀   </span>
              </pre>
            </div>

            {/* Desktop View: 8 Unicode Block Cacti in desert panorama */}
            <div className="hidden md:block w-full overflow-hidden text-center">
              <pre
                className="ascii-art text-xs sm:text-[13px] leading-tight font-mono inline-block text-left"
                dir="ltr"
              >
                {/* Line 1 */}
                <span className={lightColors.c1}>      ▄█▄      </span>
                <span className={lightColors.flower}>       (✿)     </span>
                <span className={lightColors.c3}>       ▄█▄     </span>
                <span className={lightColors.c4}>     ▄█▄ ▄█▄   </span>
                <span className={lightColors.c2}>   ▄█▄ ▄█▄ ▄█▄ </span>
                <span className={lightColors.flowerViolet}>       *✿*     </span>
                <span className={lightColors.c1}>      ▄█▄      </span>
                <span className={lightColors.flowerAmber}>       (✿)     </span>
                {'\n'}
                {/* Line 2 */}
                <span className={lightColors.c1}>   ▄█ █▓█ ▄█   </span>
                <span className={lightColors.c2}>      ▄███▄    </span>
                <span className={lightColors.c3}>   ▄█  █▓█     </span>
                <span className={lightColors.c4}>     █▓█ █▓█   </span>
                <span className={lightColors.c2}>   █▓█ █▓█ █▓█ </span>
                <span className={lightColors.c3}>     ▄  █  ▄   </span>
                <span className={lightColors.c1}>   ▄█ █▓█ ▄█   </span>
                <span className={lightColors.c4}>      ▄███▄    </span>
                {'\n'}
                {/* Line 3 */}
                <span className={lightColors.c1}>   █▓██▓██▓█   </span>
                <span className={lightColors.c2}>     ██▓█▓██   </span>
                <span className={lightColors.c3}>   █▓███▓█ ▄█  </span>
                <span className={lightColors.c4}>      ▀███▀    </span>
                <span className={lightColors.c2}>   █▓█ █▓█ █▓█ </span>
                <span className={lightColors.c3}>    ███ █ ███  </span>
                <span className={lightColors.c1}>   █▓██▓██▓█   </span>
                <span className={lightColors.c4}>     ██▓█▓██   </span>
                {'\n'}
                {/* Line 4 */}
                <span className={lightColors.c1}>   ▀███▓███▀   </span>
                <span className={lightColors.c2}>     ██▓█▓██   </span>
                <span className={lightColors.c3}>   ▀████▓██▓█  </span>
                <span className={lightColors.c4}>     ▄█▀ ▀█▄   </span>
                <span className={lightColors.c2}>   ▀█████████▀ </span>
                <span className={lightColors.c3}>    ▀███████▀  </span>
                <span className={lightColors.c1}>   ▀███▓███▀   </span>
                <span className={lightColors.c4}>     ██▓█▓██   </span>
                {'\n'}
                {/* Line 5 */}
                <span className={lightColors.c1}>      █▓█      </span>
                <span className={lightColors.c2}>      ▀███▀    </span>
                <span className={lightColors.c3}>       █▓███▀  </span>
                <span className={lightColors.c4}>     ██▓█▓██   </span>
                <span className={lightColors.c2}>       █▓█     </span>
                <span className={lightColors.c3}>       ███     </span>
                <span className={lightColors.c1}>      █▓█      </span>
                <span className={lightColors.c4}>      ▀███▀    </span>
                {'\n'}
                {/* Line 6 */}
                <span className={lightColors.c1}>      █▓█      </span>
                <span className={lightColors.c2}>       █▓█     </span>
                <span className={lightColors.c3}>       █▓█     </span>
                <span className={lightColors.c4}>      ▀███▀    </span>
                <span className={lightColors.c2}>       █▓█     </span>
                <span className={lightColors.c3}>       █▓█     </span>
                <span className={lightColors.c1}>      █▓█      </span>
                <span className={lightColors.c4}>       █▓█     </span>
                {'\n'}
                {/* Line 7 */}
                <span className={lightColors.base}>     ▄███▄     </span>
                <span className={lightColors.base}>      ▄███▄    </span>
                <span className={lightColors.base}>      ▄███▄    </span>
                <span className={lightColors.base}>      ▄███▄    </span>
                <span className={lightColors.base}>      ▄███▄    </span>
                <span className={lightColors.base}>      ▄███▄    </span>
                <span className={lightColors.base}>     ▄███▄     </span>
                <span className={lightColors.base}>      ▄███▄    </span>
                {'\n'}
                {/* Line 8 */}
                <span className={lightColors.base}>    ▀▀▀▀▀▀▀    </span>
                <span className={lightColors.base}>     ▀▀▀▀▀▀▀   </span>
                <span className={lightColors.base}>     ▀▀▀▀▀▀▀   </span>
                <span className={lightColors.base}>     ▀▀▀▀▀▀▀   </span>
                <span className={lightColors.base}>     ▀▀▀▀▀▀▀   </span>
                <span className={lightColors.base}>     ▀▀▀▀▀▀▀   </span>
                <span className={lightColors.base}>    ▀▀▀▀▀▀▀    </span>
                <span className={lightColors.base}>     ▀▀▀▀▀▀▀   </span>
              </pre>
            </div>
          </>
        ) : (
          /* DARK MODE: Retro Terminal Glowing ASCII Flowers */
          <>
            {/* Mobile View: 4 ASCII Potted Flowers */}
            <div className="block md:hidden w-full overflow-hidden text-center">
              <pre
                className="ascii-art text-xs font-mono inline-block text-left"
                dir="ltr"
              >
                {/* Layer 1: Blossoms (4 pots) */}
                <span className={darkColors.rose}>   (@)     </span>
                <span className={darkColors.amber}>   \*/     </span>
                <span className={darkColors.violet}>   (O)     </span>
                <span className={darkColors.pink}>  (♥)      </span>
                {'\n'}
                {/* Layer 2: Petals & centers */}
                <span className={darkColors.rose}>  ((|))    </span>
                <span className={darkColors.amber}>  /|/|\    </span>
                <span className={darkColors.violet}>  - O -    </span>
                <span className={darkColors.pink}> ((|))     </span>
                {'\n'}
                {/* Layer 3: Leaves & Stems */}
                <span className={darkColors.stems}>  _\|/_    </span>
                <span className={darkColors.stems}>   \|/     </span>
                <span className={darkColors.stems}>  _\|/_    </span>
                <span className={darkColors.stems}>   \|/     </span>
                {'\n'}
                {/* Layer 4: Pots Top */}
                <span className={darkColors.potTop}> [=====]   </span>
                <span className={darkColors.potTop}>  [===]    </span>
                <span className={darkColors.potTop}> [=====]   </span>
                <span className={darkColors.potTop}>  [===]    </span>
                {'\n'}
                {/* Layer 5: Pots Body */}
                <span className={darkColors.potBody}>  \___/    </span>
                <span className={darkColors.potBody}>   \_/     </span>
                <span className={darkColors.potBody}>  \___/    </span>
                <span className={darkColors.potBody}>   \_/     </span>
              </pre>
            </div>

            {/* Desktop View: 12 ASCII Potted Flowers */}
            <div className="hidden md:block w-full overflow-hidden text-center">
              <pre
                className="ascii-art text-xs sm:text-[13px] font-mono inline-block text-left"
                dir="ltr"
              >
                {/* Layer 1: Blossoms (12 pots) */}
                <span className={darkColors.rose}>   (@)     </span>
                <span className={darkColors.amber}>   \*/     </span>
                <span className={darkColors.violet}>   (O)     </span>
                <span className={darkColors.sky}>   {`{}`}     </span>
                <span className={darkColors.pink}>  (♥)      </span>
                <span className={darkColors.emerald}>   (*)     </span>
                <span className={darkColors.yellow}>   (@)     </span>
                <span className={darkColors.purple}>   \*/     </span>
                <span className={darkColors.coral}>   (O)     </span>
                <span className={darkColors.teal}>   {`{}`}     </span>
                <span className={darkColors.lime}>   (*)     </span>
                <span className={darkColors.magenta}>  (♥)      </span>
                {'\n'}
                {/* Layer 2: Petals & centers */}
                <span className={darkColors.rose}>  ((|))    </span>
                <span className={darkColors.amber}>  /|/|\    </span>
                <span className={darkColors.violet}>  - O -    </span>
                <span className={darkColors.sky}>  {`{ # }`}   </span>
                <span className={darkColors.pink}> ((|))     </span>
                <span className={darkColors.emerald}>  /|*|\    </span>
                <span className={darkColors.yellow}>  ((|))    </span>
                <span className={darkColors.purple}>  /|/|\    </span>
                <span className={darkColors.coral}>  - O -    </span>
                <span className={darkColors.teal}>  {`{ # }`}   </span>
                <span className={darkColors.lime}>  /|*|\    </span>
                <span className={darkColors.magenta}> ((|))     </span>
                {'\n'}
                {/* Layer 3: Leaves & Stems */}
                <span className={darkColors.stems}>  _\|/_    </span>
                <span className={darkColors.stems}>   \|/     </span>
                <span className={darkColors.stems}>  _\|/_    </span>
                <span className={darkColors.stems}>   \|/     </span>
                <span className={darkColors.stems}>  _\|/_    </span>
                <span className={darkColors.stems}>   \|/     </span>
                <span className={darkColors.stems}>  _\|/_    </span>
                <span className={darkColors.stems}>   \|/     </span>
                <span className={darkColors.stems}>  _\|/_    </span>
                <span className={darkColors.stems}>   \|/     </span>
                <span className={darkColors.stems}>  _\|/_    </span>
                <span className={darkColors.stems}>   \|/     </span>
                {'\n'}
                {/* Layer 4: Pots Top */}
                <span className={darkColors.potTop}> [=====]   </span>
                <span className={darkColors.potTop}>  [===]    </span>
                <span className={darkColors.potTop}> [=====]   </span>
                <span className={darkColors.potTop}>  [===]    </span>
                <span className={darkColors.potTop}> [=====]   </span>
                <span className={darkColors.potTop}>  [===]    </span>
                <span className={darkColors.potTop}> [=====]   </span>
                <span className={darkColors.potTop}>  [===]    </span>
                <span className={darkColors.potTop}> [=====]   </span>
                <span className={darkColors.potTop}>  [===]    </span>
                <span className={darkColors.potTop}> [=====]   </span>
                <span className={darkColors.potTop}>  [===]    </span>
                {'\n'}
                {/* Layer 5: Pots Body */}
                <span className={darkColors.potBody}>  \___/    </span>
                <span className={darkColors.potBody}>   \_/     </span>
                <span className={darkColors.potBody}>  \___/    </span>
                <span className={darkColors.potBody}>   \_/     </span>
                <span className={darkColors.potBody}>  \___/    </span>
                <span className={darkColors.potBody}>   \_/     </span>
                <span className={darkColors.potBody}>  \___/    </span>
                <span className={darkColors.potBody}>   \_/     </span>
                <span className={darkColors.potBody}>  \___/    </span>
                <span className={darkColors.potBody}>   \_/     </span>
                <span className={darkColors.potBody}>  \___/    </span>
                <span className={darkColors.potBody}>   \_/     </span>
              </pre>
            </div>
          </>
        )}
      </div>
    </footer>
  );
};
