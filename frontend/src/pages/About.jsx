import React from "react";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className="py-10 mt-20 text-2xl text-center pt-8 ">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 mx-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] h-fit"
          src="../images/about.jpg"
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At Streamly, we believe in bringing people closer through shared
            experiences. Our platform allows you to watch movies and shows with
            friends and family in real-time, no matter where they are. Whether
            you're hosting a virtual movie night or catching up on your favorite
            series together, Streamly makes it easy and enjoyable.
          </p>
          <p>
            With seamless synchronization and high-quality streaming, we ensure
            that your viewing experience is smooth and immersive. Join thousands
            of users who trust Streamly to stay connected and entertained.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to create a platform that fosters connection and
            shared experiences. We aim to make streaming with loved ones as
            simple and enjoyable as possible, breaking down the barriers of
            distance and time.
          </p>
        </div>
      </div>

      <div className="text-xl mx-10 py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20 gap-2">
        <div className="border px-10 mx-10 my-10  md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Our Values</b>
          <p className="text-gray-600">
            At Streamly, we prioritize user experience, innovation, and
            community. We are committed to providing a platform that is easy to
            use, reliable, and fun for everyone.
          </p>
        </div>
        <div className="border px-10 mx-10 my-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Streamly is designed with simplicity in mind. Join or create a room
            in seconds, and enjoy synchronized streaming with just a few clicks.
            No complicated setups—just pure entertainment.
          </p>
        </div>
        <div className="border px-10 mx-10 my-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our support team is always here to help. Whether you have a question
            or need assistance, we're just a message away. Your satisfaction is
            our top priority.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
