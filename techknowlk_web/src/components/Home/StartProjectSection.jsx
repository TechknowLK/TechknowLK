// import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import Button02 from "../Button02";
import Button01 from "../Button01";

const StartProject = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#626262] mb-4 drop-shadow-sm">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-[#626262]">
            Join hundreds of satisfied clients who have transformed their
            businesses with our cutting-edge technology solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button01 label={"Start Your Project"} />
            <Button02 label={"Schedule Consultation"} />

            {/* <Button variant="hero" size="lg" className="group">
              Start your project
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button> */}
            {/* <Button variant="outline" size="lg">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Consultation
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartProject;
