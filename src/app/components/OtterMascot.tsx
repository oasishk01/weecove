export function OtterHead({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Head */}
      <ellipse cx="20" cy="21" rx="15" ry="14" fill="#C8956C" />
      {/* Face */}
      <ellipse cx="20" cy="23" rx="11" ry="10" fill="#F2DCC8" />
      {/* Ears */}
      <circle cx="8" cy="12" r="4" fill="#C8956C" />
      <circle cx="8" cy="12" r="2.5" fill="#DEB896" />
      <circle cx="32" cy="12" r="4" fill="#C8956C" />
      <circle cx="32" cy="12" r="2.5" fill="#DEB896" />
      {/* Eyes */}
      <ellipse cx="14.5" cy="20" rx="2.5" ry="3" fill="#1A0F06" />
      <ellipse cx="25.5" cy="20" rx="2.5" ry="3" fill="#1A0F06" />
      <ellipse cx="15.3" cy="18.8" rx="1" ry="1.2" fill="white" />
      <ellipse cx="26.3" cy="18.8" rx="1" ry="1.2" fill="white" />
      {/* Nose */}
      <ellipse cx="20" cy="25.5" rx="3.5" ry="2.5" fill="#1A0F06" />
      <ellipse cx="20" cy="25" rx="1.5" ry="0.8" fill="#4A3520" />
      {/* Mouth */}
      <path d="M17 28 Q20 31 23 28" stroke="#1A0F06" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Cheek blush */}
      <ellipse cx="11" cy="26" rx="2.5" ry="1.5" fill="#E8B89D" opacity="0.5" />
      <ellipse cx="29" cy="26" rx="2.5" ry="1.5" fill="#E8B89D" opacity="0.5" />
    </svg>
  );
}

export function OtterMascot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Body */}
      <ellipse cx="80" cy="115" rx="38" ry="48" fill="#C8956C" />
      {/* Belly */}
      <ellipse cx="80" cy="120" rx="28" ry="38" fill="#F2DCC8" />

      {/* Head */}
      <ellipse cx="80" cy="52" rx="30" ry="28" fill="#C8956C" />
      {/* Face */}
      <ellipse cx="80" cy="56" rx="22" ry="20" fill="#F2DCC8" />
      {/* Ears */}
      <circle cx="56" cy="32" r="7" fill="#C8956C" />
      <circle cx="56" cy="32" r="4.5" fill="#DEB896" />
      <circle cx="104" cy="32" r="7" fill="#C8956C" />
      <circle cx="104" cy="32" r="4.5" fill="#DEB896" />

      {/* Eyes */}
      <ellipse cx="69" cy="48" rx="3.5" ry="4" fill="#1A0F06" />
      <ellipse cx="91" cy="48" rx="3.5" ry="4" fill="#1A0F06" />
      <ellipse cx="70.2" cy="46.5" rx="1.3" ry="1.5" fill="white" />
      <ellipse cx="92.2" cy="46.5" rx="1.3" ry="1.5" fill="white" />

      {/* Nose */}
      <ellipse cx="80" cy="58" rx="5" ry="3.5" fill="#1A0F06" />
      <ellipse cx="80" cy="57.3" rx="2" ry="1" fill="#4A3520" />
      {/* Mouth */}
      <path d="M74 62 Q80 67 86 62" stroke="#1A0F06" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Cheek blush */}
      <ellipse cx="63" cy="60" rx="4" ry="2.5" fill="#E8B89D" opacity="0.4" />
      <ellipse cx="97" cy="60" rx="4" ry="2.5" fill="#E8B89D" opacity="0.4" />

      {/* Coin - held by paws */}
      <circle cx="80" cy="110" r="18" fill="#FBBF24" />
      <circle cx="80" cy="110" r="14.5" fill="#F59E0B" />
      <circle cx="80" cy="110" r="13" fill="#FBBF24" />
      <text x="80" y="116" textAnchor="middle" fill="#92400E" fontSize="16" fontWeight="bold" fontFamily="system-ui">$</text>

      {/* Left paw on coin */}
      <ellipse cx="60" cy="105" rx="10" ry="8" fill="#C8956C" transform="rotate(-15 60 105)" />
      <ellipse cx="59" cy="106" rx="6" ry="5" fill="#DEB896" transform="rotate(-15 59 106)" />
      {/* Right paw on coin */}
      <ellipse cx="100" cy="105" rx="10" ry="8" fill="#C8956C" transform="rotate(15 100 105)" />
      <ellipse cx="101" cy="106" rx="6" ry="5" fill="#DEB896" transform="rotate(15 101 106)" />

      {/* Feet */}
      <ellipse cx="65" cy="158" rx="12" ry="6" fill="#C8956C" />
      <ellipse cx="95" cy="158" rx="12" ry="6" fill="#C8956C" />

      {/* Tail */}
      <path d="M80 160 Q88 172 78 175 Q68 172 76 162" fill="#C8956C" />
    </svg>
  );
}

