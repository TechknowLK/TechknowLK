import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Kumara Alahakoon",
    company: "Alahakoon Enterprises",
    text: "TechKnow Lanka completely revolutionized how we manage our interlock operations. Their customized system streamlined our workflow and improved accuracy across every department. The support team was with us every step of the way.",
    rating: 4
  },
  {
    name: "Milani Rathnayake",
    company: "Ayusha Pharmacy",
    text: "TechKnow Lanka’s Pharmacy Management System has completely optimized our daily operations. From inventory control to billing, everything runs smoothly now. Our workflow efficiency has increased by nearly 50%, and errors have dropped dramatically.",
    rating: 5
  },
  {
    name: "Prabath Athukorala",
    company: "GCB Bank",
    text: "Our financial verification and data collection process used to take days. With the system developed by TechKnow Lanka, it now takes minutes. Their attention to detail and commitment to excellence truly stand out.",
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
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-[#626262]">
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
                  <p className="text-xs text-muted-foreground">{testimonial.company}</p>
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
