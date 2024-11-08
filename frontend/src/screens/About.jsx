// About.js
import React from "react";
import HeroSection from "../components/AboutHeroSection";
import ContentSection from "../components/AboutContentSection";

const About = () => {
  return (
    <div className="min-h-screen text-gray-800 flex flex-col items-center">
      {/* Hero Section */}
      <HeroSection />

      {/* Content Sections */}
      <div className="w-full">
        <ContentSection
          title="Our Mission"
          text="We’re dedicated to making healthy eating accessible, enjoyable, and convenient. Our meals are crafted with care, using the finest ingredients to fuel your body and brighten your day. We believe in the power of food to bring people together, fostering a sense of community. Join us in our mission to serve nutritious and delicious food that resonates with our commitment to health and happiness. At Gastron, we aim to inspire mindful choices that elevate well-being and celebrate the joy of eating."
          imageUrl="https://media.istockphoto.com/id/1162911786/photo/the-team-of-cooks-backs-in-the-work-in-the-modern-kitchen-the-workflow-of-the-restaurant-in.jpg?s=612x612&w=0&k=20&c=Nn1xO1gbUGnEzTHp4Sitg_ouob_co3jY5hDv_kHWzxE="
          bgColor="bg-white"
        />
        <ContentSection
          title="Quality Ingredients"
          text="At Gastron, we use only the freshest, locally sourced ingredients. We believe in celebrating flavors, nutrition, and sustainability in every meal. From farm-fresh vegetables to responsibly sourced meats, our ingredients reflect our commitment to quality. Our menu is thoughtfully crafted to provide the highest nutritional value while satisfying your taste buds. Every ingredient has a story, and we take pride in sharing that story through our dishes."
          imageUrl="https://media.istockphoto.com/id/139497624/photo/crate-full-of-fruits-and-vegetables-over-rustic-table.jpg?s=612x612&w=0&k=20&c=4WYvNbgSZvtpM64dnxCfkZE5p2GGfVWqOPv59qzTCmg="
          reverse
          bgColor="bg-[#FDD5B1]"
        />
        <ContentSection
          title="Meet Our Team"
          text="Our passionate team of chefs and food enthusiasts works tirelessly to craft meals that not only nourish but also inspire. With diverse backgrounds and shared dedication, we create flavors that appeal to a wide range of tastes. Each team member brings unique skills, contributing to our innovative approach to food. We’re not just a team; we’re a family committed to providing the best dining experience."
          imageUrl="https://media.istockphoto.com/id/1403510517/video/latin-american-business-team-sharing-ideas-talking-in-a-meeting-at-a-creative-office.jpg?s=640x640&k=20&c=DQ79oyWsB9ouN__l2CWh_BpxkwR4BYuWXQ9fKsAchyY="
          bgColor="bg-white"
        />
        <ContentSection
          title="Sustainability"
          text="Our mission is to minimize waste and embrace sustainable practices. We support local farms and use eco-friendly packaging to reduce environmental impact. By choosing us, you’re also contributing to a greener planet as we aim to balance quality dining with environmental responsibility. We prioritize practices that protect our environment, ensuring future generations can also enjoy quality ingredients. Sustainability isn’t just a practice; it’s at the heart of our values."
          imageUrl="https://media.istockphoto.com/id/1344240174/photo/brown-paper-bag-that-is-100-recyclable-and-reusable-on-a-counter.jpg?s=612x612&w=0&k=20&c=GFsK1KJsEhMLN_EryZxa0OtJ6-e5uodBRD2JtNkWqD4="
          reverse
          bgColor="bg-[#FDD5B1]"
        />
        <ContentSection
          title="Community Engagement"
          text="We actively engage with our community through programs that support local causes and create connections. We aim to build a supportive environment, where everyone feels a sense of belonging. Through events and collaborations, we bring people together over the joy of food, fostering unity and mutual support within our community. At Gastron, we believe in giving back, contributing to positive change, and strengthening the community we serve."
          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMk2WCZBPiQLHqMjrZJc9SdOHTcxeXG5p4lA&s"
          bgColor="bg-white"
        />
      </div>
    </div>
  );
};

export default About;