export function OtterWaving({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Body */}
      <ellipse cx="80" cy="115" rx="38" ry="48" fill="#C8956C" />
      {/* Belly */}
      <ellipse cx="80" cy="120" rx="28" ry="38" fill="#F2DCC8" />

      {/* Head */}
      <ellipse cx="80" cy="52" rx="30" ry="28" fill="#C8956C" />
      {/* Face */}
      <ellipse cx="80" cy="56" rx="22" ry="20" fill="#F2DCC8" />
      {/* Ears */}
      <circle cx="56" cy="32" r="7" fill="#C8956C" />
      <circle cx="56" cy="32" r="4.5" fill="#DEB896" />
      <circle cx="104" cy="32" r="7" fill="#C8956C" />
      <circle cx="104" cy="32" r="4.5" fill="#DEB896" />

      {/* Eyes - happy */}
      <path d="M64 47 Q69 42 74 47" stroke="#1A0F06" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M86 47 Q91 42 96 47" stroke="#1A0F06" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Nose */}
      <ellipse cx="80" cy="58" rx="5" ry="3.5" fill="#1A0F06" />
      <ellipse cx="80" cy="57.3" rx="2" ry="1" fill="#4A3520" />
      {/* Big smile */}
      <path d="M72 62 Q80 70 88 62" stroke="#1A0F06" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Cheek blush */}
      <ellipse cx="63" cy="60" rx="4" ry="2.5" fill="#E8B89D" opacity="0.5" />
      <ellipse cx="97" cy="60" rx="4" ry="2.5" fill="#E8B89D" opacity="0.5" />

      {/* Left paw - resting */}
      <ellipse cx="52" cy="108" rx="10" ry="8" fill="#C8956C" />
      <ellipse cx="51" cy="109" rx="6" ry="5" fill="#DEB896" />
      {/* Right paw - waving up */}
      <ellipse cx="118" cy="62" rx="10" ry="8" fill="#C8956C" transform="rotate(-20 118 62)" />
      <ellipse cx="119" cy="63" rx="6" ry="5" fill="#DEB896" transform="rotate(-20 119 63)" />

      {/* Small coin floating near waving paw */}
      <circle cx="135" cy="48" r="10" fill="#FBBF24" />
      <circle cx="135" cy="48" r="8" fill="#F59E0B" />
      <circle cx="135" cy="48" r="7" fill="#FBBF24" />
      <text x="135" y="52" textAnchor="middle" fill="#92400E" fontSize="10" fontWeight="bold" fontFamily="system-ui">$</text>

      {/* Feet */}
      <ellipse cx="65" cy="158" rx="12" ry="6" fill="#C8956C" />
      <ellipse cx="95" cy="158" rx="12" ry="6" fill="#C8956C" />
    </svg>
  );
}
