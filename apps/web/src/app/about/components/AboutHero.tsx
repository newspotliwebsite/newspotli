import Image from 'next/image'

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#5C0F0F] to-[#8B1A1A] py-24 md:py-32 px-4 md:px-12 lg:px-24">
      <Image
        src="/images/illustrations/about-journalism-field.png"
        alt=""
        fill
        className="object-cover opacity-[0.10] pointer-events-none mix-blend-soft-light"
        aria-hidden="true"
      />

      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="font-noto text-4xl md:text-5xl font-bold text-white leading-[1.2] mb-8 text-balance">
          भारत के किसानों और गांवों की आवाज़<span className="text-gold">.</span>
        </h1>

        <div className="space-y-5 max-w-4xl mx-auto">
          <p className="font-noto text-lg text-white/80 leading-relaxed">
            न्यूज़ पोटली भारत के गावों की उन आवजों को आप तक पहुंचाता है, जिसे अक्सर मुख्यधारा की मीडिया पीछे छोड़ देती हैं। हमारा मकसद किसानों की दिक्कतों, हालात, उनके संघर्ष, दुख, खुशियों के साथ ही उनकी कहानियों को वीडियो और टेक्स्ट के जरिए उन लोगों तक पहुंचाना है, जहां से उनके लिए कोई हल निकल सके।
          </p>
          <p className="font-noto text-lg text-white/80 leading-relaxed">
            हमारा फोकस क्लाइमेट चेंज का किसानी और उससे जुड़े हुए लोगों की जिंदगी पर पड़ने वाले असर पर है। इसके साथ ही हमारी कोशिश खेती की दुनिया में हो रहे कुछ नए प्रयोग, तकनीक को किसानों तक पहुंचाना है, जिससे कि उनकी ज़िंदगी में एक सकारात्मक बदलाव आ सके।
          </p>
        </div>
      </div>
    </section>
  )
}
