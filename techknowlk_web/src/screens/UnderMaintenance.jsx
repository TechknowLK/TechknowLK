import { Wrench, Mail, Phone } from "lucide-react";

const UnderMaintenance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b4f6c] to-[#01394e] flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400/20 blur-3xl rounded-full"></div>
            <Wrench className="w-24 h-24 text-cyan-400 relative animate-pulse" />
          </div>
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            We're Under <span className="text-cyan-400">Maintenance</span>
          </h1>
          <p className="text-xl text-gray-300">
            Our website is currently undergoing scheduled maintenance to bring you an even better experience.
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 space-y-4">
          <p className="text-lg text-white font-medium">
            We'll be back shortly!
          </p>
          <p className="text-gray-300">
            We're working hard to improve our services. Thank you for your patience.
          </p>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <p className="text-gray-300 text-sm">
            Need immediate assistance? Contact us:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:info@techknowlanka.com" 
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>techknowlkinfo@gmail.com</span>
            </a>
            <a 
              href="tel:+94111234567" 
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>+94 771336735 / +94 719707674</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8">
          <p className="text-sm text-gray-400">
            © 2024 Techknow Lanka (Pvt) Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnderMaintenance;
