import { Shield, Zap, Clock, Globe,CircleCheckBig ,ArrowRight } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "End-to-end data security and infrastructure reliability for your peace of mind."
  },
  {
    icon: Zap,
    title: "Cutting-Edge Technology",
    description: "Latest innovations in AI, IoT, and automation to keep you ahead of competitors."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock technical support to ensure your business never stops running."
  },
  {
    icon: Globe,
    title: "Global Standards",
    description: "International quality protocols and standards we follow and implement."
  }
];

const achievements = [
  { label: "04+ Years Industry Experience", value: "" },
  { label: "50+ Successful Projects", value: "" },
  { label: "40+ Enterprise Clients", value: "" },
  { label: "Award-Winning Solutions", value: "" },
  { label: "24/7 Technical Support", value: "" }
];

const WhyChoose = () => {
  return (
    <section className="py-20 bg-[#DDE0E2]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 drop-shadow-sm ">
            <span className="text-[#626262]">Why Choose</span>
           <span className="text-[#33A1E0]">TechknowLK?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-[#626262]">
            We combine innovation, expertise, and dedication to deliver exceptional technology solutions that drive your business forward.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start px-6 ">
         
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="  shadow-[10px_10px_25px_rgba(0,0,0,0.13)] rounded-lg p-6  hover:scale-105 duration-300 transition-all"
              >
                <div className="text-[#ffffff] w-12 h-12 bg-[#33A1E0] rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 " />
                </div>  
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

       
          <div className="bg-[#154D71] rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Proven Track Record</h3>
            <p className="text-white/70 mb-8 text-sm">
              Our commitment to excellence has earned us recognition as #1 technology solutions provider in Sri Lanka
            </p>
            <div className="space-y-4 ">
              {achievements.map((achievement, index) => (
                <div key={index} className="border-b border-white/10 pb-3 flex flex-row items-center gap-2">
                     <CircleCheckBig color="#33A1E0" />&nbsp;
                  <p className="text-sm font-medium">{achievement.label}</p>
                </div>
              ))}
            </div>
            <button className="mt-6 text-[#ffffff] text-sm font-medium hover:text-[#33A1E0]">
              Learn About Our Journey 
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
