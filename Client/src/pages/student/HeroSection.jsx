import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-32 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        {/* Heading and Description */}
        <h1 className="text-white text-5xl font-extrabold mb-6 tracking-tight">
          Find the Best Courses for You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 text-lg mb-10 leading-relaxed">
          Take the first step in your learning journey today!
        </p>

        {/* Search Form */}
        <form onSubmit={searchHandler} className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button type="submit" className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800">Search</Button>
        </form>

        {/* Explore Courses Button */}
        <Button
          onClick={() => navigate(`/course/search?query`)}
          className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-600 transition duration-300 ease-in-out"
        >
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
