import React from "react";
import Link from "next/link";
const Tools = ({ categories }) => {
  // console.log(categories);
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {categories?.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="xl:w-1/3 md:w-1/2 p-4 hover:scale-105 duration-300 transition ease-out cursor-pointer"
              >
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-8 h-8"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="14"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 21h10"></path>
                      <path d="M10 17v4m4-4v4"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                    {category.name}
                  </h2>
                  <p className="leading-relaxed text-base">{category.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tools;
