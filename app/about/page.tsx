import { Award, Users, Heart, ShoppingBag } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen text-White">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dhxctvrj5/image/upload/v1751269426/model1_xabxko.jpg"
            alt="Logo Story"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl px-6">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-wider">
              LOGO
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Where Style Meets Statement
            </p>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Story</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos.{" "}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos.{" "}
              </p>
            </div>
            <div className="relative group">
              <img
                src="https://res.cloudinary.com/dhxctvrj5/image/upload/v1751269260/behrooz-MMBBQ2p1Dsk-unsplash_1_tnoudo.jpg"
                alt="Our Story"
                className="w-full h-[600px] object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-zinc-100 to-zinc-300 text-zinc-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className=" text-4xl md:text-5xl font-bold mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-zinc-700/50 hover:border-emerald-400/50 transition-all duration-300">
                <Award className="w-10 h-10 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                Quality First
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We never compromise on quality. Every piece is crafted with
                premium materials and meticulous attention to detail.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-zinc-700/50 hover:border-orange-400/50 transition-all duration-300">
                <Users className="w-10 h-10 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className=" text-xl font-bold mb-4 group-hover:text-orange-400 transition-colors duration-300">
                Community
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We're more than a brand – we're a community of individuals who
                believe in authentic self-expression.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-zinc-700/50 hover:border-green-400/50 transition-all duration-300">
                <Heart className="w-10 h-10 text-green-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className=" text-xl font-bold mb-4 group-hover:text-green-400 transition-colors duration-300">
                Sustainability
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We're committed to ethical production practices and sustainable
                materials for a better tomorrow.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-zinc-700/50 hover:border-blue-400/50 transition-all duration-300">
                <ShoppingBag className="w-10 h-10 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className=" text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">
                Innovation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We constantly evolve, bringing fresh perspectives and
                cutting-edge designs to streetwear fashion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
              Meet The Team
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The creative minds behind Brand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://res.cloudinary.com/dhxctvrj5/image/upload/v1751532318/front-view-friends-posing-together-min_xh9pbm.jpg"
                  alt="Creative Director"
                  className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                John Doe
              </h3>
              <p className="text-gray-400 mb-4">Creative Director</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                With 10+ years in fashion design, Alex brings vision and
                creativity to every Brand collection.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://res.cloudinary.com/dhxctvrj5/image/upload/v1751535194/mark-adriane-bO3S03I2Aw8-unsplash_vnhljn.jpg"
                  alt="Head of Design"
                  className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-orange-400 transition-colors duration-300">
                Jane Doe
              </h3>
              <p className="text-gray-400 mb-4">Head of Design</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Jordan's innovative approach to streetwear design has shaped
                Brand unique aesthetic identity.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://res.cloudinary.com/dhxctvrj5/image/upload/v1751532316/young-man-wearing-bucket-hat-city-min_javj0w.jpg"
                  alt="Brand Manager"
                  className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-green-400 transition-colors duration-300">
                Alex Taylor 
              </h3>
              <p className="text-gray-400 mb-4">Brand Manager</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sam ensures that every Brand experience reflects our core
                values and brand promise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-zinc-100 to-zinc-300 text-zinc-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                50K+
              </div>
              <div className="text-gray-600 text-lg">Happy Customers</div>
            </div>
            <div className="group">
              <div className=" text-4xl md:text-5xl font-bold mb-2 group-hover:text-orange-400 transition-colors duration-300">
                200+
              </div>
              <div className="text-gray-600 text-lg">Products</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:text-green-400 transition-colors duration-300">
                25+
              </div>
              <div className="text-gray-600 text-lg">Countries</div>
            </div>
            <div className="group">
              <div className=" text-4xl md:text-5xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                4.9
              </div>
              <div className="text-gray-600 text-lg">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-8">
            Join The Movement
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Be part of a community that values authenticity, creativity, and
            bold self-expression. Discover your style with Brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-zinc-900 px-8 py-4 rounded hover:bg-gray-200 transition duration-300 font-semibold">
              Shop Collection
            </button>
            <button className="bg-transparent border border-gray-400 text-white px-8 py-4 rounded hover:text-zinc-900 hover:bg-white transition duration-300 font-semibold">
              Follow Our Journey
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
