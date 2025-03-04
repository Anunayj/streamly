import React from "react";
import Title from "../components/Title";

const Contact = () => {
  return (
    <div className="text-center text-2xl py-10 mt-20  pt-10 ">
      <div>
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="mx-10 my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[450px]  h-fit"
          src="../images/contact.jpeg"
          alt=""
        />
        <div className="flex flex-col justify-center   gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Office</p>
          <p className="text-sm text-gray-500">
            Shri G. S. Institute of Technology and Science <br />
            23 Sir M. Visvesvaraya Marg <br />
            Indore, Madhya Pradesh 452003{" "}
          </p>
          <p className="text-sm text-gray-500">
            Tel: (415) 555-0312 <br /> Email: admin@streamly.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            {" "}
            Careers at Streamly
          </p>
          <p className=" text-sm text-gray-500">
            Learn more about our teams and job openings.{" "}
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore jobs
          </button>
        </div>
      </div>
      <div>
        <Title text1={"Developed"} text2={"By"} />
      </div>
      <div className="flex flex-wrap justify-center gap-10 mb-28">
        <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
          <a href="https://anu.ninja" target="blank">
            Anunay Jain
          </a>
        </button>

        <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
          <a href="https://github.com/Anjaligarhwal" target="blank">
            Anjali Garhwal
          </a>
        </button>
      </div>
    </div>
  );
};

export default Contact;
