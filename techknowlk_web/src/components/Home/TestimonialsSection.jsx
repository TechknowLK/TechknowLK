import { Star } from "lucide-react";

const testimonials = [
  {
    name: "M.K. Abeykoon",
    role: "Managing Director",
    company: "Enterprise Solutions Ltd.",
    text: "TechKnow Lanka transformed our operations with their IoT solutions. The team's expertise increased our operational efficiency by 45% and their support has been exceptional.",
    rating: 5
  },
  {
    name: "M.K. Abeykoon",
    role: "Technology Manager",
    company: "Innovation Corp.",
    text: "Their cybersecurity expertise helped us achieve compliance standards while maintaining seamless operations. Exceptional service and cutting-edge solutions.",
    rating: 5
  },
  {
    name: "M.K. Abeykoon",
    role: "Operations Manager",
    company: "Manufacturing Inc.",
    text: "The smart home automation systems from TechKnow were ahead of the market. Our clients love the innovative technology and ease of use.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 drop-shadow-sm">
           
            <span className="text-[#626262]">What Our </span>
           <span className="text-[#33A1E0]">Clients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-[#626262]">
            Don't just take our word for it. Here's what industry leaders say about working with TechKnow Lanka.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 px-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card  rounded-lg p-6 shadow-[10px_10px_25px_rgba(0,0,0,0.13)]   transition-all duration-500 hover:scale-105 px-10"
            >
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#33A1E0] " />
                ))}
              </div>

              
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed text-[#626262]">
                "{testimonial.text}"
              </p>

              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#626262] flex items-center justify-center text-[#ffffff] font-bold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
